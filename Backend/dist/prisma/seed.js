"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcrypt');
const { config } = require('dotenv');
config();
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
    console.log('🌱 Starting Enterprise Database Seeding...\n');
    const email = process.env.SUPER_ADMIN_EMAIL || 'admin@aescion.com';
    const passwordRaw = process.env.SUPER_ADMIN_PASSWORD || 'Admin@123456';
    const name = process.env.SUPER_ADMIN_NAME || 'Super Admin';
    const roleName = process.env.SUPER_ADMIN_ROLE || 'Super Admin';
    let tenant = await prisma.tenant.findFirst({ where: { name: 'AESCION HQ' } });
    if (!tenant) {
        tenant = await prisma.tenant.create({
            data: {
                id: '00000000-0000-0000-0000-000000000001',
                name: 'AESCION HQ',
                domain: 'aescion.com',
                status: 'ACTIVE',
            },
        });
        console.log(`✅ Created Default Tenant: AESCION HQ`);
    }
    let role = await prisma.role.findFirst({ where: { name: roleName } });
    if (!role) {
        role = await prisma.role.create({
            data: {
                name: roleName,
                description: 'Full system access',
                isSystem: true,
                status: 'ACTIVE',
            },
        });
        console.log(`✅ Created Role: ${roleName}`);
    }
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        const hashedPassword = await bcrypt.hash(passwordRaw, 10);
        user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName: name,
                lastName: 'User',
                status: 'ACTIVE',
                roleId: role.id,
                tenantId: tenant.id,
            },
        });
        console.log(`✅ Created Super Admin User: ${email}`);
    }
    await prisma.systemSetting.upsert({
        where: {
            tenantId_group_key: {
                tenantId: tenant.id,
                group: 'branding',
                key: 'header',
            },
        },
        create: {
            tenantId: tenant.id,
            group: 'branding',
            key: 'header',
            isPublic: true,
            description: 'Public Header Configuration',
            value: {
                logoUrl: '/logo_with_name.png',
                navLinks: [
                    { label: 'About', href: '/about' },
                    { label: 'Services', href: '/services' },
                    { label: 'Solutions', href: '/solutions' },
                    { label: 'Industries', href: '/industries' },
                    { label: 'Training', href: '/training' },
                    { label: 'Internship', href: '/internship' },
                    { label: 'Blog', href: '/blog' },
                ],
                ctaText: 'Contact Us',
                ctaHref: '/contact',
            },
        },
        update: {},
    });
    console.log('✅ Seeded Header Configuration');
    await prisma.systemSetting.upsert({
        where: {
            tenantId_group_key: {
                tenantId: tenant.id,
                group: 'branding',
                key: 'footer',
            },
        },
        create: {
            tenantId: tenant.id,
            group: 'branding',
            key: 'footer',
            isPublic: true,
            description: 'Public Footer Configuration',
            value: {
                brandDescription: 'Premium enterprise software development, AI solutions, automation, and corporate training for modern organizations.',
                socialLinks: {
                    linkedin: 'https://www.linkedin.com/company/aescion-edtech/',
                    instagram: 'https://www.instagram.com/aescion_edtech_solutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
                    facebook: 'https://www.facebook.com/profile.php?id=61585357586915',
                },
                headOffice: '7/3-49, VENKATESWARAPURAM, KADANGANERI, GANDHI NAGAR STREET, TENKASI 627854 TAMIL NADU',
                branchOffice: '10B/1H,15/1, THIRUMALAI NAMBI COMPLEX, PALAYAMKOTTAI, 2ND FLOOR THIRUVANDURAM ROAD, TIRUNELVELI-627003, TAMIL NADU',
                email: 'info@aesciontech.com',
                phone: '+91 7550068877',
                copyright: 'Aescion EdTech Solutions. All rights reserved.',
            },
        },
        update: {},
    });
    console.log('✅ Seeded Footer Configuration');
    const servicesData = [
        {
            slug: 'custom-software-development',
            title: 'Custom Software Development',
            shortDescription: 'Scalable, high-performance web and mobile apps engineered for speed, reliability, and security.',
            content: 'End-to-end custom software development tailored to your enterprise needs using modern full-stack frameworks and microservices architecture.',
            icon: 'Code',
            features: [
                'Web & Mobile App Engineering',
                'High-Performance Architecture',
                'API Design & Integration',
                'Cloud-Native Scalability',
            ],
            order: 1,
            status: 'PUBLISHED',
        },
        {
            slug: 'ai-automation',
            title: 'AI & Automation Solutions',
            shortDescription: 'LLM integrations, custom AI agents, document processing, and smart workflow automation.',
            content: 'Harness cutting-edge artificial intelligence and automation to streamline operations, cut costs, and empower intelligent decision-making.',
            icon: 'BrainCircuit',
            features: [
                'Custom AI Agents',
                'LLM & RAG Solutions',
                'Process Automation (RPA)',
                'Predictive Analytics',
            ],
            order: 2,
            status: 'PUBLISHED',
        },
        {
            slug: 'cloud-solutions',
            title: 'Cloud Architecture & DevOps',
            shortDescription: 'AWS/GCP infrastructure, Kubernetes orchestration, CI/CD pipelines, and 99.99% uptime optimization.',
            content: 'Modernize your cloud infrastructure with robust DevOps practices, containerization, auto-scaling, and active multi-region resilience.',
            icon: 'Cloud',
            features: [
                'AWS & Multi-Cloud Setup',
                'Kubernetes & Docker',
                'CI/CD Pipeline Automation',
                '24/7 Monitoring & Reliability',
            ],
            order: 3,
            status: 'PUBLISHED',
        },
        {
            slug: 'erp-software-development',
            title: 'ERP & Enterprise Solutions',
            shortDescription: 'Tailored ERP systems, CRM integrations, inventory management, and automated financial tracking.',
            content: 'Unify your entire enterprise operations into a seamless platform with automated workflows, real-time reporting, and centralized control.',
            icon: 'Cpu',
            features: [
                'Custom ERP & CRM',
                'HRMS & Payroll Integration',
                'Inventory & Supply Chain',
                'Real-time Analytics Dashboard',
            ],
            order: 4,
            status: 'PUBLISHED',
        },
    ];
    for (const item of servicesData) {
        await prisma.service.upsert({
            where: { slug: item.slug },
            create: {
                tenantId: tenant.id,
                ...item,
            },
            update: {},
        });
    }
    console.log('✅ Seeded Default Services');
    const solutionsData = [
        {
            slug: 'enterprise-core',
            title: 'AESCION Enterprise Core ERP',
            shortDescription: 'Unified ERP solution for managing multi-branch operations, finances, human resources, and supply chains.',
            content: 'AESCION Enterprise Core provides a comprehensive operating system for growing organizations, offering real-time visibility across all operations.',
            category: 'Enterprise ERP',
            icon: 'Briefcase',
            benefits: ['Unified Data Model', 'Role-Based Access Control', 'Automated Compliance', 'Real-Time Financials'],
            techStack: ['NestJS', 'Next.js', 'PostgreSQL', 'Prisma', 'TailwindCSS'],
            order: 1,
            status: 'PUBLISHED',
        },
        {
            slug: 'ai-agent-engine',
            title: 'Autonomous AI Workflow Engine',
            shortDescription: 'Deploy custom AI agents that manage customer support, process documentation, and automate complex tasks.',
            content: 'Empower your team with self-learning AI agents built on private neural networks and domain-specific knowledge bases.',
            category: 'AI & Machine Learning',
            icon: 'Bot',
            benefits: ['Instant Response Times', '90% Cost Reduction', '24/7 Operation', 'Zero Training Overhead'],
            techStack: ['Python', 'LangChain', 'OpenAI', 'Vector DB', 'FastAPI'],
            order: 2,
            status: 'PUBLISHED',
        },
    ];
    for (const item of solutionsData) {
        await prisma.systemSetting.upsert({
            where: {
                tenantId_group_key: {
                    tenantId: tenant.id,
                    group: 'solutions',
                    key: item.slug,
                },
            },
            create: {
                tenantId: tenant.id,
                group: 'solutions',
                key: item.slug,
                isPublic: true,
                description: item.title,
                value: item,
            },
            update: {},
        });
    }
    console.log('✅ Seeded Default Solutions');
    const pagesData = [
        { title: 'Homepage', slug: '/', description: 'AESCION Enterprise Homepage', status: 'PUBLISHED' },
        { title: 'About Us', slug: '/about', description: 'About AESCION EdTech & Engineering', status: 'PUBLISHED' },
        { title: 'Services', slug: '/services', description: 'Core Engineering Services Overview', status: 'PUBLISHED' },
        { title: 'Solutions', slug: '/solutions', description: 'Pre-architected Enterprise Solutions', status: 'PUBLISHED' },
        { title: 'Industries', slug: '/industries', description: 'Industries & Verticals Served', status: 'PUBLISHED' },
        { title: 'Training', slug: '/training', description: 'Corporate Tech Training Workshops', status: 'PUBLISHED' },
        { title: 'Internship', slug: '/internship', description: 'Hands-on Engineering Internship Program', status: 'PUBLISHED' },
        { title: 'Blog', slug: '/blog', description: 'Engineering Articles & Insights', status: 'PUBLISHED' },
        { title: 'Contact', slug: '/contact', description: 'Contact & Inquiry Page', status: 'PUBLISHED' },
    ];
    for (const p of pagesData) {
        await prisma.page.upsert({
            where: { slug: p.slug },
            create: {
                tenantId: tenant.id,
                title: p.title,
                slug: p.slug,
                description: p.description,
                status: p.status,
                createdBy: user.id,
            },
            update: {},
        });
    }
    console.log('✅ Seeded Real Website Pages');
    const categoriesData = [
        { name: 'AI & ML', slug: 'ai-ml', description: 'Artificial Intelligence & Machine Learning' },
        { name: 'Cloud & DevOps', slug: 'cloud-devops', description: 'Cloud Infrastructure & Automation' },
        { name: 'Security', slug: 'security', description: 'Cyber Security & Zero Trust' },
        { name: 'Frontend', slug: 'frontend', description: 'Frontend Engineering & Design Systems' },
        { name: 'Backend', slug: 'backend', description: 'Backend Systems & Database Architecture' },
        { name: 'Software Architecture', slug: 'software-architecture', description: 'Enterprise System Architecture' },
    ];
    for (const cat of categoriesData) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            create: {
                tenantId: tenant.id,
                name: cat.name,
                slug: cat.slug,
                description: cat.description,
                status: 'ACTIVE',
            },
            update: {},
        });
    }
    const aiCategory = await prisma.category.findUnique({ where: { slug: 'ai-ml' } });
    const cloudCategory = await prisma.category.findUnique({ where: { slug: 'cloud-devops' } });
    const securityCategory = await prisma.category.findUnique({ where: { slug: 'security' } });
    const blogsData = [
        {
            slug: 'future-of-enterprise-ai',
            title: 'The Future of Enterprise AI Agents: Beyond Chatbots',
            excerpt: 'How autonomous AI agents powered by large language models are transforming enterprise workflows, from customer support to internal operations and decision-making.',
            content: 'Autonomous AI agents are transitioning from basic conversational chatbots into context-aware digital workers capable of completing multi-step operational workflows...',
            readTime: '12 min read',
            isFeatured: true,
            status: 'PUBLISHED',
            publishedAt: new Date('2026-10-24'),
            categoryId: aiCategory?.id,
        },
        {
            slug: 'migrating-monoliths',
            title: 'Migrating Monoliths to Microservices: A Practical Guide',
            excerpt: 'A step-by-step guide to breaking down legacy monolithic applications into independently deployable microservices without disrupting active business operations.',
            content: 'Decomposing a legacy monolith requires incremental domain-driven design, strangler fig patterns, and rigorous database decoupling...',
            readTime: '9 min read',
            isFeatured: false,
            status: 'PUBLISHED',
            publishedAt: new Date('2026-10-18'),
            categoryId: cloudCategory?.id,
        },
        {
            slug: 'security-modern-web',
            title: 'Security in Modern Web Applications',
            excerpt: 'Implementing zero-trust architecture, CSP headers, and OWASP Top 10 mitigations in Next.js and React enterprise deployments.',
            content: 'Enterprise web security requires proactive defense-in-depth strategies, strict CORS policies, and automated vulnerability scanning...',
            readTime: '8 min read',
            isFeatured: false,
            status: 'PUBLISHED',
            publishedAt: new Date('2026-10-12'),
            categoryId: securityCategory?.id,
        },
    ];
    for (const b of blogsData) {
        await prisma.blog.upsert({
            where: { slug: b.slug },
            create: {
                tenantId: tenant.id,
                authorId: user.id,
                title: b.title,
                slug: b.slug,
                excerpt: b.excerpt,
                content: b.content,
                readTime: b.readTime,
                isFeatured: b.isFeatured,
                status: b.status,
                publishedAt: b.publishedAt,
                categoryId: b.categoryId,
                createdBy: user.id,
            },
            update: {},
        });
    }
    console.log('✅ Seeded Real Blog Articles');
    console.log('\n✅ Enterprise Seeding Complete.');
}
main()
    .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map
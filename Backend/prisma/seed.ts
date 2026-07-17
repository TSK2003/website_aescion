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

  // 1. Initial Super Admin
  const email = process.env.SUPER_ADMIN_EMAIL;
  const passwordRaw = process.env.SUPER_ADMIN_PASSWORD;
  const name = process.env.SUPER_ADMIN_NAME || 'Super Admin';
  const roleName = process.env.SUPER_ADMIN_ROLE || 'Super Admin';

  if (!email || !passwordRaw) {
    console.warn('⚠️ SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD not set in environment. Skipping Super Admin creation.');
  } else {
    // Check if Tenant exists
    let tenant = await prisma.tenant.findFirst({ where: { name: 'AESCION HQ' } });
    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: {
          name: 'AESCION HQ',
          domain: 'aescion.com',
          status: 'ACTIVE',
        },
      });
      console.log(`✅ Created Default Tenant: AESCION HQ`);
    }

    // Check if Super Admin Role exists
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

    // Check if User exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    
    if (existingUser) {
      console.log(`ℹ️ Super Admin user (${email}) already exists. Skipping.`);
    } else {
      const hashedPassword = await bcrypt.hash(passwordRaw, 10);
      
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName: name,
          lastName: 'Admin',
          status: 'ACTIVE',
          roleId: role.id,
          tenantId: tenant.id,
        },
      });
      console.log(`✅ Created Super Admin: ${email}`);
    }
  }

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

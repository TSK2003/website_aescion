import React from 'react';

const technologies = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "NestJS", "Python", "Go"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"] },
  { category: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
  { category: "AI & ML", items: ["TensorFlow", "PyTorch", "OpenAI", "LangChain"] },
];

export function TechnologyExpertise() {
  return (
    <section className="py-24 bg-neutral-950 text-white border-y border-neutral-800">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Enterprise Technology Stack
          </h2>
          <p className="text-lg text-neutral-400">
            We leverage modern, scalable, and secure technologies to build robust systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {technologies.map((tech, idx) => (
            <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-primary-500/50 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-4 pb-4 border-b border-neutral-800">
                {tech.category}
              </h3>
              <ul className="space-y-3">
                {tech.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center text-neutral-400">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

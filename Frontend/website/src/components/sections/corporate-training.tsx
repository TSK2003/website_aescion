import React from 'react';
import Link from 'next/link';
import { Code, Cloud, BrainCircuit, ArrowRight } from 'lucide-react';

const programs = [
  {
    icon: Code,
    title: "Full-Stack Engineering",
    desc: "React, Next.js, Node.js, and System Design"
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "AWS, Docker, Kubernetes, and CI/CD pipelines"
  },
  {
    icon: BrainCircuit,
    title: "AI & Data Science",
    desc: "Machine Learning, LLM integration, and Python"
  }
];

export function CorporateTraining() {
  return (
    <section className="py-24 bg-primary-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Corporate Tech Training & Upskilling
            </h2>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed max-w-lg">
              Equip your engineering teams with modern technology stacks. We conduct intensive, hands-on workshops tailored to your organization's specific technical goals.
            </p>
            
            <div className="space-y-6 mb-10">
              {programs.map((prog, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-primary-800/50 border border-primary-700/50 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center shrink-0">
                    <prog.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{prog.title}</h3>
                    <p className="text-primary-200 text-sm">{prog.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              href="/training" 
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-secondary-400 transition-colors group"
            >
              Explore Training Curriculum
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="hidden lg:block relative h-full min-h-[500px]">
            <div className="absolute inset-0 rounded-2xl bg-primary-800 border border-primary-700 overflow-hidden shadow-2xl">
              <div className="w-full h-8 bg-primary-950 flex items-center px-4 border-b border-primary-800 gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
              </div>
              <div className="p-6 font-mono text-sm text-primary-300">
                <p className="text-primary-400 mb-2">// Upskill your engineering workforce</p>
                <p><span className="text-secondary-400">const</span> <span className="text-white">trainingProgram</span> = {'{'}</p>
                <p className="ml-4">modules: [<span className="text-success">'React'</span>, <span className="text-success">'Next.js'</span>, <span className="text-success">'AWS'</span>],</p>
                <p className="ml-4">duration: <span className="text-secondary-400">12</span>,</p>
                <p className="ml-4">format: <span className="text-success">'Hands-on'</span></p>
                <p>{'};'}</p>
                <br/>
                <p><span className="text-white">team</span>.<span className="text-secondary-400">upskill</span>(trainingProgram);</p>
                <p className="mt-4 animate-pulse text-success">&gt; Execution successful. Team productivity +300%</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

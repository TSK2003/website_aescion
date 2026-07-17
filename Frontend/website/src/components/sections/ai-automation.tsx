import React from 'react';
import Link from 'next/link';
import { Bot, Sparkles, Cpu, ArrowRight } from 'lucide-react';

export function AiAutomation() {
  return (
    <section className="py-24 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-6 border border-primary-200">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Capabilities</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 tracking-tight">
              Intelligent AI & Automation Solutions
            </h2>
            
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              We integrate large language models (LLMs), machine learning pipelines, and robotic process automation (RPA) directly into your enterprise software, transforming raw data into actionable insights and automating repetitive workflows.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center shrink-0 text-primary-500">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-lg">Custom AI Agents</h4>
                  <p className="text-neutral-600">Deploy specialized AI agents that understand your proprietary data and securely execute tasks.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center shrink-0 text-primary-500">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-lg">Workflow Automation</h4>
                  <p className="text-neutral-600">Eliminate manual data entry and connect disjointed systems with powerful RPA integrations.</p>
                </div>
              </div>
            </div>
            
            <Link 
              href="/services/ai-solutions" 
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
            >
              Discover AI Capabilities
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative">
            {/* Abstract visual representation of AI Node/Network */}
            <div className="aspect-square md:aspect-video lg:aspect-[4/5] rounded-3xl bg-neutral-900 p-8 relative overflow-hidden shadow-2xl border border-neutral-800 flex items-center justify-center">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/30 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 w-full max-w-sm">
                <div className="flex justify-between items-end mb-4">
                  <div className="w-16 h-16 rounded-xl bg-primary-500 flex items-center justify-center shadow-[0_0_30px_rgba(46,23,194,0.5)] border border-primary-400">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
                
                <div className="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-xl p-4 mb-3 transform -rotate-1">
                  <div className="w-24 h-2 bg-neutral-700 rounded mb-2"></div>
                  <div className="w-full h-2 bg-neutral-700 rounded mb-2"></div>
                  <div className="w-3/4 h-2 bg-neutral-700 rounded"></div>
                </div>
                
                <div className="bg-primary-900/60 backdrop-blur-sm border border-primary-500/30 rounded-xl p-4 transform rotate-1 translate-x-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary-400" />
                    <span className="text-xs text-primary-300 font-mono">AI Response Generated</span>
                  </div>
                  <div className="w-full h-2 bg-primary-700 rounded mb-2"></div>
                  <div className="w-5/6 h-2 bg-primary-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

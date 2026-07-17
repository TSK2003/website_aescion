'use client';

import React from 'react';
import { Monitor, CheckCircle2, AlertTriangle, Database, HardDrive, Cpu, Mail, Server } from 'lucide-react';
import { PageHeader } from '@/components/ui/Primitives';

const services = [
  { name: 'API Server', status: 'healthy', latency: '45ms', uptime: '99.9%', icon: Server },
  { name: 'PostgreSQL', status: 'healthy', latency: '12ms', uptime: '99.9%', icon: Database },
  { name: 'Redis Cache', status: 'healthy', latency: '2ms', uptime: '99.9%', icon: Cpu },
  { name: 'Email Queue', status: 'warning', latency: '—', uptime: '98.5%', icon: Mail },
  { name: 'Storage (S3)', status: 'healthy', latency: '85ms', uptime: '99.9%', icon: HardDrive },
];

export default function SystemPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="System Monitor" description="Monitor API, database, and infrastructure health" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {services.map(s => (
          <div key={s.name} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <s.icon className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-900">{s.name}</span>
              </div>
              {s.status === 'healthy'
                ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                : <AlertTriangle className="w-4 h-4 text-amber-500" />}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Latency</span>
                <p className="font-medium text-gray-900">{s.latency}</p>
              </div>
              <div>
                <span className="text-gray-400">Uptime</span>
                <p className="font-medium text-gray-900">{s.uptime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Resource Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'CPU', value: 23, max: 100, unit: '%' },
            { label: 'Memory', value: 4.2, max: 8, unit: ' GB' },
            { label: 'Storage', value: 14.2, max: 50, unit: ' GB' },
          ].map(r => (
            <div key={r.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600">{r.label}</span>
                <span className="text-xs font-bold text-gray-900">{r.value}{r.unit}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(r.value / r.max) * 100}%` }} />
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5 block">{r.max}{r.unit} total</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

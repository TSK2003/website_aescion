'use client';

import React from 'react';
import { Upload, FolderTree, Image, FileText, Film, Grid3X3, List } from 'lucide-react';
import { PageHeader, TabNav } from '@/components/ui/Primitives';

const folders = [
  { name: 'Website Images', count: 24, icon: Image },
  { name: 'Blog Media', count: 18, icon: FileText },
  { name: 'Documents', count: 12, icon: FileText },
  { name: 'Videos', count: 6, icon: Film },
  { name: 'Logos & Branding', count: 8, icon: Image },
  { name: 'Team Photos', count: 15, icon: Image },
];

export default function MediaPage() {
  const [tab, setTab] = React.useState('all');
  const [view, setView] = React.useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-4">
      <PageHeader title="Media Library" description="Manage images, documents, and media assets">
        <div className="flex items-center gap-2">
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <button onClick={() => setView('grid')} className={`p-1.5 ${view === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}><Grid3X3 className="w-3.5 h-3.5 text-gray-500" /></button>
            <button onClick={() => setView('list')} className={`p-1.5 ${view === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}><List className="w-3.5 h-3.5 text-gray-500" /></button>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90"><Upload className="w-3.5 h-3.5" /> Upload</button>
        </div>
      </PageHeader>

      <TabNav tabs={[{ id: 'all', label: 'All Files' }, { id: 'images', label: 'Images' }, { id: 'documents', label: 'Documents' }, { id: 'videos', label: 'Videos' }]} activeTab={tab} onChange={setTab} />

      {/* Folders */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Folders</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {folders.map((folder) => (
            <div key={folder.name} className="p-4 bg-white border border-gray-200 rounded-lg hover:border-primary/40 cursor-pointer transition-all flex flex-col items-center text-center gap-2">
              <FolderTree className="w-8 h-8 text-primary/60" />
              <span className="text-xs font-medium text-gray-900">{folder.name}</span>
              <span className="text-[10px] text-gray-400">{folder.count} files</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center bg-gray-50/50">
        <Upload className="w-8 h-8 text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-500 mb-1">Drag and drop files here</p>
        <p className="text-xs text-gray-400">PNG, JPG, PDF, MP4 up to 50MB</p>
      </div>
    </div>
  );
}

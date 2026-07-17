import React from 'react';
import { Search, FileText, Users, Settings, X, Command } from 'lucide-react';

/* ======================================================
   COMMAND PALETTE (Global Search)
   ====================================================== */

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-black/40 animate-fade-in px-4">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="bg-white rounded-xl shadow-soft-xl w-full max-w-2xl flex flex-col overflow-hidden animate-scale-in relative z-10 border border-gray-200">
        
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input 
            autoFocus
            type="text" 
            placeholder="Search commands, pages, or content..." 
            className="flex-1 bg-transparent border-none outline-none text-base text-gray-900 placeholder:text-gray-400"
          />
          <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded text-xs text-gray-500 font-medium">
            ESC
          </div>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2">
          
          <div className="px-2 py-1.5">
            <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Pages</h4>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-primary/5 hover:text-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                  CMS / Pages
                </div>
                <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Jump to</span>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-primary/5 hover:text-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                  Users & Roles
                </div>
              </button>
            </div>
          </div>

          <div className="px-2 py-1.5 mt-2">
            <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Actions</h4>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-primary/5 hover:text-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                  Open System Settings
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-2.5 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><kbd className="bg-white border border-gray-200 rounded px-1.5 py-0.5 shadow-sm">↑</kbd><kbd className="bg-white border border-gray-200 rounded px-1.5 py-0.5 shadow-sm">↓</kbd> to navigate</span>
            <span className="flex items-center gap-1.5"><kbd className="bg-white border border-gray-200 rounded px-1.5 py-0.5 shadow-sm flex items-center gap-0.5">↵</kbd> to select</span>
          </div>
          <span className="flex items-center gap-1.5">Powered by <Command className="w-3.5 h-3.5" /> AESCION OS</span>
        </div>
      </div>
    </div>
  );
}

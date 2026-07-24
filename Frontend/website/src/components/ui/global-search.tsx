'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, FileText, BookOpen, Code, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

interface SearchResultItem {
  id?: string;
  title: string;
  href: string;
  category: string;
  description?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced API search (300ms)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await api.get('/search', { params: { query: query.trim() } });
        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Search failed:', err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'blog':
        return BookOpen;
      case 'service':
        return Code;
      default:
        return FileText;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Search Dialog */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
        {/* Input */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-neutral-100">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-primary-600 animate-spin shrink-0" />
          ) : (
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blogs, services, and pages..."
            className="flex-1 text-lg text-neutral-900 placeholder-neutral-400 focus:outline-none bg-transparent"
          />
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {query.trim().length === 0 ? (
            <div className="p-8 text-center text-neutral-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Start typing to search live database records.</p>
              <p className="text-sm mt-2">
                Press <kbd className="px-2 py-0.5 bg-neutral-100 rounded text-xs font-mono">ESC</kbd> to close
              </p>
            </div>
          ) : isLoading ? (
            <div className="p-8 text-center text-neutral-400 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto" />
              <p className="text-sm font-medium">Searching database...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">
              <p className="font-medium">No results found for &quot;{query}&quot;</p>
              <p className="text-sm mt-2">Try searching for keywords like &quot;AI&quot;, &quot;Software&quot;, or &quot;Blog&quot;.</p>
            </div>
          ) : (
            <div className="py-2">
              {results.map((result, idx) => {
                const IconComponent = getIcon(result.category);
                return (
                  <Link
                    key={result.id || idx}
                    href={result.href}
                    onClick={onClose}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-primary-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-neutral-100 group-hover:bg-primary-100 rounded-xl flex items-center justify-center shrink-0 text-neutral-400 group-hover:text-primary-600 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-neutral-900 truncate group-hover:text-primary-600 transition-colors">
                        {result.title}
                      </div>
                      <div className="text-xs text-neutral-500 mt-0.5">{result.category}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs text-neutral-400">
          <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
          <span className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded text-[10px] font-mono">⌘K</kbd> to toggle
          </span>
        </div>
      </div>
    </div>
  );
}

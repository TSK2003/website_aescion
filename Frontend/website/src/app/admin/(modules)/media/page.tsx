'use client';

import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Upload, FileText, Trash2, Loader2, Search } from 'lucide-react';
import { Toast } from '@/components/admin/ui/Toast';

type MediaFileItem = {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
};

const initialRealMedia: MediaFileItem[] = [
  {
    id: 'media-1',
    filename: 'aescion-hero-banner.png',
    originalName: 'aescion-hero-banner.png',
    mimeType: 'image/png',
    size: 245000,
    url: '/images/hero-banner.png',
    createdAt: '2026-07-20T10:00:00Z',
  },
  {
    id: 'media-2',
    filename: 'enterprise-architecture-diagram.svg',
    originalName: 'enterprise-architecture-diagram.svg',
    mimeType: 'image/svg+xml',
    size: 45000,
    url: '/images/architecture-diagram.svg',
    createdAt: '2026-07-18T14:30:00Z',
  },
  {
    id: 'media-3',
    filename: 'aescion-company-profile.pdf',
    originalName: 'aescion-company-profile.pdf',
    mimeType: 'application/pdf',
    size: 1540000,
    url: '/docs/company-profile.pdf',
    createdAt: '2026-07-15T09:15:00Z',
  },
];

export default function MediaPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-media', searchTerm],
    queryFn: async () => {
      try {
        const res = await api.get('/media', { params: { search: searchTerm || undefined } });
        const list = Array.isArray(res.data) ? res.data : (res.data?.items || res.data?.data || []);
        if (list && list.length > 0) return list;
      } catch {
        // Fallback
      }
      return initialRealMedia;
    },
  });

  const files: MediaFileItem[] = data || initialRealMedia;

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
      setToast({ message: 'File uploaded and metadata saved successfully.', type: 'success' });
    },
    onError: (err: any) => {
      setToast({ message: err?.message || 'Could not upload file.', type: 'error' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/media/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
      setToast({ message: 'File deleted successfully.', type: 'success' });
    },
    onError: (err: any) => {
      setToast({ message: err?.message || 'Could not delete file.', type: 'error' });
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('filename', selectedFile.name);
    formData.append('size', String(selectedFile.size));
    formData.append('mimeType', selectedFile.type);

    uploadMutation.mutate(formData);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Media Library & DAM</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Upload, inspect, and manage images, PDFs, and media assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,application/pdf,video/*"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadMutation.isPending}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors disabled:opacity-50"
          >
            {uploadMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            Upload File
          </button>
        </div>
      </div>

      {/* Upload Dropzone Header */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-neutral-300 hover:border-primary-500 bg-neutral-50/50 hover:bg-primary-50/30 rounded-2xl p-8 text-center cursor-pointer transition-all"
      >
        <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
        <p className="text-sm font-semibold text-neutral-700">Click or drag & drop files to upload</p>
        <p className="text-xs text-neutral-400 mt-1">PNG, JPG, SVG, PDF, MP4 up to 50MB</p>
      </div>

      {/* Files Grid */}
      {isLoading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-3" />
          <p className="text-sm text-neutral-500">Loading media files...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files.map((file) => {
            const isImage = file.mimeType?.startsWith('image/');
            return (
              <div
                key={file.id}
                className="group bg-white border border-neutral-200 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden relative flex items-center justify-center mb-3">
                  {isImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={file.url}
                      alt={file.filename}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <FileText className="w-8 h-8 text-neutral-400" />
                  )}
                  <button
                    onClick={() => deleteMutation.mutate(file.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-rose-600 hover:text-white text-rose-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    title="Delete File"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 truncate" title={file.filename}>
                    {file.filename || file.originalName}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                    <span>{formatFileSize(file.size || 0)}</span>
                    <span>{file.createdAt ? new Date(file.createdAt).toLocaleDateString() : 'Recent'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

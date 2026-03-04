'use client';

import { useState, useRef, useCallback } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

interface UploadDropZoneProps {
  onUploadComplete: () => void;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function UploadDropZone({ onUploadComplete }: UploadDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback(async (files: File[]) => {
    const valid = files.filter((f) => ACCEPTED_TYPES.includes(f.type));
    if (valid.length === 0) return;

    setUploading(true);
    setTotalCount(valid.length);
    setUploadCount(0);

    for (const file of valid) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await fetch('/api/admin/instagram/upload', {
          method: 'POST',
          body: formData,
        });
      } catch (err) {
        console.error('Upload failed:', err);
      }
      setUploadCount((c) => c + 1);
    }

    setUploading(false);
    setTotalCount(0);
    setUploadCount(0);
    onUploadComplete();
  }, [onUploadComplete]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      uploadFiles(files);
    },
    [uploadFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    uploadFiles(files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors duration-200 ${
        isDragOver
          ? 'border-blue-500 bg-blue-500/10'
          : 'border-gray-600 hover:border-gray-500 bg-gray-700/30'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      {uploading ? (
        <div className="py-2">
          <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
          <p className="text-sm text-gray-400">
            Uploading {uploadCount}/{totalCount}...
          </p>
        </div>
      ) : (
        <div className="py-2">
          <FiUploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-1" />
          <p className="text-sm text-gray-400">Drop files or click to upload</p>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP</p>
        </div>
      )}
    </div>
  );
}

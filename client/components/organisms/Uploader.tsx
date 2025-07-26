'use client';

import { DragEvent, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  value?: string;
  onChange: (url: string) => void;
  error?: string;
  handleSetPct: (pct: number | null) => void;
};

export default function Uploader({
  value,
  onChange,
  error,
  handleSetPct,
}: Props) {
  const [preview, setPreview] = React.useState<string | null>(null);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', preset!);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          handleSetPct(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        handleSetPct(null);
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url);
        } else {
          reject(xhr.responseText);
        }
      };

      xhr.onerror = () => reject('Upload failed');
      xhr.open('POST', url);
      xhr.send(formData);
    });
  };

  const handleFile = async (file: File) => {
    const tempPreview = URL.createObjectURL(file);
    setPreview(tempPreview);

    try {
      const uploadedUrl = await uploadToCloudinary(file);
      onChange(uploadedUrl);
    } catch (err) {
      console.error(err);
      onChange('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={cn(
          'border border-dashed rounded-xl p-2 transition hover:bg-muted flex items-center justify-center cursor-pointer size-48 mx-auto',
          preview ? 'border-green-400' : 'border-gray-300',
          error && 'border-red-500'
        )}
      >
        <Input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />
        <label
          htmlFor="file-upload"
          className="block w-full h-full relative cursor-pointer"
        >
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
              Drag & drop or click
            </div>
          )}
        </label>
      </div>
    </div>
  );
}

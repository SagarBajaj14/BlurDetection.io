"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ImageUpload({ onSubmit }: { onSubmit: (file: File) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = () => {
    if (file) {
      onSubmit(file);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <motion.div
      className="flex flex-col items-center gap-4 p-6 border border-gray-700 rounded-2xl shadow-lg bg-[#1e1e1e] text-gray-200 w-full max-w-md"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Uploaded Preview"
          className="rounded-lg mt-2 max-h-64 object-contain border border-gray-600"
        />
      )}

      <motion.button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl shadow-md hover:from-blue-600 hover:to-purple-700 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Analyze Image
      </motion.button>
    </motion.div>
  );
}

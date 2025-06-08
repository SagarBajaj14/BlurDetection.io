"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageUpload from '../components/ImageUpload';

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BLUR_API_ENDPOINT}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const isBlurry = data.prediction.toLowerCase() === 'blur' ? 'Yes' : 'No';
      setResult(`📸 Blurry: ${isBlurry} | Confidence: ${data.confidence}%`);
    } catch (err) {
      console.error(err);
      setResult('⚠️ Error analyzing image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111] text-gray-100">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-2 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        🔎 Blurry Vision AI
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-400 mb-10 text-center italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Is your image sharp enough? Let AI decide in seconds!
      </motion.p>

      <ImageUpload onSubmit={handleImageUpload} />

      {loading && (
        <motion.p
          className="mt-6 text-purple-300 text-lg animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🧠 Thinking...
        </motion.p>
      )}

      {result && (
        <motion.div
          className="mt-6 px-6 py-4 max-w-md text-center text-lg font-semibold rounded-xl shadow-xl bg-[#1e1e1e] text-gray-100 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {result}
        </motion.div>
      )}
    </main>
  );
}

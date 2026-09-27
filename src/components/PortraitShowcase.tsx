import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, Upload, Check } from 'lucide-react';
import defaultZubairPortrait from '../assets/images/zubair_ali_portrait_1790511948795.jpg';

const STORAGE_KEY = 'zubair_ali_portrait_v1';

interface PortraitShowcaseProps {
  isDark?: boolean;
}

export const PortraitShowcase: React.FC<PortraitShowcaseProps> = ({
  isDark = false,
}) => {
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [staticPhotoAvailable, setStaticPhotoAvailable] =
    useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [justUpdated, setJustUpdated] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCustomPhoto(saved);
      }
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  const handleFileSelection = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setCustomPhoto(result);
        try {
          localStorage.setItem(STORAGE_KEY, result);
        } catch {
          // Quota exceeded fallback
        }
        setJustUpdated(true);
        setTimeout(() => setJustUpdated(false), 2400);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelection(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelection(file);
  };

  // Priority: 1. User-selected file in browser storage -> 2. /zt.jpeg in public folder -> 3. Bundled studio portrait
  const activeImageSrc =
    customPhoto || (staticPhotoAvailable ? '/zt.jpeg' : defaultZubairPortrait);

  return (
    <div className="relative w-full max-w-[440px] mx-auto lg:ml-auto">
      {/* Hidden probe for /zt.jpeg if placed in public root */}
      {!customPhoto && (
        <img
          src="/zt.jpeg"
          alt=""
          referrerPolicy="no-referrer"
          className="hidden"
          onLoad={() => setStaticPhotoAvailable(true)}
          onError={() => setStaticPhotoAvailable(false)}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload Zubair Ali portrait photo"
      />

      {/* Architectural Portrait Frame */}
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`group relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#1D2F57] border transition-all duration-300 ${
          isDragging
            ? 'border-[#2563EB] ring-4 ring-[#2563EB]/30'
            : isDark
            ? 'border-[#222634] hover:border-[#3B82F6]/70 shadow-2xl shadow-black/60'
            : 'border-slate-200 hover:border-[#2563EB]/70 shadow-2xl shadow-blue-950/15'
        }`}
      >
        <img
          src={activeImageSrc}
          alt="Zubair Ali (ZT) — Software Engineering Student at QUEST Nawabshah"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Measured Contrast Scrim at Bottom for Caption Legibility */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pt-16 pb-5 px-5 z-20">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-lg font-bold text-[#F4F4F0] leading-tight">
                Zubair Ali (ZT)
              </p>
              <p className="text-xs text-[#CBD5E1] mt-0.5">
                Software Engineering · QUEST Nawabshah
              </p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12141C]/90 hover:bg-[#2563EB] text-[#F4F4F0] border border-[#222634] hover:border-[#3B82F6] text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
              title="Click to select your local zt.jpeg file"
            >
              {justUpdated ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Photo Saved</span>
                </>
              ) : (
                <>
                  <Camera className="w-3.5 h-3.5" />
                  <span>Change Photo</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Drag-and-drop overlay indicator */}
        {isDragging && (
          <div className="absolute inset-0 z-30 bg-[#050505]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <Upload className="w-8 h-8 text-[#3B82F6] mb-2" />
            <p className="text-sm font-semibold text-[#F4F4F0]">
              Drop your portrait photo (zt.jpeg) here
            </p>
            <p className="text-xs text-[#94A3B8] mt-1">
              Instantly updates and saves in your browser
            </p>
          </div>
        )}
      </motion.div>

      {/* Quiet caption & academic provenance line underneath */}
      <div
        className={`mt-3 flex items-center justify-between text-xs px-1 ${
          isDark ? 'text-[#94A3B8]' : 'text-slate-600'
        }`}
      >
        <span>Nawabshah, Sindh · Pakistan</span>
        <span aria-hidden="true">·</span>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap ${
            isDark
              ? 'text-[#94A3B8] hover:text-[#F4F4F0]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {customPhoto ? 'Update portrait file' : 'Select local zt.jpeg'}
        </button>
      </div>
    </div>
  );
};

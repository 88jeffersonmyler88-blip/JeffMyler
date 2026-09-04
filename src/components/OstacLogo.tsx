import React, { useState, useEffect } from 'react';
import defaultWelderImg from '../assets/noaaa.png';
import { welderLogoBase64 } from '../assets/welderLogoBase64';

interface OstacLogoProps {
  className?: string;
  alt?: string;
}

export const OstacLogo: React.FC<OstacLogoProps> = ({
  className = "w-56 sm:w-64 md:w-72 h-auto object-contain drop-shadow-md",
  alt = "OSTAC Soldador e Usinagem",
}) => {
  const [logoSrc, setLogoSrc] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('ostac_custom_logo');
      if (saved && !saved.startsWith('blob:') && (saved.startsWith('data:image') || saved.startsWith('http'))) {
        return saved;
      }
    } catch {
      // ignore
    }
    return defaultWelderImg || welderLogoBase64;
  });

  useEffect(() => {
    const handleStorage = (e: CustomEvent<string>) => {
      if (e.detail) {
        setLogoSrc(e.detail);
      }
    };
    window.addEventListener('ostac_logo_change' as any, handleStorage);
    return () => {
      window.removeEventListener('ostac_logo_change' as any, handleStorage);
    };
  }, []);

  return (
    <div className="relative group flex flex-col items-center">
      {/* Main Logo Image with zero-fail fallback */}
      <img 
        src={logoSrc} 
        alt={alt} 
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== welderLogoBase64) {
            target.src = welderLogoBase64;
          }
        }}
        className={`${className} transition-transform duration-300 hover:scale-[1.02]`}
      />
    </div>
  );
};


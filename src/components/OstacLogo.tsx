import React, { useState, useEffect, useRef } from 'react';
import { Upload, Link as LinkIcon, Check, RefreshCw } from 'lucide-react';

interface OstacLogoProps {
  className?: string;
  alt?: string;
}

export const OstacLogo: React.FC<OstacLogoProps> = ({
  className = "w-56 sm:w-64 md:w-72 h-auto object-contain drop-shadow-md",
  alt = "OSTAC Soldador e Usinagem",
}) => {
  const [logoSrc, setLogoSrc] = useState<string>(() => {
    return localStorage.getItem('ostac_custom_logo') || '/noaaa.png';
  });
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const broadcastChange = (newSrc: string) => {
    setLogoSrc(newSrc);
    localStorage.setItem('ostac_custom_logo', newSrc);
    window.dispatchEvent(new CustomEvent('ostac_logo_change', { detail: newSrc }));
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Convert to DataURL for immediate, zero-latency 100% original render
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      broadcastChange(dataUrl);
      setStatusMessage('Imagem original aplicada com sucesso!');
      setTimeout(() => setStatusMessage(null), 3000);

      // Also persist to server public directory
      try {
        await fetch('/api/upload-logo', {
          method: 'POST',
          headers: { 'Content-Type': file.type },
          body: file,
        });
      } catch (err) {
        console.error('Falha ao salvar no servidor:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
      setShowModal(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
      setShowModal(false);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    let finalUrl = urlInput.trim();
    // Support Google Drive share links
    if (finalUrl.includes('drive.google.com/file/d/')) {
      const idMatch = finalUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        finalUrl = `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
      }
    }

    broadcastChange(finalUrl);
    setUrlInput('');
    setShowModal(false);
    setStatusMessage('Link aplicado com sucesso!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const resetToDefault = () => {
    localStorage.removeItem('ostac_custom_logo');
    broadcastChange('/noaaa.png');
    setShowModal(false);
  };

  return (
    <div 
      className="relative group flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onFileInputChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Main Image */}
      <img 
        src={logoSrc} 
        alt={alt} 
        className={`${className} cursor-pointer transition-transform duration-300 hover:scale-[1.02]`}
        onClick={() => fileInputRef.current?.click()}
        title="Clique para escolher a imagem original do seu computador"
      />

      {/* Quick Action Overlay on Hover */}
      <div className={`mt-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-70 sm:opacity-0 group-hover:opacity-100'}`}>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-amber-50 hover:bg-amber-100 border border-amber-300/60 rounded-full shadow-xs transition-colors"
        >
          <Upload className="w-3.5 h-3.5 text-industrial-amber" />
          <span>Carregar foto original</span>
        </button>
      </div>

      {/* Temporary Success Toast */}
      {statusMessage && (
        <div className="absolute -top-10 bg-emerald-600 text-white text-xs px-3 py-1.5 rounded shadow-lg flex items-center gap-1.5 z-50 animate-bounce">
          <Check className="w-3.5 h-3.5" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Upload / URL Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
              Usar Imagem Original
            </h3>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Carregue o arquivo original do seu computador (sem nenhuma alteração por IA) ou insira um link direto.
            </p>

            {/* Option 1: File Upload */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-industrial-amber/60 hover:border-industrial-amber bg-amber-50/40 hover:bg-amber-50/80 p-6 rounded-md text-center cursor-pointer transition-colors mb-5"
            >
              <Upload className="w-8 h-8 text-industrial-amber mx-auto mb-2" />
              <span className="text-sm font-semibold text-slate-800 block">
                Clique para selecionar o arquivo original
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Selecione o arquivo .PNG (ex: ChatGPT Image...png)
              </span>
            </div>

            {/* Option 2: Direct Link */}
            <form onSubmit={handleUrlSubmit} className="space-y-3 mb-5">
              <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Ou cole o link direto da imagem:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://lh3.googleusercontent.com/... ou link direto"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded text-xs focus:outline-none focus:border-industrial-amber"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-black text-industrial-amber font-bold text-xs rounded hover:bg-industrial-amber hover:text-slate-black transition-colors"
                >
                  Aplicar
                </button>
              </div>
            </form>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={resetToDefault}
                className="text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Restaurar padrão</span>
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 rounded font-medium text-slate-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

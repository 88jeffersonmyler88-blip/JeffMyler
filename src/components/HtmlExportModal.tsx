import React, { useState, useEffect } from 'react';
import { Code, Download, Copy, Check, ExternalLink, X, FileCode, Sparkles } from 'lucide-react';

interface HtmlExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HtmlExportModal: React.FC<HtmlExportModalProps> = ({ isOpen, onClose }) => {
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetch('/elementor-landing-page.html')
        .then((res) => res.text())
        .then((text) => {
          setHtmlCode(text);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error loading HTML:', err);
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  const handleCopy = async () => {
    if (!htmlCode) return;
    try {
      await navigator.clipboard.writeText(htmlCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = htmlCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-industrial-amber">
              <FileCode className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
                Código Puro HTML <span className="text-xs normal-case px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">100% Autônomo</span>
              </h2>
              <p className="text-xs text-slate-400">
                Arquivo único HTML + Tailwind + JS. Pronto para Hostinger, cPanel, WordPress ou duplo clique.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-slate-950/40 border-b border-slate-800/80 text-sm">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Arquivo autossuficiente com ícones Lucide, Tailwind CDN e fontes Google integradas</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={isLoading || !htmlCode}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs transition-all shadow-sm ${
                isCopied 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
              }`}
              title="Copiar todo o código HTML para a área de transferência"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Código Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Código HTML</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              disabled={isLoading || !htmlCode}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
              title="Baixar como index.html para publicar na sua hospedagem"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Baixar index.html</span>
            </button>

            <a
              href="/elementor-landing-page.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition-colors"
              title="Abrir página pura em nova aba do navegador"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir no Navegador</span>
            </a>
          </div>
        </div>

        {/* Code Preview Area */}
        <div className="relative flex-1 overflow-hidden bg-slate-950 p-4 font-mono text-xs text-slate-300">
          {isLoading ? (
            <div className="flex items-center justify-center h-64 text-slate-400 gap-2">
              <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Carregando código HTML...</span>
            </div>
          ) : (
            <div className="h-full overflow-auto max-h-[55vh] rounded-lg border border-slate-800/80 bg-black/50 p-4 select-text">
              <pre className="whitespace-pre font-mono leading-relaxed selection:bg-amber-500 selection:text-black">
                {htmlCode}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Como usar: Salve como <code>index.html</code> e envie para a pasta <code>public_html</code> de qualquer hospedagem.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

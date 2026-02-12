import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Language {
  code: string;
  name: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English (US)', flag: '🇺🇸', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇩🇿', dir: 'rtl' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿', dir: 'ltr' },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChangeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang.code);
    document.dir = lang.dir;
    setIsOpen(false);
  };

  return (
    <div className="relative z-50" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 border",
          "bg-white border-gray-200 hover:border-primary-200 hover:text-primary-700 text-gray-600",
          isOpen && "ring-2 ring-primary-100 border-primary-500"
        )}
      >
        <Globe size={16} />
        <span className="text-sm font-medium hidden sm:inline-block">
          {currentLang.name.split(' ')[0]}
        </span>
        <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleChangeLanguage(lang)}
                className={cn(
                  "w-full px-4 py-2.5 flex items-center justify-between text-sm transition-colors",
                  "hover:bg-gray-50",
                  currentLang.code === lang.code ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
                
                {currentLang.code === lang.code && (
                  <Check size={16} className="text-primary-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
              

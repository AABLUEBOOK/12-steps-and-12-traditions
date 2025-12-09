import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
];

export default function AudioPlayer({ content }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [allVoices, setAllVoices] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const synthRef = useRef(window.speechSynthesis);
  const isPlayingRef = useRef(false);

  const paragraphs = useMemo(() => {
    if (!content) return [];
    const tmp = document.createElement('div');
    tmp.innerHTML = content;
    return Array.from(tmp.querySelectorAll('p'))
      .map(p => p.textContent?.trim())
      .filter(text => text && text.length > 0);
  }, [content]);

  const filteredVoices = useMemo(() => {
    return allVoices
      .filter(v => v.lang.toLowerCase().startsWith(selectedLanguage))
      .sort((a, b) => {
        const aQuality = a.localService ? 1 : 0;
        const bQuality = b.localService ? 1 : 0;
        return bQuality - aQuality || a.name.localeCompare(b.name);
      });
  }, [allVoices, selectedLanguage]);

  useEffect(() => {
    const loadVoices = () => {
      const available = synthRef.current.getVoices();
      const professional = available.filter(v => 
        !v.name.toLowerCase().includes('novelty') &&
        !v.name.toLowerCase().includes('bad news')
      );
      setAllVoices(professional);
      
      const englishVoices = professional.filter(v => v.lang.startsWith('en'));
      if (englishVoices.length > 0 && !selectedVoice) {
        const preferred = englishVoices.find(v => 
          v.localService && (v.name.includes('Samantha') || v.name.includes('Google'))
        ) || englishVoices[0];
        setSelectedVoice(preferred.name);
      }
    };
    loadVoices();
    synthRef.current.onvoiceschanged = loadVoices;
    return () => { synthRef.current.cancel(); };
  }, []);

  useEffect(() => {
    if (filteredVoices.length > 0 && !filteredVoices.find(v => v.name === selectedVoice)) {
      setSelectedVoice(filteredVoices[0].name);
    }
  }, [selectedLanguage, filteredVoices]);

  const speak = useCallback((index) => {
    if (index >= paragraphs.length) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      setCurrentParagraph(0);
      return;
    }

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(paragraphs[index]);
    utterance.rate = speed;
    utterance.volume = isMuted ? 0 : 1;
    
    const voice = filteredVoices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.onend = () => {
      if (isPlayingRef.current) {
        setCurrentParagraph(prev => {
          const next = prev + 1;
          speak(next);
          return next;
        });
      }
    };

    synthRef.current.speak(utterance);
  }, [paragraphs, speed, isMuted, selectedVoice, filteredVoices]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
      isPlayingRef.current = false;
    } else {
      setIsPlaying(true);
      isPlayingRef.current = true;
      speak(currentParagraph);
    }
  }, [isPlaying, currentParagraph, speak]);

  const skip = useCallback((direction) => {
    synthRef.current.cancel();
    const newIndex = direction === 'back' 
      ? Math.max(0, currentParagraph - 1)
      : Math.min(paragraphs.length - 1, currentParagraph + 1);
    setCurrentParagraph(newIndex);
    if (isPlayingRef.current) speak(newIndex);
  }, [currentParagraph, paragraphs.length, speak]);

  const progress = paragraphs.length > 0 ? ((currentParagraph + 1) / paragraphs.length) * 100 : 0;

  if (paragraphs.length === 0) return null;

  return (
    <div className="sticky top-14 z-30 glass-material glass-elevation rounded-3xl p-4 sm:p-5 mb-6 will-change-auto" role="region" aria-label="Audio player">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          onClick={togglePlay}
          className="bg-accent hover:bg-accent/90 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0 flex-shrink-0 shadow-lg shadow-accent/30 hover:shadow-accent/40 hover:scale-105 transition-all duration-300"
        >
          {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />}
        </Button>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-200 font-medium">Paragraph {currentParagraph + 1} of {paragraphs.length}</span>
            <span className="text-xs text-accent font-semibold">Speed: {speed}x</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden backdrop-blur-sm">
            <div className="bg-gradient-to-r from-accent to-accent/80 h-full transition-all duration-300 shadow-lg shadow-accent/30" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => skip('back')} className="text-accent hover:bg-white/10 w-10 h-10 rounded-full transition-all duration-200 hover:scale-110">
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => skip('forward')} className="text-accent hover:bg-white/10 w-10 h-10 rounded-full transition-all duration-200 hover:scale-110">
            <SkipForward className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="text-accent hover:bg-white/10 w-10 h-10 rounded-full transition-all duration-200 hover:scale-110">
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-200 whitespace-nowrap font-medium">Speed:</span>
          <Slider value={[speed]} onValueChange={([val]) => setSpeed(val)} min={0.5} max={2} step={0.25} className="flex-1" />
          <span className="text-xs text-accent font-semibold w-10 text-right">{speed}x</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-accent" />
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="flex-1 h-9 text-xs bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-200 whitespace-nowrap font-medium">Voice:</span>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="flex-1 h-9 text-xs bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent className="max-h-48">
              {filteredVoices.map((voice) => (
                <SelectItem key={voice.name} value={voice.name}>
                  {voice.name.split(' ')[0]} {voice.lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
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
    <div className="sticky top-14 z-30 bg-slate-700/95 backdrop-blur-sm border border-slate-600 rounded-lg shadow-lg p-3 sm:p-4 mb-4">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          onClick={togglePlay}
          className="bg-teal-500 hover:bg-teal-600 text-slate-900 rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 flex-shrink-0"
        >
          {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />}
        </Button>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Paragraph {currentParagraph + 1} of {paragraphs.length}</span>
            <span className="text-xs text-slate-400">Speed: {speed}x</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
            <div className="bg-teal-500 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => skip('back')} className="text-teal-400 hover:bg-slate-600 w-8 h-8">
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => skip('forward')} className="text-teal-400 hover:bg-slate-600 w-8 h-8">
            <SkipForward className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="text-teal-400 hover:bg-slate-600 w-8 h-8">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-600 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 whitespace-nowrap">Speed:</span>
          <Slider value={[speed]} onValueChange={([val]) => setSpeed(val)} min={0.5} max={2} step={0.25} className="flex-1" />
          <span className="text-xs text-slate-400 w-8">{speed}x</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Globe className="w-3 h-3 text-slate-400" />
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="flex-1 h-8 text-xs bg-slate-600 border-slate-500 text-white">
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
          <span className="text-xs text-slate-400 whitespace-nowrap">Voice:</span>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="flex-1 h-8 text-xs bg-slate-600 border-slate-500 text-white">
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
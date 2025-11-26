import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AudioPlayer({ content }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [paragraphs, setParagraphs] = useState([]);
  const utteranceRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    // Parse paragraphs from content
    if (content) {
      const tmp = document.createElement('div');
      tmp.innerHTML = content;
      const pElements = tmp.querySelectorAll('p');
      const texts = Array.from(pElements)
        .map(p => p.textContent?.trim())
        .filter(text => text && text.length > 0);
      setParagraphs(texts);
    }
  }, [content]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synthRef.current.getVoices();
      const englishVoices = availableVoices.filter(v => v.lang.startsWith('en'));
      setVoices(englishVoices);
      if (englishVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(englishVoices[0].name);
      }
    };

    loadVoices();
    synthRef.current.onvoiceschanged = loadVoices;

    return () => {
      synthRef.current.cancel();
    };
  }, []);

  const speak = (index) => {
    if (index >= paragraphs.length) {
      setIsPlaying(false);
      setCurrentParagraph(0);
      return;
    }

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(paragraphs[index]);
    utterance.rate = speed;
    utterance.volume = isMuted ? 0 : 1;
    
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      if (isPlaying) {
        setCurrentParagraph(prev => prev + 1);
        speak(index + 1);
      }
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  useEffect(() => {
    if (isPlaying && paragraphs.length > 0) {
      speak(currentParagraph);
    } else {
      synthRef.current.cancel();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const skipBack = () => {
    synthRef.current.cancel();
    const newIndex = Math.max(0, currentParagraph - 1);
    setCurrentParagraph(newIndex);
    if (isPlaying) {
      speak(newIndex);
    }
  };

  const skipForward = () => {
    synthRef.current.cancel();
    const newIndex = Math.min(paragraphs.length - 1, currentParagraph + 1);
    setCurrentParagraph(newIndex);
    if (isPlaying) {
      speak(newIndex);
    }
  };

  const progress = paragraphs.length > 0 
    ? ((currentParagraph + 1) / paragraphs.length) * 100 
    : 0;

  if (paragraphs.length === 0) return null;

  return (
    <div className="sticky top-14 z-30 bg-slate-700/95 backdrop-blur-sm border border-slate-600 rounded-lg shadow-lg p-3 sm:p-4 mb-4">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          onClick={togglePlay}
          className="bg-teal-500 hover:bg-teal-600 text-slate-900 rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 flex-shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
          )}
        </Button>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">
              Paragraph {currentParagraph + 1} of {paragraphs.length}
            </span>
            <span className="text-xs text-slate-400">Speed: {speed}x</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
            <div
              className="bg-teal-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={skipBack}
            className="text-teal-400 hover:bg-slate-600 w-8 h-8"
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={skipForward}
            className="text-teal-400 hover:bg-slate-600 w-8 h-8"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="text-teal-400 hover:bg-slate-600 w-8 h-8"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-600 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Speed:</span>
          <div className="flex items-center gap-2 min-w-[120px]">
            <span className="text-xs text-slate-500">0.5x</span>
            <Slider
              value={[speed]}
              onValueChange={([val]) => setSpeed(val)}
              min={0.5}
              max={2}
              step={0.25}
              className="w-20"
            />
            <span className="text-xs text-slate-500">2x</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-[150px]">
          <span className="text-xs text-slate-400 whitespace-nowrap">Voice:</span>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="flex-1 h-8 text-xs bg-slate-600 border-slate-500 text-white">
              <SelectValue placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice.name} value={voice.name}>
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Square } from 'lucide-react';
import { Car } from '@/data/cars';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleEngineSound = () => {
    if (isPlaying) {
      // Stop the audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Play the audio
      const audio = new Audio(car.audioFile);
      audio.volume = 0.7;
      audioRef.current = audio;
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        audioRef.current = null;
      });
      
      audio.play().catch(error => {
        console.warn('Could not play audio:', error);
        setIsPlaying(false);
        audioRef.current = null;
        // Fallback to synthesized sound if audio file not found
        playFallbackSound();
      });
      
      setIsPlaying(true);
    }
  };

  const playFallbackSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    let baseFreq = 150;
    if (car.engine.includes('V12')) baseFreq = 120;
    else if (car.engine.includes('V8')) baseFreq = 140;
    else if (car.engine.includes('V6')) baseFreq = 160;
    else if (car.engine.includes('V10')) baseFreq = 130;
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 2, audioContext.currentTime + 1.5);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
  };

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-accent/20">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-3">
          <div>
            <CardTitle className="text-xl font-bold text-primary mb-1">{car.name}</CardTitle>
            <p className="text-accent font-medium">{car.brand}</p>
          </div>
          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/30">
            {car.category}
          </Badge>
        </div>
        
        <div className="aspect-video bg-gradient-subtle rounded-lg overflow-hidden">
          <img 
            src={car.image} 
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='14' fill='%236b7280'%3E" + car.name + "%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-background/50 rounded-lg p-3">
            <p className="text-muted-foreground">Price</p>
            <p className="font-semibold text-primary">{car.price}</p>
          </div>
          <div className="bg-background/50 rounded-lg p-3">
            <p className="text-muted-foreground">Top Speed</p>
            <p className="font-semibold text-accent">{car.topSpeed}</p>
          </div>
          <div className="bg-background/50 rounded-lg p-3">
            <p className="text-muted-foreground">0-60 mph</p>
            <p className="font-semibold text-accent">{car.acceleration}</p>
          </div>
          <div className="bg-background/50 rounded-lg p-3">
            <p className="text-muted-foreground">Horsepower</p>
            <p className="font-semibold text-primary">{car.horsepower}</p>
          </div>
        </div>
        
        <div className="bg-background/30 rounded-lg p-4 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Engine</p>
            <p className="font-medium text-foreground">{car.engine}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Transmission</p>
            <p className="font-medium text-foreground">{car.transmission}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">{car.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {car.characteristics.map((characteristic, index) => (
              <Badge key={index} variant="outline" className="text-xs border-accent/40 text-accent">
                {characteristic}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={toggleEngineSound}
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          {isPlaying ? (
            <>
              <Square className="mr-2 h-4 w-4" />
              Stop Engine Sound
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Play Engine Sound
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CarCard;
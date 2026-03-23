import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Square, Heart, Scale, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Car } from '@/data/cars';
import { useCar } from '@/context/CarContext';
import { cn } from "@/lib/utils";

interface CarCardProps {
  car: Car;
  playingId: string | null;
  onPlay: (id: string | null, audio: HTMLAudioElement | null) => void;
}

const audioContext = typeof window !== 'undefined'
  ? new (window.AudioContext || (window as any).webkitAudioContext)()
  : null;

const CarCard: React.FC<CarCardProps> = ({ car, playingId, onPlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlaying = playingId === car.id;
  const { toast } = useToast();
  const { favorites, toggleFavorite, addToCompare, compareList } = useCar();

  const isFavorite = favorites.includes(car.id);
  const isInCompare = compareList.some(c => c.id === car.id);

  const playFallbackSound = () => {
    if (!audioContext) return;
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

  const toggleEngineSound = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if clicked inside Link
    
    if (isPlaying) {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      audioRef.current = null;
      onPlay(null, null);
    } else {
      const audio = new Audio(car.audioFile);
      audio.volume = 0.7;
      audioRef.current = audio;

      audio.addEventListener('ended', () => {
        audioRef.current = null;
        onPlay(null, null);
      });

      audio.play().catch(() => {
        audioRef.current = null;
        onPlay(null, null);
        toast({
          title: 'Audio unavailable',
          description: `No audio file found for ${car.name}. Playing synthesized sound.`,
          variant: 'destructive',
        });
        playFallbackSound();
      });

      onPlay(car.id, audio);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
      e.preventDefault();
      toggleFavorite(car.id, car.name);
  }

  const handleCompare = (e: React.MouseEvent) => {
      e.preventDefault();
      addToCompare(car);
  }

  return (
    <Card className="group h-full flex flex-col hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-accent/20 overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <Link to={`/car/${car.id}`}>
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='14' fill='%236b7280'%3E${encodeURIComponent(car.name)}%3C/text%3E%3C/svg%3E`;
            }}
          />
        </Link>
        <div className="absolute top-2 right-2 flex gap-2">
            <Button 
                size="icon" 
                variant="secondary" 
                className={cn("h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity", isFavorite && "opacity-100 text-red-500")}
                onClick={handleFavorite}
            >
                <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
            </Button>
            <Button 
                size="icon" 
                variant="secondary" 
                className={cn("h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity delay-75", isInCompare && "opacity-100 text-blue-500")}
                onClick={handleCompare}
            >
                <Scale className="h-4 w-4" />
            </Button>
        </div>
      </div>

      <CardHeader className="pb-3 flex-none">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link to={`/car/${car.id}`} className="hover:underline">
                <CardTitle className="text-xl font-bold text-primary mb-1">{car.name}</CardTitle>
            </Link>
            <p className="text-accent font-medium text-sm">{car.brand}</p>
          </div>
          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/30 text-[10px]">
            {car.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-background/50 rounded p-2">
            <p className="text-muted-foreground">Price</p>
            <p className="font-semibold text-primary">{car.price}</p>
          </div>
          <div className="bg-background/50 rounded p-2">
            <p className="text-muted-foreground">Top Speed</p>
            <p className="font-semibold text-accent">{car.topSpeed}</p>
          </div>
          <div className="bg-background/50 rounded p-2">
            <p className="text-muted-foreground">0-60 mph</p>
            <p className="font-semibold text-accent">{car.acceleration}</p>
          </div>
          <div className="bg-background/50 rounded p-2">
            <p className="text-muted-foreground">HP</p>
            <p className="font-semibold text-primary">{car.horsepower}</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{car.description}</p>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button
          onClick={toggleEngineSound}
          variant={isPlaying ? "destructive" : "default"}
          className="flex-1 gap-2 text-xs"
        >
          {isPlaying ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          {isPlaying ? 'Stop Engine' : 'Start Engine'}
        </Button>
        <Link to={`/car/${car.id}`} className="flex-1">
            <Button variant="outline" className="w-full gap-2 text-xs">
                Details <ExternalLink className="w-3 h-3" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CarCard;

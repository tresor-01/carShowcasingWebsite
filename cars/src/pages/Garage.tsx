import React, { useState } from 'react';
import { cars } from '@/data/cars';
import { useCar } from '@/context/CarContext';
import CarCard from '@/components/CarCard';
import Navbar from '@/components/Navbar';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Garage = () => {
  const { favorites } = useCar();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const favoriteCars = cars.filter(car => favorites.includes(car.id));

  const handlePlay = (id: string | null, audio: HTMLAudioElement | null) => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setPlayingId(id);
    setCurrentAudio(audio);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 container mx-auto">
        <div className="flex flex-col items-center mb-12">
          <div className="p-3 bg-red-500/10 rounded-full mb-4">
            <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-bold mb-2">My Garage</h1>
          <p className="text-muted-foreground text-center">
            {favoriteCars.length > 0 
              ? `${favoriteCars.length} vehicles in your collection` 
              : "Your garage is currently empty"}
          </p>
        </div>

        {favoriteCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteCars.map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                playingId={playingId}
                onPlay={handlePlay}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="mb-6 text-lg">Start exploring the gallery to add cars to your personal collection.</p>
            <Link to="/">
              <Button size="lg">Explore Gallery</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Garage;

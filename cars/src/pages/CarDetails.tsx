import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { cars } from '@/data/cars';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Gauge, Timer, Zap, Cog, Activity } from 'lucide-react';
import CarCard from '@/components/CarCard';
import Navbar from '@/components/Navbar';
import { useCar } from '@/context/CarContext';

const CarDetails = () => {
  const { id } = useParams();
  const car = cars.find(c => c.id === id);
  const { toggleFavorite, favorites, addToCompare } = useCar();

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const similarCars = cars
    .filter(c => c.category === car.category && c.id !== car.id)
    .slice(0, 3);

  const isFavorite = favorites.includes(car.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 container mx-auto">
        <Link to="/" className="inline-block mb-6">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="relative group">
            <div className="aspect-[16/10] overflow-hidden rounded-xl border border-white/10 shadow-2xl">
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="text-primary border-primary">
                {car.brand}
              </Badge>
              <Badge variant="secondary">{car.category}</Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-none">
              {car.name}
            </h1>
            
            <p className="text-2xl text-muted-foreground mb-8 font-light">
              {car.price}
            </p>

            <p className="text-lg leading-relaxed mb-8 text-neutral-300">
              {car.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                onClick={() => toggleFavorite(car.id, car.name)}
                variant={isFavorite ? "default" : "outline"}
                className="gap-2"
              >
                {isFavorite ? "Parked in Garage" : "Add to Garage"}
              </Button>
              <Button variant="secondary" onClick={() => addToCompare(car)}>
                Add to Compare
              </Button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/20 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Gauge className="w-4 h-4" /> Top Speed
                </div>
                <div className="text-xl font-bold">{car.topSpeed}</div>
              </div>
              <div className="bg-secondary/20 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Timer className="w-4 h-4" /> 0-60 mph
                </div>
                <div className="text-xl font-bold">{car.acceleration}</div>
              </div>
              <div className="bg-secondary/20 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Zap className="w-4 h-4" /> Power
                </div>
                <div className="text-xl font-bold">{car.horsepower}</div>
              </div>
              <div className="bg-secondary/20 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Cog className="w-4 h-4" /> Engine
                </div>
                <div className="text-xl font-bold">{car.engine}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" /> 
              Performance Characteristics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {car.characteristics.map((char, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{char}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 bg-secondary/10 rounded-xl border border-white/5">
            <h3 className="text-xl font-bold mb-4">Technical Specs</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Transmission</span>
                <span className="font-medium text-right">{car.transmission}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Powertrain</span>
                <span className="font-medium text-right">{car.engine}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Horsepower</span>
                <span className="font-medium text-right">{car.horsepower}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        {similarCars.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Similar Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarCars.map((similarCar) => (
                <CarCard 
                  key={similarCar.id} 
                  car={similarCar} 
                  playingId={null} 
                  onPlay={() => {}} 
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CarDetails;

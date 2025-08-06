import React, { useState } from 'react';
import { cars } from '@/data/cars';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const categories = [
  'All',
  'Italian Supercar',
  'Italian Hypercar', 
  'Japanese Supercar',
  'Japanese Sports Car',
  'Japanese Rally Car',
  'American Muscle',
  'American Sports Car',
  'American Supercar',
  'American Luxury Performance',
  'British Supercar',
  'British GT',
  'British Electric Hypercar',
  'German Sports Car',
  'German GT',
  'German Track Car',
  'French Hypercar',
  'Swedish Hypercar',
  'Electric Hypercar'
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCars = selectedCategory === 'All' 
    ? cars 
    : cars.filter(car => car.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative py-20 px-4 text-center bg-gradient-primary">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
            Elite Car Showcase
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
            Experience the world's most extraordinary automobiles with authentic engine sounds
          </p>
          <Badge variant="secondary" className="text-lg px-6 py-2 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
            {cars.length} Premium Vehicles
          </Badge>
        </div>
      </div>

      {/* Filter Section */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-200 ${
                  selectedCategory === category 
                    ? 'bg-gradient-primary border-primary shadow-glow' 
                    : 'border-accent/40 hover:border-accent hover:bg-accent/10'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
        {filteredCars.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No cars found in this category.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Elite Car Showcase • Experience Automotive Excellence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import React, { useState } from 'react';
import { cars } from '@/data/cars';
import CarCard from '@/components/CarCard';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { useCar } from '@/context/CarContext';

const categories = [
  'All',
  ...Array.from(new Set(cars.map(car => car.category))).sort(),
];

const Index = () => {
  const {
    searchQuery, setSearchQuery,
    sortBy, setSortBy,
    selectedBrand, setSelectedBrand
  } = useCar();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const brands = ['All', ...Array.from(new Set(cars.map(car => car.brand))).sort()];

  const filteredCars = cars.filter(car => {
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'Price: Low to High':       return a.price - b.price;
      case 'Price: High to Low':       return b.price - a.price;
      case 'Horsepower: High to Low':  return b.horsepower - a.horsepower;
      case 'Top Speed: High to Low':   return b.topSpeed - a.topSpeed;
      case '0-60: Fast to Slow':       return a.acceleration - b.acceleration;
      default:                         return 0;
    }
  });

  const handlePlay = (id: string | null, audio: HTMLAudioElement | null) => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setPlayingId(id);
    setCurrentAudio(audio);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('Default');
    setSelectedBrand('All');
    setSelectedCategory('All');
  };

  const filtersActive = searchQuery || selectedBrand !== 'All' || sortBy !== 'Default' || selectedCategory !== 'All';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12 px-4 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Supercar Gallery</h1>
            <p className="text-muted-foreground">Discover the world's most exclusive machines.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default">Default</SelectItem>
                <SelectItem value="Price: Low to High">Price: Low to High</SelectItem>
                <SelectItem value="Price: High to Low">Price: High to Low</SelectItem>
                <SelectItem value="Horsepower: High to Low">Horsepower: High to Low</SelectItem>
                <SelectItem value="Top Speed: High to Low">Top Speed: High to Low</SelectItem>
                <SelectItem value="0-60: Fast to Slow">0-60: Fast to Slow</SelectItem>
              </SelectContent>
            </Select>

            {filtersActive && (
              <Button variant="ghost" size="icon" onClick={clearFilters} title="Clear Filters">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Category filter badges — derived from data so new cars auto-appear */}
        <div className="relative mb-8">
          <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap px-4 py-2 hover:bg-primary/90 hover:text-primary-foreground transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {sortedCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                playingId={playingId}
                onPlay={handlePlay}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-2">No cars found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            <Button variant="link" onClick={clearFilters} className="mt-4">
              Clear all filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Car } from '@/data/cars';
import { useToast } from '@/hooks/use-toast';

interface CarContextType {
  favorites: string[]; // Store IDs
  toggleFavorite: (id: string, name: string) => void;
  compareList: Car[];
  addToCompare: (car: Car) => void;
  removeFromCompare: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  
  // Favorites State
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('carFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Compare State
  const [compareList, setCompareList] = useState<Car[]>([]);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Default');
  const [selectedBrand, setSelectedBrand] = useState('All');

  // Persist Favorites
  useEffect(() => {
    localStorage.setItem('carFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string, name: string) => {
    setFavorites(prev => {
      const isFav = prev.includes(id);
      if (isFav) {
        toast({
          title: "Removed from Garage",
          description: `${name} has been removed from your favorites.`,
        });
        return prev.filter(favId => favId !== id);
      } else {
        toast({
          title: "Added to Garage",
          description: `${name} has been parked in your favorites!`,
        });
        return [...prev, id];
      }
    });
  };

  const addToCompare = (car: Car) => {
    setCompareList(prev => {
      if (prev.find(c => c.id === car.id)) {
        toast({
          title: "Already Added",
          description: `${car.name} is already in comparison list.`,
        });
        return prev;
      }
      if (prev.length >= 3) {
        toast({
          title: "Comparison Full",
          description: "You can only compare up to 3 cars at a time.",
          variant: "destructive"
        });
        return prev;
      }
      toast({
        title: "Added to Compare",
        description: `${car.name} added. Go to Compare page to view.`,
      });
      return [...prev, car];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(c => c.id !== id));
  };

  return (
    <CarContext.Provider value={{
      favorites,
      toggleFavorite,
      compareList,
      addToCompare,
      removeFromCompare,
      searchQuery,
      setSearchQuery,
      sortBy,
      setSortBy,
      selectedBrand,
      setSelectedBrand
    }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCar = () => {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCar must be used within a CarProvider');
  }
  return context;
};

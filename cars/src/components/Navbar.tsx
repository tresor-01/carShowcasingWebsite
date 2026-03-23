import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Heart, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCar } from '@/context/CarContext';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const location = useLocation();
  const { compareList, favorites } = useCar();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Car className="w-6 h-6 text-primary" />
          <span>SupercarShowcase</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant={isActive('/') ? "secondary" : "ghost"}>
              Gallery
            </Button>
          </Link>
          
          <Link to="/garage">
            <Button variant={isActive('/garage') ? "secondary" : "ghost"} className="relative">
              <Heart className="w-4 h-4 mr-2" />
              Garage
              {favorites.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] rounded-full">
                  {favorites.length}
                </Badge>
              )}
            </Button>
          </Link>

          <Link to="/compare">
            <Button variant={isActive('/compare') ? "secondary" : "ghost"} className="relative">
              <Scale className="w-4 h-4 mr-2" />
              Compare
              {compareList.length > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] rounded-full">
                  {compareList.length}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

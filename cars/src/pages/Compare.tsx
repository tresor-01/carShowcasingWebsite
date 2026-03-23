import React from 'react';
import { useCar } from '@/context/CarContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Trash2, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { parsePrice, parseSpeed, parseAcc, parseHP } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Compare = () => {
  const { compareList, removeFromCompare } = useCar();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 container mx-auto">
        <div className="flex flex-col items-center mb-12">
          <div className="p-3 bg-blue-500/10 rounded-full mb-4">
            <Scale className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Compare Vehicles</h1>
          <p className="text-muted-foreground">
            {compareList.length > 0 
              ? `Comparing ${compareList.length} vehicles` 
              : "Select cars to compare specs side-by-side"}
          </p>
        </div>

        {compareList.length === 0 ? (
          <div className="text-center py-12">
            <p className="mb-6 text-lg">Add cars to the comparison list to see how they stack up.</p>
            <Link to="/">
              <Button size="lg">Explore Gallery</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-0 hover:bg-transparent">
                    <TableHead className="w-[200px] text-lg font-bold">Spec</TableHead>
                    {compareList.map(car => (
                      <TableHead key={car.id} className="min-w-[250px] align-top pb-8">
                        <div className="flex flex-col items-center gap-4">
                          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10">
                            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => removeFromCompare(car.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg">{car.name}</div>
                            <div className="text-sm text-primary">{car.brand}</div>
                          </div>
                        </div>
                      </TableHead>
                    ))}
                    {compareList.length < 3 && (
                      <TableHead className="align-middle text-center p-8 border-l border-dashed border-white/10">
                        <div className="flex flex-col items-center justify-center opacity-50 h-[200px]">
                          <p className="mb-4">Add another car</p>
                          <Link to="/">
                            <Button variant="outline" size="sm">
                              <ArrowRight className="w-4 h-4 mr-2" /> Browse
                            </Button>
                          </Link>
                        </div>
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-transparent">
                    <TableCell className="font-medium text-muted-foreground">Price</TableCell>
                    {compareList.map(car => (
                      <TableCell key={car.id} className="text-center text-lg">{car.price}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="bg-secondary/20 hover:bg-secondary/30">
                    <TableCell className="font-medium text-muted-foreground">Horsepower</TableCell>
                    {compareList.map(car => (
                      <TableCell key={car.id} className="text-center font-bold text-xl">{car.horsepower}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="hover:bg-transparent">
                    <TableCell className="font-medium text-muted-foreground">Top Speed</TableCell>
                    {compareList.map(car => (
                      <TableCell key={car.id} className="text-center">{car.topSpeed}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="bg-secondary/20 hover:bg-secondary/30">
                    <TableCell className="font-medium text-muted-foreground">0-60 mph</TableCell>
                    {compareList.map(car => (
                      <TableCell key={car.id} className="text-center">{car.acceleration}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="hover:bg-transparent">
                    <TableCell className="font-medium text-muted-foreground">Engine</TableCell>
                    {compareList.map(car => (
                      <TableCell key={car.id} className="text-center">{car.engine}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="bg-secondary/20 hover:bg-secondary/30">
                    <TableCell className="font-medium text-muted-foreground">Differences</TableCell>
                    {compareList.map(car => {
                      const maxHP = Math.max(...compareList.map(c => parseHP(c.horsepower)));
                      const minAcc = Math.min(...compareList.map(c => parseAcc(c.acceleration)));
                      const maxSpeed = Math.max(...compareList.map(c => parseSpeed(c.topSpeed)));
                      
                      const isFastest = parseSpeed(car.topSpeed) === maxSpeed;
                      const isQuickest = parseAcc(car.acceleration) === minAcc;
                      const isMostPowerful = parseHP(car.horsepower) === maxHP;

                      return (
                        <TableCell key={car.id} className="text-center">
                          <div className="flex flex-wrap justify-center gap-2">
                            {isMostPowerful && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">Most Powerful</span>}
                            {isFastest && <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">Highest Top Speed</span>}
                            {isQuickest && <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">Quickest</span>}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Compare;

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 gap-4">
        <h1 className="text-8xl font-black text-primary">404</h1>
        <p className="text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/">
          <Button size="lg">Return to Gallery</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

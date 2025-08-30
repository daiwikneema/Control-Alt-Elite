import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Users, 
  Home, 
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { 
      label: "Overview", 
      href: "/", 
      icon: Home,
      description: "Platform overview" 
    },
    { 
      label: "City Planner", 
      href: "/city-planner", 
      icon: MapPin,
      description: "City-wide dashboard" 
    },
    { 
      label: "Service Partner", 
      href: "/service-partner", 
      icon: Users,
      description: "Job marketplace" 
    },
    { 
      label: "Resident", 
      href: "/resident", 
      icon: BarChart3,
      description: "Personal dashboard" 
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AuraGrid
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={location.pathname === item.href ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex items-center space-x-2 transition-smooth",
                    location.pathname === item.href && "shadow-glow"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
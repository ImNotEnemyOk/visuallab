
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  const [isThemeTransition, setIsThemeTransition] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/video-samples", label: "Video Editing" },
    { path: "/thumbnail-samples", label: "Thumbnails" },
    { path: "/contact", label: "Contact" },
    { path: "/admin-login", label: "Admin" },
  ];

  const toggleTheme = () => {
    setIsThemeTransition(true);
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setTimeout(() => setIsThemeTransition(false), 300);
    }, 150);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button 
            onClick={() => setIsCompanyDialogOpen(true)}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <img 
              src="/lovable-uploads/34523499-decb-4e47-99ed-3f4f030e287e.png" 
              alt="Visual Lab Logo" 
              className="w-8 h-8 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-lg"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Visual Lab
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link text-sm font-medium transition-all duration-300 hover:scale-110 hover:text-transparent hover:bg-gradient-to-r hover:from-primary hover:to-purple-600 hover:bg-clip-text relative ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className={`relative transition-all duration-300 ${isThemeTransition ? 'animate-spin-circular' : ''}`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className={`transition-all duration-300 ${isThemeTransition ? 'animate-spin-circular' : ''}`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Company Details Dialog */}
      <Dialog open={isCompanyDialogOpen} onOpenChange={setIsCompanyDialogOpen}>
        <DialogContent className="max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Visual Lab</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <img 
              src="/lovable-uploads/34523499-decb-4e47-99ed-3f4f030e287e.png" 
              alt="Visual Lab Logo" 
              className="w-16 h-16 mx-auto animate-pulse-slow"
            />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Professional Video Editing Agency</h3>
              <p className="text-muted-foreground">
                We specialize in creating stunning video content and eye-catching thumbnails for content creators, businesses, and agencies worldwide.
              </p>
              <div className="pt-4 space-y-2">
                <p className="text-sm"><strong>Services:</strong></p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Professional Video Editing</li>
                  <li>• Thumbnail Design</li>
                  <li>• Motion Graphics</li>
                  <li>• Color Correction</li>
                  <li>• Audio Enhancement</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}

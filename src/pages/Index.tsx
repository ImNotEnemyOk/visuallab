
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Image, Users } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in', 'animate-zoom-in');
        } else {
          entry.target.classList.remove('animate-fade-in', 'animate-zoom-in');
          entry.target.classList.add('animate-fade-out');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl scroll-animate">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Welcome to
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-gradient">
                {" "}Visual Lab
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              The premier platform for video editors, thumbnail designers, and digital artists 
              to showcase their best work and connect with agencies.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 hover-scale animate-pulse-slow">
                <Link to="/video-samples">View Video Samples</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 hover-scale">
                <Link to="/thumbnail-samples">View Thumbnails</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section with Animated Overlapping Samples */}
      <section className="py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              What We Offer
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive platform designed for creative professionals to showcase their talent
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Video Editing Card */}
            <Card className="group hover-scale relative overflow-hidden scroll-animate">
              <CardContent className="p-6 text-center relative z-10">
                <Play className="h-12 w-12 mx-auto mb-4 text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                <h3 className="text-xl font-semibold mb-2">Video Editing</h3>
                <p className="text-muted-foreground mb-6">
                  Showcase your video editing skills with high-quality samples and professional presentations
                </p>
                
                {/* Overlapping Video Sample Previews */}
                <div className="relative h-32 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full max-w-[200px]">
                      <div className="absolute top-0 left-0 w-16 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded shadow-xl transform rotate-[-8deg] transition-all duration-500 group-hover:rotate-[-15deg] group-hover:scale-125 group-hover:shadow-2xl z-30"></div>
                      <div className="absolute top-2 left-4 w-16 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded shadow-xl transform rotate-[4deg] transition-all duration-500 group-hover:rotate-[12deg] group-hover:scale-125 group-hover:shadow-2xl z-20"></div>
                      <div className="absolute top-4 left-8 w-16 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded shadow-xl transform rotate-[12deg] transition-all duration-500 group-hover:rotate-[20deg] group-hover:scale-125 group-hover:shadow-2xl z-10"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Thumbnail Design Card */}
            <Card className="group hover-scale relative overflow-hidden scroll-animate">
              <CardContent className="p-6 text-center relative z-10">
                <Image className="h-12 w-12 mx-auto mb-4 text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                <h3 className="text-xl font-semibold mb-2">Thumbnail Design</h3>
                <p className="text-muted-foreground mb-6">
                  Display your thumbnail design portfolio with eye-catching visuals and creative concepts
                </p>
                
                {/* Overlapping Thumbnail Sample Previews */}
                <div className="relative h-32 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full max-w-[200px]">
                      <div className="absolute top-0 left-0 w-20 h-14 bg-gradient-to-r from-red-500 to-orange-600 rounded shadow-xl transform rotate-[-6deg] transition-all duration-500 group-hover:rotate-[-12deg] group-hover:scale-125 group-hover:shadow-2xl z-30"></div>
                      <div className="absolute top-1 left-3 w-20 h-14 bg-gradient-to-r from-yellow-500 to-red-600 rounded shadow-xl transform rotate-[6deg] transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-125 group-hover:shadow-2xl z-20"></div>
                      <div className="absolute top-2 left-6 w-20 h-14 bg-gradient-to-r from-pink-500 to-purple-600 rounded shadow-xl transform rotate-[14deg] transition-all duration-500 group-hover:rotate-[25deg] group-hover:scale-125 group-hover:shadow-2xl z-10"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Agency Management Card */}
            <Card className="group hover-scale relative overflow-hidden scroll-animate">
              <CardContent className="p-6 text-center relative z-10">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                <h3 className="text-xl font-semibold mb-2">Agency Management</h3>
                <p className="text-muted-foreground mb-6">
                  Streamlined admin interface for agencies to manage and organize creative submissions
                </p>
                
                {/* Overlapping Management Preview */}
                <div className="relative h-32 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full max-w-[200px]">
                      <div className="absolute top-0 left-2 w-16 h-10 bg-gradient-to-r from-indigo-500 to-blue-600 rounded shadow-xl transform rotate-[-4deg] transition-all duration-500 group-hover:rotate-[-10deg] group-hover:scale-125 group-hover:shadow-2xl z-30"></div>
                      <div className="absolute top-3 left-5 w-16 h-10 bg-gradient-to-r from-teal-500 to-green-600 rounded shadow-xl transform rotate-[8deg] transition-all duration-500 group-hover:rotate-[18deg] group-hover:scale-125 group-hover:shadow-2xl z-20"></div>
                      <div className="absolute top-6 left-8 w-16 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded shadow-xl transform rotate-[16deg] transition-all duration-500 group-hover:rotate-[30deg] group-hover:scale-125 group-hover:shadow-2xl z-10"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="scroll-animate">
              <div className="text-4xl font-bold text-primary mb-2 transition-transform hover:scale-110">0</div>
              <div className="text-muted-foreground">Video Samples</div>
            </div>
            <div className="scroll-animate">
              <div className="text-4xl font-bold text-primary mb-2 transition-transform hover:scale-110">0</div>
              <div className="text-muted-foreground">Thumbnails</div>
            </div>
            <div className="scroll-animate">
              <div className="text-4xl font-bold text-primary mb-2 transition-transform hover:scale-110">0</div>
              <div className="text-muted-foreground">Artists</div>
            </div>
            <div className="scroll-animate">
              <div className="text-4xl font-bold text-primary mb-2 transition-transform hover:scale-110">1</div>
              <div className="text-muted-foreground">Agency</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="scroll-animate">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join Visual Lab and start showcasing your creative work to top agencies worldwide
            </p>
            <Button asChild size="lg" className="text-lg px-8 hover-scale">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

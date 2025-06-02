
import { Card, CardContent } from "@/components/ui/card";
import { Image, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const ThumbnailSamples = () => {
  // Empty samples array - ready for database integration
  const [thumbnailSamples] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    const cards = document.querySelectorAll('.scroll-animate');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleThumbnailClick = (thumbnail) => {
    setSelectedThumbnail(thumbnail);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animate">
          <h1 className="text-4xl font-bold mb-4 animate-pulse-slow">Thumbnail Design Samples</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-slide-up">
            Explore our collection of creative thumbnail designs
          </p>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {thumbnailSamples.length === 0 ? (
            <div className="col-span-full text-center py-20 scroll-animate">
              <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground animate-bounce" />
              <h3 className="text-xl font-semibold mb-2">No Thumbnail Samples</h3>
              <p className="text-muted-foreground">
                Thumbnail samples will appear here once they are uploaded by the admin.
              </p>
            </div>
          ) : (
            thumbnailSamples.map((sample) => (
              <Card 
                key={sample.id} 
                className="overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl hover:rotate-1 group scroll-animate animate-float"
                onClick={() => handleThumbnailClick(sample)}
              >
                <div className="relative">
                  <img
                    src={sample.image}
                    alt={sample.title}
                    className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">{sample.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">by {sample.artist}</p>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{sample.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4 group-hover:text-primary transition-colors" />
                    {sample.views} views
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Thumbnail Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl animate-scale-in">
            {selectedThumbnail && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedThumbnail.title}</DialogTitle>
                  <DialogDescription className="text-base">
                    by {selectedThumbnail.artist}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <img
                    src={selectedThumbnail.image}
                    alt={selectedThumbnail.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {selectedThumbnail.views} views
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedThumbnail.description}
                  </p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ThumbnailSamples;

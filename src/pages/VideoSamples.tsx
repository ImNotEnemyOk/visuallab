import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/supabaseClient";

const VideoSamples = () => {
  const [videoSlots, setVideoSlots] = useState<any[][]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase.storage.from("videos").list();

      if (error) {
        console.error("Supabase fetch error:", error.message);
        return;
      }

      if (!data || data.length === 0) return;

      const videoFiles = data.filter((file) =>
        file.name.endsWith(".mp4") || file.name.endsWith(".webm")
      );

      const samples = videoFiles.map((file, i) => {
        const publicUrl = supabase.storage.from("videos").getPublicUrl(file.name).data.publicUrl;
        return {
          id: file.name,
          title: `Video Sample ${i + 1}`,
          artist: "Admin",
          duration: "1:00",
          views: Math.floor(Math.random() * 1000),
          thumbnail: "https://placehold.co/600x400?text=Video",
          description: "Uploaded via admin panel.",
          url: publicUrl,
        };
      });

      // Group into slots of 3
      const grouped = [];
      for (let i = 0; i < samples.length; i += 3) {
        grouped.push(samples.slice(i, i + 3));
      }

      setVideoSlots(grouped);
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in", "animate-zoom-in");
        } else {
          entry.target.classList.remove("animate-fade-in", "animate-zoom-in");
          entry.target.classList.add("animate-fade-out");
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll(".scroll-animate");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animate">
          <h1 className="text-4xl font-bold md:text-5xl mb-4">
            Video Editing Samples
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our collection of professional video editing samples from
            talented creators
          </p>
        </div>

        {videoSlots.length === 0 ? (
          <div className="col-span-full text-center py-20 scroll-animate">
            <Play className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Video Samples Yet</h3>
            <p className="text-muted-foreground">
              Video samples will appear here once uploaded by the admin.
            </p>
          </div>
        ) : (
          videoSlots.map((slot, slotIndex) => (
            <div key={slotIndex} className="grid md:grid-cols-3 gap-6 mb-8">
              {slot.map((sample) => (
                <Card
                  key={sample.id}
                  className="overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg group scroll-animate"
                  onClick={() => handleVideoClick(sample)}
                >
                  <div className="relative">
                    <img
                      src={sample.thumbnail}
                      alt={sample.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 left-2 flex items-center gap-2 text-white text-sm">
                      <Clock className="h-4 w-4" />
                      {sample.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                      {sample.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      by {sample.artist}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {sample.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      {sample.views} views
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))
        )}

        {/* Video Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            {selectedVideo && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {selectedVideo.title}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    by {selectedVideo.artist}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <video
                    src={selectedVideo.url}
                    controls
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {selectedVideo.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {selectedVideo.views} views
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedVideo.description}
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

export default VideoSamples;

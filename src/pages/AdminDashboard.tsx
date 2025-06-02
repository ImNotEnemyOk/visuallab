import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  BarChart3,
  Users,
  Video,
  Image,
  Plus,
  Settings,
  LogOut,
  Trash2,
  Tag
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabaseClient"; // ✅ make sure you created this file

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const [uploadedThumbnails, setUploadedThumbnails] = useState<string[]>([]);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdminLoggedIn");
    if (adminStatus !== "true") {
      navigate("/admin-login");
    } else {
      setIsLoggedIn(true);
      fetchMedia();
    }
  }, [navigate]);

  const fetchMedia = async () => {
    const { data: videos } = await supabase.storage.from("videos").list();
    const { data: thumbs } = await supabase.storage.from("thumbnails").list();

    if (videos) {
      const videoUrls = videos.map(v =>
        supabase.storage.from("videos").getPublicUrl(v.name).data.publicUrl
      );
      setUploadedVideos(videoUrls);
    }

    if (thumbs) {
      const thumbUrls = thumbs.map(t =>
        supabase.storage.from("thumbnails").getPublicUrl(t.name).data.publicUrl
      );
      setUploadedThumbnails(thumbUrls);
    }
  };

  const uploadVideo = async () => {
    if (!videoFile) return;
    const { data, error } = await supabase.storage
      .from("videos")
      .upload(`video-${Date.now()}`, videoFile);

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Video Uploaded", description: "Video uploaded successfully" });
      setVideoFile(null);
      fetchMedia();
    }
  };

  const uploadThumbnail = async () => {
    if (!thumbnailFile) return;
    const { data, error } = await supabase.storage
      .from("thumbnails")
      .upload(`thumb-${Date.now()}`, thumbnailFile);

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Thumbnail Uploaded", description: "Thumbnail uploaded successfully" });
      setThumbnailFile(null);
      fetchMedia();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    navigate("/admin-login");
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Upload and manage media content</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="videos">
          <TabsList className="mb-6">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="thumbnails">Thumbnails</TabsTrigger>
          </TabsList>

          {/* Video Upload Tab */}
          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <CardTitle>Upload Video</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files?.[0] || null)} />
                <Button onClick={uploadVideo} disabled={!videoFile}>
                  Upload
                </Button>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {uploadedVideos.map((url, idx) => (
                    <video key={idx} controls src={url} className="w-full rounded border" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Thumbnail Upload Tab */}
          <TabsContent value="thumbnails">
            <Card>
              <CardHeader>
                <CardTitle>Upload Thumbnail</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files?.[0] || null)} />
                <Button onClick={uploadThumbnail} disabled={!thumbnailFile}>
                  Upload
                </Button>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {uploadedThumbnails.map((url, idx) => (
                    <img key={idx} src={url} alt={`Thumbnail ${idx}`} className="w-full rounded border" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

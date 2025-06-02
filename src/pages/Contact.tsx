
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";
import { useEffect } from "react";

const Contact = () => {
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

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animate">
          <h1 className="text-4xl font-bold md:text-5xl mb-4">
            Get In Touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions or want to showcase your work? We'd love to hear from you.
          </p>
        </div>

        <div className="flex justify-center max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 scroll-animate">
            <Card className="hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For general inquiries and support
                </p>
                <a
                  href="mailto:visuallab@gmail.com"
                  className="text-primary hover:underline font-medium text-lg"
                >
                  visuallab@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Join Our Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Discord</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    Connect with other creators and get support
                  </p>
                  <a
                    href="https://discord.gg/creativehub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Join Discord Server
                  </a>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Twitter</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    Follow us for updates and featured work
                  </p>
                  <a
                    href="https://twitter.com/creativehub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @creativehub
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle>For Artists</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Ready to showcase your work? Contact us to get started with your portfolio submission.
                </p>
                <Button variant="outline" className="w-full">
                  Submit Your Work
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

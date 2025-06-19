"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function ExtensionGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt for your Chrome extension",
        variant: "destructive",
      });
      return;
    }

    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterAuth", location.pathname + "#free-tier");
      toast({
        title: "Authentication Required",
        description: "Please sign up or log in to generate extensions",
        variant: "destructive",
      });
      navigate("/signup");
      return;
    }

    setIsGenerating(true);
    console.log("Generating extension for prompt:", prompt);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await fetch("http://localhost:5000/api/extensions/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Server error:", errorText);
        throw new Error("Failed to generate extension");
      }

      const { promptId } = await response.json();

      // 🔽 Now get the ZIP file
      const downloadResponse = await fetch(`http://localhost:5000/api/extensions/${promptId}/download`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!downloadResponse.ok) {
        const errorText = await downloadResponse.text();
        console.error("❌ Download error:", errorText);
        throw new Error("Failed to download extension");
      }

      const blob = await downloadResponse.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      toast({
        title: "Success!",
        description: "Your Chrome extension has been generated successfully",
      });
    } catch (error) {
      console.error("Error generating extension:", error);
      toast({
        title: "Error",
        description: "Failed to generate extension. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "chrome-extension.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download Started",
        description: "Your Chrome extension ZIP file is downloading",
      });
    }
  };

  return (
    <section id="free-tier" className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 mx-auto">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Chrome Extension Generator
              </CardTitle>
              <CardDescription className="text-lg">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  FREE TIER
                </span>
                <br />
                Describe your Chrome extension idea and get a downloadable ZIP file
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <label htmlFor="extension-prompt" className="block text-lg font-medium mb-2">
                  Describe your Chrome extension
                </label>
                <Textarea
                  id="extension-prompt"
                  placeholder="Example: Create a password generator extension that creates secure passwords with customizable length and character sets..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none text-lg placeholder:text-base sm:placeholder:text-lg"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-7 px-8 text-2xl font-bold rounded-xl transition-all duration-300 bg-primary text-white hover:bg-primary/90"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Extension
                    </>
                  )}
                </Button>

                {downloadUrl && (
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="lg"
                    className="flex-1 sm:flex-none py-4 h-16 text-lg sm:text-xl"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download ZIP
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

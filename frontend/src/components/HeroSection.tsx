"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Download, Code, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  const scrollToGenerator = () => {
    const element = document.getElementById('free-tier');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
       <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
  <span className="block bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 bg-clip-text text-transparent">
    PROMPT.
  </span>
  <span className="block bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300 bg-clip-text text-transparent">
    GENERATE.
  </span>
  <span className="block bg-gradient-to-r from-purple-600 via-purple-400 to-purple-200 bg-clip-text text-transparent">
    AUTOMATE.
  </span>
</h1>

          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto"
          >
            Transform your ideas into powerful Chrome extensions and AI-driven automation workflows. 
            No coding required - just describe what you want and let AI build it for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="text-lg px-8 py-3" onClick={scrollToGenerator}>
              Start Building <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 rounded-lg bg-card border border-border/50">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Chrome Extensions</h3>
            <p className="text-foreground/70 text-base font medium">Generate production-ready Chrome extensions instantly</p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-card border border-border/50">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Workflow className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Workflows</h3>
            <p className="text-foreground/70 text-base font medium">Create complex automation workflows with n8n integration</p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-card border border-border/50">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Code Required</h3>
            <p className="text-foreground/70 text-base font medium">Just describe your idea and watch it come to life</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

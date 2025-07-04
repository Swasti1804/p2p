
import { HeroSection } from "@/components/HeroSection";
import { ExtensionGenerator } from "@/components/ExtensionGenerator";
import { AIAgentGenerator } from "@/components/AIgentGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ExtensionGenerator />
      <AIAgentGenerator />
    </div>
  );
};

export default Index;

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Hero from "@/components/Hero";
import LogoForm, { FormData } from "@/components/LogoForm";
import LoadingState from "@/components/LoadingState";
import LogoResults from "@/components/LogoResults";

const Index = () => {
  const [logos, setLogos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);
  const { toast } = useToast();

  const generatePrompt = (formData: FormData, variation: number = 0) => {
    const { brandName, tagline, style, colorTheme } = formData;
    
    const styleDescriptions: Record<string, string> = {
      modern: "sleek, contemporary, clean lines",
      minimal: "minimalist, simple, elegant",
      vintage: "retro, classic, nostalgic",
      playful: "fun, creative, whimsical",
      tech: "futuristic, digital, innovative",
      luxury: "premium, sophisticated, elegant",
      nature: "organic, natural, earthy",
      retro: "80s style, bold, geometric",
    };

    const colorDescriptions: Record<string, string> = {
      blue: "blue color palette",
      purple: "purple and violet tones",
      green: "green and natural colors",
      red: "red and energetic colors",
      orange: "orange and warm tones",
      black: "monochrome black and white",
      gold: "gold and luxury tones",
      multicolor: "vibrant multicolor palette",
    };

    const variationTexts = [
      "professional and balanced",
      "bold and striking",
      "subtle and refined",
      "creative and unique",
    ];

    return `Professional logo design for "${brandName}"${
      tagline ? ` with tagline "${tagline}"` : ""
    }. Style: ${styleDescriptions[style] || style}. ${
      colorDescriptions[colorTheme] || colorTheme
    }. ${variationTexts[variation % 4]}. Vector style, flat design, high quality, simple background, centered composition, suitable for branding.`;
  };

  const generateLogos = async (formData: FormData) => {
    setIsLoading(true);
    setCurrentFormData(formData);
    setLogos([]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-logo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            prompts: [
              generatePrompt(formData, 0),
              generatePrompt(formData, 1),
              generatePrompt(formData, 2),
              generatePrompt(formData, 3),
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate logos");
      }

      const data = await response.json();
      setLogos(data.logos);
      
      toast({
        title: "Logos Generated!",
        description: "Your custom logos are ready to download.",
      });
    } catch (error) {
      console.error("Error generating logos:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate logos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateSingle = async (index: number) => {
    if (!currentFormData) return;
    
    setRegeneratingIndex(index);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-logo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            prompts: [generatePrompt(currentFormData, Math.floor(Math.random() * 10))],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to regenerate logo");
      }

      const data = await response.json();
      const newLogos = [...logos];
      newLogos[index] = data.logos[0];
      setLogos(newLogos);
      
      toast({
        title: "Logo Regenerated!",
        description: "New variation created successfully.",
      });
    } catch (error) {
      console.error("Error regenerating logo:", error);
      toast({
        title: "Regeneration Failed",
        description: "Failed to regenerate logo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRegeneratingIndex(null);
    }
  };

  const handleRegenerateAll = () => {
    if (currentFormData) {
      generateLogos(currentFormData);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <LogoForm onGenerate={generateLogos} isLoading={isLoading} />
      
      {isLoading && <LoadingState />}
      
      {!isLoading && logos.length > 0 && (
        <LogoResults
          logos={logos}
          onRegenerateAll={handleRegenerateAll}
          onRegenerateSingle={handleRegenerateSingle}
          isRegenerating={isLoading}
          regeneratingIndex={regeneratingIndex}
        />
      )}
    </div>
  );
};

export default Index;

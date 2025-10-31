import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LogoCardProps {
  imageUrl: string;
  index: number;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

const LogoCard = ({ imageUrl, index, onRegenerate, isRegenerating }: LogoCardProps) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `logo-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading logo:', error);
    }
  };

  return (
    <Card className="group overflow-hidden bg-card border border-border/50 shadow-card hover:shadow-soft transition-all duration-300 animate-fade-in">
      <div className="aspect-square bg-muted/30 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={`Generated logo ${index + 1}`}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 space-y-2">
        <Button
          onClick={handleDownload}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        
        <Button
          onClick={onRegenerate}
          disabled={isRegenerating}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
          {isRegenerating ? 'Regenerating...' : 'Regenerate Similar'}
        </Button>
      </div>
    </Card>
  );
};

export default LogoCard;

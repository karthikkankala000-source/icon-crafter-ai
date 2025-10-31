import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoCard from "./LogoCard";

interface LogoResultsProps {
  logos: string[];
  onRegenerateAll: () => void;
  onRegenerateSingle: (index: number) => void;
  isRegenerating: boolean;
  regeneratingIndex: number | null;
}

const LogoResults = ({
  logos,
  onRegenerateAll,
  onRegenerateSingle,
  isRegenerating,
  regeneratingIndex,
}: LogoResultsProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            Your Generated Logos
          </h2>
          <p className="text-muted-foreground">
            Choose your favorite or regenerate for more options
          </p>
        </div>
        
        <Button
          onClick={onRegenerateAll}
          disabled={isRegenerating}
          variant="outline"
          className="bg-card hover:bg-accent-warm hover:text-accent-warm-foreground transition-colors"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
          Regenerate All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {logos.map((logo, index) => (
          <LogoCard
            key={index}
            imageUrl={logo}
            index={index}
            onRegenerate={() => onRegenerateSingle(index)}
            isRegenerating={regeneratingIndex === index}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoResults;

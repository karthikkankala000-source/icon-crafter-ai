import { Loader2, Sparkles } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-20 animate-pulse-soft"></div>
          <div className="relative bg-gradient-primary p-6 rounded-full">
            <Sparkles className="w-12 h-12 text-primary-foreground animate-spin-slow" />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="font-display text-2xl font-bold text-foreground">
            Creating Your Logos
          </h3>
          <p className="text-muted-foreground">
            Our AI is crafting unique designs just for you...
          </p>
        </div>
        
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full animate-pulse-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;

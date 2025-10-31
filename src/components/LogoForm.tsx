import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";

const LOGO_STYLES = [
  { value: "modern", label: "Modern" },
  { value: "minimal", label: "Minimal" },
  { value: "vintage", label: "Vintage" },
  { value: "playful", label: "Playful" },
  { value: "tech", label: "Tech" },
  { value: "luxury", label: "Luxury" },
  { value: "nature", label: "Nature" },
  { value: "retro", label: "Retro" },
];

const COLOR_THEMES = [
  { value: "blue", label: "Blue", hex: "#0EA5E9" },
  { value: "purple", label: "Purple", hex: "#A855F7" },
  { value: "green", label: "Green", hex: "#22C55E" },
  { value: "red", label: "Red", hex: "#EF4444" },
  { value: "orange", label: "Orange", hex: "#F97316" },
  { value: "black", label: "Black & White", hex: "#000000" },
  { value: "gold", label: "Gold", hex: "#F59E0B" },
  { value: "multicolor", label: "Multi-color", hex: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
];

interface LogoFormProps {
  onGenerate: (formData: FormData) => void;
  isLoading: boolean;
}

export interface FormData {
  brandName: string;
  tagline: string;
  style: string;
  colorTheme: string;
}

const LogoForm = ({ onGenerate, isLoading }: LogoFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    brandName: "",
    tagline: "",
    style: "modern",
    colorTheme: "blue",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.brandName.trim()) {
      onGenerate(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 -mt-8 relative z-10">
      <div className="bg-card rounded-2xl shadow-card border border-border/50 p-6 sm:p-8 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="brandName" className="text-base font-semibold">
              Brand Name *
            </Label>
            <Input
              id="brandName"
              placeholder="Enter your brand or business name"
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              required
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline" className="text-base font-semibold">
              Tagline <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="tagline"
              placeholder="Your company tagline or slogan"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="h-12 text-base"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="style" className="text-base font-semibold">
                Logo Style
              </Label>
              <Select
                value={formData.style}
                onValueChange={(value) => setFormData({ ...formData, style: value })}
              >
                <SelectTrigger id="style" className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LOGO_STYLES.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colorTheme" className="text-base font-semibold">
                Color Theme
              </Label>
              <Select
                value={formData.colorTheme}
                onValueChange={(value) => setFormData({ ...formData, colorTheme: value })}
              >
                <SelectTrigger id="colorTheme" className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_THEMES.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ background: color.hex }}
                        />
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !formData.brandName.trim()}
            className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin-slow" />
                Generating Your Logos...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Logos
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LogoForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Music, Film, Tv, Sparkles, Book, Gamepad2, Mic } from "lucide-react";
import { toast } from "sonner";

const Welcome = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const contentTypes = [
    { id: "music", label: "Music", icon: Music },
    { id: "movies", label: "Movies", icon: Film },
    { id: "anime", label: "Anime", icon: Tv },
    { id: "books", label: "Books", icon: Book },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "podcasts", label: "Podcasts", icon: Mic },
  ];

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTypes.length === contentTypes.length) {
      setSelectedTypes([]);
    } else {
      setSelectedTypes(contentTypes.map(t => t.id));
    }
  };

  const handleContinue = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (selectedTypes.length === 0) {
      toast.error("Please select at least one content type");
      return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("contentPreferences", JSON.stringify(selectedTypes));
    
    toast.success(`Welcome, ${name}! Next, show us how many recommendations you want.`);
    navigate("/finger-count");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full p-8 bg-card/50 backdrop-blur-sm border-primary/20 shadow-glow">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-10 h-10 text-primary animate-float" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                MoodTune
              </h1>
              <Sparkles className="w-10 h-10 text-accent animate-float" />
            </div>
            <p className="text-xl text-foreground">
              Your AI-Powered Mood Detective
            </p>
            <p className="text-sm text-muted-foreground">
              Get personalized recommendations based on your facial expressions
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="name" className="text-lg font-semibold">
              What's your name?
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 text-lg bg-background/50 border-border focus:border-primary"
              maxLength={50}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">
                What would you like recommendations for?
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                className="text-xs"
              >
                {selectedTypes.length === contentTypes.length ? "Deselect All" : "Select All"}
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedTypes.includes(type.id);
                
                return (
                  <Card
                    key={type.id}
                    className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                      isSelected 
                        ? "bg-primary/10 border-primary shadow-glow" 
                        : "bg-card border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleTypeToggle(type.id)}
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleTypeToggle(type.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-semibold text-lg">{type.label}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <Button
            onClick={handleContinue}
            size="lg"
            className="w-full h-14 text-lg bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 transition-all"
          >
            Continue to MoodTune
          </Button>

          <div className="text-center space-y-2 pt-4">
            <p className="text-sm text-muted-foreground">
             By-Abhishek Samal
            </p>
            <p className="text-sm text-muted-foreground/70">
              
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Welcome;

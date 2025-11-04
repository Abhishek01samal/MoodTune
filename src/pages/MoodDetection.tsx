import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Music, Film, Tv, Book, Gamepad2, Mic, RefreshCw, ArrowLeft, Upload, History, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { StarRating } from "@/components/StarRating";
import { supabase } from "@/integrations/supabase/client";
import { 
  type Mood, 
  moodEmojis, 
  musicRecommendations, 
  movieRecommendations, 
  animeRecommendations,
  bookRecommendations,
  gameRecommendations,
  podcastRecommendations,
  type Recommendation 
} from "@/data/recommendations";

interface HistoryEntry {
  mood: Mood;
  timestamp: string;
  imageUrl: string;
}

const MoodDetection = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [contentPreferences, setContentPreferences] = useState<string[]>([]);
  const recommendationCount = 5;
  const [mood, setMood] = useState<Mood>("neutral");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [currentRecs, setCurrentRecs] = useState<Record<string, Recommendation[]>>({});
  const [countdown, setCountdown] = useState<number | null>(null);
  const [usedRecs, setUsedRecs] = useState<Record<string, Set<string>>>({});
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const captureIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const prefs = JSON.parse(localStorage.getItem("contentPreferences") || "[]");
    const savedHistory = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    
    if (!name) navigate("/");
    setUserName(name || "");
    setContentPreferences(prefs);
    setHistory(savedHistory);
    
    initFaceLandmarker();
    shuffleAll("neutral");
  }, [navigate]);

  const initFaceLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "GPU"
      },
      outputFaceBlendshapes: true,
      runningMode: "IMAGE",
      numFaces: 1
    });
  };

  const getRandomRecs = (recs: Recommendation[], count: number, category: string) => {
    const availableRecs = recs.filter(rec => !usedRecs[category]?.has(rec.title));
    if (availableRecs.length < count) {
      setUsedRecs(prev => ({ ...prev, [category]: new Set() }));
      return recs.sort(() => 0.5 - Math.random()).slice(0, count);
    }
    const selected = availableRecs.sort(() => 0.5 - Math.random()).slice(0, count);
    setUsedRecs(prev => ({
      ...prev,
      [category]: new Set([...(prev[category] || []), ...selected.map(r => r.title)])
    }));
    return selected;
  };

  const shuffleAll = (currentMood: Mood) => {
    setCurrentRecs({
      music: getRandomRecs(musicRecommendations[currentMood], recommendationCount, 'music'),
      movies: getRandomRecs(movieRecommendations[currentMood], recommendationCount, 'movies'),
      anime: getRandomRecs(animeRecommendations[currentMood], recommendationCount, 'anime'),
      books: getRandomRecs(bookRecommendations[currentMood], recommendationCount, 'books'),
      games: getRandomRecs(gameRecommendations[currentMood], recommendationCount, 'games'),
      podcasts: getRandomRecs(podcastRecommendations[currentMood], recommendationCount, 'podcasts'),
    });
  };

  const addToHistory = (detectedMood: Mood, imageUrl: string) => {
    const newEntry: HistoryEntry = {
      mood: detectedMood,
      timestamp: new Date().toISOString(),
      imageUrl
    };
    setHistory(prev => {
      const updated = [newEntry, ...prev].slice(0, 10);
      localStorage.setItem("moodHistory", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem("moodHistory");
    setHistory([]);
    toast.success("History cleared!");
  };

  const startCamera = async () => {
    if (!videoRef.current) return;
    stopCamera();
    setCapturedImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
      videoRef.current.onloadedmetadata = () => {
        startAutoCaptureLoop();
      };
    } catch (error) {
      console.error("Camera error:", error);
      toast.error("Failed to start camera. Please allow camera access.");
    }
  };

  const startAutoCaptureLoop = () => {
    toast.success("Camera ready! Auto-capturing every 5 seconds...");
    const captureLoop = async () => {
      setCountdown(5);
      let count = 5;
      await new Promise<void>((resolve) => {
        const countdownInterval = setInterval(() => {
          count--;
          setCountdown(count);
          if (count === 0) {
            clearInterval(countdownInterval);
            setCountdown(null);
            resolve();
          }
        }, 1000);
      });
      await captureImage();
      if (isCameraActive) {
        captureIntervalRef.current = setTimeout(captureLoop, 500);
      }
    };
    captureLoop();
  };

  const captureImage = async (isManual: boolean = false) => {
    if (!videoRef.current || !canvasRef.current || !isCameraActive || isCapturing) return;
    setIsCapturing(true);
    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setIsProcessing(false);
      setIsCapturing(false);
      return;
    }

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);
    const base64Image = canvas.toDataURL("image/jpeg");
    setCapturedImage(base64Image);

    toast.info("Analyzing your expression with AI...");

    try {
      const { data, error } = await supabase.functions.invoke('analyze-mood', {
        body: { imageUrl: base64Image }
      });

      if (error) {
        console.error("Error analyzing mood:", error);
        toast.error("Failed to analyze mood. Please try again.");
        setIsProcessing(false);
        setIsCapturing(false);
        return;
      }

      if (data?.mood) {
        const detectedMood = data.mood as Mood;
        setMood(detectedMood);
        shuffleAll(detectedMood);
        addToHistory(detectedMood, base64Image);
        toast.success(`AI detected: ${detectedMood} ${moodEmojis[detectedMood]}`);

        setTimeout(() => {
          const recSection = document.getElementById("recommendations-section");
          if (recSection) recSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1000);
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze expression");
    }
    
    setIsProcessing(false);
    setIsCapturing(false);
    if (!isManual) {
      setTimeout(() => setCapturedImage(null), 2000);
    }
  };

  const stopCamera = () => {
    if (captureIntervalRef.current) {
      clearTimeout(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setCountdown(null);
  };

  const handleManualCapture = () => {
    if (captureIntervalRef.current) {
      clearTimeout(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
    captureImage(true);
  };

  const handleDeleteImage = () => {
    setCapturedImage(null);
    toast.info("Image deleted");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (captureIntervalRef.current) {
      clearTimeout(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }

    setIsProcessing(true);
    toast.info("Analyzing your photo...");
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        setCapturedImage(base64Image);
        const { data, error } = await supabase.functions.invoke('analyze-mood', {
          body: { imageUrl: base64Image }
        });

        if (error) {
          console.error("Error analyzing mood:", error);
          toast.error("Failed to analyze mood. Please try again.");
          setIsProcessing(false);
          return;
        }

        if (data?.mood) {
          const detectedMood = data.mood as Mood;
          setMood(detectedMood);
          shuffleAll(detectedMood);
          addToHistory(detectedMood, base64Image);
          toast.success(`AI detected: ${detectedMood} ${moodEmojis[detectedMood]}`);

          setTimeout(() => {
            const recSection = document.getElementById("recommendations-section");
            if (recSection) recSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 1000);
        }
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
      setIsProcessing(false);
    }
    if (e.target) e.target.value = '';
  };

  const handleManualMoodSelect = (selectedMood: Mood) => {
    setMood(selectedMood);
    shuffleAll(selectedMood);
    toast.success(`Mood set to: ${selectedMood} ${moodEmojis[selectedMood]}`);
    setTimeout(() => {
      const recSection = document.getElementById("recommendations-section");
      if (recSection) recSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  };

  const categories = [
    { id: "music", label: "Music", icon: Music, data: currentRecs.music },
    { id: "movies", label: "Movies", icon: Film, data: currentRecs.movies },
    { id: "anime", label: "Anime", icon: Tv, data: currentRecs.anime },
    { id: "books", label: "Books", icon: Book, data: currentRecs.books },
    { id: "games", label: "Games", icon: Gamepad2, data: currentRecs.games },
    { id: "podcasts", label: "Podcasts", icon: Mic, data: currentRecs.podcasts },
  ].filter(cat => contentPreferences.includes(cat.id));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/")}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Hey {userName}! 👋
          </h1>
          <Button onClick={() => shuffleAll(mood)} variant="secondary"><RefreshCw className="w-4 h-4 mr-2" /> Shuffle</Button>
        </header>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-glow">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2"><Camera className="w-6 h-6 text-primary" /> Mood Detection</h2>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2">
                {!isCameraActive ? (
                  <Button onClick={startCamera} className="bg-primary hover:bg-primary/90">
                    <Camera className="w-4 h-4 mr-2" /> Start Camera
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleManualCapture} disabled={isProcessing || isCapturing} className="bg-accent hover:bg-accent/90">
                      <Camera className="w-4 h-4 mr-2" /> Capture Now
                    </Button>
                    <Button onClick={stopCamera} variant="destructive">Stop Camera</Button>
                  </>
                )}
              </div>
              
              <Button 
                onClick={() => fileInputRef.current?.click()} 
                disabled={isProcessing}
                variant="outline"
                className="border-primary/50"
              >
                <Upload className="w-4 h-4 mr-2" /> Upload Photo
              </Button>
            </div>

            <div className="relative aspect-video bg-muted/30 rounded-lg overflow-hidden">
              {capturedImage ? (
                <>
                  <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                  <Button 
                    onClick={handleDeleteImage}
                    variant="destructive"
                    size="icon"
                    className="absolute top-4 right-4"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <div className="absolute bottom-4 left-4 bg-primary/90 px-6 py-3 rounded-lg">
                    <p className="text-3xl font-bold text-primary-foreground">{moodEmojis[mood]} {mood}</p>
                  </div>
                </>
              ) : (
                <>
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  {countdown !== null && isCameraActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                      <p className="text-8xl font-bold text-primary">{countdown}</p>
                    </div>
                  )}
                </>
              )}
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
              className="hidden" 
            />

            <div className="pt-4 border-t border-primary/20">
              <h3 className="text-lg font-semibold mb-3">Or select your mood manually:</h3>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(moodEmojis) as Mood[]).map((moodOption) => (
                  <Button
                    key={moodOption}
                    onClick={() => handleManualMoodSelect(moodOption)}
                    variant={mood === moodOption ? "default" : "outline"}
                    className="capitalize"
                  >
                    {moodEmojis[moodOption]} {moodOption}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {history.length > 0 && (
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-glow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Recent History</h2>
              </div>
              {/* ✅ Clear History Button */}
              <Button
                onClick={clearHistory}
                variant="outline"
                size="sm"
                className="text-sm border-primary/50 hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Clear History
              </Button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {history.map((entry, idx) => (
                <div key={idx} className="flex-shrink-0">
                  <Card className="p-2 bg-card/30 border-primary/10 w-24">
                    <img src={entry.imageUrl} alt="History" className="w-full aspect-square object-cover rounded mb-1" />
                    <p className="text-xs text-center">{moodEmojis[entry.mood]} {entry.mood}</p>
                    <p className="text-xs text-muted-foreground text-center">{new Date(entry.timestamp).toLocaleTimeString()}</p>
                  </Card>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div id="recommendations-section" className="grid gap-6 md:grid-cols-1">
          {categories.map(({ id, label, icon: Icon, data }) => (
            <Card key={id} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all shadow-lg">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-primary/20">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{label}</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {data?.map((rec, idx) => (
                  <a 
                    key={idx} 
                    href={rec.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block group"
                  >
                    <Card className="p-3 hover:shadow-glow transition-all border-primary/10 hover:border-primary/30 bg-card/30 aspect-[3/4] flex flex-col">
                      <div className="relative flex-1 mb-3">
                        <img 
                          src={rec.image} 
                          alt={rec.title} 
                          className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="space-y-1.5">
                        <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {rec.title}
                        </p>
                        <StarRating rating={rec.rating} />
                        {rec.platform && (
                          <p className="text-xs text-muted-foreground">Watch on {rec.platform}</p>
                        )}
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodDetection;

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera as CameraIcon, Hand, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// ✅ Circular progress component
const ProgressCircle = ({ progress, size = 100, strokeWidth = 6, color = "#22c55e" }: { progress: number; size?: number; strokeWidth?: number; color?: string }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <svg width={size} height={size}>
      <circle
        stroke="#ffffff33"
        fill="none"
        strokeWidth={strokeWidth}
        cx={size / 2}
        cy={size / 2}
        r={radius}
      />
      <circle
        stroke={color}
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        style={{ transition: "stroke-dashoffset 0.1s linear" }}
      />
    </svg>
  );
};

declare global {
  interface Window {
    Camera: any;
    drawConnectors: any;
    drawLandmarks: any;
    HAND_CONNECTIONS: any;
  }
}

const FingerCount = () => {
  const navigate = useNavigate();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [detectedFingers, setDetectedFingers] = useState<number | null>(null);
  const [liveFingerCount, setLiveFingerCount] = useState<number>(0);
  const [stableCount, setStableCount] = useState<number>(0);
  const [autoTimerActive, setAutoTimerActive] = useState(false);
  const [autoProgress, setAutoProgress] = useState(0);
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const handsRef = useRef<any | null>(null);
  const cameraRef = useRef<any | null>(null);
  const previousCountRef = useRef<number>(0);

  // Use browser-safe timeout type
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (!userName) navigate("/");
    return () => {
      // no need to await here; cleanup on unmount
      stopCamera();
    };
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (liveFingerCount === previousCountRef.current) setStableCount(liveFingerCount);
      previousCountRef.current = liveFingerCount;
    }, 200);
    return () => clearInterval(timer);
  }, [liveFingerCount]);

  // 🖐 Handle steady count detection and fist logic
  useEffect(() => {
    // ✊ Fist → start Mood Detection loading
    if (stableCount === 0 && detectedFingers !== null && !loadingNext) {
      startNextLoading();
      return;
    }

    // ✋ If showing any other count while loading, cancel the loading
    if (stableCount > 0 && loadingNext) {
      cancelNextLoading();
    }

    // 👆 Auto-confirm normal counts (1–5)
    if (stableCount > 0 && stableCount <= 5) {
      if (!autoTimerActive || stableCount !== detectedFingers) {
        if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
        setAutoTimerActive(true);
        setAutoProgress(0);

        let progress = 0;
        const interval = setInterval(() => {
          progress += 2;
          setAutoProgress(progress);
        }, 100);

        autoTimerRef.current = setTimeout(() => {
          clearInterval(interval);
          handleAutoConfirm(stableCount);
        }, 5000);
      }
    } else {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      setAutoTimerActive(false);
      setAutoProgress(0);
    }
  }, [stableCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAutoConfirm = (count: number) => {
    setDetectedFingers(count);
    localStorage.setItem("recommendationCount", count.toString());
    toast.success(`Confirmed ${count} finger${count !== 1 ? "s" : ""}! 🎯`);
    setAutoTimerActive(false);
    setAutoProgress(100);
  };

  // ✊ Start the Mood Detection 5s loading
  const startNextLoading = () => {
    if (loadingNext) return;
    setLoadingNext(true);
    setLoadingProgress(0);
    toast.info("Fist detected — preparing Mood Detection...", { duration: 2000 });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setLoadingProgress(progress);
    }, 100);

    nextTimerRef.current = setTimeout(() => {
      clearInterval(interval);
      handleContinue();
    }, 5000);
  };

  const cancelNextLoading = () => {
    if (loadingNext) {
      console.log("🛑 Cancelled mood detection loading — hand changed.");
      setLoadingNext(false);
      setLoadingProgress(0);
      if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
      nextTimerRef.current = null;
    }
  };

  const startCamera = async () => {
    if (!videoRef.current) return;
    setIsCameraActive(true);
    toast.success("Camera ready! Show your fingers.");

    const hands = await import("@mediapipe/hands");
    handsRef.current = new hands.Hands({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    handsRef.current.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    handsRef.current.onResults((results: any) => {
      if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
        setLiveFingerCount(0);
        cancelNextLoading();
        return;
      }

      const landmarks = results.multiHandLandmarks[0];
      const count = countFingers(landmarks);
      setLiveFingerCount(count);
      drawHand(landmarks);

      // if we were loading for next and user shows non-fist, cancel
      if (count !== 0 && loadingNext) cancelNextLoading();
    });

    // cameraRef.current is the MediaPipe Camera helper (uses navigator.mediaDevices)
    cameraRef.current = new window.Camera(videoRef.current, {
      onFrame: async () => {
        if (handsRef.current) await handsRef.current.send({ image: videoRef.current });
      },
      width: 1280,
      height: 720,
    });

    cameraRef.current.start();
  };

  const countFingers = (landmarks: any[]): number => {
    if (!landmarks || landmarks.length === 0) return 0;
    let count = 0;
    const isRightHand = landmarks[17].x < landmarks[5].x;
    const thumbExtended = isRightHand
      ? landmarks[4].x > landmarks[3].x
      : landmarks[4].x < landmarks[3].x;
    if (thumbExtended) count++;
    const tips = [8, 12, 16, 20];
    const pip = [6, 10, 14, 18];
    for (let i = 0; i < tips.length; i++) {
      if (landmarks[tips[i]].y < landmarks[pip[i]].y) count++;
    }
    return Math.min(Math.max(count, 0), 5);
  };

  const drawHand = (landmarks: any[]) => {
    if (!overlayRef.current || !videoRef.current) return;
    const ctx = overlayRef.current.getContext("2d");
    if (!ctx) return;
    overlayRef.current.width = videoRef.current.videoWidth;
    overlayRef.current.height = videoRef.current.videoHeight;
    ctx.clearRect(0, 0, overlayRef.current.width, overlayRef.current.height);
    window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, {
      color: "#a855f7",
      lineWidth: 4,
    });
    window.drawLandmarks(ctx, landmarks, { color: "#ec4899", lineWidth: 2 });
  };

  // ✅ Fixed: Stop camera cleanly before navigating
  const stopCamera = async () => {
    try {
      if (cameraRef.current?.stop) {
        // MediaPipe Camera.stop may be synchronous or return a promise; handle both
        const res = cameraRef.current.stop();
        // if stop returned a promise, await it
        if (res && typeof res.then === "function") await res;
        cameraRef.current = null;
      }

      if (handsRef.current?.close) {
        const res = handsRef.current.close();
        if (res && typeof res.then === "function") await res;
        handsRef.current = null;
      }

      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }

      setIsCameraActive(false);
      setAutoTimerActive(false);
      setLoadingNext(false);
      setLoadingProgress(0);

      if (autoTimerRef.current) {
        clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
      if (nextTimerRef.current) {
        clearTimeout(nextTimerRef.current);
        nextTimerRef.current = null;
      }

      console.log("✅ Camera stopped cleanly before navigation.");
    } catch (err) {
      console.error("Error stopping camera:", err);
    }
  };

  // ✅ Fixed: Wait for camera stop before navigating (prevents black screen)
  const handleContinue = async () => {
    toast.success("🌈 Mood Detection starting...");

    // Keep loading overlay visible
    setLoadingNext(true);
    setLoadingProgress(100);

    // Wait for camera cleanup
    await stopCamera();

    // small delay for smooth transition
    setTimeout(() => {
      navigate("/app");
    }, 500);
  };

  const handleManualSelect = (count: number) => {
    setDetectedFingers(count);
    localStorage.setItem("recommendationCount", count.toString());
    toast.success(`Set to ${count} recommendation${count !== 1 ? "s" : ""}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background flex items-center justify-center p-6">
      <Card className="max-w-4xl w-full p-8 bg-card/50 backdrop-blur-sm border-primary/20 shadow-glow space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => { stopCamera(); navigate("/"); }} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </div>

        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Hand className="w-10 h-10 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Show Your Fingers
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Hold steady for 5s to confirm. Make a fist to start Mood Detection.
          </p>
        </div>

        <div className="flex justify-center gap-2">
          {!isCameraActive ? (
            <Button onClick={startCamera} size="lg" className="bg-primary hover:bg-primary/90">
              <CameraIcon className="w-5 h-5 mr-2" /> Start Camera
            </Button>
          ) : (
            <Button onClick={stopCamera} variant="secondary" size="lg">
              Stop Camera
            </Button>
          )}
        </div>

        <div className="relative aspect-video bg-muted/30 rounded-lg overflow-hidden border-2 border-border">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <canvas ref={overlayRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

          {/* Live Detection */}
          {isCameraActive && stableCount > 0 && (
            <div className="absolute top-4 left-4 bg-accent/90 px-6 py-4 rounded-lg border-2 border-accent shadow-glow flex flex-col items-center">
              <p className="text-xs text-white/80">Live Detection</p>
              <p className="text-5xl font-bold text-white flex items-center gap-2">
                {stableCount} {Array.from({ length: stableCount }).map(() => "👆").join("")}
              </p>
              {autoTimerActive && (
                <div className="mt-2">
                  <ProgressCircle progress={autoProgress} color="#fff" />
                </div>
              )}
            </div>
          )}

          {/* Mood Detection Loading */}
          {loadingNext && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 transition-all duration-500">
              <ProgressCircle progress={loadingProgress} size={100} color="#22c55e" />
              <p className="text-white text-2xl font-semibold animate-pulse">
                Mood Detection Next...
              </p>
            </div>
          )}

          {/* Confirmed Count */}
          {detectedFingers !== null && (
            <div className="absolute top-4 right-4 bg-primary/90 px-6 py-4 rounded-lg border-2 border-primary shadow-glow">
              <p className="text-sm text-white/80">Confirmed</p>
              <p className="text-4xl font-bold text-white flex items-center gap-2">{detectedFingers} ✓</p>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Or manually select number of recommendations:
        </p>
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={detectedFingers === num ? "default" : "outline"}
              onClick={() => handleManualSelect(num)}
              className="text-2xl h-16"
            >
              {num}
            </Button>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          disabled={detectedFingers === null}
          size="lg"
          className="w-full h-14 text-lg bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 mt-4"
        >
          Continue to Mood Detection <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Card>
    </div>
  );
};

export default FingerCount;

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera as CameraIcon, Hand, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

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
  const [countdown, setCountdown] = useState<number | null>(null);
  const [fistCountdown, setFistCountdown] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const handsRef = useRef<any | null>(null);
  const cameraRef = useRef<any | null>(null);
  const previousCountRef = useRef<number>(0);

  // Timer references
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fistCountdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ✅ Load MediaPipe scripts
  useEffect(() => {
    const loadScripts = async () => {
      const scripts = [
        "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
        "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js",
        "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
      ];
      for (const src of scripts) {
        if (!document.querySelector(`script[src='${src}']`)) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(`Failed to load ${src}`);
            document.body.appendChild(script);
          });
        }
      }
      console.log("✅ MediaPipe scripts loaded");
    };
    loadScripts();
  }, []);

  // 🧹 Stop camera on unmount
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (!userName) navigate("/");
    return () => stopCamera();
  }, [navigate]);

  // 🔁 Stable finger detection logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (liveFingerCount === previousCountRef.current) {
        setStableCount(liveFingerCount);
      }
      previousCountRef.current = liveFingerCount;
    }, 200);
    return () => clearInterval(timer);
  }, [liveFingerCount]);

  // 🧠 Handle finger logic
  useEffect(() => {
    if (stableCount === 0 && detectedFingers !== null) {
      startFistCountdown(); // Start countdown for next page
      return;
    }

    if (stableCount > 0 && stableCount <= 5) {
      startSmoothCountdown(stableCount); // Normal finger countdown
    } else {
      resetCountdowns();
    }
  }, [stableCount]); // eslint-disable-line react-hooks/exhaustive-deps

  // 👉 Normal finger countdown
  const startSmoothCountdown = (count: number) => {
    if (countdownIntervalRef.current && detectedFingers === count) return;

    resetCountdowns();
    let timeLeft = 5;
    setCountdown(timeLeft);

    countdownIntervalRef.current = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft > 0) {
        setCountdown(timeLeft);
      } else {
        clearInterval(countdownIntervalRef.current!);
        countdownIntervalRef.current = null;
        handleAutoConfirm(count);
      }
    }, 1000);
  };

  const handleAutoConfirm = (count: number) => {
    setDetectedFingers(count);
    localStorage.setItem("recommendationCount", count.toString());
    toast.success(`Confirmed ${count} finger${count !== 1 ? "s" : ""}! 🎯`);
    setCountdown(null);
  };

  // ✊ Fist countdown → next page
  const startFistCountdown = () => {
    if (fistCountdownIntervalRef.current) return; // Prevent multiple timers

    let timeLeft = 5;
    setFistCountdown(timeLeft);
    toast.info("✊ Fist detected — preparing Mood Detection...");

    fistCountdownIntervalRef.current = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft > 0) {
        setFistCountdown(timeLeft);
      } else {
        clearInterval(fistCountdownIntervalRef.current!);
        fistCountdownIntervalRef.current = null;
        handleContinue();
      }
    }, 1000);
  };

  const resetCountdowns = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (fistCountdownIntervalRef.current) clearInterval(fistCountdownIntervalRef.current);
    countdownIntervalRef.current = null;
    fistCountdownIntervalRef.current = null;
    setCountdown(null);
    setFistCountdown(null);
  };

  // 🎥 Start Camera
  const startCamera = async () => {
    try {
      if (!videoRef.current) return;
      setIsCameraActive(true);
      toast.loading("Activating camera...");

      await new Promise<void>((resolve) => {
        const check = setInterval(() => {
          if (window.Camera && window.HAND_CONNECTIONS && window.drawConnectors) {
            clearInterval(check);
            resolve();
          }
        }, 300);
      });

      toast.dismiss();
      toast.success("Camera ready! Show your fingers ✋");

      const hands = new window.Hands({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 0,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      handsRef.current = hands;

      hands.onResults((results: any) => {
        if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
          setLiveFingerCount(0);
          return;
        }

        const landmarks = results.multiHandLandmarks[0];
        const count = countFingers(landmarks);
        setLiveFingerCount(count);
        drawHand(landmarks);
      });

      let lastFrameTime = 0;
      const FPS_LIMIT = 15;

      cameraRef.current = new window.Camera(videoRef.current, {
        onFrame: async () => {
          const now = performance.now();
          if (now - lastFrameTime < 1000 / FPS_LIMIT) return;
          lastFrameTime = now;
          await hands.send({ image: videoRef.current });
        },
        width: 960,
        height: 540,
      });

      cameraRef.current.start();
    } catch (err) {
      console.error("Camera start error:", err);
      toast.error("Failed to access camera.");
      setIsCameraActive(false);
    }
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

  const stopCamera = async () => {
    try {
      if (cameraRef.current?.stop) cameraRef.current.stop();
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
      resetCountdowns();
      setIsCameraActive(false);
    } catch (err) {
      console.error("Error stopping camera:", err);
    }
  };

  const handleContinue = async () => {
    toast.success("🌈 Mood Detection starting...");
    await stopCamera();
    setTimeout(() => navigate("/app"), 500);
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              stopCamera();
              navigate("/");
            }}
            className="gap-2"
          >
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
            Hold steady for 5 seconds to confirm. Make a fist to continue.
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
            <div className="absolute top-4 left-4 bg-accent/90 px-6 py-4 rounded-lg border-2 border-accent shadow-glow flex flex-col items-center transition-all duration-200">
              <p className="text-xs text-white/80">Live Detection</p>
              <p className="text-5xl font-bold text-white flex items-center gap-2">
                {stableCount} {Array.from({ length: stableCount }).map(() => "👆").join("")}
              </p>
              {countdown && (
                <p className="text-lg font-semibold text-white mt-2 animate-pulse">
                  Confirming in {countdown}s...
                </p>
              )}
            </div>
          )}

          {/* Fist Countdown (next page) */}
          {isCameraActive && fistCountdown && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 transition-all duration-700">
              <p className="text-white text-5xl font-bold animate-pulse">
                Mood Detection in {fistCountdown}s...
              </p>
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

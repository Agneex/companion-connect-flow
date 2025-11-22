import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

export const QRScanner = ({ onScanSuccess, onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerDivId = "qr-scanner-container";

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      setError(null);
      
      // Initialize scanner
      const html5QrCode = new Html5Qrcode(scannerDivId);
      scannerRef.current = html5QrCode;

      // Start scanning
      await html5QrCode.start(
        { facingMode: "environment" }, // Use back camera
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          // Success callback
          onScanSuccess(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Error callback - can be ignored for scanning errors
          // Only log actual issues
          if (!errorMessage.includes("NotFoundException")) {
            console.log("QR scan error:", errorMessage);
          }
        }
      );

      setIsScanning(true);
    } catch (err: any) {
      console.error("Error starting scanner:", err);
      
      let errorMsg = "No se pudo acceder a la cámara";
      
      if (err.name === "NotAllowedError") {
        errorMsg = "Permiso de cámara denegado. Por favor, permite el acceso a la cámara.";
      } else if (err.name === "NotFoundError") {
        errorMsg = "No se encontró ninguna cámara en el dispositivo.";
      } else if (err.name === "NotReadableError") {
        errorMsg = "La cámara está siendo usada por otra aplicación.";
      }
      
      setError(errorMsg);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-background/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-lg font-semibold text-white">Escanear QR</h2>
            <p className="text-sm text-gray-300">Apunta al código QR del ticket</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-white/10"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Scanner Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {error ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md text-center">
            <p className="text-destructive font-medium mb-4">{error}</p>
            <Button onClick={startScanner} variant="outline">
              Intentar de nuevo
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <div
              id={scannerDivId}
              className="rounded-lg overflow-hidden border-4 border-primary shadow-lg shadow-primary/20"
            />
            <div className="mt-4 text-center">
              <div className="flex justify-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
              <p className="text-white text-sm">Buscando código QR...</p>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="p-4 bg-background/10 backdrop-blur-sm">
        <div className="max-w-md mx-auto space-y-2 text-sm text-gray-300">
          <p>✓ Mantén el código QR dentro del marco</p>
          <p>✓ Asegúrate de tener buena iluminación</p>
          <p>✓ Mantén la cámara estable</p>
        </div>
      </div>
    </div>
  );
};

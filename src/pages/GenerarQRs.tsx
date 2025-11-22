import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download } from "lucide-react";
import QRCode from "qrcode";
import { useTranslation } from "react-i18next";

const GenerarQRs = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    tokenId: "",
    silverName: "",
    city: "",
  });
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [generating, setGenerating] = useState(false);

  const generateQR = async () => {
    if (!formData.tokenId || !formData.silverName || !formData.city) {
      return;
    }

    setGenerating(true);
    try {
      const qrData = JSON.stringify({
        tokenId: formData.tokenId,
        silverName: formData.silverName,
        city: formData.city,
      });

      const dataUrl = await QRCode.toDataURL(qrData, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });

      setQrDataUrl(dataUrl);
    } catch (error) {
      console.error("Error generating QR:", error);
    } finally {
      setGenerating(false);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;

    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `companya-ticket-${formData.tokenId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <QrCode className="w-8 h-8" />
              Generar QR para Tickets
            </CardTitle>
            <CardDescription>
              Crea códigos QR para tickets de acompañamiento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tokenId">Token ID del NFT</Label>
                <Input
                  id="tokenId"
                  type="number"
                  value={formData.tokenId}
                  onChange={(e) => setFormData({ ...formData, tokenId: e.target.value })}
                  placeholder="Ej: 1"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  El ID del NFT que está en la wallet admin
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="silverName">Nombre del Silver</Label>
                <Input
                  id="silverName"
                  value={formData.silverName}
                  onChange={(e) => setFormData({ ...formData, silverName: e.target.value })}
                  placeholder="Ej: María González"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ej: Bogotá"
                  required
                />
              </div>

              <Button
                onClick={generateQR}
                disabled={generating || !formData.tokenId || !formData.silverName || !formData.city}
                className="w-full shadow-glow-primary"
              >
                <QrCode className="w-5 h-5 mr-2" />
                {generating ? "Generando..." : "Generar QR"}
              </Button>
            </div>

            {qrDataUrl && (
              <div className="space-y-4 pt-6 border-t">
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-lg">
                    <img src={qrDataUrl} alt="QR Code" className="w-64 h-64" />
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2">Información del Ticket</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Token ID: {formData.tokenId}</li>
                    <li>• Silver: {formData.silverName}</li>
                    <li>• Ciudad: {formData.city}</li>
                  </ul>
                </div>

                <Button
                  onClick={downloadQR}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descargar QR
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerarQRs;

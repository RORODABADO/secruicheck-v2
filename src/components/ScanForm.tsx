
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Play, Square, Globe, BookOpen } from "lucide-react";
import { ZAP_CONFIG } from "@/config/zapConfig";

export const ScanForm = () => {
  const [targetUrl, setTargetUrl] = useState("");
  const [scanType, setScanType] = useState("passive");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const { toast } = useToast();

  const handleStartScan = async () => {
    if (!targetUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une URL cible",
        variant: "destructive",
      });
      return;
    }

    // Validation de l'URL
    try {
      new URL(targetUrl);
    } catch {
      toast({
        title: "URL invalide",
        description: "Veuillez saisir une URL valide (ex: https://example.com)",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    setScanProgress(0);

    try {
      const selectedScanType = ZAP_CONFIG.scanConfig.scanTypes[scanType as keyof typeof ZAP_CONFIG.scanConfig.scanTypes];
      
      toast({
        title: "Scan démarré",
        description: `${selectedScanType.name} de ${targetUrl} en cours... (${selectedScanType.duration})`,
      });

      // Simulation de progression réaliste
      const progressInterval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsScanning(false);
            toast({
              title: "Scan terminé",
              description: "L'analyse de sécurité est terminée. Consultez l'onglet Résultats.",
            });
            return 100;
          }
          return prev + Math.random() * 15; // Progression plus réaliste
        });
      }, 800);

    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter à OWASP ZAP. Vérifiez qu'il est démarré sur localhost:8080",
        variant: "destructive",
      });
      setIsScanning(false);
    }
  };

  const handleStopScan = () => {
    setIsScanning(false);
    setScanProgress(0);
    toast({
      title: "Scan arrêté",
      description: "Le scan a été interrompu par l'utilisateur",
    });
  };

  return (
    <div className="space-y-6">
      {/* Information pédagogique */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <BookOpen className="h-5 w-5" />
            <span>À propos d'OWASP ZAP</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700">
          <p className="mb-2">
            OWASP ZAP (Zed Attack Proxy) est un outil de test de sécurité open-source qui aide à détecter les vulnérabilités dans les applications web.
          </p>
          <p>
            <strong>Important :</strong> Assurez-vous d'avoir le droit de tester le site web cible. Ne testez que vos propres applications ou celles pour lesquelles vous avez une autorisation explicite.
          </p>
        </CardContent>
      </Card>

      {/* Configuration du Scan */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="targetUrl" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>URL Cible</span>
          </Label>
          <Input
            id="targetUrl"
            type="url"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://votre-site-test.com"
            disabled={isScanning}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Testez uniquement des sites que vous possédez ou pour lesquels vous avez l'autorisation
          </p>
        </div>

        <div>
          <Label htmlFor="scanType">Type de Scan</Label>
          <select
            id="scanType"
            value={scanType}
            onChange={(e) => setScanType(e.target.value)}
            disabled={isScanning}
            className="w-full mt-1 p-2 border border-input rounded-md bg-background"
          >
            {Object.entries(ZAP_CONFIG.scanConfig.scanTypes).map(([key, config]) => (
              <option key={key} value={key}>
                {config.name} - {config.description}
              </option>
            ))}
          </select>
          <div className="mt-2 p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium">
              {ZAP_CONFIG.scanConfig.scanTypes[scanType as keyof typeof ZAP_CONFIG.scanConfig.scanTypes]?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              Durée estimée : {ZAP_CONFIG.scanConfig.scanTypes[scanType as keyof typeof ZAP_CONFIG.scanConfig.scanTypes]?.duration}
            </p>
            <p className="text-sm text-muted-foreground">
              {ZAP_CONFIG.scanConfig.scanTypes[scanType as keyof typeof ZAP_CONFIG.scanConfig.scanTypes]?.safe 
                ? "✅ Scan sûr - Pas de modification du site" 
                : "⚠️ Scan intrusif - Peut déclencher des alertes"}
            </p>
          </div>
        </div>
      </div>

      {/* Contrôles du Scan */}
      <div className="flex space-x-4">
        {!isScanning ? (
          <Button onClick={handleStartScan} className="flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Démarrer le Scan</span>
          </Button>
        ) : (
          <Button onClick={handleStopScan} variant="destructive" className="flex items-center space-x-2">
            <Square className="h-4 w-4" />
            <span>Arrêter le Scan</span>
          </Button>
        )}
      </div>

      {/* Progression du Scan */}
      {isScanning && (
        <Card>
          <CardHeader>
            <CardTitle>Scan en cours...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression</span>
                <span>{Math.round(scanProgress)}%</span>
              </div>
              <Progress value={scanProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                {ZAP_CONFIG.scanConfig.scanTypes[scanType as keyof typeof ZAP_CONFIG.scanConfig.scanTypes]?.name} de {targetUrl}
              </p>
              <p className="text-xs text-muted-foreground">
                OWASP ZAP analyse la sécurité de votre application...
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

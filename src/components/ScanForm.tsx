
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Play, Square, Settings, Globe } from "lucide-react";

export const ScanForm = () => {
  const [targetUrl, setTargetUrl] = useState("");
  const [scanType, setScanType] = useState("passive");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [zapApiUrl, setZapApiUrl] = useState("http://localhost:8080");
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

    setIsScanning(true);
    setScanProgress(0);

    try {
      // Simulation d'un scan (dans un vrai projet, vous appelleriez l'API OWASP ZAP)
      toast({
        title: "Scan démarré",
        description: `Analyse de ${targetUrl} en cours...`,
      });

      // Simulation de progression
      const progressInterval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsScanning(false);
            toast({
              title: "Scan terminé",
              description: "L'analyse de sécurité est complete",
            });
            return 100;
          }
          return prev + 10;
        });
      }, 500);

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se connecter à OWASP ZAP",
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
      {/* Configuration ZAP */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Configuration OWASP ZAP</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="zapApi">URL de l'API ZAP</Label>
            <Input
              id="zapApi"
              value={zapApiUrl}
              onChange={(e) => setZapApiUrl(e.target.value)}
              placeholder="http://localhost:8080"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Assurez-vous qu'OWASP ZAP est démarré avec l'API activée
            </p>
          </div>
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
            placeholder="https://example.com"
            disabled={isScanning}
          />
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
            <option value="passive">Scan Passif (Rapide)</option>
            <option value="active">Scan Actif (Complet)</option>
            <option value="spider">Spider + Scan Actif</option>
          </select>
          <p className="text-sm text-muted-foreground mt-1">
            Le scan passif analyse sans modifier le site, le scan actif test activement les vulnérabilités
          </p>
        </div>

        <div>
          <Label htmlFor="excludeUrls">URLs à Exclure (optionnel)</Label>
          <Textarea
            id="excludeUrls"
            placeholder="https://example.com/logout&#10;https://example.com/admin"
            disabled={isScanning}
            rows={3}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Une URL par ligne - utile pour éviter les pages de déconnexion
          </p>
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
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Analyse de {targetUrl} - Type: {scanType}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

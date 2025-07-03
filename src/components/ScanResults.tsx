import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle, BookOpen, Shield, Lightbulb } from "lucide-react";
import { PdfExport } from "./PdfExport";

// Données pédagogiques pour les étudiants
const mockVulnerabilities = [
  {
    id: 1,
    name: "Injection SQL",
    severity: "Critique" as const,
    url: "https://example.com/login.php?user=admin",
    description: "Injection SQL possible dans le paramètre 'user'",
    solution: "Utiliser des requêtes préparées (prepared statements)",
    confidence: "Élevée" as const,
    pedagogicalInfo: {
      whatIs: "L'injection SQL permet à un attaquant d'insérer du code SQL malveillant dans vos requêtes",
      whyDangerous: "Un attaquant peut lire, modifier ou supprimer toutes les données de votre base de données",
      howToFix: "Utilisez des requêtes préparées avec des paramètres liés. Exemple: SELECT * FROM users WHERE id = ? au lieu de SELECT * FROM users WHERE id = ' + userInput",
      realWorldExample: "En 2017, Equifax a subi une attaque par injection SQL qui a exposé les données de 147 millions de personnes"
    }
  },
  {
    id: 2,
    name: "Cross-Site Scripting (XSS)",
    severity: "Élevée" as const,
    url: "https://example.com/search.php?q=<script>alert('XSS')</script>",
    description: "XSS réfléchi dans le paramètre de recherche",
    solution: "Encoder toutes les données utilisateur avant affichage",
    confidence: "Élevée" as const,
    pedagogicalInfo: {
      whatIs: "XSS permet d'injecter du JavaScript malveillant qui s'exécute dans le navigateur des utilisateurs",
      whyDangerous: "Vol de cookies de session, redirection vers des sites malveillants, défacement de page",
      howToFix: "Échappez toutes les données utilisateur avec htmlspecialchars() en PHP ou textContent en JavaScript",
      realWorldExample: "Twitter a été victime de XSS en 2010, permettant la propagation automatique de tweets malveillants"
    }
  },
  {
    id: 3,
    name: "Headers de Sécurité Manquants",
    severity: "Moyenne" as const,
    url: "https://example.com/",
    description: "Headers de sécurité manquants (CSP, HSTS, X-Frame-Options)",
    solution: "Configurer les headers de sécurité appropriés sur le serveur",
    confidence: "Élevée" as const,
    pedagogicalInfo: {
      whatIs: "Les headers de sécurité HTTP protègent contre diverses attaques en définissant des politiques de sécurité",
      whyDangerous: "Sans ces headers, votre site est vulnérable au clickjacking, aux attaques MITM, et aux injections de contenu",
      howToFix: "Ajoutez Content-Security-Policy, Strict-Transport-Security, X-Frame-Options dans vos réponses HTTP",
      realWorldExample: "Sans HSTS, un attaquant sur un WiFi public peut intercepter vos communications 'sécurisées'"
    }
  },
  {
    id: 4,
    name: "Navigation dans les Répertoires",
    severity: "Faible" as const,
    url: "https://example.com/uploads/",
    description: "La navigation dans les répertoires est activée",
    solution: "Désactiver l'indexation des répertoires et ajouter des fichiers index.html",
    confidence: "Élevée" as const,
    pedagogicalInfo: {
      whatIs: "La navigation permet de voir la liste des fichiers dans un répertoire web",
      whyDangerous: "Exposition d'informations sensibles, fichiers de configuration, backups",
      howToFix: "Ajoutez 'Options -Indexes' dans .htaccess ou désactivez dans la configuration Apache/Nginx",
      realWorldExample: "De nombreux sites exposent accidentellement des fichiers de sauvegarde contenant des mots de passe"
    }
  }
];

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "Critique":
      return <XCircle className="h-4 w-4 text-red-600" />;
    case "Élevée":
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case "Moyenne":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "Faible":
      return <CheckCircle className="h-4 w-4 text-blue-500" />;
    default:
      return <CheckCircle className="h-4 w-4 text-gray-500" />;
  }
};

const getSeverityBadge = (severity: string) => {
  const variants: Record<string, "destructive" | "secondary" | "outline" | "default"> = {
    "Critique": "destructive",
    "Élevée": "destructive", 
    "Moyenne": "secondary",
    "Faible": "outline"
  };
  
  return (
    <Badge variant={variants[severity] || "default"} className="flex items-center space-x-1">
      {getSeverityIcon(severity)}
      <span>{severity}</span>
    </Badge>
  );
};

export const ScanResults = () => {
  const criticalCount = mockVulnerabilities.filter(v => v.severity === "Critique").length;
  const highCount = mockVulnerabilities.filter(v => v.severity === "Élevée").length;
  const mediumCount = mockVulnerabilities.filter(v => v.severity === "Moyenne").length;
  const lowCount = mockVulnerabilities.filter(v => v.severity === "Faible").length;

  return (
    <div className="space-y-6">
      {/* Information pédagogique sur les résultats */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <BookOpen className="h-5 w-5" />
            <span>Comment Interpréter ces Résultats</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-green-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Niveaux de Sévérité :</h4>
              <ul className="space-y-1">
                <li><span className="text-red-600">🔴 Critique</span> : Corrigez immédiatement</li>
                <li><span className="text-orange-500">🟠 Élevée</span> : Corrigez rapidement</li>
                <li><span className="text-yellow-500">🟡 Moyenne</span> : À corriger selon priorité</li>
                <li><span className="text-blue-500">🔵 Faible</span> : Amélioration recommandée</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Prochaines Étapes :</h4>
              <ul className="space-y-1">
                <li>• Téléchargez le rapport PDF complet ci-dessous</li>
                <li>• Priorisez les corrections par niveau de sévérité</li>
                <li>• Testez vos corrections avec un nouveau scan</li>
                <li>• Partagez le rapport avec votre équipe</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résumé des Résultats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Shield className="h-4 w-4 text-red-600" />
              <span>Critiques</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
            <p className="text-xs text-muted-foreground">À corriger en priorité</p>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span>Élevées</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{highCount}</div>
            <p className="text-xs text-muted-foreground">Risques importants</p>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <span>Moyennes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{mediumCount}</div>
            <p className="text-xs text-muted-foreground">À planifier</p>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>Faibles</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{lowCount}</div>
            <p className="text-xs text-muted-foreground">Améliorations</p>
          </CardContent>
        </Card>
      </div>

      {/* Export PDF */}
      <div className="flex justify-center">
        <PdfExport 
          vulnerabilities={mockVulnerabilities} 
          targetUrl="https://example.com" 
        />
      </div>

      {/* Tableau des Vulnérabilités Détaillées */}
      <Card>
        <CardHeader>
          <CardTitle>Vulnérabilités Détectées - Guide d'Apprentissage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockVulnerabilities.map((vuln) => (
              <Card key={vuln.id} className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{vuln.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{vuln.description}</p>
                      <code className="text-sm bg-muted px-2 py-1 rounded mt-2 inline-block">{vuln.url}</code>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {getSeverityBadge(vuln.severity)}
                      <Badge variant="outline">{vuln.confidence}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                          <BookOpen className="h-4 w-4" />
                          <span>Qu'est-ce que c'est ?</span>
                        </h4>
                        <p className="text-sm text-muted-foreground">{vuln.pedagogicalInfo.whatIs}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span>Pourquoi c'est dangereux ?</span>
                        </h4>
                        <p className="text-sm text-muted-foreground">{vuln.pedagogicalInfo.whyDangerous}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span>Comment corriger ?</span>
                        </h4>
                        <p className="text-sm text-muted-foreground">{vuln.pedagogicalInfo.howToFix}</p>
                      </div>
                      
                      {vuln.pedagogicalInfo.realWorldExample && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                            <Lightbulb className="h-4 w-4 text-yellow-500" />
                            <span>Exemple réel</span>
                          </h4>
                          <p className="text-sm text-muted-foreground italic">{vuln.pedagogicalInfo.realWorldExample}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <h4 className="font-semibold text-sm mb-1">Solution recommandée :</h4>
                    <p className="text-sm">{vuln.solution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

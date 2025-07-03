
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, CheckCircle, XCircle, Download, Eye } from "lucide-react";

const mockVulnerabilities = [
  {
    id: 1,
    name: "SQL Injection",
    severity: "Critique",
    url: "https://example.com/login.php",
    description: "Injection SQL possible dans le paramètre 'username'",
    solution: "Utiliser des requêtes préparées",
    confidence: "Élevée"
  },
  {
    id: 2,
    name: "Cross-Site Scripting (XSS)",
    severity: "Élevée",
    url: "https://example.com/search.php",
    description: "XSS réfléchi dans le paramètre de recherche",
    solution: "Encoder les données utilisateur en sortie",
    confidence: "Élevée"
  },
  {
    id: 3,
    name: "Missing Security Headers",
    severity: "Moyenne",
    url: "https://example.com/",
    description: "Headers de sécurité manquants (CSP, HSTS)",
    solution: "Configurer les headers de sécurité appropriés",
    confidence: "Moyenne"
  },
  {
    id: 4,
    name: "Directory Browsing",
    severity: "Faible",
    url: "https://example.com/uploads/",
    description: "Navigation dans les répertoires activée",
    solution: "Désactiver la navigation dans les répertoires",
    confidence: "Élevée"
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
      {/* Résumé des Résultats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Critiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Élevées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{highCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Moyennes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{mediumCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Faibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{lowCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Exporter PDF</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Exporter JSON</span>
        </Button>
      </div>

      {/* Tableau des Vulnérabilités */}
      <Card>
        <CardHeader>
          <CardTitle>Vulnérabilités Détectées</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vulnérabilité</TableHead>
                <TableHead>Sévérité</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Confiance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVulnerabilities.map((vuln) => (
                <TableRow key={vuln.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{vuln.name}</div>
                      <div className="text-sm text-muted-foreground">{vuln.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getSeverityBadge(vuln.severity)}
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-1 rounded">{vuln.url}</code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{vuln.confidence}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>Détails</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

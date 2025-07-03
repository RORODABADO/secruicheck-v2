
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Eye, Download, RotateCcw } from "lucide-react";

const mockHistory = [
  {
    id: 1,
    url: "https://example.com",
    date: "2024-01-15 14:30",
    duration: "5 min 32s",
    vulnerabilities: 12,
    criticalCount: 2,
    status: "Terminé"
  },
  {
    id: 2,
    url: "https://test.example.com",
    date: "2024-01-14 09:15",
    duration: "8 min 45s",
    vulnerabilities: 5,
    criticalCount: 0,
    status: "Terminé"
  },
  {
    id: 3,
    url: "https://staging.example.com",
    date: "2024-01-13 16:20",
    duration: "12 min 18s",
    vulnerabilities: 23,
    criticalCount: 5,
    status: "Terminé"
  },
  {
    id: 4,
    url: "https://api.example.com",
    date: "2024-01-12 11:45",
    duration: "3 min 12s",
    vulnerabilities: 1,
    criticalCount: 0,
    status: "Terminé"
  },
  {
    id: 5,
    url: "https://shop.example.com",
    date: "2024-01-11 13:30",
    duration: "15 min 30s",
    vulnerabilities: 18,
    criticalCount: 3,
    status: "Interrompu"
  }
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "destructive" | "secondary"> = {
    "Terminé": "default",
    "Interrompu": "destructive",
    "En cours": "secondary"
  };
  
  return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
};

const getVulnerabilityBadge = (criticalCount: number) => {
  if (criticalCount > 0) {
    return <Badge variant="destructive">{criticalCount} critique(s)</Badge>;
  }
  return <Badge variant="outline">Aucune critique</Badge>;
};

export const ScanHistory = () => {
  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Total Scans</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockHistory.length}</div>
            <p className="text-xs text-muted-foreground">Depuis le début</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Dernière Semaine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 vs semaine précédente</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Temps Moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9 min</div>
            <p className="text-xs text-muted-foreground">Par scan complet</p>
          </CardContent>
        </Card>
      </div>

      {/* Historique des Scans */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL Cible</TableHead>
                <TableHead>Date & Heure</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Vulnérabilités</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistory.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{scan.url}</code>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{scan.date}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{scan.duration}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{scan.vulnerabilities} total</div>
                      {getVulnerabilityBadge(scan.criticalCount)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(scan.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>Voir</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>Export</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <RotateCcw className="h-3 w-3" />
                        <span>Relancer</span>
                      </Button>
                    </div>
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

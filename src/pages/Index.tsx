
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScanForm } from "@/components/ScanForm";
import { ScanResults } from "@/components/ScanResults";
import { ScanHistory } from "@/components/ScanHistory";
import { Shield, Zap, AlertTriangle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <Zap className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">WebSecScan</h1>
              <p className="text-gray-600">Scanner de vulnérabilités web avec OWASP ZAP</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scans Réalisés</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 depuis hier</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vulnérabilités Trouvées</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">23</div>
              <p className="text-xs text-muted-foreground">8 critiques, 15 moyennes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sites Analysés</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Domaines uniques</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <Tabs defaultValue="scan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scan">Nouveau Scan</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="scan">
            <Card>
              <CardHeader>
                <CardTitle>Configuration du Scan</CardTitle>
                <CardDescription>
                  Configurez votre scan de vulnérabilités avec OWASP ZAP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScanForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <ScanResults />
          </TabsContent>

          <TabsContent value="history">
            <ScanHistory />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

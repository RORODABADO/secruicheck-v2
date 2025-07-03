
// Configuration OWASP ZAP pour l'application
export const ZAP_CONFIG = {
  // URL de l'API ZAP (configurée par défaut pour une installation locale)
  apiUrl: "http://localhost:8080",
  
  // Clé API (optionnelle selon la configuration ZAP)
  apiKey: "", // Laissez vide si pas de clé configurée
  
  // Configuration des scans par défaut
  scanConfig: {
    // URLs à exclure automatiquement (pages dangereuses)
    excludeUrls: [
      ".*/logout.*",
      ".*/signout.*",
      ".*/deconnexion.*",
      ".*/admin/delete.*",
      ".*/delete.*"
    ],
    
    // Types de scan disponibles
    scanTypes: {
      passive: {
        name: "Scan Passif",
        description: "Analyse le trafic sans envoyer de requêtes malveillantes",
        duration: "2-5 minutes",
        safe: true
      },
      active: {
        name: "Scan Actif", 
        description: "Test activement les vulnérabilités en envoyant des requêtes spécialisées",
        duration: "10-30 minutes",
        safe: false
      },
      spider: {
        name: "Spider + Scan Actif",
        description: "Explore d'abord le site puis effectue un scan actif complet",
        duration: "15-45 minutes", 
        safe: false
      }
    },
    
    // Configuration des alertes par défaut
    alertLevels: {
      high: "Critique - Exploitation immédiate possible",
      medium: "Élevée - Vulnérabilité confirmée",
      low: "Moyenne - Problème de configuration",
      informational: "Information - Amélioration recommandée"
    }
  },
  
  // Headers personnalisés pour les requêtes
  customHeaders: {
    "User-Agent": "OWASP-ZAP-Security-Scanner"
  },
  
  // Timeout pour les requêtes (en millisecondes)
  timeout: 30000
};

// Types TypeScript pour la configuration
export interface ZapScanResult {
  id: string;
  name: string;
  severity: 'Critique' | 'Élevée' | 'Moyenne' | 'Faible' | 'Information';
  url: string;
  description: string;
  solution: string;
  confidence: 'Élevée' | 'Moyenne' | 'Faible';
  pedagogicalInfo: {
    whatIs: string;
    whyDangerous: string;
    howToFix: string;
    realWorldExample?: string;
  };
}

export interface ZapScanConfig {
  targetUrl: string;
  scanType: keyof typeof ZAP_CONFIG.scanConfig.scanTypes;
  excludeUrls?: string[];
}

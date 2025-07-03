
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';

interface Vulnerability {
  id: number;
  name: string;
  severity: "Critique" | "Élevée" | "Moyenne" | "Faible";
  url: string;
  description: string;
  solution: string;
  confidence: "Élevée" | "Moyenne" | "Faible";
  pedagogicalInfo: {
    whatIs: string;
    whyDangerous: string;
    howToFix: string;
    realWorldExample?: string;
  };
}

interface PdfExportProps {
  vulnerabilities: Vulnerability[];
  targetUrl: string;
}

export const PdfExport = ({ vulnerabilities, targetUrl }: PdfExportProps) => {
  const { toast } = useToast();

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      let yPosition = 20;
      const pageHeight = 280;
      const lineHeight = 7;

      // Titre principal
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Rapport de Sécurité Web - Guide Pédagogique", 20, yPosition);
      yPosition += 15;

      // URL analysée
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Site analysé: ${targetUrl}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, yPosition);
      yPosition += 15;

      // Résumé
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Résumé Exécutif", 20, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const criticalCount = vulnerabilities.filter(v => v.severity === "Critique").length;
      const highCount = vulnerabilities.filter(v => v.severity === "Élevée").length;
      const mediumCount = vulnerabilities.filter(v => v.severity === "Moyenne").length;
      const lowCount = vulnerabilities.filter(v => v.severity === "Faible").length;

      doc.text(`• Vulnérabilités critiques: ${criticalCount}`, 25, yPosition);
      yPosition += lineHeight;
      doc.text(`• Vulnérabilités élevées: ${highCount}`, 25, yPosition);
      yPosition += lineHeight;
      doc.text(`• Vulnérabilités moyennes: ${mediumCount}`, 25, yPosition);
      yPosition += lineHeight;
      doc.text(`• Vulnérabilités faibles: ${lowCount}`, 25, yPosition);
      yPosition += 15;

      // Guide pédagogique
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Guide Pédagogique des Vulnérabilités", 20, yPosition);
      yPosition += 15;

      vulnerabilities.forEach((vuln, index) => {
        // Vérifier si on a besoin d'une nouvelle page
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = 20;
        }

        // Nom de la vulnérabilité
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`${index + 1}. ${vuln.name}`, 20, yPosition);
        yPosition += 8;

        // Sévérité
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(`Sévérité: ${vuln.severity} | Confiance: ${vuln.confidence}`, 25, yPosition);
        yPosition += lineHeight;

        // URL
        doc.text(`URL: ${vuln.url}`, 25, yPosition);
        yPosition += lineHeight + 2;

        // Description
        doc.setFont("helvetica", "bold");
        doc.text("Description:", 25, yPosition);
        yPosition += lineHeight;
        doc.setFont("helvetica", "normal");
        const descLines = doc.splitTextToSize(vuln.description, 160);
        doc.text(descLines, 30, yPosition);
        yPosition += descLines.length * lineHeight + 3;

        // Qu'est-ce que c'est ?
        doc.setFont("helvetica", "bold");
        doc.text("Qu'est-ce que c'est ?", 25, yPosition);
        yPosition += lineHeight;
        doc.setFont("helvetica", "normal");
        const whatIsLines = doc.splitTextToSize(vuln.pedagogicalInfo.whatIs, 160);
        doc.text(whatIsLines, 30, yPosition);
        yPosition += whatIsLines.length * lineHeight + 3;

        // Pourquoi c'est dangereux ?
        doc.setFont("helvetica", "bold");
        doc.text("Pourquoi c'est dangereux ?", 25, yPosition);
        yPosition += lineHeight;
        doc.setFont("helvetica", "normal");
        const dangerLines = doc.splitTextToSize(vuln.pedagogicalInfo.whyDangerous, 160);
        doc.text(dangerLines, 30, yPosition);
        yPosition += dangerLines.length * lineHeight + 3;

        // Comment corriger ?
        doc.setFont("helvetica", "bold");
        doc.text("Comment corriger ?", 25, yPosition);
        yPosition += lineHeight;
        doc.setFont("helvetica", "normal");
        const fixLines = doc.splitTextToSize(vuln.pedagogicalInfo.howToFix, 160);
        doc.text(fixLines, 30, yPosition);
        yPosition += fixLines.length * lineHeight + 3;

        // Solution recommandée
        doc.setFont("helvetica", "bold");
        doc.text("Solution recommandée:", 25, yPosition);
        yPosition += lineHeight;
        doc.setFont("helvetica", "normal");
        const solutionLines = doc.splitTextToSize(vuln.solution, 160);
        doc.text(solutionLines, 30, yPosition);
        yPosition += solutionLines.length * lineHeight + 3;

        // Exemple réel si disponible
        if (vuln.pedagogicalInfo.realWorldExample) {
          doc.setFont("helvetica", "bold");
          doc.text("Exemple réel:", 25, yPosition);
          yPosition += lineHeight;
          doc.setFont("helvetica", "italic");
          const exampleLines = doc.splitTextToSize(vuln.pedagogicalInfo.realWorldExample, 160);
          doc.text(exampleLines, 30, yPosition);
          yPosition += exampleLines.length * lineHeight + 5;
        }

        yPosition += 10; // Espacement entre vulnérabilités
      });

      // Sauvegarde du PDF
      const fileName = `rapport-securite-${targetUrl.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);

      toast({
        title: "PDF généré",
        description: "Le rapport pédagogique a été téléchargé avec succès",
      });

    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le rapport PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={generatePDF} variant="outline" className="flex items-center space-x-2">
      <Download className="h-4 w-4" />
      <span>Rapport PDF Pédagogique</span>
    </Button>
  );
};

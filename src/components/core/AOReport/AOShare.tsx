import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ao } from "@/types/AO";
import { AOReport } from "@/types/AOReport";
import { Mail, Share2 } from "lucide-react";
import React from "react";

const AOShare: React.FC<{ reportUrl: string; ao: Ao }> = ({
  reportUrl,
  ao,
}) => {
  const buildEmailBody = (report: AOReport, reportUrl: string): string => {
    const getValue = <T,>(
      val: { value: T | null } | T | null | undefined
    ): T | null => {
      if (val == null) return null;
      if (typeof val === "object" && "value" in val) {
        return val.value != null ? val.value : null;
      }
      return val as T;
    };

    const safeLine = (label: string, val: string | number | null | undefined) =>
      val != null && val !== "" ? `${label}: ${val}` : null;

    const formatSection = (
      title: string,
      lines: (string | null | undefined)[]
    ) => {
      const filtered = lines.filter((line): line is string => Boolean(line));
      return filtered.length > 0
        ? `\n\n--- ${title} ---\n${filtered.join("\n")}`
        : "";
    };

    let body = `Bonjour,\n\nVoici le lien vers le rapport : ${reportUrl}`;

    body += formatSection("Informations générales", [
      safeLine("Titre", getValue(report.titre_ao)),
      safeLine("Numéro", getValue(report.numero_ao)),
      safeLine("Date de dépôt", getValue(report.date_depot)),
      safeLine("Client", getValue(report.client)),
      safeLine("Département", getValue(report.departement_client)),
      safeLine(
        "Évaluation des efforts client",
        getValue(report.evaluation_efforts_client)
      ),
    ]);

    body += formatSection("Budget", [
      safeLine("Min", getValue(report.budget_client?.min)),
      safeLine("Max", getValue(report.budget_client?.max)),
    ]);

    body += formatSection("Contraintes", [
      safeLine("Clause de limitation", getValue(report.clauses_de_limitation)),
      safeLine("Type de contrat", getValue(report.type_de_contrat)),
      safeLine("Mode de travail", getValue(report.mode_travail)),
      safeLine("Période", getValue(report.periode)),
      safeLine("Type de facturation", getValue(report.type_facturation)),
      safeLine("Heures/jour", getValue(report.journee_travail_heures)),
      safeLine("Lieu de travail", getValue(report.travail_lieu)),
      safeLine("Lieu de résidence", getValue(report.residence_lieu)),
      safeLine("Déplacements prévus", getValue(report.deplacements_prevus)),
    ]);

    if (report.technologies_requises?.length)
      body += formatSection("Technologies requises", [
        report.technologies_requises.join(", "),
      ]);

    if (report.equipements_logiciels_specifiques?.length)
      body += formatSection("Équipements / logiciels spécifiques", [
        report.equipements_logiciels_specifiques.join(", "),
      ]);

    const besoins = getValue(report.besoins_attentes_client);
    if (besoins)
      body += formatSection("Besoins et attentes du client", [besoins]);

    if (report.exigences_des_ressources?.length) {
      const ressources = report.exigences_des_ressources
        .map((res: any) => {
          const titre = getValue(res.titre_professionnel);
          const exp = res.experiences_requises;
          const nec = getValue(res.necessites_ressources);
          const lines: string[] = [];
          if (titre) lines.push(`• Titre professionnel : ${titre}`);
          if (exp?.length) lines.push(`  - Expériences : ${exp.join(", ")}`);
          if (nec) lines.push(`  - Nécessités : ${nec}`);
          return lines.join("\n");
        })
        .filter(Boolean);
      body += formatSection("Exigences des ressources", ressources);
    }

    const garanties = report.garanties_requises;
    body += formatSection("Garanties requises", [
      safeLine(
        "Garantie de soumission",
        getValue(garanties.garantie_soumission)
      ),
      safeLine("Garantie d'exécution", getValue(garanties.garantie_execution)),
      safeLine("Police d'assurance", getValue(garanties.police_assurance)),
    ]);

    if (report.penalites?.length) {
      const lignes = report.penalites
        .map((p: any) => {
          const desc = getValue(p.description);
          const montant = getValue(p.montant);
          return desc || montant
            ? `• ${desc || "Sans description"} (${
                montant || "Montant non précisé"
              })`
            : null;
        })
        .filter(Boolean);
      body += formatSection("Pénalités", lignes);
    }

    if (report.criteres_evaluation_ao?.length) {
      const lignes = report.criteres_evaluation_ao
        .map((c) => {
          const nom = getValue(c.nom_critere);
          const points = getValue(c.ponderation);
          const elim = getValue(c.eliminatoire);
          if (!nom && points == null) return null;
          return `• ${nom ?? "Critère"}${
            points != null ? ` (${points} pts)` : ""
          }${elim ? " [Éliminatoire]" : ""}`;
        })
        .filter(Boolean);
      body += formatSection("Critères d’évaluation", lignes);
    }

    return body;
  };

  const handleShareByEmail = () => {
    const body = encodeURIComponent(buildEmailBody(ao.report, reportUrl));
    const subject = encodeURIComponent("Rapport d'appel d'offres");
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <>
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={handleShareByEmail}>
          <Mail className="w-4 h-4 mr-2" />
          Envoyer par e-mail
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AOShare;

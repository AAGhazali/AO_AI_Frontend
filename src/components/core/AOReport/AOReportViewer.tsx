import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AOReport } from "@/types/AOReport";
import React from "react";
import CriteresEvaluationCard from "./card/CritereEvaluationCard";
import ExigencesRessourcesCard from "./card/ExigencesRessourcesCard";
import PenalitesCard from "./card/PenalitesCard";

interface AOReportViewerProps {
  report: AOReport;
}

function renderNullable(value: any): React.ReactNode {
  try {
    if (value === null || value?.value === null) {
      return (
        <span className="italic text-muted-foreground">Valeur absente</span>
      );
    }
    if (typeof value === "object" && !Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside ml-4">
          {Object.entries(value).map(([k, v], i) => (
            <li key={i}>
              <strong>{k.replace(/_/g, " ")}:</strong> {renderNullable(v)}
            </li>
          ))}
        </ul>
      );
    }
    return <span>{value?.value ?? value}</span>;
  } catch (error) {
    console.error("Error rendering value:", error);
    return (
      <span className="italic text-muted-foreground">
        Valeur absente ou erroné
      </span>
    );
  }
}

export const AOReportViewer: React.FC<AOReportViewerProps> = ({ report }) => {
  return (
    <div className="h-full space-y-6 pb-10">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">
            Titre de l'appel d'offres
          </h2>
          <Separator className="mb-3" />
          {renderNullable(report.titre_ao)}
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">
              Numéro d'appel d'offres
            </h2>
            <Separator className="mb-3" />
            {renderNullable(report.numero_ao)}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Date de dépôt</h2>
            <Separator className="mb-3" />
            {renderNullable(report.date_depot)}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Clause de limitation</h2>
            <Separator className="mb-3" />
            {renderNullable(report.clauses_de_limitation)}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Type de contrat</h2>
            <Separator className="mb-3" />
            {renderNullable(report.type_de_contrat)}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Facteur K</h2>
          <Separator className="mb-3" />
          {renderNullable(report.facteur_K)}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">
            Qualifications requises
          </h2>
          <Separator className="mb-3" />
          {report.qualifications_requises &&
          report.qualifications_requises.length > 0 ? (
            <ul className="list-disc list-inside ml-4">
              {report.qualifications_requises.map((qualif, i) => (
                <li key={i}>{qualif}</li>
              ))}
            </ul>
          ) : (
            <span className="italic text-muted-foreground">Valeur absente</span>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Marge préférentielle</h2>
          <Separator className="mb-3" />
          {renderNullable(report.marge_preferentielle)}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">
            Besoins et attentes du client
          </h2>
          <Separator className="mb-3" />
          {renderNullable(report.besoins_attentes_client)}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">
            Identification du client
          </h2>
          <Separator className="mb-3" />
          <strong className="mb-1.5">Client: </strong>
          <p className="mb-5">{renderNullable(report.client)}</p>
          <strong className="mb-1.5">Département client: </strong>
          <p className="mb-5">{renderNullable(report.departement_client)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Période</h2>
          <Separator className="mb-3" />
          {renderNullable(report.periode)}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">
            Évaluation des efforts par le client
          </h2>
          <Separator className="mb-3" />
          {renderNullable(report.evaluation_efforts_client)}
        </CardContent>
      </Card>
      {report.budget_client.min || report.budget_client.max ? (
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Budget client</h2>
            <Separator className="mb-3" />
            <ul>
              <li>
                <strong>Min :</strong>{" "}
                {renderNullable(report.budget_client.min)}
              </li>
              <li>
                <strong>Max :</strong>{" "}
                {renderNullable(report.budget_client.max)}
              </li>
            </ul>
          </CardContent>
        </Card>
      ) : null}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">
            Journée de travail (heures)
          </h2>
          <Separator className="mb-3" />
          {renderNullable(report.journee_travail_heures)}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Mode de travail</h2>
          <Separator className="mb-3" />
          {renderNullable(report.mode_travail)}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Lieu de travail</h2>
          <Separator className="mb-3" />
          {renderNullable(report.travail_lieu)}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Lieu de résidence</h2>
          <Separator className="mb-3" />
          {renderNullable(report.residence_lieu)}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Déplacements prévus</h2>
          <Separator className="mb-3" />
          {renderNullable(report.deplacements_prevus)}
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Type de facturation</h2>
            <Separator className="mb-3" />
            {renderNullable(report.type_facturation)}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">
              Conditions de paiement
            </h2>
            <Separator className="mb-3" />
            {renderNullable(report.conditions_paiement_particulieres)}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">
            Poste de travail fourni par Cofomo
          </h2>
          <Separator className="mb-3" />
          <Badge>{report.poste_travail_a_fournir ? "Oui" : "Non"}</Badge>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Garanties requises</h2>
          <Separator className="mb-3" />
          <ul>
            <li>
              <strong>Garantie soumission :</strong>{" "}
              {renderNullable(report.garanties_requises.garantie_soumission)}
            </li>
            <li>
              <strong>Garantie exécution :</strong>{" "}
              {renderNullable(report.garanties_requises.garantie_execution)}
            </li>
            <li>
              <strong>Police d'assurance :</strong>{" "}
              {renderNullable(report.garanties_requises.police_assurance)}
            </li>
          </ul>
        </CardContent>
      </Card>
      <PenalitesCard
        penalites={report.penalites}
        renderNullable={renderNullable}
      />
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">
            Pénalités particulières
          </h2>
          <Separator className="mb-3" />
          {renderNullable(report.penalites_particulieres)}
        </CardContent>
      </Card>

      <CriteresEvaluationCard
        criteres={report.criteres_evaluation_ao}
        renderNullable={renderNullable}
      />

      <ExigencesRessourcesCard
        exigences={report.exigences_des_ressources}
        renderNullable={renderNullable}
      />
    </div>
  );
};

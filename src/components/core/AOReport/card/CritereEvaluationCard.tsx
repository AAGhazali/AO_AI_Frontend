import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CriteresEvaluationAO } from "@/types/AOReport";
import React, { useState } from "react";

interface Props {
  criteres: CriteresEvaluationAO[] | null;
  renderNullable: (value: any) => React.ReactNode;
}

const CriteresEvaluationCard: React.FC<Props> = ({
  criteres,
  renderNullable,
}) => {
  const [showAll, setShowAll] = useState(false);

  const visibleCriteres = criteres
    ? showAll
      ? criteres
      : criteres.slice(0, 3)
    : [];

  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">Critères d’évaluation</h2>
          <Separator className="mb-3" />
          {!criteres || criteres.length === 0 ? (
            <span className="italic text-muted-foreground">
              Aucun critère défini
            </span>
          ) : (
            <div className="w-full overflow-hidden space-y-4">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-2/5 break-words whitespace-normal">
                      Nom
                    </TableHead>
                    <TableHead className="w-2/5 break-words whitespace-normal">
                      Description
                    </TableHead>
                    <TableHead className="w-1/5 break-words whitespace-normal">
                      Pondération
                    </TableHead>
                    <TableHead className="w-1/5 break-words whitespace-normal">
                      Éliminatoire
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleCriteres.map((critere, i) => (
                    <TableRow key={i}>
                      <TableCell className="align-top break-words whitespace-normal">
                        {renderNullable(critere.nom_critere)}
                      </TableCell>
                      <TableCell className="align-top break-words whitespace-normal">
                        {renderNullable(critere.description)}
                      </TableCell>
                      <TableCell className="align-top break-words whitespace-normal">
                        {renderNullable(critere.ponderation)}
                      </TableCell>
                      <TableCell className="align-top break-words whitespace-normal">
                        {critere.eliminatoire ? "Oui" : "Non"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {criteres.length > 3 && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowAll((prev) => !prev)}
                  >
                    {showAll ? "Afficher moins" : "Afficher plus"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CriteresEvaluationCard;

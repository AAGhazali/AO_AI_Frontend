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
import { RessourceExigence } from "@/types/AOReport";
import React, { useState } from "react";

interface Props {
  exigences: RessourceExigence[] | null;
  renderNullable: (value: any) => React.ReactNode;
}

const ExigencesRessourcesCard: React.FC<Props> = ({
  exigences,
  renderNullable,
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleExigences = exigences
    ? showAll
      ? exigences
      : exigences.slice(0, 3)
    : [];

  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">
            Exigences des ressources
          </h2>
          <Separator className="mb-3" />
          {!exigences || exigences.length === 0 ? (
            <span className="italic text-muted-foreground">
              Aucune exigence spécifiée
            </span>
          ) : (
            <div className="w-full overflow-hidden space-y-4">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4 break-words whitespace-normal">
                      Titre professionnel
                    </TableHead>
                    <TableHead className="w-2/4 break-words whitespace-normal">
                      Expériences requises
                    </TableHead>
                    <TableHead className="w-1/4 break-words whitespace-normal">
                      Nécessités des ressources
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleExigences.map((exigence, i) => (
                    <TableRow key={i}>
                      <TableCell className="align-top break-words whitespace-normal">
                        {renderNullable(exigence.titre_professionnel)}
                      </TableCell>
                      <TableCell className="align-top break-words whitespace-normal">
                        {exigence.experiences_requises &&
                        exigence.experiences_requises.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1">
                            {exigence.experiences_requises.map((exp, j) => (
                              <li
                                key={j}
                                className="break-words whitespace-normal"
                              >
                                {exp}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="italic text-muted-foreground">
                            Aucune
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="align-top break-words whitespace-normal">
                        {renderNullable(exigence.necessites_ressources)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {exigences.length > 3 && (
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

export default ExigencesRessourcesCard;

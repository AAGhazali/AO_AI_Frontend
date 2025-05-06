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
import { Penalite } from "@/types/AOReport";
import React, { useState } from "react";

interface Props {
  penalites: Penalite[] | null;
  renderNullable: (value: any) => React.ReactNode;
}

const PenalitesCard: React.FC<Props> = ({ penalites, renderNullable }) => {
  const [showAll, setShowAll] = useState(false);

  const visiblePenalites = penalites
    ? showAll
      ? penalites
      : penalites.slice(0, 3)
    : [];

  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">Pénalités</h2>
          <Separator className="mb-3" />
          {!penalites || penalites.length === 0 ? (
            <span className="italic text-muted-foreground">
              Aucune pénalité
            </span>
          ) : (
            <div className="w-full overflow-hidden space-y-4">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2 break-words whitespace-normal">
                      Description
                    </TableHead>
                    <TableHead className="w-1/2 break-words whitespace-normal">
                      Montant
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visiblePenalites.map((penalite, i) => (
                    <TableRow key={i}>
                      <TableCell className="align-top break-words whitespace-normal">
                        {renderNullable(penalite.description)}
                      </TableCell>
                      <TableCell className="align-top break-words whitespace-normal">
                        {renderNullable(penalite.montant)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {penalites.length > 3 && (
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

export default PenalitesCard;

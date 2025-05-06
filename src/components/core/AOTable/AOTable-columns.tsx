import { api } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ao } from "@/types/AO";
import { AoState } from "@/types/AOState";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";

export const AOTableColumns: ColumnDef<Ao>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => renderDate(row.original.date),
  },
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => renderName(row.original.name),
  },
  {
    accessorKey: "state",
    header: "État",
    cell: ({ row }) => renderState(row.original.state),
  },
  {
    accessorKey: "aoUrl",
    header: "Appel d'offres",
    cell: ({ row }) => renderAoUrl(row.original.aoUrl),
    enableSorting: false,
  },
  {
    accessorKey: "reportUrl",
    header: "Rapport",
    cell: ({ row }) => {
      return renderReportUrl(row.original.reportUrl, row.original.state);
    },
    enableSorting: false,
  },
];

function renderDate(date: Date) {
  return (
    <span>
      {date.toLocaleString("fr-CA", {
        timeZone: "America/Toronto",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </span>
  );
}

function renderName(name: string) {
  return <span>{name}</span>;
}

function renderState(state: AoState) {
  switch (state) {
    case AoState.DONE:
      return <Badge className="bg-green-500">Terminé</Badge>;
    case AoState.IN_PROGRESS:
      return (
        <Badge
          className="flex items-center gap-2 border border-accent-foreground"
          variant={"secondary"}
        >
          <Loader2 className="animate-spin w-4 h-4" /> En cours
        </Badge>
      );
    case AoState.PENDING:
      return <Badge className="bg-gray-500">En attente</Badge>;
  }
}

function renderAoUrl(url: string) {
  if (!url) {
    return <span>-</span>;
  }
  return (
    <Button
      onClick={() => window.open(api.getUri() + url, "_blank")}
      variant="secondary"
    >
      Voir
    </Button>
  );
}

function renderReportUrl(url: string, state: unknown) {
  if (state !== AoState.DONE) {
    return <span>-</span>;
  }
  return (
    <Button asChild variant="secondary">
      <Link to={url}>Voir</Link>
    </Button>
  );
}

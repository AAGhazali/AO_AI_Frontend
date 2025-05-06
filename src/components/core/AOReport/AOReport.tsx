import { Button } from "@/components/ui/button";
import { Ao } from "@/types/AO";
import { ErrorBoundary } from "@/utils/ErrorBoundary";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { AOReportViewer } from "./AOReportViewer";
import AOShare from "./AOShare";

interface Props {
  data: Ao;
}

const AOView: React.FC<Props> = ({ data }) => {
  const [showJSON, setShowJSON] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="">
      <div className="flex gap-4 mb-5">
        <Button variant="outline" onClick={() => setShowJSON(!showJSON)}>
          {showJSON ? (
            <EyeOff className="w-4 h-4 mr-2" />
          ) : (
            <Eye className="w-4 h-4 mr-2" />
          )}
          {showJSON ? "Masquer le JSON" : "Voir le JSON"}
        </Button>
        <AOShare reportUrl={currentUrl} ao={data} />
      </div>
      <div className="mb-5 border-b rounded-md p-4 bg-muted">
        <p className="text-sm text-muted-foreground">
          Cet outil se base sur des technologies d’intelligence artificielle, il
          peut donc commettre des erreurs.
        </p>
      </div>

      {showJSON && (
        <div className="bg-muted p-4 rounded-md border max-h-[500px] overflow-auto mb-5">
          <pre className="text-sm text-muted-foreground font-mono whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
      <ErrorBoundary>
        <AOReportViewer report={data.report} />
      </ErrorBoundary>
    </div>
  );
};

export default AOView;

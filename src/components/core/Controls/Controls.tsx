import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useReportGeneration } from "@/hooks/use-reportGeneration";
import { FilePlus, Loader, Upload } from "lucide-react";
import { UploadFilesDialog } from "./utils/UploadFilesDialog";

export default function Controls() {
  const { startGeneration, loading, error } = useReportGeneration();

  return (
    <div className="flex flex-col gap-4 mb-5 w-full">
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mr-5">
              <Upload className="mr-2 h-4 w-4" />
              Téléverser des nouveaux fichiers
            </Button>
          </DialogTrigger>
          <UploadFilesDialog />
        </Dialog>
        <Button variant="outline" onClick={startGeneration} disabled={loading}>
          {loading ? (
            <Loader className="animate-spin mr-2 h-4 w-4" />
          ) : (
            <FilePlus className="mr-2 h-4 w-4" />
          )}
          {loading ? "Génération en cours..." : "Générer les rapports"}
        </Button>
      </div>

      {error && <div className="text-sm text-red-600">❌ {error}</div>}
    </div>
  );
}

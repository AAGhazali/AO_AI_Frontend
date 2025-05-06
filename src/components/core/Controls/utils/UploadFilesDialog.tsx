import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpload } from "@/contexts/upload/upload-context";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { MultiFiles } from "./MultiFiles";

export function UploadFilesDialog() {
  const { uploadAndRefetch, loading } = useUpload();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      try {
        await uploadAndRefetch(selectedFiles);
        toast("Téléversement réussi !", {
          description: "Les fichiers ont été téléversés avec succès.",
        });
      } catch (err) {
        console.error(err);
        toast("Erreur lors du téléversement", {
          description: "Une erreur est survenue.",
        });
      }
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="mb-3">
          Téléverser des nouveaux fichiers
        </DialogTitle>
        <DialogDescription>
          Ajouter des nouveaux fichiers d'appels d'offres pour pouvoir les
          traiter.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <MultiFiles
          maxFiles={10}
          onUpload={(files: File[]) => {
            setSelectedFiles(files);
          }}
        />
        {loading && <p>Uploading...</p>}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" onClick={handleUpload} disabled={loading}>
            Envoyer
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

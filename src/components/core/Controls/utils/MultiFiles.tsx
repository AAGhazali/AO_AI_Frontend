import { useState } from "react";
import { CloudUploadIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileItem {
  file: File;
}

interface MultiFilesProps {
  maxFiles: number;
  onUpload: (files: File[]) => void;
}

export function MultiFiles({ maxFiles, onUpload }: MultiFilesProps) {
  const [files, setFiles] = useState<FileItem[]>([]);

  const updateFiles = (newFiles: FileItem[]) => {
    setFiles(newFiles);
    onUpload(newFiles.map((item) => item.file));
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!event.target.files) return;
    const selectedFiles = Array.from(event.target.files);
    const pdfFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf"
    );
    if (pdfFiles.length + files.length > maxFiles) {
      alert(`Vous ne pouvez téléverser que ${maxFiles} fichiers au maximum.`);
      return;
    }
    const newFiles = pdfFiles.map((file) => ({ file }));
    updateFiles([...files, ...newFiles]);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>): void => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const pdfFiles = droppedFiles.filter(
      (file) => file.type === "application/pdf"
    );
    if (pdfFiles.length + files.length > maxFiles) {
      alert(`Vous ne pouvez téléverser que ${maxFiles} fichiers au maximum.`);
      return;
    }
    const newFiles = pdfFiles.map((file) => ({ file }));
    updateFiles([...files, ...newFiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>): void => {
    event.preventDefault();
  };

  const handleRemoveFile = (index: number): void => {
    const newFiles = files.filter((_, i) => i !== index);
    updateFiles(newFiles);
  };

  return (
    <div className="not-prose flex flex-col gap-4">
      <div>
        <div>
          <div className="flex justify-between mb-2">
            <p>Veuillez sélectionner jusqu'à {maxFiles} PDFs.</p>
          </div>
          <div>
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm border cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <CloudUploadIcon className="size-8" />
              <div>
                <p className="font-semibold">Téléverser</p>
                <p className="text-sm text-muted-foreground">
                  Cliquez ici ou glissez-déposez vos fichiers
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <ul className="mt-4 text-sm max-h-40 overflow-y-auto">
              {files.map((item, index) => (
                <li
                  key={index}
                  className="border rounded-md p-1 m-0.5 flex items-center justify-between"
                >
                  <div>
                    <span>{item.file.name}</span>
                  </div>
                  <Button
                    onClick={() => handleRemoveFile(index)}
                    size="icon"
                    style={{ borderRadius: "8px", border: "none" }}
                  >
                    <Trash className="text-red-400" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

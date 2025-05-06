import { DataTable } from "@/components/utils/DataTable";
import { useAOs } from "@/contexts/ao/ao-context";
import { useUpload } from "@/contexts/upload/upload-context";
import { AOTableColumns } from "./AOTable-columns";

export function AOTable() {
  const { data, error, loading } = useAOs();
  const { loading: uploadLoading } = useUpload();

  const isLoading = uploadLoading || loading;

  if (error) {
    return <p className="text-red-500">Erreur: {error}</p>;
  }

  return (
    <div className={"mb-10"}>
      <DataTable
        data={[...data]}
        columns={AOTableColumns}
        isLoading={isLoading}
      />
    </div>
  );
}

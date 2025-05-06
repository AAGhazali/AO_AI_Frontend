import { AOTable } from "@/components/core/AOTable";
import Controls from "@/components/core/Controls/Controls";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export function Home() {
  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>Accueil</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Controls />
      <AOTable />
    </>
  );
}

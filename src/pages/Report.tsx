import { api } from "@/api";
import AOReport from "@/components/core/AOReport/AOReport";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Ao } from "@/types/AO";
import { AoDto } from "@/types/AO-dto";
import { AOAssembler } from "@/utils/AO-assembler";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export function Report() {
  const { id } = useParams();
  const [Ao, setAo] = useState<Ao | null>(null);

  useEffect(() => {
    api.get<AoDto>(`/aos/${id}`).then((res) => {
      const Ao: Ao = AOAssembler.fromDto(res.data);
      setAo(Ao);
    });
  }, [id]);

  return (
    <div className="container mx-auto">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Accueil</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Rapport</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {Ao && <AOReport data={Ao} />}
    </div>
  );
}

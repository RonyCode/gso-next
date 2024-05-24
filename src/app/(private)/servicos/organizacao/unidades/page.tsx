import React from "react";
import { CardDefault } from "@/components/Cards/CardDefault";
import { LucideBuilding } from "lucide-react";
import { getAllUnidades } from "@/lib/GetAllUnidades";
import { DataTableUnidades } from "@/components/DataTables/DataTableUnidades/data-table-unidades";
import { columnsUnidades } from "@/components/DataTables/DataTableUnidades/columnsUnidades";

const Unidades = async () => {
  const { companies } = await getAllUnidades("15");
  return (
    <>
      <CardDefault
        title="Unidades"
        description="Unidades da minha organização"
        image="https://www.designi.com.br/images/preview/11149946-m.jpg"
        icon={<LucideBuilding />}
      >
        <DataTableUnidades data={companies as []} columns={columnsUnidades} />
      </CardDefault>
    </>
  );
};
export default Unidades;

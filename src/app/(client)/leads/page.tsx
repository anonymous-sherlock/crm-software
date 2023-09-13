import React from "react";
import { LeadsDataTable } from "./data-table";
import { columns } from "./columns";
import { people } from "@/people";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="container py-10 mx-auto bg-white rounded-md">
      <LeadsDataTable columns={columns} data={people} />
    </div>
  );
};

export default Page;

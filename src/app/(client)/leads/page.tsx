import { SearchBox } from "@/components/SearchBox";
import { FC } from "react";
import { DataTable } from "./data-table";
import { Leads, columns } from "./columns";

async function getData(): Promise<Leads[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      name: "Akash Layal",
      phone: "789456456487",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      name: "Anubhave",
      phone: "789456456487",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "On hold",
      name: "BAssi",
      phone: "789456456487",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "approved",
      name: "shavy",
      phone: "789456456487",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      name: "kamlesh",
      phone: "789456456487",
    },
    // ...
  ];
}

const page = async ({}) => {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
};

export default page;

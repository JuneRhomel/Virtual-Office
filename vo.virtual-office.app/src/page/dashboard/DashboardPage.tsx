import { useState } from "react";
import { BottonModel } from "../../model/model";
import { Input } from "../../components/UI/UiComponents";
import { useSort } from "@table-library/react-table-library/sort";
import Layout from "../../components/Layout/Layout";
import style from "./Dashboard.module.css"
import PageLayout from "../../components/PageLayout/PageLayout";
import getData from "../../services/api/getData";
import Table from "../../components/Table/Table";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const nodes = getData()
  let data = { nodes };
  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearch(event.target.value);
  };

  data = {
    nodes: data.nodes.filter((item: { firstname: string; lastname: string; email: string; contactNo: string; }) =>
      item.firstname.toLowerCase().includes(search.toLowerCase()) ||
      item.lastname.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.contactNo.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.firstname.localeCompare(b.firstname)),
        DEADLINE: (array) => array.sort((a, b) => a.lastname - b.lastname),
        TYPE: (array) => array.sort((a, b) => a.email.localeCompare(b.email)),
        COMPLETE: (array) => array.sort((a, b) => a.contactNo - b.contactNo),
      },
    }
  );
  function onSortChange(action: any, state: any) {
    // console.log(action, state);
  }

  const COLUMNS = [
    { label: "First Name", renderCell: (item: { firstname: string; }) => item.firstname, sort: { sortKey: "a-z" }, },
    { label: "Last Name", renderCell: (item: { lastname: string; }) => item.lastname, sort: { sortKey: "a-z" } },
    { label: "Email", renderCell: (item: { email: string; }) => item.email, sort: { sortKey: "a-z" } },
    { label: "Contact No.", renderCell: (item: { contactNo: string; }) => item.contactNo, sort: { sortKey: "a-z" } },
  ];
  const buttons = [
    {
      label: "Add User",
      onClick: () => console.log("Add User"),
    },
    {
      label: "Download",
      onClick: () => console.log("Delete"),
    }
  ]
  return (
    <Layout >
      <PageLayout title={"Dashboard"} btn={buttons as BottonModel[]}>
        <div className={style.search}>
          <Input id="search" type="text" value={search} onChange={handleSearch} label="Search" />
        </div>
        <Table COLUMNS={COLUMNS} data={data} sort={sort} />
      </PageLayout>
    </Layout>
  )
}


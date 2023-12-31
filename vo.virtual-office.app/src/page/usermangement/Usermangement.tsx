import { useState } from "react";
import { BottonModel } from "../../model/model";
import { Input } from "../../components/UI/UiComponents";
import { useSort } from "@table-library/react-table-library/sort";
import Layout from "../../components/Layout/Layout";
import style from "./Usermangement.module.css"
import PageLayout from "../../components/PageLayout/PageLayout";
import getData from "../../services/api/getData";
import Table from "../../components/Table/Table";
import PopupForm from "../../components/PopupForm/PopupForm";
import { useDispatch,  } from "react-redux";
import { setStatus } from "../../redux/helperSlice";

export default function Usermangement() {
  const dispatch = useDispatch()
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
  function onSortChange() {
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
      onClick: () => dispatch(setStatus()),
    },
    {
      label: "Download",
      onClick: () => console.log("Delete"),
    }
  ]
  return (
    <Layout >
      <PageLayout title={"User Management"} btn={buttons as BottonModel[]}>
        <div className={style.search}>
          <Input id="search" type="text" value={search} onChange={handleSearch} label="Search" name="search" />
        </div>
        <Table COLUMNS={COLUMNS} data={data} sort={sort} />
      </PageLayout>
      <PopupForm title="Add User"  />


    </Layout>
  )
}


import { BottonModel } from "../../model/model";
import Layout from "../../components/Layout/Layout";
import style from "./Dashboard.module.css"
import PageLayout from "../../components/PageLayout/PageLayout";


export default function DashboardPage() {

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
      <PageLayout title={"User Management"} btn={buttons as BottonModel[]}>
          Test
      </PageLayout>
    </Layout>
  )
}


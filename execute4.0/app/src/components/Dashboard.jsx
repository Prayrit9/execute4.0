import UploadFile from "../components/UploadFile";
import DataTable from "../components/DataTable";
import ChartGenerator from "../components/ChartGenerator";

const Dashboard = () => {
  return (
    <div>
      <h1>MOOLI-BI</h1>
      <UploadFile />
      <DataTable />
      <ChartGenerator />
    </div>
  );
};

export default Dashboard;

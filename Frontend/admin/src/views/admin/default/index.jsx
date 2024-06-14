import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

// import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import Widget from "components/widget/Widget";
// import CheckTable from "views/admin/default/components/CheckTable";
// import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import { useEffect, useState } from "react";
import api from "http/ApiService";
// import TaskCard from "views/admin/default/components/TaskCard";
// import tableDataCheck from "./variables/tableDataCheck.json";
// import tableDataComplex from "./variables/tableDataComplex.json";

const Dashboard = () => {

  const [datas,setDatas] = useState({})

  useEffect(()=>{

    (
      async ()=>{
        const result = await api.getDatas('admin/misc/datas')
        setDatas(result)
      }

    )()
 
  },[])

  const totalOrderedUsers = datas && datas.allOrders?.map((order)=>{
    return{
      userId : order.user._id
    }
  })

  const uniqueTotalOrderedUsers = [...new Set(totalOrderedUsers?.map(user=>user.userId))]
  console.log(uniqueTotalOrderedUsers);


  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Orders"}
          subtitle={datas.orders}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Total Users"}
          subtitle={datas.users}
        />
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={"Total Types of Burger"}
            subtitle={"8"}
          />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"Rs.250000/-"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Bank Balance"}
          subtitle={"Rs.95990/-"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Profit"}
          subtitle={"Rs.90550/-"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        {/* <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div> */}

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}

        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          {/* <TaskCard /> */}
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

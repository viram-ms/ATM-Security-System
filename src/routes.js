// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import TableList from "views/TableList/TableList.jsx";
import UserManagement from "views/UserManagement/UserManagement.jsx";
import ReportManagement from "views/ReportManagement/ReportManagement.jsx";
import Notification from "views/Notifications/Notifications.jsx";
import Atm from '@material-ui/icons/Atm';
import ListAlt from '@material-ui/icons/ListAlt';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Notifications from '@material-ui/icons/Notifications';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/atm-management",
    name: "ATM Management",
    icon: Atm,
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/user-management",
    name: "User Management",
    icon: SupervisedUserCircle,
    component: UserManagement,
    layout: "/admin"
  },
  {
    path: "/report-management",
    name: "Reports",
    icon: ListAlt,
    component: ReportManagement,
    layout: "/admin"
  },
  {
    path: "/notification",
    name: "Notifications",
    icon: Notifications,
    component: Notification,
    layout: "/admin"
  }
];

export default dashboardRoutes;

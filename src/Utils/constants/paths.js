import CreateEmployee from "../../components/CreateEmployee/CreateEmployee";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import Home from "../../components/Home";
// import Login from "../../components/Login";

const paths = [

    {
        path: "/employeelist",
        element: EmployeeList,
    },
    {
        path: "/",
        element: Home,
    },
    {
        path: "/createemployee",
        element: CreateEmployee,
    }
];

export default paths;
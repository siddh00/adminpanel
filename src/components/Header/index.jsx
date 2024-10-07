import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();

  const Logo = async () => {
    return await import("../../../public/Logo.png");
  };

  const logout = () => {
    navigate("/login");
    Cookies.remove("token");
  };
  return (
    <>
      <div className="headerContainer">
        <div
          style={{ paddingBottom: "20px", paddingLeft: "10px" }}
          className="logo"
        >
          <Link to={"/"}>
            <img
              src={"../../../public/Logo.png"}
              alt="Logo"
              style={{
                maxHeight: "50px",
                maxWidth: "100px",
                minWidth: "80px",
                minHeight: "45px",
                //   paddingBottom: "15px",
              }}
            />{" "}
          </Link>
        </div>
        <ul className="listContainer">
          <Link to={"/"}>
            <li className="listElement">Home</li>
          </Link>
          <Link to={"/employeelist"}>
            <li className="listElement">Employee List</li>
          </Link>
          <li className="listElement">
            User : <b>{Cookies.get("role").toUpperCase()}</b>
          </li>
          <li>
            <button onClick={logout} className="logoutbutton">
              logout
            </button>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Header;

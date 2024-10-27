// TODO: answer here
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "5vh",
        backgroundColor: "#4a36ff",
        justifyContent: "space-between",
      }}
    >
      <Link
        to={"/"}
        data-testid="home-page"
        style={{
          color: "white",
          textDecoration: "none",
          backgroundColor: "#ff36e1",
        }}
      >
        Student Portal
      </Link>
      <Link
        to={"/student"}
        data-testid="student-page"
        style={{
          color: "white",
          textDecoration: "none",
          backgroundColor: "#ff36e1",
        }}
      >
        All Student
      </Link>
      <Link
        to={"/add"}
        data-testid="add-page"
        style={{
          color: "white",
          textDecoration: "none",
          backgroundColor: "#ff36e1",
        }}
      >
        Add Student
      </Link>
    </nav>
  );
};

export default NavBar;

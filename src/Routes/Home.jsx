// TODO: answer here
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          data-testid="student-btn"
          style={{
            backgroundColor: "#00004d",
            color: "#eaeaea",
          }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/student");
          }}
        >
          All Student
        </button>
      </div>
    </>
  ); // TODO: replace this
};

export default Home;

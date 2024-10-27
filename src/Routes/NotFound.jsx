// TODO: answer here
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className=""
        style={{
          backgroundColor: "red",
          color: "white",
        }}
      >
        <h1>404 | Not Found</h1>
      </div>
    </>
  );
};

export default NotFound;

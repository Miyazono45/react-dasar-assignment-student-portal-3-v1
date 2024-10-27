// TODO: answer here
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

const url = "http://localhost:3001";

const Student = () => {
  const [dataSiswa, setDataSiswa] = useState("");
  const [isAll, setIsAll] = useState(true);
  const [selectFac, setSelectFac] = useState(null);
  const setFaculty = new Set();

  const dSiswa =
    dataSiswa &&
    dataSiswa.map((val, index) => {
      setFaculty.add(val.faculty);
      return (
        <>
          <tr key={index} className="student-data-row">
            <td>{index}</td>
            <td>
              <Link to={`http://localhost:3000/student/${val.id}`}>
                {val.fullname}
              </Link>
            </td>
            <td>{val.faculty}</td>
            <td>{val.programStudy}</td>
            <td>
              <button
                type="button"
                className="delete-btn"
                data-testid={`delete-${val.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  deleteDataSiswa(val.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        </>
      );
    });

  function fetchDataSiswa() {
    fetch(`${url}/student`)
      .then((res) => res.json())
      .then((res) => {
        setDataSiswa(res);
      })
      .catch((err) => console.log(err));
  }

  function deleteDataSiswa(id) {
    fetch(`${url}/student/${id}`, {
      method: "DELETE",
    }).then((res) => fetchDataSiswa());
  }

  function postDataSiswa(props) {
    fetch(`${url}/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    }).then(() => fetchDataSiswa());
    console.log(props);
  }

  useEffect(() => {
    fetchDataSiswa();
  }, []);

  function DropdownChange(target) {
    const tempArr = new Array();
    let count = 0;
    dataSiswa.filter((val, index) => {
      if (val.faculty === target) {
        tempArr.push(
          <>
            <tr key={index} className="student-data-row">
              <td>{count}</td>
              <td
                style={{
                  backgroundColor: "#000",
                }}
              >
                <Link to={`http://localhost:3000/student/${val.id}`}>
                  {val.fullname}
                </Link>
              </td>
              <td>{val.faculty}</td>
              <td>{val.programStudy}</td>
              <td>
                <button
                  type="button"
                  className="delete-btn"
                  data-testid={`delete-${val.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    deleteDataSiswa(val.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          </>
        );
        count++;
      }
    });
    setSelectFac(tempArr);
  }

  const arrFaculty = Array.from(setFaculty);

  return (
    <>
      {dataSiswa == "" ? (
        <p>Loading ...</p>
      ) : (
        <>
          <NavBar />
          {/* <DropdownFilter /> */}

          {/* Dropdown list */}
          <select
            name=""
            id=""
            data-testid="filter"
            onChange={(e) => {
              if (e.target.value !== "All") {
                setIsAll(false);
                DropdownChange(e.target.value, arrFaculty);
              } else if (e.target.value === "All") {
                setIsAll(true);
              }
            }}
          >
            <option value="All">All</option>
            {arrFaculty.map((fac, index) => {
              return <option key={index} value={`${fac}`}>{`${fac}`}</option>;
            })}
          </select>

          <table id="table-student">
            <thead className="">
              <tr>
                <th>No</th>
                <th>Full Name</th>
                <th>Faculty</th>
                <th>Program Study</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>{isAll == true ? dSiswa : selectFac}</tbody>
          </table>
          <Outlet />
        </>
      )}
    </>
  );
};

// select with set()
// filter using map.filter

export default Student;

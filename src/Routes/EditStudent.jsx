// TODO: answer here
import { Outlet } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";

const EditStudent = (props) => {
  // TODO: answer here
  const { id } = useParams();
  const [dataUser, setDataUser] = useState("sss");
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("Male");
  const [prody, setPrody] = useState("Ekonomi");
  const [faculty, setFaculty] = useState("Fakultas Ekonomi");

  const listFaculty = {
    Ekonomi: "Fakultas Ekonomi",
    Manajemen: "Fakultas Ekonomi",
    Akuntansi: "Fakultas Ekonomi",
    "Administrasi Publik": "Fakultas Ilmu Sosial dan Politik",
    "Administrasi Bisnis": "Fakultas Ilmu Sosial dan Politik",
    "Hubungan Internasional": "Fakultas Ilmu Sosial dan Politik",
    "Teknik Sipil": "Fakultas Teknik",
    Arsitektur: "Fakultas Teknik",
    Matematika: "Fakultas Teknologi Informasi dan Sains",
    Fisika: "Fakultas Teknologi Informasi dan Sains",
    Informatika: "Fakultas Teknologi Informasi dan Sains",
  };

  async function fetchData() {
    fetch(`http://localhost:3001/student/${id}`)
      .then((resp) => resp.json())
      .then((res) => setDataUser(res))
      // .then(() => console.log(dataUser))
      .catch((err) => console.error(err));
  }

  const putData = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3001/student/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: name,
        profilePicture: picture,
        address: address,
        phoneNumber: phone,
        birthDate: birthdate,
        gender: gender,
        faculty: faculty,
        programStudy: prody,
      }),
    })
      .then((res) => res.json())
      // I DONT KNOW WHY IT NEED CODE BELOW IT LOLLL
      .then((data) => {
        if (data.error) {
          console.log(data);
          return;
        }
        navigate("/student");
      });
  };

  // function putData(data) {
  //   fetch(`http://localhost:3001/student/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then((res) => res.json());
  //   console.log(JSON.stringify(data));
  // }

  useEffect(() => {
    fetch(`http://localhost:3001/student/${id}`)
      .then((resp) => resp.json())
      .then((res) => {
        setDataUser(res);
        setName(res.fullname);
        setPicture(res.profilePicture);
        setAddress(res.address);
        setPhone(res.phoneNumber);
        setBirthdate(res.birthDate);
        setGender(res.gender);
        setPrody(res.programStudy);
        setFaculty(res.faculty);
      })
      // .then(() => console.log(dataUser))
      .catch((err) => console.error(err));
  }, []);

  const FormUser = (
    <form action="" id="form-student" onSubmit={putData}>
      <label for="input-name">Fullname</label>
      <input
        id="input-name"
        type="text"
        data-testid="name"
        required
        onChange={(e) => setName(e.target.value)}
        defaultValue={dataUser.fullname}
      />

      <label>Profile Picture</label>
      <img src={dataUser.profilePicture} alt="wkwkkwkwkw" />
      {/* <input
        type="text"
        data-testid="profilePicture"
        required
        onChange={(e) => setPicture(e.target.value)}
      /> */}

      <label>Address</label>
      <input
        type="text"
        data-testid="address"
        required
        onChange={(e) => setAddress(e.target.value)}
        defaultValue={dataUser.address}
      />

      <label>Phone Number</label>
      <input
        type="text"
        data-testid="phoneNumber"
        required
        onChange={(e) => setPhone(e.target.value)}
        defaultValue={dataUser.phoneNumber}
      />

      <label>Birth Date</label>
      <input
        type="date"
        data-testid="date"
        required
        onChange={(e) => setBirthdate(e.target.value)}
        defaultValue={dataUser.birthDate}
      />

      <label>Gender</label>
      <select
        data-testid="gender"
        required
        onChange={(e) => setGender(e.target.value)}
        defaultValue={dataUser.gender}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <label>Program Study</label>
      <select
        data-testid="prody"
        required
        defaultValue={dataUser.programStudy}
        onChange={(e) => {
          setPrody(e.target.value);
          setFaculty(listFaculty[e.target.value]);
        }}
      >
        <option value="Ekonomi">Ekonomi</option>
        <option value="Manajemen">Manajemen</option>
        <option value="Akuntansi">Akuntansi</option>
        <option value="Administrasi Publik">Administrasi Publik</option>
        <option value="Administrasi Bisnis">Administrasi Bisnis</option>
        <option value="Hubungan Internasional">Hubungan Internasional</option>
        <option value="Teknik Sipil">Teknik Sipil</option>
        <option value="Arsitektur">Arsitektur</option>
        <option value="Matematika">Matematika</option>
        <option value="Fisika">Fisika</option>
        <option value="Informatika">Informatika</option>
      </select>

      <input
        type="submit"
        value="Edit student"
        // id="add-btn"
        data-testid="edit-btn"
        // onClick={}
      />
    </form>
  );

  return (
    <>
      <NavBar />
      {dataUser === "sss" ? <p>Loading ...</p> : FormUser}
    </>
  );
};

export default EditStudent;

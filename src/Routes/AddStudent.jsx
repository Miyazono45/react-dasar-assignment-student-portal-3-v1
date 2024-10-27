import { useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO: answer here
import NavBar from "../components/Navbar";

// const url = "http://localhost:3001";

const AddStudent = () => {
  const [dataSiswa, setDataSiswa] = useState("");
  const navigate = useNavigate();
  // TODO: answer here
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

  function fetchDataSiswa() {
    fetch(`http://localhost:3001/student`)
      .then((res) => res.json())
      .then((res) => {
        setDataSiswa(res);
      })
      .catch((err) => console.log(err));
  }

  function postDataSiswa(props) {
    fetch(`http://localhost:3001/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    })
      .then(() => fetchDataSiswa())
      .then(() => {
        navigate("/student");
      });
    console.log(props);
  }

  return (
    <>
      <NavBar />
      <form
        action=""
        id="form-student"
        onSubmit={(e) => {
          e.preventDefault();
          postDataSiswa({
            // id: jaga jaga
            fullname: name,
            profilePicture: picture,
            address: address,
            phoneNumber: phone,
            birthDate: birthdate,
            gender: gender,
            faculty: faculty,
            programStudy: prody,
          });
        }}
      >
        <label>Fullname</label>
        <input
          type="text"
          data-testid="name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label>Profile Picture</label>
        <input
          type="text"
          data-testid="profilePicture"
          required
          onChange={(e) => setPicture(e.target.value)}
        />

        <label>Address</label>
        <input
          type="text"
          data-testid="address"
          required
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>Phone Number</label>
        <input
          type="text"
          data-testid="phoneNumber"
          required
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Birth Date</label>
        <input
          type="date"
          data-testid="date"
          required
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <label>Gender</label>
        <select
          data-testid="gender"
          required
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Program Study</label>
        <select
          data-testid="prody"
          required
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

        <button
          type="submit"
          value="Add student"
          id="add-btn"
          data-testid="add-btn"
        >
          Add student
        </button>
      </form>
    </>
  );
};

export default AddStudent;

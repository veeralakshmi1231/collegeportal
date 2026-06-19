import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Students() {

  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [search, setSearch] = useState("");

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);

  const fetchStudents = () => {

    axios
      .get("http://localhost:5000/students")
      .then((response) => {

        setStudents(response.data);
      });
  };

  const handleAddStudent = () => {

    if (
      !name ||
      !email ||
      !department ||
      !dob ||
      !gender
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("image", profileImage);

    axios
      .post("http://localhost:5000/upload", formData)
      .then((uploadResponse) => {

        const imageName = uploadResponse.data;
        console.log(imageName);

        if (editId) {

          axios
            .put(
              `http://localhost:5000/updateStudent/${editId}`,
              {
                name,
                email,
                department,
                dob,
                gender,
                profile_image: imageName
              }
            )
            .then((response) => {

              alert(response.data);

              setLoading(false);

              fetchStudents();

              setShowForm(false);

              setEditId(null);

              setName("");
              setEmail("");
              setDepartment("");
              setDob("");
              setGender("");
            });

        } else {

          axios
            .post(
              "http://localhost:5000/addStudent",
              {
                name,
                email,
                department,
                dob,
                gender,
                profile_image: imageName
              }
            )
            .then((response) => {

              alert(response.data);

              setLoading(false);

              fetchStudents();

              setShowForm(false);

              setName("");
              setEmail("");
              setDepartment("");
              setDob("");
              setGender("");
            });
        }
      });
  };

  const handleEdit = (student) => {

    setName(student.name);

    setEmail(student.email);

    setDepartment(student.department);

    setDob(student.dob);

    setGender(student.gender);

    setEditId(student.id);

    setShowForm(true);
  };

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (confirmDelete) {

      axios
        .delete(
          `http://localhost:5000/deleteStudent/${id}`
        )
        .then((response) => {

          alert(response.data);

          fetchStudents();
        });
    }
  };
  const handleStatus = (id) => {

  axios
    .put(
      `http://localhost:5000/toggleStatus/${id}`
    )
    .then((response) => {

      fetchStudents();
    });
};

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    navigate("/");
  };

  useEffect(() => {

    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {

      navigate("/");
    }

    fetchStudents();

  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          width: "250px",
          backgroundColor: "#0f172a",
          color: "white",
          padding: "20px"
        }}
      >

        <h2>College Portal</h2>

        <ul
          style={{
            listStyle: "none",
            padding: "0",
            marginTop: "30px"
          }}
        >

          <li
            onClick={() => navigate("/dashboard")}
            style={{
              marginBottom: "20px",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            📊 Dashboard
          </li>

          <li
            style={{
              marginBottom: "20px",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: "#1e293b",
              boxShadow:
                "0px 0px 10px rgba(59,130,246,0.5)"
            }}
          >
            🎓 Students
          </li>

          <li onClick={()=>navigate("/departments")}
            style={{
              marginBottom: "20px",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            🏫 Departments
          </li>

          <li onClick={() => navigate("/staffs")}
            style={{
              marginBottom: "20px",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            👩‍🏫 Staffs
          </li>

          <li
            onClick={() => navigate("/")}
            style={{
              marginTop: "40px",
              padding: "14px",
              borderRadius: "12px",
              cursor: "pointer",
              backgroundColor: "#dc2626",
              textAlign: "center",
              transition: "0.3s"
            }}
          >
            🚪 Logout
          </li>

        </ul>

      </div>

      <div
        style={{
          flex: "1",
          backgroundColor: "#f1f5f9"
        }}
      >

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow:
              "0px 2px 10px rgba(0,0,0,0.1)"
          }}
        >

          <div>

            <h1>Students</h1>

            <p
              style={{
                color: "gray",
                marginTop: "5px"
              }}
            >
              Manage student records
            </p>

          </div>

          <button
            onClick={() => {

              setShowForm(true);

              setEditId(null);

              setName("");
              setEmail("");
              setDepartment("");
              setDob("");
              setGender("");
            }}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "10px",
              background:
                "linear-gradient(to right, #2563eb, #3b82f6)",
              color: "white",
              cursor: "pointer"
            }}
          >
            + Add Student
          </button>

        </div>

        <div
          style={{
            padding: "20px"
          }}
        >

          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow:
                "0px 2px 10px rgba(0,0,0,0.1)"
            }}
          >

            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                marginBottom: "20px",
                boxSizing: "border-box"
              }}
            />

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse"
              }}
            >

              <thead>

                <tr
                  style={{
                    borderBottom:
                      "1px solid #e2e8f0"
                  }}
                >

                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left"
                    }}
                  >
                    ID
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left"
                    }}
                  >
                    Photo
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left"
                    }}
                  >
                    Name
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left"
                    }}
                  >
                    Email
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left"
                    }}
                  >
                    Department
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left"
                    }}
                  >
                    DOB
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left"
                    }}
                  >
                    Gender
                  </th>
                  <th>
                    Status
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left"
                    }}
                  >
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {students
                  .filter((student) =>
                    student.name
                      .toLowerCase()
                      .includes(
                        search.toLowerCase()
                      )
                  )
                  .map((student,index) => (

                    <tr
                      key={student.id}
                      style={{
                        borderBottom:
                          "1px solid #e2e8f0"
                      }}
                    >

                      <td
                        style={{
                          padding: "12px"
                        }}
                      >
                        {index + 1}
                      </td>

                      <td
                        style={{
                          padding: "12px"
                        }}
                      >

                        <img
  src={`http://localhost:5000/uploads/${student.profile_image}`}
  alt="profile"
  style={{
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    objectFit: "cover"
  }}
/>

                      </td>

                      <td
                        style={{
                          padding: "12px"
                        }}
                      >
                        {student.name}
                      </td>

                      <td
                        style={{
                          padding: "12px"
                        }}
                      >
                        {student.email}
                      </td>

                      <td
                        style={{
                          padding: "12px"
                        }}
                      >
                        {student.department}
                      </td>

                      <td
                        style={{
                          padding: "12px"
                        }}
                      >
                        {new Date(student.dob)
  .toLocaleDateString("en-GB")}
                      </td>

                      <td
                        style={{
                          padding: "12px"
                        }}
                      >
                        {student.gender}
                      </td>
                      <td
  style={{
    padding: "12px"
  }}
>

  <button
    onClick={() =>
      handleStatus(student.id)
    }
    style={{
      padding: "8px 12px",
      border: "none",
      borderRadius: "8px",

      backgroundColor:
        student.status === "Active"
          ? "#16a34a"
          : "#dc2626",

      color: "white",
      cursor: "pointer"
    }}
  >
    {student.status}
  </button>

</td>

                      <td
                        style={{
                          padding: "12px"
                        }}
                      >

                        <button
                          onClick={() =>
                            handleEdit(student)
                          }
                          style={{
                            marginRight: "10px",
                            padding: "8px 12px",
                            border: "none",
                            borderRadius: "8px",
                            backgroundColor: "#2563eb",
                            color: "white",
                            cursor: "pointer"
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(student.id)
                          }
                          style={{
                            padding: "8px 12px",
                            border: "none",
                            borderRadius: "8px",
                            backgroundColor: "#dc2626",
                            color: "white",
                            cursor: "pointer"
                          }}
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {showForm && (

        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor:
              "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >

          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "400px"
            }}
          >

            <h2
              style={{
                marginBottom: "20px"
              }}
            >
              {editId
                ? "Update Student"
                : "Add Student"}
            </h2>

            <input
              type="text"
              placeholder="Student Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "10px",
                border:
                  "1px solid #cbd5e1",
                boxSizing: "border-box"
              }}
            />

            <input
              type="email"
              placeholder="Student Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "10px",
                border:
                  "1px solid #cbd5e1",
                boxSizing: "border-box"
              }}
            />

            <input
              type="date"
              value={dob}
              onChange={(e) =>
                setDob(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "10px",
                border:
                  "1px solid #cbd5e1",
                boxSizing: "border-box"
              }}
            />

            <select
              value={gender}
              onChange={(e) =>
                setGender(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "10px",
                border:
                  "1px solid #cbd5e1",
                boxSizing: "border-box"
              }}
            >

              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

            </select>

            <input
              type="file"
              onChange={(e) =>
                setProfileImage(
                  e.target.files[0]
                )
              }
              style={{
                width: "100%",
                marginBottom: "15px"
              }}
            />

            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "10px",
                border:
                  "1px solid #cbd5e1",
                boxSizing: "border-box"
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between"
              }}
            >

              <button
                onClick={handleAddStudent}
                style={{
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                {loading
                  ? "Saving..."
                  : editId
                  ? "Update"
                  : "Save"}
              </button>

              <button
                onClick={() =>
                  setShowForm(false)
                }
                style={{
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "#dc2626",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Students;
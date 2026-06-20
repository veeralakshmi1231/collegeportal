import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";

function Staffs() {

  const navigate = useNavigate();

  const [staffs, setStaffs] = useState([]);
  const [showModal, setShowModal] =
useState(false);

const [staffName, setStaffName] =
useState("");

const [email, setEmail] =
useState("");

const [department, setDepartment] =
useState("");
const addStaff = () => {

    axios
      .post(
        `${API_BASE_URL}/addStaff`,
        {
          staff_name: staffName,
          email: email,
          department: department
        }
      )
      .then(() => {

        alert("Staff Added");

        window.location.reload();
      });
  };


  useEffect(() => {

    axios
      .get(`${API_BASE_URL}/staffs`)
      .then((response) => {

        setStaffs(response.data);
      });

  }, []);
  const deleteStaff = (id) => {

  axios
    .delete(
      `${API_BASE_URL}/deleteStaff/${id}`
    )
    .then(() => {

      alert("Staff Deleted");

      window.location.reload();
    });
};

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >

      {/* Sidebar */}

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
              
            }}
          >
            🎓 Students
          </li>

          <li onClick={()=>navigate("/departments")}
            style={{
              marginBottom: "20px",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              
            }}
          >
            🏫 Departments
          </li>

          <li onClick={() => navigate("/staffs")}
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

      {/* Main Content */}

      <div
        style={{
          flex: 1,
          backgroundColor: "#e2e8f0",
          padding: "30px"
        }}
      >

        {/* Header */}

        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "18px",
            marginBottom: "30px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
          }}
        >

          <h1
            style={{
              fontSize: "42px",
              marginBottom: "10px"
            }}
          >
            👩‍🏫 Staff Management
          </h1>

          <p
            style={{
              color: "gray",
              fontSize: "18px"
            }}
          >
            Manage all staff records and departments
          </p>

        </div>

        {/* Table Section */}

        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
          }}
        >
          <button
                  onClick={() => setShowModal(true)}

                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginBottom: "20px"
                  }}
                >
                  + Add Staff
                </button>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >

            <thead>

              <tr
                style={{
                  backgroundColor: "#f1f5f9"
                }}
              >

                <th
                  style={{
                    padding: "15px",
                    textAlign: "left"
                  }}
                >
                  ID
                </th>

                <th
                  style={{
                    padding: "15px",
                    textAlign: "left"
                  }}
                >
                  Name
                </th>

                <th
                  style={{
                    padding: "15px",
                    textAlign: "left"
                  }}
                >
                  Email
                </th>

                <th
                  style={{
                    padding: "15px",
                    textAlign: "left"
                  }}
                >
                  Department
                </th>

                <th
  style={{
    textAlign: "center"
  }}
>
  Actions
</th>
                </tr>

            </thead>

                

              

            <tbody>

              {staffs.map((staff, index) => (

                <tr
                  key={staff.id}
                  style={{
                    borderBottom: "1px solid #e2e8f0"
                  }}
                >

                  <td
                    style={{
                      padding: "18px"
                    }}
                  >
                    {index + 1}
                  </td>

                  <td
                    style={{
                      padding: "18px",
                      fontWeight: "bold"
                    }}
                  >
                    {staff.staff_name}
                  </td>

                  <td
                    style={{
                      padding: "18px"
                    }}
                  >
                    {staff.email}
                  </td>

                  <td
                    style={{
                      padding: "18px"
                    }}
                  >
                    {staff.department}
                  </td>
                  <td
  style={{
    textAlign: "center"
  }}
>
  <button
    onClick={() => deleteStaff(staff.id)}
    style={{
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "8px",
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

        {/* Footer */}

        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            color: "gray",
            fontSize: "14px"
          }}
        >
          © 2026 College ERP Portal | Developed by Admin Team
        </div>

      </div>
      {
  showModal && (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
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

        <h2>Add Staff</h2>

        <input
          type="text"
          placeholder="Staff Name"
          value={staffName}
          onChange={(e) => setStaffName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px"
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px"
          }}
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px"
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px"
          }}
        >

          <button
            onClick={addStaff}
            style={{
              padding: "10px 20px",
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "8px"
            }}
          >
            Save
          </button>

          <button
            onClick={() => setShowModal(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "8px"
            }}
          >
            Close
          </button>

        </div>

      </div>

    </div>
  )
}

    </div>
    
  );
}

export default Staffs;
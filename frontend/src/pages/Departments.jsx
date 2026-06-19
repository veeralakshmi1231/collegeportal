axios.get("http://localhost:5000/departmentStats")
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Departments() {

  const navigate = useNavigate();

  const [departments, setDepartments] =
    useState([]);

  useEffect(() => {

    axios
      .get(
        "http://localhost:5000/departmentStats"
      )
      .then((response) => {

        setDepartments(response.data);
      });

  }, []);

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

          <li onClick={() => navigate("/students")}
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
              backgroundColor: "#1e293b",
              boxShadow:
                "0px 0px 10px rgba(59,130,246,0.5)"
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
            🏫 Departments
          </h1>

          <p
            style={{
              color: "gray",
              fontSize: "18px"
            }}
          >
            Department wise student statistics
          </p>

        </div>

        {/* Cards */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px"
          }}
        >

          <div
            style={{
              flex: 1,
              background:
                "linear-gradient(to right, #2563eb, #3b82f6)",
              color: "white",
              padding: "25px",
              borderRadius: "18px"
            }}
          >

            <h3>Total Departments</h3>

            <h1
              style={{
                marginTop: "15px"
              }}
            >
              {departments.length}
            </h1>

          </div>

          <div
            style={{
              flex: 1,
              background:
                "linear-gradient(to right, #059669, #10b981)",
              color: "white",
              padding: "25px",
              borderRadius: "18px"
            }}
          >

            <h3>Total Students</h3>

            <h1
              style={{
                marginTop: "15px"
              }}
            >
              {departments.reduce(
                (total, dept) =>
                  total + dept.totalStudents,
                0
              )}
            </h1>

          </div>

        </div>

        {/* Table */}

        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0px 2px 10px rgba(0,0,0,0.1)"
          }}
        >
          <div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "30px"
  }}
>

  <div
    style={{
      flex: 1,
      background: "linear-gradient(to right,#2563eb,#3b82f6)",
      color: "white",
      padding: "25px",
      borderRadius: "18px"
    }}
  >
    <h3>Total Departments</h3>
    <h1>{departments.length}</h1>
  </div>

  <div
    style={{
      flex: 1,
      background: "linear-gradient(to right,#059669,#10b981)",
      color: "white",
      padding: "25px",
      borderRadius: "18px"
    }}
  >
    <h3>Total Students</h3>
    <h1>
      {departments.reduce(
        (total, dept) =>
          total + dept.totalStudents,
        0
      )}
    </h1>
  </div>

  <div
    style={{
      flex: 1,
      background: "linear-gradient(to right,#9333ea,#a855f7)",
      color: "white",
      padding: "25px",
      borderRadius: "18px"
    }}
  >
    <h3>Top Department</h3>
    <h1>
      {
        departments.length > 0
          ? departments.reduce(
              (a, b) =>
                a.totalStudents >
                b.totalStudents
                  ? a
                  : b
            ).department
          : "-"
      }
    </h1>
  </div>

</div>
<h2
  style={{
    marginBottom: "20px"
  }}
>
  Department Statistics
</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >

            <thead>

              <tr
                style={{
                  backgroundColor: "#f1f5f9",
                  cursor: "pointer",
transition: "0.3s"
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
                  Department
                </th>

                <th
                  style={{
                    padding: "15px",
                    textAlign: "left"
                  }}
                >
                  Total Students
                </th>

              </tr>

            </thead>

            <tbody>

              {departments.map(
                (department, index) => (

                  <tr
                    key={index}
                    style={{
                      borderBottom:
                        "1px solid #e2e8f0"
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
                      {department.department}
                    </td>

                    <td
                      style={{
                        padding: "18px"
                      }}
                    >
                      {department.totalStudents}
                    </td>

                  </tr>

                )
              )}

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

    </div>
  );
}

export default Departments;
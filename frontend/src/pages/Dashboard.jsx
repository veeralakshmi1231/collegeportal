import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalStaffs, setTotalStaffs] = useState(0);
  const [recentStudents, setRecentStudents] =
  useState([]);
  const [staffCount, setStaffCount] =
useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/totalStudents")
      .then((response) => {
        setTotalStudents(response.data[0].total);
      });

    axios
      .get("http://localhost:5000/totalDepartments")
      .then((response) => {
        setTotalDepartments(response.data[0].total);
      });

    axios
      .get("http://localhost:5000/totalStaffs")
      .then((response) => {
        setTotalStaffs(response.data[0].total);
      });
      axios
  .get("http://localhost:5000/recentStudents")
  .then((response) => {

    setRecentStudents(response.data);
  });
  axios
  .get("http://localhost:5000/staffCount")
  .then((response) => {
    console.log(response.data);

    setStaffCount(
      response.data[0].totalStaffs
    );
  });
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
            style={{
              marginBottom: "20px",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: "#1e293b",
              boxShadow: "0px 0px 10px rgba(59,130,246,0.5)"
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
            onClick={() => navigate("/students")}
            >
            🎓 Students
            </li>

          <li onClick={()=> navigate("/departments")}
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
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
          }}
        >
          <div>
            <h1>Dashboard</h1>

            <p
              style={{
                color: "gray",
                marginTop: "5px"
              }}
            >
              Welcome back, Admin
            </p>
          </div>

          <div
  style={{
    backgroundColor: "#e2e8f0",
    padding: "10px 18px",
    borderRadius: "10px"
  }}
>

  <h4>Admin</h4>

  <p
    style={{
      marginTop: "5px",
      fontSize: "13px",
      color: "gray"
    }}
  >
    {new Date().toLocaleString()}
  </p>

</div>
        </div>

        <div
          style={{
            padding: "20px"
          }}
        >
          <h2>Welcome Admin</h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "30px"
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(to right, #2563eb, #3b82f6)",
                color: "white",
                padding: "25px",
                borderRadius: "15px",
                width: "220px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
              }}
            >
              <h3>Total Students</h3>
              <h1>{totalStudents}</h1>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(to right, #7c3aed, #8b5cf6)",
                color: "white",
                padding: "25px",
                borderRadius: "15px",
                width: "220px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
              }}
            >
              <h3>Departments</h3>
              <h1>{totalDepartments}</h1>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(to right, #059669, #10b981)",
                color: "white",
                padding: "25px",
                borderRadius: "15px",
                width: "220px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
              }}
            >
              <h3>Active Staffs</h3>
              
              <h1>{staffCount}</h1>
            </div>
          </div>

          <div
            style={{
              marginTop: "40px",
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
            }}
          >
            <h2
              style={{
                marginBottom: "20px"
              }}
            >
              Recent Activities
            </h2>
        

            <p style={{ marginBottom: "15px" }}>
              ✅ New student added to CSE department
            </p>

            <p style={{ marginBottom: "15px" }}>
              ✅ Staff login successful
            </p>

            <p style={{ marginBottom: "15px" }}>
              ✅ Department data updated
            </p>

            <p>
              ✅ Student profile deactivated
            </p>
            <div
  style={{
    marginTop: "40px",
    textAlign: "center",
    color: "gray",
    fontSize: "14px",
    paddingBottom: "20px"
  }}
>
  © 2026 College ERP Portal | Developed by Admin Team
</div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Dashboard;
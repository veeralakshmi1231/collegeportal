import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    const username = e.target.username.value;

    const password = e.target.password.value;

    try {

      const response = await axios.post(
        "http://localhost:5000/login",
        {
          username,
          password
        }
      );

      if (response.data === "Login Successful") {

        localStorage.setItem("isLoggedIn", "true");

        alert("Login Successful");

        navigate("/dashboard");

      } else {

        alert(response.data);
      }

    } catch (error) {

      alert("Server Error");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #020617, #1e1b4b, #312e81)",
        fontFamily: "Poppins, sans-serif",
        overflow: "hidden",
        position: "relative"
      }}
    >

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "#6366f1",
          borderRadius: "50%",
          filter: "blur(120px)",
          top: "-50px",
          left: "-50px",
          opacity: "0.4"
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          background: "#8b5cf6",
          borderRadius: "50%",
          filter: "blur(120px)",
          bottom: "-50px",
          right: "-50px",
          opacity: "0.4"
        }}
      ></div>

      <div
        style={{
          width: "420px",
          padding: "50px",
          borderRadius: "32px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0px 0px 60px rgba(99,102,241,0.35)",
          position: "relative",
          zIndex: "1"
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px"
          }}
        >

          <img
            src={logo}
            alt="logo"
            style={{
              width: "95px",
              height: "95px",
              borderRadius: "50%",
              backgroundColor: "white",
              padding: "8px",
              objectFit: "cover",
              boxShadow: "0px 0px 25px rgba(255,255,255,0.5)"
            }}
          />

          <h1
            style={{
              color: "white",
              marginTop: "20px",
              marginBottom: "10px",
              fontSize: "36px",
              fontWeight: "bold",
              letterSpacing: "1px"
            }}
          >
            N.M.S.S.V.N College
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "16px",
              letterSpacing: "1px"
            }}
          >
            Smart Staff Portal
          </p>

        </div>

        <form onSubmit={handleLogin}>

          <div
            style={{
              marginBottom: "22px"
            }}
          >

            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.12)",
                color: "white",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
                boxShadow: "0px 0px 15px rgba(255,255,255,0.05)"
              }}
            />

          </div>

          <div
            style={{
              marginBottom: "30px"
            }}
          >

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.12)",
                color: "white",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
                boxShadow: "0px 0px 15px rgba(255,255,255,0.05)"
              }}
            />

          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "18px",
              border: "none",
              background:
                "linear-gradient(to right, #6366f1, #8b5cf6)",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              letterSpacing: "1px",
              boxShadow: "0px 8px 25px rgba(99,102,241,0.5)",
              transition: "0.3s"
            }}
          >
            LOGIN
          </button>

        </form>

        <p
          style={{
            color: "#cbd5e1",
            textAlign: "center",
            marginTop: "28px",
            fontSize: "14px",
            letterSpacing: "1px"
          }}
        >
          Secure access for authorized staffs
        </p>

      </div>

    </div>
  );
}

export default Login;
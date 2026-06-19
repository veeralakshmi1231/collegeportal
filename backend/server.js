const path = require("path");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads");
  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    );
  }
});



const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const sql =
    "SELECT * FROM staffs WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, result) => {

    if (err) {
      res.send("Database Error");
    } else {

      if (result.length > 0) {
        res.send("Login Successful");
      } else {
        res.send("Invalid Username or Password");
      }
    }
  });
});

app.get("/totalStudents", (req, res) => {

  const sql = "SELECT COUNT(*) AS total FROM students";

  db.query(sql, (err, result) => {

    if (err) {
      res.send("Database Error");
    } else {
      res.send(result);
    }
  });
});

app.get("/totalDepartments", (req, res) => {

  const sql = "SELECT COUNT(*) AS total FROM departments";

  db.query(sql, (err, result) => {

    if (err) {
      res.send("Database Error");
    } else {
      res.send(result);
    }
  });
});

app.get("/totalStaffs", (req, res) => {

  const sql = "SELECT COUNT(*) AS total FROM staffs";

  db.query(sql, (err, result) => {

    if (err) {
      res.send("Database Error");
    } else {
      res.send(result);
    }
  });
});

app.post("/addStudent", (req, res) => {

  const {
    name,
    email,
    department,
    dob,
    gender,
    profile_image
  } = req.body;

  const sql =
    "INSERT INTO students (name, email, department, dob, gender, profile_image, status) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      name,
      email,
      department,
      dob,
      gender,
      profile_image,
      "Active"
    ],
    (err, result) => {

      if (err) {

        console.log(err);

        res.send(err);

      } else {

        res.send(
          "Student Added Successfully"
        );
      }
    }
  );
});
app.get("/students", (req, res) => {

  const sql = "SELECT * FROM students";

  db.query(sql, (err, result) => {

    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.post(
  "/upload",
  upload.single("image"),
  (req, res) => {

    if (!req.file) {
      return res.send("");
    }

    res.send(req.file.filename);
  }
);

app.put("/updateStudent/:id", (req, res) => {

  const sql = `
    UPDATE students
    SET
    name=?,
    email=?,
    department=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      req.body.name,
      req.body.email,
      req.body.department,
      req.params.id
    ],
    (err, result) => {

      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/deleteStudent/:id", (req, res) => {

  const sql = "DELETE FROM students WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {

    if (err) {
      res.send(err);
    } else {
      res.send("Student Deleted Successfully");
    }
  }
  );
});
app.put("/toggleStatus/:id", (req, res) => {

  const sql =
    "UPDATE students SET status = CASE WHEN status='Active' THEN 'Inactive' ELSE 'Active' END WHERE id=?";

  db.query(
    sql,
    [req.params.id],
    (err, result) => {

      if (err) {

        res.send(err);

      } else {

        res.send(
          "Student Status Updated"
        );
      }
    }
  );
});
app.get("/recentStudents", (req, res) => {

  const sql =
    "SELECT * FROM students ORDER BY id DESC LIMIT 5";

  db.query(sql, (err, result) => {

    if (err) {

      res.send(err);

    } else {

      res.send(result);
    }
  });
});
app.get("/staffs", (req, res) => {

  const sql =
    "SELECT * FROM staff_details";

  db.query(sql, (err, result) => {

    if (err) {

      res.send(err);

    } else {

      res.send(result);
    }
  });
});
app.get("/departmentStats", (req, res) => {

  const sql = `
    SELECT
    department,
    COUNT(*) AS totalStudents

    FROM students

    GROUP BY department
  `;

  db.query(sql, (err, result) => {

    if (err) {

      res.send(err);

    } else {

      res.send(result);
    }
  });
});

app.get("/staffCount", (req, res) => {

  const sql =
    "SELECT COUNT(*) AS totalStaffs FROM staff_details";

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      res.send(err);

    } else {

      res.send(result);
    }
  });
});
app.post("/addStaff", (req, res) => {

  const sql = `
    INSERT INTO staff_details
    (staff_name, email, department)

    VALUES (?, ?, ?)
  `;

  const values = [

    req.body.staff_name,
    req.body.email,
    req.body.department
  ];

  db.query(sql, values, (err, result) => {

    if (err) {

      console.log(err);

      res.send(err);

    } else {

      res.send(result);
    }
  });
});
app.delete("/deleteStaff/:id", (req, res) => {

  const sql =
    "DELETE FROM staff_details WHERE id=?";

  db.query(
    sql,
    [req.params.id],
    (err, result) => {

      if (err) {

        res.send(err);

      } else {

        res.send(result);

      }

    }
  );
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
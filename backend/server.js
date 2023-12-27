const express = require("express");
const mysql = require("mysql");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "userdata",
});


// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("Connected to MySQL database");

//   // Fetch data from the API
//   axios
//     .get("https://gorest.co.in/public-api/users")
//     .then((response) => {
//       if (response && response.data && response.data.data) {
//         const userData = response.data.data;

//         const promises = userData.map((user) => {
//           return new Promise((resolve, reject) => {
//             const query = `INSERT INTO UserMaster (id, name, email, gender, status) VALUES (?, ?, ?, ?, ?)`;
//             const values = [
//               user.id,
//               user.name,
//               user.email,
//               user.gender,
//               user.status,
//             ];

//             connection.query(query, values, (error, results, fields) => {
//               if (error) {
//                 console.error("Error inserting data into MySQL:", error);
//                 reject(error);
//               } else {
//                 console.log("Data inserted successfully:", results);
//                 resolve(results);
//               }
//             });
//           });
//         });

//         Promise.all(promises)
//           .then(() => {
//             console.log("All data inserted successfully");
//           })
//           .catch((err) => {
//             console.error("Error in Promise.all:", err);
//           });
//       } else {
//         console.error("No valid data found in the API response");
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching data from API:", error);
//     });
// });

app.get("/", (req, res) => {
  const sql = `SELECT * FROM usermaster`;
  connection.query(sql, (error, results) => {
    if (error) return res.status(500).json({ error });
    return res.json(results);
  });
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT * FROM usermaster WHERE id = ?`;
  connection.query(sql, userId, (error, results) => {
    if (error) return res.status(500).json({ error });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });
    return res.json(results[0]);
  });
});

app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  const sql = `UPDATE usermaster SET ? WHERE id = ?`;
  connection.query(sql, [updatedUserData, userId], (error, results) => {
    if (error) return res.status(500).json({ error });
    return res.json({ message: "User updated successfully" });
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

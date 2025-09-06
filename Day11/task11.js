const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
let students = [
  { id: 1, name: "Shubh", age: 21, course: "AI/ML" },
  { id: 2, name: "Kartik", age: 22, course: "Web Dev" }
];
app.get("/students", (req, res) => {
  res.json(students);
});
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});
app.post("/students", (req, res) => {
  const { name, age, course } = req.body;
  if (!name || !age || !course) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newStudent = {
    id: students.length + 1,
    name,
    age,
    course
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  const { name, age, course } = req.body;
  student.name = name || student.name;
  student.age = age || student.age;
  student.course = course || student.course;
  res.json(student);
});
app.delete("/students/:id", (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }
  const deletedStudent = students.splice(studentIndex, 1);
  res.json({ message: "Student deleted", student: deletedStudent[0] });
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

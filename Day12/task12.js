const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
let todos = [
  { id: 1, task: "Learn Node.js" },
  { id: 2, task: "Build a To-Do App" },
];
app.get("/todos", (req, res) => {
  res.json(todos);
});
app.post("/todos", (req, res) => {
  const { task } = req.body;
  const newTodo = { id: Date.now(), task };
  todos.push(newTodo);
  res.json(newTodo);
});
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id != id);
  res.json({ success: true });
});
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

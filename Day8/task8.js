const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
const addTask = () => {
    if (input.trim() === '') return;
const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
      dueDate: dueDate || null,
    };

    setTasks([...tasks, newTask]);
    setInput('');
    setDueDate('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>To-Do List</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Enter task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div><ul>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: 8 }}>
       <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                color: task.completed ? '#999' : '#000'
              }}
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </span>
            {task.dueDate && (
              <small style={{ marginLeft: 8, color: '#555' }}>
                (Due: {task.dueDate})
              </small>
            )}
            <button
              onClick={() => deleteTask(task.id)}
   style={{ marginLeft: 8, color: 'red' }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

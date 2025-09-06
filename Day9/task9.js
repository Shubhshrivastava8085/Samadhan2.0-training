StudentDictionary() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => 
        return response.json();
      })
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Student Dictionary</h2>
      <ul>
        {students.map(student => (
          <li key={student.id} <strong>{student.name}</strong> — Age: {student.age}, Grade: {student.grade}
          </li>
        ))}
      </ul>
    </div>
  );
}

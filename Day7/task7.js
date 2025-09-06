{
  const [count, setcouny] = useState(0);
  const [text, setText] = useState('');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      {/* Counter Section */}
      <h2>Counter</h2>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setCount(count - 1)}>-</button>
        <span style={{ margin: '0 10px' }}>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
 {/* Live Text Input */}
      <h2>Live Text Preview</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        style={{ padding: '5px', width: '300px' }}
      />
      <p style={{ marginTop: '10px' }}>
        <strong>Preview:</strong> {text}
      </p>
    </div>
  );
}

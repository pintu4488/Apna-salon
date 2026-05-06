import React, { useState } from 'react';

const AdminPanel = () => {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState('');

  const login = () => {
    if (password === "1234") {
      setLoggedIn(true);
    } else {
      alert("Wrong Password");
    }
  };

  const toggleStatus = () => {
    setIsOpen(!isOpen);
  };

  const updateStatus = async () => {
    await fetch('https://apna-salon.onrender.com/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: "1234",
        is_open: isOpen ? 1 : 0,   // 🔥 MAIN FIX
        message: message
      })
    });

    alert("Updated Successfully");
  };

  if (!loggedIn) {
    return (
      <div style={styles.container}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={login} style={styles.button}>Login</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Salon Control Panel</h2>

      <div onClick={toggleStatus} style={{
        width: 80,
        height: 40,
        borderRadius: 20,
        background: isOpen ? 'green' : 'red',
        margin: '20px auto',
        position: 'relative',
        cursor: 'pointer'
      }}>
        <div style={{
          width: 35,
          height: 35,
          borderRadius: '50%',
          background: 'white',
          position: 'absolute',
          top: 2.5,
          left: isOpen ? 40 : 3,
          transition: '0.3s'
        }}></div>
      </div>

      <p>
        {isOpen ? "दुकान खुली है 🟢" : "दुकान बंद है 🔴"}
      </p>

      <input
        type="text"
        placeholder="कमेंट लिखो (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={styles.input}
      />

      <button onClick={updateStatus} style={styles.button}>
        Save
      </button>
    </div>
  );
};

const styles = {
  container: { padding: 20, textAlign: 'center', background: '#121212', color: 'white', minHeight: '100vh' },
  input: { padding: 10, margin: 10, width: 250 },
  button: { padding: '10px 20px', background: '#D4AF37', border: 'none', cursor: 'pointer' }
};

export default AdminPanel;

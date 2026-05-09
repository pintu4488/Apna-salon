import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SalonForm = () => {
  const [formData, setFormData] = useState({
    haircut: '0', 
    beard: '0',  
    name: '',
    phone: ''
  });

  const [isPressed, setIsPressed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);

  
    if (!formData.name || formData.phone.length !== 10) {
      alert("कृपया नाम और 10 अंकों का नंबर सही से भरें!");
      return;
    }

    
    if (formData.haircut === '0' && formData.beard === '0') {
      alert("कृपया बाल या दाढ़ी में से कम से कम एक चुनें!");
      return;
    }

    try {
      console.log("Sending data:", formData); 

      const response = await fetch('https://apna-salon.onrender.com/book-salon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        alert(`नमस्ते ${formData.name}! बुकिंग सफल रही।`);
      
        setFormData({ haircut: '0', beard: '0', name: '', phone: '' });
        navigate('/');
      } else {
        const errorRes = await response.json();
        alert("सर्वर एरर: " + (errorRes.error || "डेटा रिजेक्ट हो गया"));
      }
    } catch (error) {
      alert("सर्वर से कनेक्शन नहीं हो पाया!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>BOOKING</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* Section 1: Haircut */}
        <div style={styles.section}>
          <label style={styles.label}>1. बाल कटिंग चुनें:</label>
          <select 
            name="haircut" 
            value={formData.haircut}
            onChange={handleChange} 
            style={styles.input}
          >
            <option value="0">Hair Style</option>
            <option value="50">सिंपल बाल - ₹50</option>
            <option value="70">स्टाइलिश बाल - ₹70</option>
          </select>
        </div>

        {/* Section 2: Beard */}
        <div style={styles.section}>
          <label style={styles.label}>2. दाढ़ी (Beard) चुनें:</label>
          <select 
            name="beard" 
            value={formData.beard}
            onChange={handleChange} 
            style={styles.input}
          >
            <option value="0">Beard Style</option>
            <option value="40">सिंपल दाढ़ी - ₹40</option>
            <option value="50">स्टाइलिश दाढ़ी - ₹50</option>
          </select>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>आपका नाम:</label>
          <input
            type="text"
            name="name"
            placeholder="नाम लिखें..."
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>मोबाइल नंबर:</label>
          <input
            type="text"
            name="phone"
            placeholder="नंबर लिखें..."
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <button 
          type="submit" 
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          style={{
            ...styles.button,
            backgroundColor: isPressed ? '#ff4d4d' : '#28a745', 
            transform: isPressed ? 'scale(0.95)' : 'scale(1)',
            boxShadow: isPressed ? 'none' : '0 5px #1e7e34',
          }}
        >
          स्लॉट बुक करें
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '380px',
    margin: '30px auto',
    padding: '20px',
    backgroundColor: '#1a1a1a', 
    borderRadius: '12px',
    border: '2px solid #D4AF37', // गोल्डन बॉर्डर
    fontFamily: 'Arial, sans-serif'
  },
  header: { textAlign: 'center', color: '#D4AF37', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column' },
  section: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '6px', color: '#D4AF37', fontWeight: 'bold' },
  input: { 
    width: '100%', 
    padding: '12px', 
    borderRadius: '8px', 
    border: 'none', 
    boxSizing: 'border-box',
    fontSize: '15px'
  },
  button: {
    color: 'white',
    padding: '16px',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '18px',
    marginTop: '10px',
    transition: 'all 0.1s'
  }
};

export default SalonForm;

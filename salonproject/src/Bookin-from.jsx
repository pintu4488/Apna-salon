import React, { useState } from 'react';

const SalonForm = () => {
  // 1. डेटा स्टोर करने के लिए स्टेट (Variables)
  const [formData, setFormData] = useState({
    haircut: '50',
    beard: '40',
    name: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false
  });

  // इनपुट बदलते समय डेटा अपडेट करने का फंक्शन
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      if (value.length <= 20) {
        setFormData({ ...formData, [name]: value });
        const isInvalid = /[^a-zA-Z\s]/.test(value);
        setErrors({ ...errors, name: isInvalid });
      }
    }

    if (name === 'phone') {
      // सिर्फ नंबर टाइप करने की अनुमति दें और 10 डिजिट तक सीमित रखें
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, phone: value.length !== 10 });
      }
    }
  };

  // 2. Flask में डेटा भेजने वाला फंक्शन (Submit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // चेक करें कि कोई एरर तो नहीं है और नाम/नंबर खाली तो नहीं है
    if (!errors.name && !errors.phone && formData.name && formData.phone.length === 10) {
      
      try {
        console.log("Sending data to Flask:", formData);

        const response = await fetch('https://apna-salon.onrender.com/book-salon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // यहाँ 'formData' JSON बनकर जा रहा है
        });

        const result = await response.json();

        if (response.ok) {
          alert(`नमस्ते ${formData.name}! आपका स्लॉट बुक हो गया है।`);
          // फॉर्म को खाली करना (Optional)
          setFormData({ haircut: '50', beard: '40', name: '', phone: '' });
        } else {
          alert("सर्वर एरर: " + (result.error || "डेटा सेव नहीं हो सका"));
        }
      } catch (error) {
        console.error("Connection Error:", error);
        alert("Flask सर्वर से कनेक्ट नहीं हो पाया। कृपया सुनिश्चित करें कि Flask चल रहा है!");
      }

    } else {
      alert("कृपया फॉर्म में सही जानकारी भरें!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center', color: '#D4AF37' }}>APNA SALON BOOKING</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* Section 1: Haircut Selection */}
        <div style={styles.section}>
          <label style={styles.label}>1. बाल कटिंग चुनें:</label>
          <select 
            name="haircut" 
            value={formData.haircut}
            onChange={(e) => setFormData({...formData, haircut: e.target.value})} 
            style={styles.input}
          >
            <option value="50">सिंपल बाल - ₹50</option>
            <option value="70">स्टाइलिश बाल - ₹70</option>
          </select>
        </div>

        {/* Section 2: Beard Selection */}
        <div style={styles.section}>
          <label style={styles.label}>2. दाढ़ी (Beard) चुनें:</label>
          <select 
            name="beard" 
            value={formData.beard}
            onChange={(e) => setFormData({...formData, beard: e.target.value})} 
            style={styles.input}
          >
            <option value="40">सिंपल दाढ़ी - ₹40</option>
            <option value="50">स्टाइलिश दाढ़ी - ₹50</option>
          </select>
        </div>

        {/* Name Input */}
        <div style={styles.section}>
          <label style={styles.label}>आपका नाम (सिर्फ अक्षर):</label>
          <input
            type="text"
            name="name"
            placeholder="नाम यहाँ लिखें..."
            value={formData.name}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.name ? 'red' : '#ccc',
              backgroundColor: errors.name ? '#ffe6e6' : 'white'
            }}
          />
          {errors.name && <small style={{color: 'red'}}>कृपया सिर्फ A-Z अक्षर लिखें!</small>}
        </div>

        {/* Phone Input */}
        <div style={styles.section}>
          <label style={styles.label}>मोबाइल नंबर (10 अंक):</label>
          <input
            type="text"
            name="phone"
            placeholder="मोबाइल नंबर लिखें..."
            value={formData.phone}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.phone ? 'red' : '#ccc',
              backgroundColor: errors.phone ? '#ffe6e6' : 'white'
            }}
          />
          {errors.phone && formData.phone.length > 0 && formData.phone.length < 10 && (
            <small style={{color: 'red'}}>10 अंकों का नंबर जरूरी है!</small>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>स्लॉट बुक करें</button>
      </form>
    </div>
  );
};

// डिजाइन (CSS)
const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '25px',
    border: '2px solid #D4AF37',
    borderRadius: '15px',
    backgroundColor: '#1a1a1a',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.5)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  section: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#D4AF37',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: '15px'
  },
  button: {
    backgroundColor: '#D4AF37',
    color: 'black',
    padding: '14px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    transition: '0.3s'
  }
};

export default SalonForm;

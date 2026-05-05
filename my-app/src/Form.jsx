import React, { useState } from 'react';
import styles from './form.module.css';

function Form() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [hairPrice, setHairPrice] = useState(0);
  const [hairTime, setHairTime] = useState(0);
  const [beardPrice, setBeardPrice] = useState(0);
  const [beardTime, setBeardTime] = useState(0);
  
  const [errors, setErrors] = useState({ name: false, phone: false });
  const [queue, setQueue] = useState([]); 
  const [showPopup, setShowPopup] = useState(false);
  const [lastEntry, setLastEntry] = useState(null);

  const handleBooking = () => {
    // Validation: अगर नाम या नंबर खाली है तो बॉक्स लाल हो जाएगा
    const nameErr = name.trim() === "";
    const phoneErr = phone.trim() === "";
    setErrors({ name: nameErr, phone: phoneErr });

    if (nameErr || phoneErr) return;

    const currentServiceTime = hairTime + beardTime;
    
    // पुराने सभी ग्राहकों का समय जोड़ना
    const totalWaitTimeBefore = queue.reduce((sum, customer) => sum + customer.total_time, 0);

    const bookingData = {
      name: name,
      phone: phone,
      total_time: currentServiceTime,
      final_wait: totalWaitTimeBefore + currentServiceTime,
      people_ahead: queue.length
    };

    setQueue([...queue, bookingData]);
    setLastEntry(bookingData);
    setShowPopup(true);
    
    setName('');
    setPhone('');
  };

  return (
    <div className={styles['form-contener']}>
      {/* कार्ड के ऊपर लाइव स्टेटस */}
      <div className={styles.topHeaderStatus}>
        {queue.length === 0 ? "अभी कोई वेटिंग नहीं है" : `अभी आपसे पहले ${queue.length} व्यक्ति का नंबर चल रहा है`}
      </div>

      <h1 className={styles.title}>Royal Style Salon</h1>
      
      <div className={styles.card}>
        <select className={styles.dropdown} onChange={(e) => {
          const [p, t] = e.target.value.split(',').map(Number);
          setHairPrice(p); setHairTime(t);
        }}>
          <option value="0,0">--- चुनें ---</option>
          <option value="50,20">सिंपल बाल - ₹50 (20 min)</option>
          <option value="70,30">स्टाइलिश बाल - ₹70 (30 min)</option>
        </select>

        <select className={styles.dropdown} onChange={(e) => {
          const [p, t] = e.target.value.split(',').map(Number);
          setBeardPrice(p); setBeardTime(t);
        }}>
          <option value="0,0">--- चुनें ---</option>
          <option value="40,10">सिंपल दाढ़ी - ₹40 (10 min)</option>
          <option value="50,20">स्टाइलिश दाढ़ी - ₹50 (20 min)</option>
        </select>

        <div className={styles.liveTotal}>
            <p >कुल रेट: <b>₹{hairPrice + beardPrice}</b></p>
            <p>कुल समय: <b>{hairTime + beardTime} मिनट</b></p>
        </div>

        <input 
          className={`${styles.inputField} ${errors.name ? styles.errorBox : ''}`} 
          type="text" 
          placeholder={errors.name ? "अपना नाम लिखें" : "आपका नाम"}
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        
        <input 
          className={`${styles.inputField} ${errors.phone ? styles.errorBox : ''}`} 
          type="number" 
          placeholder={errors.phone ? "कृपया अपना मोबाइल नंबर जरूर डालें" : "मोबाइल नंबर"}
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
        
        <button className={styles.submitBtn} onClick={handleBooking}>नंबर लगायें</button>
      </div>

      {/* सक्सेस पॉप-अप (वही डिजाइन जो आपने फोटो में भेजा था) */}
      {showPopup && lastEntry && (
        <div className={styles.overlay}>
          <div className={styles.popupCard}>
            <h2>Welcome!</h2>
            <p className={styles.successText}>आपका नंबर सक्सेसफुली लग गया है।</p>
            <hr />
            <p>नाम: <b>{lastEntry.name}</b></p>
            <p>आपका नंबर <b>{lastEntry.people_ahead + 1}</b> व्यक्ति के बाद आएगा।</p>
            <p>अनुमानित समय: <b>{lastEntry.final_wait} मिनट</b></p>
            <button className={styles.closeBtn} onClick={() => setShowPopup(false)}>ठीक है</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
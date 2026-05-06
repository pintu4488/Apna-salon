import React, { useState, useEffect } from 'react';

const Usersow = () => {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState(null);

  const TIME_PER_PERSON = 30;

  const fetchBookings = async () => {
    const res = await fetch('http://127.0.0.1:5000/get-bookings');
    const data = await res.json();
    setBookings(data);
  };

  const fetchStatus = async () => {
    const res = await fetch('http://127.0.0.1:5000/get-status');
    const data = await res.json();
    setStatus(data);
  };

  useEffect(() => {
    fetchBookings();
    fetchStatus();

    const interval = setInterval(() => {
      fetchBookings();
      fetchStatus();
    }, 40000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (index) => {
    const startTime = new Date();
    startTime.setHours(7, 0, 0, 0);

    const slotTime = new Date(
      startTime.getTime() + index * TIME_PER_PERSON * 60000
    );

    return slotTime.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Apna Salon - वेटिंग लिस्ट</h2>

      {/* ✅ STATUS (Same design style) */}
      {status && (
        <div style={styles.statusBox}>
          <span style={{ fontWeight: 'bold' }}>
            {status.is_open === 1 ? "दुकान खुली है" : "दुकान बंद है"}
          </span>

          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            marginLeft: 10,
            backgroundColor: status.is_open === 1 ? 'limegreen' : 'red',
            boxShadow: status.is_open === 1
              ? '0 0 10px limegreen'
              : '0 0 10px red'
          }}></div>
        </div>
      )}

      {/* ✅ Message (only show if exists) */}
      {status?.message && (
        <p style={styles.message}>{status.message}</p>
      )}

      <div style={styles.listContainer}>
        {bookings.length > 0 ? (
          bookings.map((item, index) => (
            <div key={item.id || index} style={styles.card}>
              
              <div style={styles.serialNo}>#{index + 1}</div>

              <div style={styles.info}>
                <div style={styles.name}>{item.name}</div>
                <div style={styles.status}>
                  {index === 0 ? "" : `लाइन में इंतज़ार: ${index}`}
                </div>
              </div>

              <div style={styles.timeBox}>
                <div style={styles.timeLabel}>आपका समय</div>
                <div style={styles.timeValue}>
                  {formatTime(index)}
                </div>
              </div>

            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>
            आज अभी तक कोई बुकिंग नहीं हुई है।
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', backgroundColor: '#121212', minHeight: 'fit-content', color: 'white', fontFamily: 'Arial' },
  title: { color: '#D4AF37', textAlign: 'center', marginBottom: '20px' },

  statusBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px'
  },

  message: {
    textAlign: 'center',
    color: '#aaa',
    marginBottom: '15px'
  },

  listContainer: { maxWidth: '500px', margin: '0 auto' },

  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    padding: '15px',
    borderRadius: '12px',
    marginBottom: '15px',
    borderLeft: '5px solid #D4AF37'
  },

  serialNo: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginRight: '15px',
    color: '#D4AF37'
  },

  info: { flex: 1 },

  name: {
    fontSize: '18px',
    fontWeight: 'bold'
  },

  status: {
    fontSize: '13px',
    color: '#aaa'
  },

  timeBox: {
    textAlign: 'right',
    borderLeft: '1px solid #333',
    paddingLeft: '15px'
  },

  timeLabel: {
    fontSize: '10px',
    color: '#D4AF37'
  },

  timeValue: {
    fontSize: '15px',
    fontWeight: 'bold'
  }
};

export default Usersow;

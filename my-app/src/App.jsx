import React, { useEffect, useState } from "react";
import Form from "./form";
function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    const callFlask = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Connection Failed:", err);
        setData({ message: "Server Offline" });
      }
    };
    callFlask();
  }, []);
  const [name, setName] = useState("");

  // डेटा भेजने वाला फंक्शन
  const sendDataToFlask = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/send-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }), // यहाँ से डेटा जा रहा है
      });

      const result = await response.json();
      console.log("Flask का जवाब:", result);
      alert("डेटा पहुँच गया!");
    } catch (err) {
      console.error("Error:", err);
      alert("कनेक्शन फेल हो गया!");
    }
  };

  // 1. सबसे ऊपर एक नई स्टेट बनाएं
  const [showName, setShowName] = useState("");

  const sena = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/send-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name }),
      });

      const result = await response.json();

      // 2. यहाँ फ्लास्क से आए डेटा को स्टेट में सेट करें
      if (result.received) {
        setShowName(result.received);
      }

      alert("डेटा फ्लास्क तक पहुँच गया!");
    } catch (err) {
      alert("कनेक्शन फेल!");
    }
  };

  // 3. अपने return के अंदर कहीं भी इसे लिख दें

  return (
    <div
      className="main-wrapper"
      style={{ backgroundColor: "black", minHeight: "100vh", color: "white" }}
    >
      <div className="conter-header">
        <h3 style={{ textAlign: "center" }}>{data.message}</h3>
      </div>
      <div className="div-img">
        <p style={{ textAlign: "center" }}>Content will appear here</p>
      </div>

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        {/* यहाँ स्लैश लगाना ज़रूरी है */}
        <button onClick={sena}>click me </button>
      </div>
      <div>
        {/* यह h1 तभी दिखेगा जब डेटा आएगा */}
        {showName && <h1 style={{ color: "white" }}>स्वागत है: {showName}</h1>}

        {/* आपका बाकी इनपुट और बटन यहाँ रहेगा */}
      </div>
      <div>
        <Form/>
      </div>
    </div>
  );
}

export default App;

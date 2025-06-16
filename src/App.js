import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    socket.emit("send_message", { message });
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat Simple</h2>
      <div style={{ height: 300, overflowY: "scroll", border: "1px solid #ccc", marginBottom: 10 }}>
        {chat.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Escribe tu mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default App;
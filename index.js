import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "You", text: input };
    setMessages([...messages, userMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();

    const botMsg = { sender: "Bot", text: data.reply };
    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>AI Chatbot</h2>
      <div style={{ border: "1px solid #ddd", height: "300px", overflowY: "auto", padding: "10px" }}>
        {messages.map((msg, i) => (
          <div key={i}><b>{msg.sender}:</b> {msg.text}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "75%", padding: "10px" }}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} style={{ width: "20%", padding: "10px" }}>Send</button>
    </div>
  );
}

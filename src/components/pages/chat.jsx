import React, { useState, useEffect } from "react";

const ChatWindow = ({ followUp, onClose }) => {
  const chatKey = `chat_${followUp.id || followUp.title}`; // Unique storage key per chat
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Request permission for notifications when the component mounts
  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission()
          .then((permission) => {
            console.log("Notification Permission:", permission);
          })
          .catch((err) => console.error("Notification request failed:", err));
      } else {
        console.log("Notification Permission:", Notification.permission);
      }
    } else {
      console.error("Browser does not support notifications.");
    }

    // Load messages from localStorage
    const savedMessages = JSON.parse(localStorage.getItem(chatKey)) || [];
    setMessages(savedMessages);
  }, [chatKey]);

  // Function to show a notification
  const showNotification = (message) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("New Message", {
        body: message,
        icon: "https://cdn-icons-png.flaticon.com/512/561/561127.png", // Optional: Chat icon
      });
    } else {
      console.warn("Notifications are blocked or not allowed.");
    }
  };

  // Function to send a new message
  const sendMessage = () => {
    if (newMessage.trim()) {
      const updatedMessages = [...messages, { sender: "You", text: newMessage }];
      setMessages(updatedMessages);
      localStorage.setItem(chatKey, JSON.stringify(updatedMessages)); // Save to localStorage

      // Show notification if permission is granted
      showNotification(newMessage);

      setNewMessage("");
    }
  };

  // Function to clear chat history for the specific follow-up
  const clearChat = () => {
    localStorage.removeItem(chatKey); // Remove from localStorage
    setMessages([]); // Clear from state
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-md w-96 p-4 border">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <h2 className="text-lg font-semibold">{followUp.title} - Chat</h2>
        <button onClick={onClose} className="text-red-500">✖</button>
      </div>
      <div className="h-48 overflow-y-auto border p-2 bg-gray-100">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`p-2 my-1 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        )}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="border flex-1 px-2 py-1"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-green-700 text-white px-4 py-1 ml-2">
  Send
</button>

        <button onClick={clearChat} className="bg-red-600 text-white px-4 py-1 ml-2">Clear</button>
      </div>
    </div>
  );
};

export default ChatWindow;

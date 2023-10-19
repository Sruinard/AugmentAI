"use client";
import React, { useEffect, useState } from "react";

type Message = {
  message: string;
  sender: string;
  message_id: string;
};

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/sruinard/AugmentAI/messages"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const json = await response.json();
        setMessages(json);
      } catch (error) {
        console.error(error);
        // handle error state here
      }
    };
    fetchMessages();
  }, []);

  const handleResponse = async () => {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/sruinard/AugmentAI/posts",
        {
          method: "POST",
          body: JSON.stringify({
            message: message,
            sender: "user",
            message_id: Math.random().toString(36),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send the message");
      }
      const newMessage = await response.json();
      const BotMessage = {
        message: "I'm a bot",
        sender: "bot",
        message_id: Math.random().toString(36),
      };
      setMessages([...messages, newMessage, BotMessage]);
      setMessage(""); // Clear the input field after sending the message
    } catch (error) {
      console.error(error);
      // handle error state here
    }
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleResponse();
  };

  return (
    <div>
      <h1>Augment AI.</h1>
      <div>
        {messages.map((message) => (
          <div key={message.message_id}>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleMessageSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

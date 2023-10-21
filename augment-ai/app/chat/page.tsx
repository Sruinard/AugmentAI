"use client";
import { ChatMessage } from "@/components/ChatMessage";
import { SendHorizonalIcon, Space } from "lucide-react";
import React, { useEffect, useState } from "react";

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
            text: message,
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
        text: "I'm a bot",
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
          <div
            key={message.message_id}
            className={`
            flex
            ${message.sender === "user" ? "justify-end" : ""}`}
          >
            <ChatMessage message={message}></ChatMessage>
          </div>
        ))}
      </div>
      <div className={"fixed bottom-0 w-full my-10 flex justify-center "}>
        <div className="border-solid border-2  m-4 w-full rounded">
          <form onSubmit={handleMessageSubmit}>
            <div className="flex justify-center">
              <textarea
                className="w-10/12 resize-none m-4 h-24 h-full"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">
                <SendHorizonalIcon size={24} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Message {
  text: string;
  sender: string;
  message_id: string;
}

const ChatMessage = ({ message }: { message: Message }) => {
  return (
    // add border color
    <div
      className={`flex border-solid border-2  m-4 w-1/3 rounded ${
        message.sender === "user" ? "flex-row-reverse" : "border-red-600"
      }`}
    >
      <div className="flex-none mx-6 self-center">image</div>
      <div className="flex-1 w-4/5">
        <div>{message.sender}</div>
        <div>{message.text}</div>
      </div>
    </div>
  );
};

export { ChatMessage };

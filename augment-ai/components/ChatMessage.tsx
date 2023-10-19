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
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div>{message.text}</div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export { ChatMessage };

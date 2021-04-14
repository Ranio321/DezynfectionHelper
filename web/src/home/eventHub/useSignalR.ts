import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";

export interface SignalROperations {
  subscribe: (operation: string, eventHandler: any) => any;
  unsubscribe: (operation: string, eventHandler: any) => any;
}

export default function useSignalR(url: string): SignalROperations {
  const [connection, setConnection] = useState<signalR.HubConnection>();

  useEffect(() => {
    const conn = buildConnection(url);
    startConnection(conn);
    setConnection(conn);

    return () => {
      conn.stop().then().catch();
    };
  }, [url]);

  function subscribe(operation: string, eventHandler: () => any): () => any {
    connection?.on(operation, eventHandler);
    return () => {
      connection?.off(operation, eventHandler);
    };
  }

  function unsubscribe(operation: string, eventHandler: () => any) {
    connection?.off(operation, eventHandler);
  }

  return { subscribe, unsubscribe };
}

function startConnection(connection?: signalR.HubConnection) {
  if (connection) {
    connection
      .start()
      .then(() => console.log("connection started"))
      .catch(() => {
        console.log("Couldn't establish connection");
        connection.onclose(() => startConnection(connection));
      });
  }
}

function buildConnection(url: string): signalR.HubConnection {
  return new signalR.HubConnectionBuilder()
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl(url)
    .build();
}

import * as signalR from "@microsoft/signalr";
import { useCallback, useEffect, useState } from "react";

export interface EventHubOperations {
  subscribe: (operation: string, handler: any) => void;
}

export function EventHub(url: string): EventHubOperations {
  const [connection, setConnection] = useState<signalR.HubConnection>();

  const connectionBuilder = useCallback(() => buildConnection(url), [url]);

  useEffect(() => {
    startConnection(connection);

    return () => {
      console.log(connection);
      connection?.stop().then(() => console.log("Connection closed"));
    };
  }, [url, connection]);

  useEffect(() => {
    setConnection(connectionBuilder());
  },[connectionBuilder])

  function on(operation: string, handler: any) {
    connection?.on(operation, handler);
    return {
      unsubscribe: () => connection?.off(operation, handler),
    };
  }

  function useSubscribe(operation: string, handler: any): void {
    useSubscribtion(operation, handler, on);
  }

  return { subscribe: useSubscribe };
}

function useSubscribtion(
  operation: string,
  handler: any,
  addSubscribtion: (operation: string, handler: any) => any
) {
  useEffect(() => {
    const { unsubscribe } = addSubscribtion(operation, handler);
    return () => {
      unsubscribe();
    };
  }, [operation, handler, addSubscribtion]);
}

function startConnection(connection?: signalR.HubConnection) {
  if (connection){
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

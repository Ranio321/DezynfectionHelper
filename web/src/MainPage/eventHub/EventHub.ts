import * as signalR from '@microsoft/signalr';
import { useEffect, useState } from "react";

export interface EventHubOperations {
  subscribe: (operation: string, handler: any) => void;
}

export function EventHub(url: string): EventHubOperations {
  let connection: signalR.HubConnection;

  useEffect(() => {
    connection = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(url)
      .build();
      console.log("new connection");

    connection.start();
    return () => {
        connection.stop()
      .then(() => console.log("Connection closed"));
    };
  }, [url]);


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
  addSubscribtion: (operation: string, handerl: any) => any
) {
  useEffect(() => {
    const {unsubscribe} = addSubscribtion(operation, handler);
    return () => {
      unsubscribe();
    };
  }, []);
}

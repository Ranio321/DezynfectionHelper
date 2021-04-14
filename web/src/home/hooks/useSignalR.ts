import * as signalR from '@microsoft/signalr';
import { useState } from 'react';
export function useSignalR(url: string){
    const [connection] = useState(signalRConnection(url))

    return connection;
}

function signalRConnection(url: string) : signalR.HubConnection{
    let connection = new signalR.HubConnectionBuilder()
                                .withAutomaticReconnect()
                                .configureLogging(signalR.LogLevel.Information)
                                .withUrl(url)
                                .build();

    

    return connection
}
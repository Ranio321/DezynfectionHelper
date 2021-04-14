import * as signalR from '@microsoft/signalr';

export function createSignalRConnection() : signalR.HubConnection{
    let connection = new signalR.HubConnectionBuilder()
                                .withAutomaticReconnect()
                                .configureLogging(signalR.LogLevel.None)
                                .withUrl("/disinfectionSimulator")
                                .build();
    

    return connection
}
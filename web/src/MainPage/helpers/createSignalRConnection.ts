import * as signalR from '@microsoft/signalr';

export function createSignalRConnection() : signalR.HubConnection{
    let connection = new signalR.HubConnectionBuilder()
                                .withAutomaticReconnect()
                                .configureLogging(signalR.LogLevel.Information)
                                .withUrl("https://localhost:44319/dezynfectionSimulator")
                                .build();

    

    return connection
}
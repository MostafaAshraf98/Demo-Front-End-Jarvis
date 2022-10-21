import { createContext, useState } from 'react';
// add signalR library to the project
import {
    HttpTransportType,
    JsonHubProtocol,
    HubConnectionBuilder,
    LogLevel
} from '@microsoft/signalr';
import { useEffect } from 'react';

const SignalRContext = createContext({
    isConnected: false,
    authToken: '',

    countDelivered: 0,
    setCountDelivered: (count) => { },

    notifications: [],
    setNotifications: () => { },
    getUserNotifications: () => { },

    markAllAsRead: () => { },
    markAsRead: (notificationId) => { },

    clearNotification: (notificationId) => { },
    clearAllNotifications: () => { },

    subscribeToGroup: (groupName) => { },
    unsubscribeFromGroup: (groupName) => { },
    subscribeToAllGroups: () => { },
    unsubscribeFromAllGroups: () => { },
});


export function SignalRProvider({ children }) {
    const [connection, setConnection] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [countDelivered, setCountDelivered] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJhZTNkYzI5ZC1mNzkxLTRlZmYtYmNiYi1jMzA4MWQ1NDUwNTkiLCJ1bmlxdWVfbmFtZSI6Ik1vc3RhZmEgQXNocmFmIiwiZW1haWwiOiJtYXNocmFmQHJhaXNhZW5lcmd5LmNvbSIsImNlcnRzZXJpYWxudW1iZXIiOiIxMzYiLCJyb2xlIjoiQWRtaW4sQWRtaW4iLCJuYmYiOjE2NjU0MDgzOTAsImV4cCI6MTY2ODAwMDM5MCwiaWF0IjoxNjY1NDA4MzkwfQ.gTYldWCmpLxKljQOVmdOhDPGm4DF6V8G8f1NzlePRYM"
    // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJlNDc1Mzg2YS00MzVlLTQzMDEtYmEzNC00OGEwYThkZTUwZTMiLCJ1bmlxdWVfbmFtZSI6IlNhbG1hIEFzaHJhZiIsImVtYWlsIjoic2FzaHJhZkByYWlzYWVuZXJneS5jb20iLCJjZXJ0c2VyaWFsbnVtYmVyIjoiMTI4Iiwicm9sZSI6IkFkbWluLEFkbWluIiwibmJmIjoxNjYzNDk5NDQ3LCJleHAiOjE2NjYwOTE0NDcsImlhdCI6MTY2MzQ5OTQ0N30.ieW0a7ztBt85MgAe3Xsffp7xomKFyJc5wi8WMTWAu7g";

    useEffect(() => {
        const start = async () => {
            await connect();
        };
        start();
    }, [])

    useEffect(() => {
        console.log(connection);

        if (connection) {
            connection.on("ReceiveMessage", ReceiveMessage);
            connection.onclose(() => {
                console.log("SignalR Disconnected.");
                setIsConnected(false);
                setConnection(null);
                localStorage.removeItem("signalRConnectionId");
                setTimeout(() => {
                    connect();
                }, 1000);
            });
        }
    }, [connection])


    const getUserNotifications = async () => {
        console.log("Fetching Notifications")
        await connection.invoke("MarkAllAsUnread");
        //https://localhost:8087
        fetch("https://localhost:8087/api/Notification", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken
            }
        })
            .then(response => {
                return response.json();
            }).then(data => {
                const notifications = [];
                data.forEach(element => {
                    notifications.push({
                        id: element.id,
                        title: element.title,
                        body: element.body,
                        sendingTime: element.sendingTime,
                        status: element.status,
                        shareName: element.shareName,
                        directoryName: element.directoryName,
                        fileName: element.fileName,
                        notificationType: element.notificationType
                    });
                });
                setNotifications(notifications);
            });
    }

    const connect = async () => {
        try {
            // if (localStorage.getItem("signalRConnectionId") != null) {
            //     setConnection(localStorage.getItem("signalRConnectionId"));
            //     setIsConnected(true);
            //     return;
            // }
            const newConnection = new HubConnectionBuilder()
                //"https://localhost:8087
                .withUrl("https://localhost:8087/signalr", {
                    transport: HttpTransportType.WebSockets,
                    accessTokenFactory: () => authToken,
                })
                .withHubProtocol(new JsonHubProtocol())
                .configureLogging(LogLevel.Information)
                .build();


            await newConnection.start();

            console.log(newConnection);
            console.log("SignalR Connected.");

            localStorage.setItem("signalRConnectionId", newConnection);

            setConnection(newConnection);
            setIsConnected(true);

        } catch (error) {
            console.log("Unable to start connection: ", error);
            setTimeout(() => {
                connect();
            }, 1000);
        }
    }

    const ReceiveMessage = async (message) => {
        console.log("Received message: ", message);
        setCountDelivered(prevCount => {
            return prevCount + 1;
        });
        message.status = "Unread";
        console.log("The message id is: ", message.id);
        console.log("the connection is: ", connection);
        await connection.invoke("MarkAsUnread", message.id);

        setNotifications(prevNotifications => {
            return [message, ...prevNotifications];
        });
        // Show an alert to theu user that a message has been received
        alert("You have received a new message");
    }


    const markAllAsRead = async () => {
        // change the status of all the deliverd messages to read messages
        await connection.invoke("MarkAllAsRead");
        const Newnotifications = notifications.map((not) => {
            not.status = "Read";
            return not;
        });
        setNotifications(Newnotifications);
    }

    const markAsRead = async (notificationId) => {
        await connection.invoke("MarkAsRead", notificationId);
        // change the status of this notification to read
        const nots = [...notifications];
        const notification = nots.find((not) => not.id === notificationId);
        notification.status = "Read";
        setNotifications(nots);
    }

    const clearNotification = async (notificationId) => {
        await connection.invoke("ClearNotification", notificationId);
    }

    const clearAllNotifications = async () => {
        await connection.invoke("ClearAllNotifications");
    }

    const subscribeToGroup = async (groupName) => {
        console.log(connection);
        await connection.invoke("SubscribeToType", groupName);
    }

    const unsubscribeFromGroup = async (groupName) => {
        await connection.invoke("UnsubscribeFromType", groupName);
    }

    const subscribeToAllGroups = async () => {
        await connection.invoke("SubscribeToAll");
    }

    const unsubscribeFromAllGroups = () => {
        connection.invoke("UnsubscribeFromAll");
    }

    const context = {
        isConnected,
        authToken,

        countDelivered,
        setCountDelivered,

        notifications,
        setNotifications,
        getUserNotifications,

        markAllAsRead,
        markAsRead,

        clearNotification,
        clearAllNotifications,

        subscribeToGroup,
        unsubscribeFromGroup,
        subscribeToAllGroups,
        unsubscribeFromAllGroups,
    }

    return (
        <SignalRContext.Provider value={context}>
            {children}
        </SignalRContext.Provider>
    );
}

export default SignalRContext;

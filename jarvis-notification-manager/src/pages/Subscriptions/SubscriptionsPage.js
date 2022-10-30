import classes from './SubscriptionsPage.module.css';
import Switch from '../../components/UI/Switcher/Switch';
import { useState, useContext, useEffect } from 'react';
import SignalRContext from '../../store/signalR-context';
import { FadeLoader } from "react-spinners";
import SubscriptionList from '../../components/Subscription/SubscriptionList/SubscriptionList';


const SubscriptionsPage = () => {

    const [subscribeAllIsOn, setSubscribeAllIsOn] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const signalRCtx = useContext(SignalRContext);


    useEffect(() => {
        console.log("Fetching subscriptions")
        setLoading(true);
        let subscribedToAll = true;
        //http://sademo.azurewebsites.net
        //https://localhost:8087
        fetch("https://localhost:8087/api/Subscription", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + signalRCtx.authToken
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            const subscriptions = [];
            data.forEach(element => {
                subscriptions.push({
                    groupName: element.name,
                    receiveEmail: element.receiveEmail,
                    receiveInAppNotification: element.receiveInAppNotification,
                    description: element.description
                });
                if (!element.receiveEmail || !element.receiveInAppNotification) {
                    subscribedToAll = false;
                }
            });
            setLoading(false);
            setSubscriptions(subscriptions);
            setSubscribeAllIsOn(subscribedToAll);
        })
    }, []);

    const handleSwitchChange = (groupName, type, isSubscribed) => {
        console.log("Entered Handle Switch Change")
        let subscribedToAll = true;
        const Newsubscriptions = subscriptions.map(subscription => {
            if (subscription.groupName === groupName) {
                if (type === "Email")
                    subscription.receiveEmail = !subscription.receiveEmail;
                else
                    subscription.receiveInAppNotification = !subscription.receiveInAppNotification;
            }
            if (subscribedToAll == false || subscription.receiveEmail == false || subscription.receiveInAppNotification == false)
                subscribedToAll = false;
            return subscription;
        })
        const notificationSubscription = {
            Name: groupName,
            Type: type,
        };
        setSubscriptions(Newsubscriptions);
        if (isSubscribed) {
            signalRCtx.unsubscribeFromGroup(notificationSubscription);
            setSubscribeAllIsOn(false);
        } else {
            signalRCtx.subscribeToGroup(notificationSubscription);
            if (subscribedToAll)
                setSubscribeAllIsOn(true);
        }
    }

    const subscribeToAllHandleToogle = () => {
        if (subscribeAllIsOn) {
            signalRCtx.unsubscribeFromAllGroups();
        } else {
            signalRCtx.subscribeToAllGroups();
        }
        setSubscriptions((prevSubscriptions) => {
            const updatedSubscriptions = prevSubscriptions.map((subscription) => {
                return {
                    ...subscription,
                    receiveEmail: !subscribeAllIsOn,
                    receiveInAppNotification: !subscribeAllIsOn,
                }
            })
            return updatedSubscriptions;
        });
        setSubscribeAllIsOn(prevState => !prevState);
    }
    if (loading) {
        return (
            <div> </div>
            // <div style={{
            //     display: flex,
            //     justifyContent: center,
            //     alignItems: center,
            // }}>
            //     < FadeLoader
            //         color="#1a0082"
            //         height={60}
            //         padding={10}
            //     />
            // </div>
        );
    } else {
        return (
            <>
                <div className={classes.bar}>
                    <span className={classes.header}>
                        NOTIFICATION MANAGEMENT
                    </span>
                </div>

                <div className={classes.title}>
                    <span className={classes.notification}>Notifications</span>
                    <span className={classes.subscribe}>Subscribe to All</span>
                    <Switch className={classes.switch} groupName="All" Type="All" handleToggle={subscribeToAllHandleToogle} isOn={subscribeAllIsOn} />
                    <span className={classes.email}>Email</span>
                    <span className={classes.inApp}>InApp</span>
                </div>

                <SubscriptionList subs={subscriptions} handleToggle={handleSwitchChange} />
            </>
        )
    }
};

export default SubscriptionsPage;
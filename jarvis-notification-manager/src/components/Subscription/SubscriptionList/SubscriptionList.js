import classes from './SubscriptionList.module.css';
import SubscriptionItem from '../SubscriptionItem/SubscriptionItem';

const SubscriptionList = (props) => {
    // Map the subscriptions to SubscriptionItem components

    const subscriptionItems = props.subs.map((sub) => {
        return <SubscriptionItem
            key={sub.groupName}
            groupName={sub.groupName}
            receiveEmail={sub.receiveEmail}
            receiveInAppNotification={sub.receiveInAppNotification}
            description={sub.description}
            handleToggle={props.handleToggle}
        />
    });

    return (
        <div className={classes.subscriptionList}>
                {subscriptionItems}
        </div>
    );
}

export default SubscriptionList;
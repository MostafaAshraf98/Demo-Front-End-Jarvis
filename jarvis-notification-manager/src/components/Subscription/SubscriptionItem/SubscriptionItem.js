import classes from './SubscriptionItem.module.css';
import Switch from '../../UI/Switcher/Switch';

const SubscriptionItem = ({ groupName, receiveEmail, receiveInAppNotification, handleToggle, description }) => {


    return (<div className={classes.subscriptionItem}>
        <span className={classes.groupName}> {groupName}</span>
        <span className={classes.description}> {description}</span>
        <Switch
            className={classes.email}
            Type="Email"
            isOn={receiveEmail}
            handleToggle={handleToggle}
            groupName={groupName} />

        <Switch
            className={classes.inApp}
            Type="InApp"
            isOn={receiveInAppNotification}
            handleToggle={handleToggle}
            groupName={groupName} />

    </div>);
}

export default SubscriptionItem;
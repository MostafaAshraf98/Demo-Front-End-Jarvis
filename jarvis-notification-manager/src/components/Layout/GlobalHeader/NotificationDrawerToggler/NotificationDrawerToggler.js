import classes from './NotificationDrawerToggler.module.css';

const NotificationDrawerToggler = () => {
    return (
        <div className={classes.notificationDrawerToggler}>
            <div>
                <img src="/assets/Notification.svg" alt="bell" />
                <span className={classes.badge}>
                    3
                </span>
            </div>
        </div>
    );
}

export default NotificationDrawerToggler;
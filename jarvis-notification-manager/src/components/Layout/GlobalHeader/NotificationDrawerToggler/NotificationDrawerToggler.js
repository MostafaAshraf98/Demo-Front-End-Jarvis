import classes from './NotificationDrawerToggler.module.css';

const NotificationDrawerToggler = ({drawerToggleClickHandler }) => {
    return (
        <div className={classes.notificationDrawerToggler} onClick={drawerToggleClickHandler }>
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
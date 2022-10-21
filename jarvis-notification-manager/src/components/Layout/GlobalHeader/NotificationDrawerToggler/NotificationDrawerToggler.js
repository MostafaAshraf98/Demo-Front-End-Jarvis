import classes from './NotificationDrawerToggler.module.css';
import { useContext } from 'react';
import SignalRContext from '../../../../store/signalR-context';

const NotificationDrawerToggler = ({ drawerToggleClickHandler }) => {
    const signalRCtx = useContext(SignalRContext);
    return (
        <div className={classes.notificationDrawerToggler} onClick={drawerToggleClickHandler }>
            <div>
                <img src="/assets/Notification.svg" alt="bell" />
                {signalRCtx.countDelivered > 0 ? <span className={classes.badge}>{signalRCtx.countDelivered}</span> : null}
            </div>
        </div>
    );
}

export default NotificationDrawerToggler;
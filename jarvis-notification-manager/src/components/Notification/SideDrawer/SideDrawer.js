import classes from './SideDrawer.module.css';
import ReactTooltip from "react-tooltip";
import { useEffect } from 'react';
import NotificationList from '../NotificationList/NotificationList';
import { useContext } from 'react';
import SignalRContext from '../../../store/signalR-context';

const SideDrawer = ({ drawerOpen, markAllAsReadHandler }) => {
    useEffect(() => {
        ReactTooltip.rebuild();
    }, []);

    const signalRCtx = useContext(SignalRContext);

    const offset = { 'top': 35, 'right': 25 }

    let content;
    if (signalRCtx.notifications.length === 0) {
        content =
            <div className={classes.alert}>
                <img src="/assets/alert.svg" alt="alert" />
                <span>No Notifications</span>
            </div>
    } else {
        content = <NotificationList />
    }

    let attachedClasses = [classes.sideDrawer, classes.Close];
    if (drawerOpen) {
        attachedClasses = [classes.sideDrawer, classes.Open];
    }

    return (
        <div className={attachedClasses.join(' ')} >
            <div className={classes.drawerHeader}>
                <span className={classes.header}> Notifications </span>
                <span className={classes.mark} onClick={markAllAsReadHandler}> Mark all as read</span>
            </div>
            <div className={classes.setting}>
                <img src="/assets/setting.svg" alt="setting" data-tip='' data-for="Notification" />
                <div>
                    <ReactTooltip id="Notification" offset={offset} place='top' effect="solid">
                        Notification Management System
                    </ReactTooltip>
                </div>
            </div>
            {content}
        </div>
    );
}

export default SideDrawer;

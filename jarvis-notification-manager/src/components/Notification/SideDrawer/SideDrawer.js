import classes from './SideDrawer.module.css';
import ReactTooltip from "react-tooltip";
import { useEffect } from 'react';
import NotificationList from '../NotificationList/NotificationList';

const SideDrawer = () => {
    useEffect(() => {
        ReactTooltip.rebuild();
    }, []);
    const offset = { 'top': 35, 'right': 25 }

    return (
        <div className={classes.sideDrawer}>
            <div className={classes.drawerHeader}>
                <span className={classes.header}> Notifications </span>
                <span className={classes.mark}> Mark all as read</span>
            </div>
            <div>
                <img src="/assets/setting.svg" className={classes.setting} alt="setting" data-tip='' data-for="Notification" />

                <ReactTooltip id="Notification" offset={offset} place='top' effect="solid">
                    Notification Management System
                </ReactTooltip>
            </div>

            {/* <div className={classes.alert}>
                <img src="/assets/alert.svg" alt="alert" />
                <span>No Notifications</span>
            </div> */}

            <NotificationList />

        </div>
    );
}

export default SideDrawer;

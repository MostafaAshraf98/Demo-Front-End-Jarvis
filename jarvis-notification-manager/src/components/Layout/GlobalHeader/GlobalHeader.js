
import classes from './GlobalHeader.module.css';
import NotificationDrawerToggler from './NotificationDrawerToggler/NotificationDrawerToggler';
import { useContext } from 'react';
import SignalRContext from '../../../store/signalR-context';

const GlobalHeader = ({ drawerToggleClickHandler }) => {
    const signalRCtx = useContext(SignalRContext);
    if (window.location.pathname !== "/Subscriptions") {
        // set the width of the header 100%
        if (document.getElementById("header"))
            document.getElementById("globalheader").style.width = "100%";
    }
    return (
        <header id="globalheader" className={classes.header} >
            <div className={classes.container}>
                <div className={classes.wrapper}>

                </div>
                {signalRCtx.isConnected ? <NotificationDrawerToggler drawerToggleClickHandler={drawerToggleClickHandler} /> : null}

            </div>
        </header>


    );

}

export default GlobalHeader;


import classes from './GlobalHeader.module.css';
import NotificationDrawerToggler from './NotificationDrawerToggler/NotificationDrawerToggler';
import { useContext } from 'react';
import SignalRContext from '../../../store/signalR-context';

const GlobalHeader = ({ drawerToggleClickHandler }) => {
    const signalRCtx = useContext(SignalRContext);
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.wrapper}>

                </div>
                { signalRCtx.isConnected ? <NotificationDrawerToggler drawerToggleClickHandler={drawerToggleClickHandler} /> : null}

            </div>
        </header>


    );

}

export default GlobalHeader;

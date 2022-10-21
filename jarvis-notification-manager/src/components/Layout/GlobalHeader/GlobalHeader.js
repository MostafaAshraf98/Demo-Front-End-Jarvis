
import classes from './GlobalHeader.module.css';
import NotificationDrawerToggler from './NotificationDrawerToggler/NotificationDrawerToggler';

const GlobalHeader = ({ drawerToggleClickHandler}) => {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.wrapper}>

                </div>

                <NotificationDrawerToggler drawerToggleClickHandler={ drawerToggleClickHandler} />

            </div>
        </header>


    );

}

export default GlobalHeader;

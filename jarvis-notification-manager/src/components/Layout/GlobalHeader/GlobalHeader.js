
import classes from './GlobalHeader.module.css';
import NotificationDrawerToggler from './NotificationDrawerToggler/NotificationDrawerToggler';

const GlobalHeader = () => {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.wrapper}>
                    {/* search */}
                    {/* contact */}
                </div>
                {/* user info */}
                <NotificationDrawerToggler />
                {/* products links */}
            </div>
        </header>


    );

}

export default GlobalHeader;

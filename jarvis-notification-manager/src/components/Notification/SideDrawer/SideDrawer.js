import classes from './SideDrawer.module.css';

const SideDrawer = () => {
    return (
        <div className={classes.sideDrawer}>
            <span className={classes.header}> Notifications </span>
            <span className={classes.mark}> Mark all as read</span>
        </div>
    );
}

export default SideDrawer;

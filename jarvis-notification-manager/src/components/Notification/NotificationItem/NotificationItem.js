import classes from './NotificationItem.module.css';
import Options from '../Options/Options';

const NotificationItem = ({ message }) => {
    return (
        <li className={classes.notificationItem} style={message.status === "Unread" ? { backgroundColor: '#FFF5EA' } : { backgroundColor: 'white' }}>
            <span className={classes.unread}></span>

            <div className={classes.initials}>
                <span>J</span>
            </div>
            <div className={classes.content}>
                <span className={classes.title}>{message.title}</span>
                <span className={classes.body}>{message.body}</span>
                <span className={classes.date}>{message.sendingTime}</span>
                <div className={classes.attachment}>
                    <div className={classes.inner}>
                        <img src="/assets/Download.svg" alt="attachment" />
                        <span className={classes.download}>Download document</span>
                    </div>
                </div>
            </div>
            <div className={classes.menu}>
                <div className={classes.circle}>
                    <img className={classes.dot} src="/assets/BurgerMenu.svg" alt="menu" />
                </div>
                <Options show={true} onClick={() => { }} />
            </div>

        </li>
    );
}

export default NotificationItem;
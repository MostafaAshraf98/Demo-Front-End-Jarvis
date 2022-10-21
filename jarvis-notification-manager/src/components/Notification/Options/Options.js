import classes from './Options.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Options = (props) => {
    return (
        <div>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.options} // if we just add the if condition to show or hide the modal it wont have any animation ... but using this approach it will slide outside the screen and inside the screen bases on the status of the state member 'Purchasing'
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className={classes.items}>
                    <div className={classes.item} style={{ "borderBottom": "#e6ecf2 1px solid" }}>
                        <img src="/assets/Delete.svg" alt="delete" />
                        <span>Delete Notification</span>
                    </div>
                    <div className={classes.item}>
                        <img src="/assets/Notification.svg" alt="delete" />
                        <span>Mute Notification</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Options;


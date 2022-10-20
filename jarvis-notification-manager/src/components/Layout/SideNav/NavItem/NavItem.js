import classes from './NavItem.module.css';


const NavItem = (props) => {
    return (
        <li className={classes.NavItem}>
            <a href='/'>
                <img src={props.iconPath} alt="icon" />
                <span>{props.name}</span>
            </a>
        </li>
    );
}

export default NavItem;

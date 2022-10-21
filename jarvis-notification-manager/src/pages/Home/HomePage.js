import classes from './HomePage.module.css';
import SideNav from '../../components/Layout/SideNav/SideNav';

const HomePage = () => {


    return (
        <>
            <SideNav />
            <div className={classes.homePage}>
                <h1 className={classes.header}>Tracts</h1>
            </div>

        </>
    );
}

export default HomePage;
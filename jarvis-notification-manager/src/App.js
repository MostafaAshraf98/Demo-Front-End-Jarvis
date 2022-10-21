import classes from './App.module.css';
import SideNav from './components/Layout/SideNav/SideNav';
import GlobalHeader from './components/Layout/GlobalHeader/GlobalHeader';
import HomePage from './pages/Home/HomePage';
import SubscriptionsPage from './pages/Subscriptions/SubscriptionsPage';
import SideDrawer from './components/Notification/SideDrawer/SideDrawer';
import { Route, Switch } from 'react-router-dom';
import { useContext, useState } from 'react';
import SignalRContext from './store/signalR-context';


const App = () => {

  const signalRCtx = useContext(SignalRContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  let routes = [];
  routes.push(<Route key={1} path="/" exact component={HomePage} />);
  if (signalRCtx.isConnected) {
    routes.push(<Route key={2} path="/Subscriptions" component={SubscriptionsPage} exact />);
  }
  const drawerToggleClickHandler = () => {
    console.log('drawerToggleClickHandler');
    console.log("Prev State: " + drawerOpen);
    // Toggle the state of drawerOpen
    setDrawerOpen(!drawerOpen);
    console.log("New State: " + !drawerOpen);
  };
  return (
    <div className={classes.main}>
      <GlobalHeader drawerToggleClickHandler={drawerToggleClickHandler} />
      <Switch>
        {routes}
      </Switch>

      <SideDrawer drawerOpen={drawerOpen} />

    </div>
  );
}

export default App;

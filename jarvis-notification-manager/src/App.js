import classes from './App.module.css';
import SideNav from './components/Layout/SideNav/SideNav';
import GlobalHeader from './components/Layout/GlobalHeader/GlobalHeader';
import HomePage from './pages/Home/HomePage';
import SideDrawer from './components/Notification/SideDrawer/SideDrawer';

const App = () => {
  return (
    <div >
      <SideNav />
      <GlobalHeader />
      <HomePage />
      <SideDrawer />
    </div>
  );
}

export default App;

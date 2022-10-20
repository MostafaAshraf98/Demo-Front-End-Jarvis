import classes from './SideNav.module.css';

import NavItem from './NavItem/NavItem';

const SideNav = () => {

    const sideNavItems1 = [
        { name: 'Leads', iconPath: '/assets/user-avatar.png' },
        { name: 'Deals', iconPath: '/assets/note.png' },
        { name: 'Tracts', iconPath: '/assets/tract.png' },
        { name: 'Wells', iconPath: '/assets/well.png' },
        { name: 'DSUs', iconPath: '/assets/copy.svg' },
    ];

    const sideNaveItems2 = [
        { name: 'Packages', iconPath: '/assets/message.svg' },
        { name: 'DataTables', iconPath: '/assets/list.svg' },
        { name: 'Reports', iconPath: '/assets/x-file.svg' },
        { name: 'Reserves', iconPath: '/assets/chart.svg' },
    ];

    const content1 = sideNavItems1.map((item, index) => {
        return <NavItem key={index} name={item.name} iconPath={item.iconPath} />
    });

    const content2 = sideNaveItems2.map((item, index) => {
        return <NavItem key={index} name={item.name} iconPath={item.iconPath} />
    });

    return (
        <div className={classes.SideNav}>
                <img src="/assets/jarvis-side-bar.png" alt="Jarvis Logo" className={classes.Logo}/>
            <ul>
                {content1}
            </ul>
            <hr className='separator'/>
            <ul>
                {content2}
            </ul>
        </div>
    );
}
export default SideNav;
import classes from './NotificationList.module.css';
import NotificationItem from '../NotificationItem/NotificationItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const NotificationList = () => {
    const dummy_list = [
        {
            id: 1,
            title: 'You have a new message from John Doe',
            body: 'A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added',
            fileName: null,
            shareName: null,
            directoryName: null,
            sendingTime: '2021-05-12 12:00:00',
            status: 'Unread'
        },
        {
            id: 2,
            title: 'You have a new message from John Doe',
            body: 'A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added',
            fileName: null,
            shareName: null,
            directoryName: null,
            sendingTime: '2021-05-12 12:00:00',
            status: 'Unread'
        },
        {
            id: 3,
            title: 'You have a new message from John Doe',
            body: 'A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added',
            fileName: null,
            shareName: null,
            directoryName: null,
            sendingTime: '2021-05-12 12:00:00',
            status: 'Unread'
        }, {
            id: 4,
            title: 'You have a new message from John Doe',
            body: 'A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added',
            fileName: null,
            shareName: null,
            directoryName: null,
            sendingTime: '2021-05-12 12:00:00',
            status: 'Unread'
        }, {
            id: 5,
            title: 'You have a new message from John Doe',
            body: 'A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added',
            fileName: null,
            shareName: null,
            directoryName: null,
            sendingTime: '2021-05-12 12:00:00',
            status: 'Unread'
        }, {
            id: 6,
            title: 'You have a new message from John Doe',
            body: 'A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added',
            fileName: null,
            shareName: null,
            directoryName: null,
            sendingTime: '2021-05-12 12:00:00',
            status: 'Unread'
        }, {
            id: 7,
            title: 'You have a new message from John Doe',
            body: 'A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added',
            fileName: null,
            shareName: null,
            directoryName: null,
            sendingTime: '2021-05-12 12:00:00',
            status: 'Unread'
        }, {
            id: 8,
            title: 'You have a new message from John Doe',
            body: 'A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added',
            fileName: null,
            shareName: null,
            directoryName: null,
            sendingTime: '2021-05-12 12:00:00',
            status: 'Unread'
        }, {
            id: 9,
            title: 'You have a new message from John Doe',
            body: 'A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added',
            fileName: null,
            shareName: null,
            directoryName: null,
            sendingTime: '2021-05-12 12:00:00',
            status: 'Unread'
        }, {
            id: 10,
            title: 'You have a new message from John Doe',
            body: 'A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added A new Price deck was added',
            fileName: null,
            shareName: null,
            directoryName: null,
            sendingTime: '2021-05-12 12:00:00',
            status: 'Unread'
        }



    ];

    const content = dummy_list.map((item) => {
        return <NotificationItem key={item.id} message={item} />
    });

    return (
        <div className={classes.notificationList}>
            <ul >
                <InfiniteScroll
                    dataLength={dummy_list.length}
                    pullDownToRefreshThreshold={50}
                    scrollableTarget="scrollableDiv"
                    hasMore={false}
                    loader={<h4>Loading...</h4>}
                >
                    {content}
                </InfiniteScroll>

            </ul>
        </div>
    );

};

export default NotificationList;
import classes from './NotificationItem.module.css';
import Options from '../Options/Options';
import Moment from 'moment';
import { useState, useEffect } from 'react';

import { ShareServiceClient } from "@azure/storage-file-share";
const sas = "https://notificationsfilestorage.file.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-01-01T20:46:31Z&st=2022-01-01T12:46:31Z&spr=https,http&sig=nFgLrbJsFx0tjajGjYvvf4hoblgCoiFl5sRH7tOAqX0%3D";


const NotificationItem = ({ message }) => {
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [shareServiceClient, setShareServiceClient] = useState(null);

    const optionsClickHandler = () => {
        console.log("optionsClickHandler");
        setOptionsOpen(!optionsOpen);
    }

    useEffect(() => {
        const ServiceClient = new ShareServiceClient(sas);
        setShareServiceClient(ServiceClient);
    }, []);

    const downloadFileHandler = async () => {
        // This function download a file from Azure file share
        const fileName = message.fileName;

        const fileClient = shareServiceClient
            .getShareClient(message.shareName)
            .getDirectoryClient(message.directoryName)
            .getFileClient(fileName)

        const downloadResponse = await fileClient.download();

        const blob = await downloadResponse.blobBody;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    return (
        <li className={classes.notificationItem} style={message.status === "Unread" ? { backgroundColor: '#FFF5EA' } : { backgroundColor: 'white' }}>
            {message.status === "Unread" ? <span className={classes.unread}></span> : null}

            <div className={classes.initials}>
                <span>J</span>
            </div>
            <div className={classes.content}>
                <span className={classes.title}>{message.title}</span>
                <span className={classes.body}>{message.body}</span>
                <span className={classes.date}>Date: {Moment(message.sendingTime).format('DD/MM/YYYY HH:MM')} ET by Jarvis</span>
                {message.fileName ?
                    <div className={classes.attachment} onClick={downloadFileHandler }>
                        <div className={classes.inner}>
                            <img src="/assets/Download.svg" alt="attachment" />
                            <span className={classes.download}>Download document</span>
                        </div>
                    </div> : null
                }

            </div>
            <div className={classes.menu} onClick={optionsClickHandler}>
                <div className={classes.circle}>
                    <img className={classes.dot} src="/assets/BurgerMenu.svg" alt="menu" />
                </div>
                <Options id={message.id} type={message.notificationType } show={optionsOpen} />
            </div>

        </li>
    );
}

export default NotificationItem;
import React from 'react';
import SideBar from '../SideBar/sideBar';
import FeedBack from './FeedBack/feedBack';
import './dashBoardFeedback.scss'

var DashBoardStudFeedBack = () => {
    return(
        <div className="container-fluid">
            <div className="row">
                <SideBar />
                <div className="col-sm-4 offset-sm-4 mt-5per">
                <FeedBack />
                </div>
            </div>
        </div>
    )
}

export default DashBoardStudFeedBack;
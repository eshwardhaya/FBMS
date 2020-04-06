import React from 'react';
import Questions from './Questions/questions';
import SideBar from '../SideBar/sideBar';

var FeedBackProcess = () => {
        var style = {
            marginTop : 75
        }
    return(
        <div className="container-fluid">
            <div className="row">
                <SideBar />
                <div className="offset-sm-2 col-sm-8" style={style}>
                    <Questions />
                </div>
            </div>
        </div>
    );
}


export default FeedBackProcess;
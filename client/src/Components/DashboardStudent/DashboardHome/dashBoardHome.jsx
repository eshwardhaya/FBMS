import React from 'react';
import SideBar from '../SideBar/sideBar';
import HomeDataStud from './Home/HomeDataStud';

var DashBoardHomeStud = () => {
    return(
        <div className="container-fluid">
            <div className="row">
                <SideBar />
                <div className="offset-sm-4 col-sm-4">
                    <HomeDataStud />
                </div>
            </div>
        </div>
    )
};


export default DashBoardHomeStud;
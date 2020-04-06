import React from 'react';
import SideBar from '../SideBar/sideBar';
import HomeContStaff from './Home/HomeContStaff';


var HomeStaff = () => {
    return(
        <div className="container-fluid">
            <div className="row">
                <SideBar />
                <div className="offset-sm-4 col-sm-4">
                    <HomeContStaff />
                </div>
            </div>
        </div>
    )
}

export default HomeStaff;
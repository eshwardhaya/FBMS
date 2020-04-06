import React from 'react';
import SideBar from './../SideBar/sideBar';
import ReportGen from './ReportGen/ReportGen';

var ReportGenStaff = () => {
    return(
        <div className="container-fluid">
            <div className="row">
                <SideBar />
                <div className="offset-sm-2 col-sm-8">
                    <ReportGen />
                </div>
            </div>
        </div>
    )
}

export default ReportGenStaff;
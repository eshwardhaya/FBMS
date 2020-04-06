import React from 'react';
import './Login.scss';
import 'bootstrap/dist/js/bootstrap';
import 'jquery/dist/jquery';
import { LoginStud, LoginStaff, LoginAdmin } from './LoginForms';

var Login = () => {
    return (
        <div className="container-fluid">
            <div className="row">
            <div className="offset-sm-4 col-sm-4 cont-cust shadow p-3 mb-5 bg-white rounded">
                <ul className="nav nav-tabs cust-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#stud">Student</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#staff">Staff</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#admin">Admin</a>
                    </li>
                </ul>
                <div className="tab-content mt-3">
                    <div className="tab-pane container active" id="stud">
                        <LoginStud />
                    </div>
                    <div className="tab-pane container fade" id="staff">
                        <LoginStaff />
                    </div>
                    <div className="tab-pane container fade" id="admin">
                        <LoginAdmin />
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
};


export default Login;
import React from 'react';
import './HomeContStaff.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import  'izitoast/dist/js/iziToast';

class HomeContStaff extends React.Component {
    constructor(){
        super();
        this.state = {
            staffName : 'Mr.S.Muthukumar',
            dept : 'CSE',
            phone : '(+91) 9876543210',
            mail : 'hodcse@sowdambikaengg.edu.in',
            pass : 'staff@123'
        }
    }

    handleChange = (event) => {
        if(event.target.value === ''){
            iziToast.warning({
                title : 'Warning',
                message : 'This field should be filled',
                timeout : 5000,
            })
        }

        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        return(
            <div className="container-fluid mt-75px">
                <div className="user-details">
                    <div className="user-icon text-center p-3">
                    <span className="avatar display-block"><FontAwesomeIcon icon={faUserCircle} size='4x' /></span>
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="staffName">Name</label>
                            <input type="text" value={this.state.staffName} name="staffName"  className="form-control" readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dept">Department</label>
                            <input type="text" value={this.state.dept} name="dept"  className="form-control" readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Mobile</label>
                            <input type="text" value={this.state.phone} name="phone"  className="form-control" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mail">Mail</label>
                            <input type="mail" value={this.state.mail} name="mail"  className="form-control" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Password</label>
                            <input type="text" value={this.state.pass} name="pass"  className="form-control" onChange={this.handleChange}/>
                        </div>
                        <div className="text-right">
                            <input type="submit" className="btn btn-primary rounded-0" value="Update !"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default HomeContStaff;
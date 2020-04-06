import React from 'react';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'izitoast/dist/js/iziToast';
import axios from 'axios';

class LoginStud extends React.Component {
    constructor() {
        super();
        this.state = {
            regNo: '',
            pass: ''
        }
        this.sendToBackend = this.sendToBackend.bind(this);
    }

    getformData = (event) => {
        const value = event.target.value;
        if (value === '') {
            iziToast.warning({
                title: 'Warning',
                message: 'This field shoud not be Empty',
                position: 'topRight',
                timeout: 6000,
            });
        }
        this.setState({
            [event.target.name]: value
        });
    }

    sendToBackend(event) {
        event.preventDefault();
        if (this.state.regNo === "" && this.state.pass === "") {
            iziToast.error({
                title: 'error',
                message: 'Fill all Fields',
                position: 'topCenter',
                timeout: 6000,
            });
        } else {
            (async () => {
                var result = null;
                try {
                    result = await axios.post("/loginStudent", { regNo: this.state.regNo, pass: this.state.pass });
                } catch (error) {
                    result = error.response;
                } finally {
                    if (result.status === 200) {
                        window.location.replace("/studHome")
                    } else {
                        iziToast.error({
                            title: 'error',
                            message: '' + result.status + ' ' + result.statusText + '',
                            timeout: 6000,
                            position: 'topCenter',
                        })
                    }
                }
            })();
        }
    }

    render() {
        return (
            <form onSubmit={this.sendToBackend}>
                <div className="form-group">
                    <label htmlFor="regNo">Register Number</label>
                    <input type="text" name="regNo" value={this.state.regNo} onChange={this.getformData} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password</label>
                    <input type="password" name="pass" value={this.state.pass} onChange={this.getformData} className="form-control" />
                </div>
                <div className="text-right">
                    <input type="submit" className="btn btn-primary btn-custom" value="Login" />
                </div>
            </form>
        )
    }

};


class LoginStaff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pass: ''
        }
        this.sendToBackend = this.sendToBackend.bind(this);
    }

    getFormData = (event) => {
        if (event.target.value === '') {
            iziToast.warning({
                title: 'Warning',
                message: 'This field shoud not be Empty',
                position: 'topRight',
                timeout: 6000,
            });
        }
        this.setState({
            [event.target.name]: event.target.value
        });

    }

    sendToBackend = (event) => {
        event.preventDefault();
        if (this.state.username === "" && this.state.pass === "") {
            iziToast.error({
                title: 'Error',
                message: 'Fill all required Fields',
                position: 'topRight',
                timeout: 6000,
            });
        } else {
            (async () => {
                let result = null;
                try {
                    result = await axios.post("/loginStaff", { username: this.state.username, pass: this.state.pass });
                } catch (err) {
                    result = err.response;
                } finally {
                    if (result.status === 200) {
                        window.location.replace("/staffHome");
                    } else {
                        iziToast.error({
                            title : "Error",
                            message : ""+result.status+" "+result.statusText,
                            timeout : 6000,
                            position : 'topCenter',
                        })
                    }
                }
            })();
        }
    }

    render() {
        return (
            <form onSubmit={this.sendToBackend}>
                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.getFormData} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password</label>
                    <input type="password" name="pass" value={this.state.pass} onChange={this.getFormData} className="form-control" />
                </div>
                <div className="text-right">
                    <input type="submit" className="btn btn-primary btn-custom" value="Login" />
                </div>
            </form>
        )
    }
};


class LoginAdmin extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            pass: ''
        }
    }

    getFormData = (event) => {
        if (event.target.value === '') {
            iziToast.warning({
                title: 'Warning',
                message: 'This field shoud not be Empty',
                position: 'topRight',
                timeout: 6000,
            });
        }
        this.setState({
            [event.target.name]: event.target.value
        });

    }


    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.getFormData} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password</label>
                    <input type="password" name="pass" value={this.state.pass} onChange={this.getFormData} className="form-control" />
                </div>
                <div className="text-right">
                    <input type="submit" className="btn btn-primary btn-custom" value="Login" />
                </div>
            </form>
        )
    }
};


export { LoginStud, LoginStaff, LoginAdmin };
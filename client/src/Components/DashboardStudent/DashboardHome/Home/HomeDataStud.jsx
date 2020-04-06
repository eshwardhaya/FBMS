import React from 'react';
import './HomeDataStud.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle,faPen } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import { Link } from 'react-router-dom';
import  iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'izitoast/dist/js/iziToast';


class HomeDataStud extends React.Component{
    constructor(){
        super();
        this.state = {
            name : '',
            regNo : '',
            dept : '',
            pass : '',
            year : ''
        }
    }


    passWordChange = () =>{
        const Myswal = withReactContent(Swal);
        Myswal.mixin({
            input : 'password',
            showCancelButton : 'true',
            confirmButtonText : 'Next',
        }).queue([{
            title : 'Enter new Password'
        },
        'Confirm Password'
        ]).then(function(password){
            if(password.value){
                var passwordFinal = password.value;    
                if(passwordFinal[0] === passwordFinal[1]){
                    Myswal.fire({
                        icon : 'success',
                        title : 'Password Changed Successfully',
                        timer : 3000
                    });
                    } else {
                    Myswal.fire({
                        icon : 'error',
                        title :  'Your Passwords are not match',
                        timer : 3000
                    });
                    passwordFinal = [];
                }    
                localStorage.setItem('passwordFinal',passwordFinal[0]);                    
            }
        });
        this.setState({
            pass : localStorage.getItem('passwordFinal')
        });
        console.log(this.state.pass)
    }
    componentDidMount(){
        let data = null;
        try{
            data = axios.get("/StudHome");
        } catch (error){
            data = error.response;
        } finally {
            data.then((result) => {
                this.setState({
                    name : result.data.studName,
                    regNo : result.data.regNo,
                    pass : result.data.pass,
                    year : result.data.year,
                    dept : result.data.dept
                });
            } ,() => {
                iziToast.info({
                    title : 'Info',
                    message : 'You are not Logged in, Please Login...',
                    timeout : 6000,
                    position : 'topCenter',
                });
                setTimeout(() => { window.location.replace("/") } , 6500)
            });
        }
    }

    render(){   
        localStorage.clear()  
        return(
            <div className="container-fluid mt-custom">
                <div className="user-avatar text-center">
                    <span className="avatar" ><FontAwesomeIcon icon={faUserCircle} size='6x' /></span>
                    <span className="user-name">{this.state.name}</span>
                </div>
                <div className="user-details px-4 text-center">
                    <span>{this.state.regNo}</span>
                    <span>Dept : {this.state.dept}</span>
                    <span className="passChange">Password :  {this.state.pass}<span className="editIcon" onClick={this.passWordChange}><FontAwesomeIcon icon={faPen} size="sm" /></span></span>
                </div>
                <div className="text-center border-0 p-3">
                <Link to="/feedback"><button className="btn btn-primary rounded-0">Feedback</button></Link>
                </div>
            </div>
        )
    }
}


export default HomeDataStud;
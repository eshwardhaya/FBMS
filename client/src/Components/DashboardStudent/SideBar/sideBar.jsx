import React from 'react';
import './sideBar.scss';
import { gsap } from 'gsap'
import { Link } from 'react-router-dom';
import axios from 'axios';
// faUserCog
// Font Awesome Icons
import { faTimes, faUserCircle, faHome, faCommentAlt,  faSignOutAlt, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class sideBar extends React.Component {
    constructor() {
        super();
        this.state = {
            hideSideBar: true,
            name : '',
            regNo : ''
        }

        this.terminateSession = this.terminateSession.bind(this);
    }

    CloseSideBar = () => {
        gsap.fromTo("#sideBar", { marginLeft: 0 }, { marginLeft: -250 });
        gsap.to(".showSidebar", { display: 'block' });
        this.setState({
            hideSideBar: true
        });
    }

    showNavBar = () => {
        gsap.to(".showSidebar", { display: 'none' });
        gsap.fromTo("#sideBar", { marginLeft: -250 }, { marginLeft: 0 });

    }

    componentDidMount(){
        var data = null;
        try {
            data = axios.get("/studHome"); 
        } catch (error) {
            data = error.response;
        } finally {
            data.then(result => {
                this.setState({
                    name : result.data.studName,
                    regNo : result.data.regNo
                })
            })
        }
    }

    terminateSession = (event) => {
        event.preventDefault();
        let data = null;
        try {
            data = axios.post('/terminate');
        } catch (err) {
            data = err.response;
        } finally {
            data.then(result => {
                if(result.status === 200){
                    window.location.replace("/")
                }
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="sidebar-static">
                    <div className="sidebar-container" id="sideBar">
                        <div className="sidebar-wrapper">
                            <div className="close-icon">
                                <FontAwesomeIcon icon={faTimes} size='lg' onClick={this.CloseSideBar} />
                            </div>
                            <div className="user-info mb-4  ">
                                <div className="user-icon">
                                    <FontAwesomeIcon icon={faUserCircle} size='3x' />
                                </div>
                                <div className="user-details">
                                    <span className="user-name">{this.state.name}</span>
                                    <span className="user-type">{this.state.regNo}</span>
                                </div>
                            </div>
                            <div className="sidebar-items">
                                <ul className="item-wrapper">
                                    <li className="sidebar-item"><Link className="custom-link" to="/studHome"><span className="item-icon"><FontAwesomeIcon icon={faHome} /></span>Home</Link></li>
                                    <li className="sidebar-item"><Link className="custom-link" to="/feedback" ><span className="item-icon"><FontAwesomeIcon icon={faCommentAlt} /></span>Feedback</Link></li>
                                    {/* <li className="sidebar-item"><span className="item-icon"><FontAwesomeIcon icon={faUserCog} /></span>Settings</li> */}
                                    <li className="sidebar-item" onClick={this.terminateSession}><span className="item-icon"><FontAwesomeIcon icon={faSignOutAlt} /></span>Log Out</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.hideSideBar ?
                        <div className="showSidebar" onClick={this.showNavBar}>
                            <FontAwesomeIcon icon={faLongArrowAltRight} size='lg' className="icon-pos" />
                        </div> :
                        null

                }
            </React.Fragment>
        )
    }
}

export default sideBar
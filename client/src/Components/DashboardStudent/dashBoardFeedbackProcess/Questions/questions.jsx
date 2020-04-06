import React from 'react';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'izitoast/dist/js/iziToast';
import axios from 'axios';



class Questions extends React.Component {
    constructor() {
        super();
        this.state = {
            regNo: '',
            subCode: '',
            subName: '',
            staffName: '',
            dept: '',
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            q6: '',
            q7: '',
            q8: '',
            q9: '',
            q10: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        if (event.target.value === "") {
            iziToast.warning({
                title: 'Warning',
                message: 'This field is required',
                timeout: 6000,
                position: 'topRight',
            })
        }
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        let data = null;
        try {
            data = axios.get("/FeedbackGetStaffInfo");
        } catch (error) {
            data = error.response;
        } finally {
            data.then(result => {
                let { subjectcode, subjectname, staffname, dept } = result.data.staffInfo;
                this.setState({
                    subCode: subjectcode,
                    subName: subjectname,
                    staffName: staffname,
                    dept: dept,
                    regNo: result.data.regNo
                })
            }, () => {
                iziToast.info({
                    title: 'Info',
                    message: 'You are not Logged in, Please Login...',
                    timeout: 6000,
                    position: 'topCenter',
                });
                setTimeout(() => { window.location.replace("/") }, 6500)
            })
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = this.state;
        let data = null;
        try {
            data = axios.post("/FeedbackSubmitAllValues", { q1: q1, q2: q2, q3: q3, q4: q4, q5: q5, q6: q6, q7: q7, q8: q8, q9: q9, q10: q10 })
        } catch (error) {
            console.log(error)
        } finally {
            data.then(result => {
                let respMessage = result.data.msg;
                iziToast.info({
                    title: 'info',
                    message: ''+respMessage,
                    position: 'topCenter',
                    timeout: 1000 * 60 * 60 * 8,
                })
            })
        }
    }

    render() {
        var optionValues = [
            {
                optionName: 'Select a Value',
                marks: ''
            },
            {
                optionName: 'Excellent',
                marks: 5
            },
            {
                optionName: 'Very Good',
                marks: 4
            },
            {
                optionName: 'Good',
                marks: 3
            },
            {
                optionName: 'Satisfacotry',
                marks: 2
            },
            {
                optionName: 'Need Improvement',
                marks: 1
            }
        ];

        var optionEle = [];

        for (let option of optionValues) {
            let { optionName, marks } = option;
            optionEle.push(
                <option value={marks} key={optionName}>{optionName}</option>
            );
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="card bg-dark text-white col-sm-5 p-2 mb-3 ml-0">
                    <div className="card-body">
                        <div className="feedbackforDetails">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Register Number</td>
                                        <td>: {this.state.regNo}</td>
                                    </tr>
                                    <tr>
                                        <td>Subject Code</td>
                                        <td>: {this.state.subCode}</td>
                                    </tr>
                                    <tr>
                                        <td>Subject Name</td>
                                        <td>: {this.state.subName}</td>
                                    </tr>
                                    <tr>
                                        <td>Staff Name</td>
                                        <td>: {this.state.staffName}</td>
                                    </tr>
                                    <tr>
                                        <td>Department</td>
                                        <td>: {this.state.dept}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-right">
                                <input type="submit" className="btn btn-primary rounded-0" value="Submit Feedback" />
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table table-hover">
                    {/* <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Marks</th>
                        </tr>
                    </thead> */}
                    <tbody className="border">
                        <tr>
                            <td>Ability of Teaching</td>
                            <td>
                                <select name="q1" required={true} className="form-control" value={this.state.q1} onChange={this.handleChange}>
                                    {optionEle}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Preparedness for Class</td>
                            <td>
                                <select name="q2" required={true} className="form-control" value={this.state.q2} onChange={this.handleChange}>
                                    {optionEle}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Class Handling Attitude</td>
                            <td>
                                <select name="q3" required={true} className="form-control" value={this.state.q3} onChange={this.handleChange}>
                                    {optionEle}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Doubt Clarifications</td>
                            <td>
                                <select name="q4" required={true} className="form-control" value={this.state.q4} onChange={this.handleChange}>
                                    {optionEle}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Syllabus Coverage</td>
                            <td>
                                <select name="q5" required={true} className="form-control" value={this.state.q5} onChange={this.handleChange}>
                                    {optionEle}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Understandability/Audibility</td>
                            <td>
                                <select name="q6" required={true} className="form-control" value={this.state.q6} onChange={this.handleChange}>
                                    {optionEle}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Interaction</td>
                            <td>
                                <select name="q7" required={true} className="form-control" value={this.state.q7} onChange={this.handleChange}>
                                    {optionEle}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Class Control</td>
                            <td>
                                <select name="q8" required={true} className="form-control" value={this.state.q8} onChange={this.handleChange}>
                                    {optionEle}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Punctuality</td>
                            <td>
                                <select name="q9" required={true} className="form-control" value={this.state.q9} onChange={this.handleChange}>
                                    {optionEle}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Time Utilization</td>
                            <td>
                                <select name="q10" required={true} className="form-control" value={this.state.q10} onChange={this.handleChange}>
                                    {optionEle}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        )
    }
}

export default Questions;
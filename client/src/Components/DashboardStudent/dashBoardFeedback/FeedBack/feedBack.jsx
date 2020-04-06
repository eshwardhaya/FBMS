import React from 'react';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'izitoast/dist/js/iziToast';
import axios from 'axios';
class FeedBack extends React.Component {
    constructor() {
        super();
        this.state = {
            regNo: '',
            subCode: '',
            subName: '',
            sem: '',
            staff: '',
            stype: '',
            dept: '',
            append: [<input key="0" className="form-control"  name="dept"  readOnly/>]

        }
        this.changehandle = this.changehandle.bind(this);
        this.sendToBackend = this.sendToBackend.bind(this);
        this.forMultipleSubjects = this.forMultipleSubjects.bind(this);
    }

    forMultipleSubjects = (event) => {        
            axios.post("/FeedbackMultiple",{ subjectCode : this.state.subCode , dept : event.target.value  })
            .then(res => {
                let target = res.data.subDetails[0];
                console.log(target)
                this.setState({
                    regNo : res.data.regNo,
                    subName : target.subjectname,
                    sem : target.semester,
                    staff : target.staffname,
                    dept : target.dept,
                    stype : 'Theory'
                })
             })
    }

    changehandle = (event) => {
        if (event.target.value === "Select Value") {
            iziToast.warning({
                title: 'Warning',
                message: 'This field ' + event.target.name + ' is required',
                position: 'topRight',
                timeout: 6000,
            });
        };
        this.setState({
            [event.target.name]: event.target.value
        });
        let data = null;
        try {
            data = axios.post("/Feedback", { subjectCode: event.target.value });
        } catch (error) {
            data = error.response;
        } finally {
            data.then(result => {
                if (result.data.subDetails.length === 1) {
                    for (let info of result.data.subDetails) {
                        let { semester, subjectcode, subjectname, staffname, dept } = info;
                        this.setState({
                            regNo: result.data.regNo,
                            subCode: subjectcode,
                            subName: subjectname,
                            sem: semester,
                            staff: staffname,
                            stype: 'Theory',
                            dept: dept
                        })
                    }
                    let x = <input className="form-control" name="dept" value={this.state.dept}  readOnly/>
                    this.setState({
                        append : x
                    })
                } else {
                    let ParentSub = [];
                    let childele = [];
                    for (let info of result.data.subDetails) {
                        let { dept } = info;
                        childele.push(<option key={dept} value={dept}>{dept}</option>);
                    }
                    ParentSub.push(<select required={true} onChange={this.forMultipleSubjects} key={2} className="form-control" ><option key={6} value="-">Select Department</option>{childele}</select>);
                    this.setState({
                        append: ParentSub,
                        regNo: '',
                        subName: '',
                        sem: '',
                        staff: ''

                    })
                }
            }, () => {
                iziToast.info({
                    title: 'Info',
                    message: 'You are not Logged in, Please Login...',
                    timeout: 6000,
                    position: 'topCenter',
                });
                setTimeout(() => { window.location.replace("/") }, 6500)
            });
        }
    }

    sendToBackend = (event) => {
        event.preventDefault();
        console.log(this.state.subCode)
        if (this.state.subCode === "Select Value") {
            iziToast.error({
                title: 'error',
                message: 'Select valid Subject Code',
                timeout: 6000,
                position: 'topCenter'
            })
        } else {
            let data = null;
            try {
                data = axios.post("/FeedbackIntialSubmit", { staffName: this.state.staff, subCode: this.state.subCode, subName: this.state.subName, sem: this.state.sem, dept: this.state.dept, stype: this.state.stype });
            } catch (error) {
                data = error.response;
            } finally {
                data.then(result => {
                    if (result.status === 200) {
                        window.location.replace("/FeedbackProcess");
                    }
                });
            }
        }
    }

    render() {
        var subjectDetails = ["Select Value", "MA8402",
            "CS8491",
            "CS8492",
            "CS8493",
            "CS8494",
            "CS8451",
            "CS8651",
            "CS8691",
            "CS8601",
            "CS8602",
            "CS8603",
            "CS8075",
            "CS6801",
            "CS6008",
            "EE8401",
            "EE8402",
            "EE8403",
            "EE8451",
            "IC8451",
            "EE8601",
            "EE8602",
            "EE8691",
            "EE8002",
            "EC8395",
            "EE6801",
            "EE6009",
            "MA8451",
            "EC8452",
            "EC8491",
            "EC8451",
            "EC8453",
            "GE8291",
            "EC8691",
            "EC8095",
            "EC8652",
            "MG8591",
            "EC8651",
            "CS8792",
            "EC6801",
            "EC6802",
            "GE6075",
            "GE6757",
            "MA8491",
            "CE8401",
            "CE8402",
            "CE8403",
            "CE8404",
            "CE8491",
            "CE8601",
            "CE8602",
            "CE8603",
            "CE8604",
            "EN8592",
            "CE8001",
            "MG6851",
            "CE6016",
            "CE6021",
            "MA8452",
            "ME8492",
            "ME8451",
            "ME8491",
            "CE8395",
            "ME8493",
            "ME8651",
            "ME8691",
            "ME8693",
            "ME8692",
            "ME8694",
            "ME8091",
            "MG6863",
            "IE6605",
            "ME6016",
            "HS8251",
            "MA8251",
            "PH8253",
            "BE8252",
            "BE8254",
            "EE8251",
            "EC8252",
            "PH8252",
            "BE8255",
            "CS8251",
            "PH8201",
            "PH8251",
            "BE8253",
            "GE8292",
            "BE8251"
        ];
        var subCodeCollection = [];

        for (let code of subjectDetails) {
            subCodeCollection.push(<option value={code} key={code}>{code}</option>);
        }

        return (
            <form onSubmit={this.sendToBackend}>
                <div className="form-group">
                    <label htmlFor="regNo">Register Number</label>
                    <input type="text" name="regNo" value={this.state.regNo} className="form-control" readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="sem">Semester</label>
                    <input type="text" name="sem" value={this.state.sem} className="form-control" readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="subCode">Subject Code</label>
                    <select name="subCode" onChange={this.changehandle} className="form-control">
                        {subCodeCollection}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="subName">Subject Name</label>
                    <input type="text" name="subName" value={this.state.subName} className="form-control" readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="staff">Staff Name</label>
                    <input type="text" name="staff" value={this.state.staff} className="form-control" readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="dept">Department</label>
                    {this.state.append}
                </div>
                <div className="form-group">
                    <label htmlFor="stype">Subject Type</label>
                    <input type="text" name="dept" value={this.state.stype} className="form-control" readOnly />
                </div>
                <div className="text-right p-3">
                    <input type="submit" className="btn btn-primary btn-custom" value="Proceed" />
                </div>
            </form>
        )

    }
}


export default FeedBack;
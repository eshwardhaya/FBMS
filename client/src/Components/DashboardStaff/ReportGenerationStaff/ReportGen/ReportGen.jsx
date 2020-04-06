import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import './ReportGen.scss';
import { saveAs } from 'file-saver';
import axios from 'axios';
import iziToast from 'izitoast';


class ReportGen extends React.Component {
    constructor() {
        super();
        this.state = {
            reportData: [],
            staffData: {},
            indivData: ''
        }
        this.AddData = this.AddData.bind(this);
    }

    componentDidMount() {
        let data = null;
        try {
            data = axios.get("/getGraphData");
        } catch (err) {
            data = err.response;
        } finally {
            data.then(result => {
                let pushData = [];
                for (let subDetails of result.data) {
                    let { collDetails } = subDetails;
                    let { subCode, subName , year } = collDetails;
                    let dataTemp = {
                        subCode: subCode,
                        subName: subName,
                        AddInfo: result.data,
                        year : year
                    }
                    pushData.push(dataTemp)
                }
                this.setState({
                    reportData: pushData
                });
            })
        }
    }

    AddData = (event) => {
        let target = event.target
        let actualTarget = target.parentElement.parentElement;
        let reference = actualTarget.getAttribute("id");
        axios.post("/dataForPDF",{ subCode : reference }).then((result) => {
            if(result.data.err){
                iziToast.error({
                    title : 'Error',
                    message : ''+result.data.err,
                })
            } else {
                axios.get("/DownloadPDF",{ responseType : 'blob' }).then(result => {
                    const pdfBlob = new Blob([result.data], { type : 'application/pdf'});
                    saveAs(pdfBlob , 'result.pdf');
                });
            }
        });
    }


    render() {
        var cardItem = [];
        for (let report of this.state.reportData) {
            let { subName, subCode , year } = report;
            console.log(report)
            cardItem.push(
                <div className="col-sm-3" key={subCode}>
                    <div className="card">
                        <span className="card-img-top display-block text-center p-5">
                            <FontAwesomeIcon className="iconCardArr" icon={faFileExport} size='3x' />
                        </span>
                        <div className="card-body bg-light">
                            <h5 className="card-title m-0">{subName}</h5>
                            <p className="card-text" >{subCode} <br /> Year : {year}</p>
                        </div>
                        <div className="export-icons bg-light pb-3">
                            <span className="pdf" id={subCode} onClick={this.AddData}>
                                    <FontAwesomeIcon className="icon" icon={faFilePdf} size="2x" />
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="container-fluid mt-75px">
                <div className="row">
                    {cardItem}
                </div>
            </div>
        )
    }
}

export default ReportGen;
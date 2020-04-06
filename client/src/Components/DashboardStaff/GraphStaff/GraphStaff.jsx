import React from 'react';
import SideBar from './../SideBar/sideBar';
import Graph from './Graph/Graph';
import axios from 'axios';

class GraphStaff extends React.Component {
    constructor() {
        super();
        this.state = {
            graphdata: ''
        }
    }

    componentDidMount() {
        var data = null;
        try {
            data = axios.get("/getGraphData");
        } catch (err) {
            data = err.response;
        } finally {
            data.then(result => {
                let dataGraph = [];
                for(let property of result.data){
                    let { collDetails , marks } = property;
                    let { subCode , subName } = collDetails;
                    let { q1 , q2 , q3 , q4 , q5 , q6 , q7 , q8 , q9 , q10 } = marks;
                    dataGraph.push(<Graph q1={q1} q2={q2} q3={q3} q4={q4} q5={q5} q6={q6} q7={q7} q8={q8} q9={q9} q10={q10} subCode={subCode} subName={subName} key={subCode} />)
                }                
                this.setState({
                    graphdata : dataGraph   
                })
            })
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <SideBar />
                    <div className="offset-sm-2 col-sm-8">
                        {this.state.graphdata}
                    </div>
                </div>
            </div>
        )
    }
}

export default GraphStaff;
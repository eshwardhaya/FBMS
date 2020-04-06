import React from 'react';
import { Bar } from 'react-chartjs-2';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        let { q1 , q2 , q3 , q4, q5 , q6 , q7 , q8 , q9 , q10 , subCode , subName } = this.props;
        this.state = {
            subCode : subCode,
            subName : subName,
            chartData: {
                labels: ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5', 'Question 6', 'Question 7', 'Question 8', 'Question 9', 'Question 10'],
                datasets: [
                    {
                        label: 'Percentage',
                        data: [
                            q1,
                            q2,
                            q3,
                            q4,
                            q5,
                            q6,
                            q7,
                            q8,
                            q9,
                            q10
                        ],
                        backgroundColor : [
                            'rgba(111, 86, 169, 1)',
                            'rgba(111, 86, 169, 1)',
                            'rgba(111, 86, 169, 1)',
                            'rgba(111, 86, 169, 1)',
                            'rgba(111, 86, 169, 1)',
                            'rgba(111, 86, 169, 1)',
                            'rgba(111, 86, 169, 1)',
                            'rgba(111, 86, 169, 1)',
                            'rgba(111, 86, 169, 1)',
                            'rgba(111, 86, 169, 1)',
                            'rgba(111, 86, 169, 1)'
                        ]    
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div className="container-fluid mt-5">
                <Bar
                    data={this.state.chartData}
                    width={100}
                    height={500}
                    options={{ maintainAspectRatio: false , title : { display : true , text : this.state.subName+" "+this.state.subCode } }}
                />
            </div>
        )
    }
}


export default Graph;
module.exports = ({ staffData, indivData }) => {
    const today = new Date();
    let { collDetails , marks } = staffData;
    console.log(marks)
    let { staffName , subName , subCode , sem ,dept } = collDetails;
    var data ="";
    for(let x of indivData){
        data = data+`<tr>
        <td>${x._id}</td>
        <td>${x.q1}</td>
        <td>${x.q2}</td>
        <td>${x.q3}</td>
        <td>${x.q4}</td>
        <td>${x.q5}</td>
        <td>${x.q6}</td>
        <td>${x.q7}</td>
        <td>${x.q8}</td>
        <td>${x.q9}</td>
        <td>${x.q10}</td>
        <td>${x.totalPerc}%</td>
        </tr>`
    }

    let conclusion = "";
    if(marks.totalPerc >= 70){
        conclusion = "Overall Percentage is above 69 % Outcome is  Satisfacotry";
    } else {
        conclusion = "Overall Percentage is below 69 % Outcome Needs  Improvement";
    }

    let date = new Date();

    return `
    <!DOCTYPE html>
    <html>
        <head>
            <title>PDF Template</title>
            <meta charSet="utf-8" />
            <style>
            *{
                font-family : "Times New Roman";
            }
            .text-center{
                text-align : center;
            }
            .list-unstyled{
                list-style : none;
                padding : 0;
                text-align : left;
            }
            table , th , td {
                border : 1px solid black;
            }
            .table {
                width : 100%;
            }
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
              }
              th, td {
                padding: 5px;
                text-align: left;    
              }
              li {
                  padding : 5px;
              }
              html,body{
                  padding : 15px;
              }
              .dateAndTime{
                  text-align : right;
              }
            </style>
        </head>
        <body>
            <div class="dateAndTime"><p>Generated on ${date}</p></div>
            <h1 class="text-center">Sree Sowdambika College of Engineering</h1>
            <h1 class="text-center">Feedback Analysis Report</h1>
            <div class="staffData">
                <ul class="list-unstyled">
                    <li>Staff Name : ${staffName}</li>
                    <li>Subject Name : ${subName}</li>
                    <li>Subject Code : ${subCode}</li>
                    <li>Semester : ${sem}</li>
                    <li>Department : ${dept}</li>
                </ul>
            </div>
            <table class="table" border="0">
                <thead>
                    <tr>
                    <th>Register Number</th>
                    <th>Q1</th>
                    <th>Q2</th>
                    <th>Q3</th>
                    <th>Q4</th>
                    <th>Q5</th>
                    <th>Q6</th>
                    <th>Q7</th>
                    <th>Q8</th>
                    <th>Q9</th>
                    <th>Q10</th>
                    <th>Total Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    ${data}
                    <tr>
                        <td>Question Percentage</td>
                        <td>${marks.q1}%</td>
                        <td>${marks.q2}%</td>
                        <td>${marks.q3}%</td>
                        <td>${marks.q4}%</td>
                        <td>${marks.q5}%</td>
                        <td>${marks.q6}%</td>
                        <td>${marks.q7}%</td>
                        <td>${marks.q8}%</td>
                        <td>${marks.q9}%</td>
                        <td>${marks.q10}%</td>
                        <td>${marks.totalPerc}% </td>
                    </tr>
                </tbody>
            </table>
            <h5 style="text-align : center">${conclusion}</h5>
        </body>
    </html>`;
}
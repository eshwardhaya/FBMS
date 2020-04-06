var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var pdfDoc = require('./Docs/pdf');
var pdf = require('html-pdf');

var mongoCli = mongodb.MongoClient;
var url = "mongodb://localhost:27017/fbms";
var configOptions = { useUnifiedTopology: true };

// Login Student
router.post('/loginStudent', function (req, res) {
  let registerNumber = req.body.regNo;
  let passWord = req.body.pass;
  mongoCli.connect(url, configOptions, function (err, cursor) {
    if (err) throw err;
    var db = cursor.db("fbms");
    db.collection("studData").findOne({ regNo: registerNumber, pass: passWord }, function (err, result) {
      if (err) throw err;

      if (result === null) {
        res.sendStatus(422);
      } else {
        req.session.regNo = registerNumber;
        res.sendStatus(200)
      }
    });
  });
});

// Student Home
router.get("/studHome", function (req, res) {
  if (req.session.regNo) {
    mongoCli.connect(url, configOptions, function (err, cursor) {
      if (err) throw err;
      var db = cursor.db("fbms");
      db.collection("studData").findOne({ regNo: req.session.regNo }, function (err, result) {
        if (err) throw err;
        res.send(result);
        res.end();
      });
    });
  } else {
    res.sendStatus(401);
  }
});


// FeedBack Student
router.post('/Feedback', function (req, res) {
  if (req.session.regNo) {
    mongoCli.connect(url, configOptions, function (err, cursor) {
      if (err) throw err;
      var db = cursor.db("fbms");
      db.collection("staffData").find({ subjectcode: req.body.subjectCode }).toArray(function (err, result) {
        let datatoFrontEnd = {
          subDetails: result,
          regNo: req.session.regNo
        };
        res.send(datatoFrontEnd);
      })
    });
  } else {
    res.sendStatus(401);
  }
});

// For Multiple Scodes
router.post('/FeedbackMultiple', function (req, res) {
  if (req.session.regNo) {
    mongoCli.connect(url, configOptions, function (err, cursor) {
      if (err) throw err;
      var db = cursor.db("fbms");
      db.collection("staffData").find({ subjectcode: req.body.subjectCode , dept : req.body.dept }).toArray(function (err, result) {
        if (err) throw err;
        let datatoFrontEndMultiple = {
          subDetails: result,
          regNo: req.session.regNo
        };
        res.status(200).send(datatoFrontEndMultiple);
      })
    });
  } else {
    res.sendStatus(401);
  }
});


// Inital Feedback Data
router.post("/FeedbackIntialSubmit", function (req, res) {
  if (req.session.regNo) {
    mongoCli.connect(url, configOptions, function (err, cursor) {
      if (err) throw err;

      var db = cursor.db("fbms");
      let date = new Date();
      let year = date.getFullYear();
      let collectionName = req.body.staffName + "" + req.body.subCode +""+ year;
      db.createCollection(collectionName, function (err, collectionResult) {
        if (err) throw err;
        let TableDetail = {
          staffName: req.body.staffName,
          subCode: req.body.subCode,
          subName: req.body.subName,
          sem: req.body.sem,
          year : year,
          dept: req.body.dept,
          stype: req.body.stype,
        };
        db.collection("collectionList").insertOne({ _id: collectionName, collDetails: TableDetail }, function (err, result) {
          if (err) {
            if (err.name === "MongoError" && err.code === "11000") {
              res.sendStatus(422);
            }
          };
          req.session.collectionName = collectionName;
          req.session.subCode = TableDetail.subCode;
          req.session.staffName = TableDetail.staffName;
          res.sendStatus(200)
        });
      });
    });
  } else {
    res.sendStatus(401);
  }
});


// StaffInfo on Feedback
router.get("/FeedbackGetStaffInfo", function (req, res) {
  if (req.session.regNo) {
    mongoCli.connect(url, configOptions, function (err, cursor) {
      if (err) throw err;
      let db = cursor.db("fbms");
      db.collection("staffData").findOne({ staffname: req.session.staffName, subjectcode: req.session.subCode }, function (err, result) {
        if (err) throw err;
        let resultData = {
          regNo: req.session.regNo,
          staffInfo: result
        };
        res.send(resultData);
      });
    });
  } else {
    res.sendStatus(401);
  }
});

// Submit Feedback
router.post("/FeedbackSubmitAllValues", function (req, res) {
  if (req.session) {
    let { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = req.body;
    let actualMark = parseInt(q1) + parseInt(q2) + parseInt(q3) + parseInt(q4) + parseInt(q5) + parseInt(q6) + parseInt(q7) + parseInt(q8) + parseInt(q9) + parseInt(q10);
    let totalMarks = 50;
    let markRatio = (actualMark / totalMarks);
    let totalPerc = Math.round(markRatio.toFixed(2) * 100);
    mongoCli.connect(url, configOptions, function (err, cursor) {
      if (err) throw err;
      let db = cursor.db("fbms");
      console.log(req.session.collectionName)
      db.collection(req.session.collectionName).findOne({ _id: req.session.regNo }, function (err, occurence) {
        if (err) throw err;
        if (occurence === null) {
          db.collection(req.session.collectionName).insertOne({ _id: req.session.regNo, q1: q1, q2: q2, q3: q3, q4: q4, q5: q5, q6: q6, q7: q7, q8: q8, q9: q9, q10: q10, totalPerc: totalPerc }, function (err, result) {
            if (err) res.send(err);
            db.collection(req.session.collectionName).find().toArray(function (err, result) {
              if (err) throw err;
              let q1_f = q2_f = q3_f = q4_f = q5_f = q6_f = q7_f = q8_f = q9_f = q10_f = perc_f = 0;
              result.forEach(data => {
                q1_f = q1_f + parseInt(data.q1);
                q2_f = q2_f + parseInt(data.q2);
                q3_f = q3_f + parseInt(data.q3);
                q4_f = q4_f + parseInt(data.q4);
                q5_f = q5_f + parseInt(data.q5);
                q6_f = q6_f + parseInt(data.q6);
                q7_f = q7_f + parseInt(data.q7);
                q8_f = q8_f + parseInt(data.q8);
                q9_f = q9_f + parseInt(data.q9);
                q10_f = q10_f + parseInt(data.q10);
                perc_f = perc_f + parseFloat(data.totalPerc);

              })
              let totalMarkIndiv = result.length * 5;
              let totalPercq1 = Math.round((q1_f / totalMarkIndiv) * 100);
              let totalPercq2 = Math.round((q2_f / totalMarkIndiv) * 100);
              let totalPercq3 = Math.round((q3_f / totalMarkIndiv) * 100);
              let totalPercq4 = Math.round((q4_f / totalMarkIndiv) * 100);
              let totalPercq5 = Math.round((q5_f / totalMarkIndiv) * 100);
              let totalPercq6 = Math.round((q6_f / totalMarkIndiv) * 100);
              let totalPercq7 = Math.round((q7_f / totalMarkIndiv) * 100);
              let totalPercq8 = Math.round((q8_f / totalMarkIndiv) * 100);
              let totalPercq9 = Math.round((q9_f / totalMarkIndiv) * 100);
              let totalPercq10 = Math.round((q10_f / totalMarkIndiv) * 100);
              let OverAllMaxPerc = result.length * 100;
              let OverallTotal = Math.round((perc_f / OverAllMaxPerc) * 100);
              db.collection("collectionList").updateOne({ _id: req.session.collectionName }, {
                $set: {
                  marks: {
                    q1: totalPercq1,
                    q2: totalPercq2,
                    q3: totalPercq3,
                    q4: totalPercq4,
                    q5: totalPercq5,
                    q6: totalPercq6,
                    q7: totalPercq7,
                    q8: totalPercq8,
                    q9: totalPercq9,
                    q10: totalPercq10,
                    totalPerc: OverallTotal
                  }
                }
              }, function (err, result) {
                if (err) throw err;
              })
            });
            res.status(200).send({ msg: "Feedback Submitted" })
          });
        } else {
          res.status(200).send({ msg: "You Have Submitted Already" })
        }
      });
    });
  } else {
    res.sendStatus(401);
  }
});


// Logout Session
router.post('/terminate', function (req, res) {
  req.session.destroy(error => {
    if (error) {
      console.log(error);
    } else {
      res.sendStatus(200)
    }
  });
});

// Staff Login 
router.post("/loginStaff", function (req, res) {
  let userName = req.body.username;
  let pass = req.body.pass;
  mongoCli.connect(url, configOptions, function (err, cursor) {
    if (err) throw err;

    let db = cursor.db("fbms");
    db.collection("staffData").findOne({ username: userName, pass: pass }, function (err, result) {
      if (err) throw err;

      if (result === null) {
        res.sendStatus(422);
      } else {
        req.session.username = userName;
        req.session.staffname = result.staffname;
        res.sendStatus(200);
      }
    });
  });
});

// Graph Generation
router.get("/getGraphData", function (req, res) {
  mongoCli.connect(url, configOptions, function (err, cursor) {
    if (err) throw err;
    let db = cursor.db("fbms");
    db.collection("collectionList").find({ "collDetails.staffName": req.session.staffname }).toArray(function (err, result) {
      if (err) throw err;
      res.send(result)
    });
  });
});


// PDF Creation
router.post("/dataForPDF", function (req, res) {
  mongoCli.connect(url, configOptions, function (err, cursor) {
    if (err) throw err;
    let db = cursor.db("fbms");
    db.collection("collectionList").findOne({ "collDetails.subCode": req.body.subCode }, function (err, result) {
      if (err) throw err;
      if (result === null) {
        res.status(200).send({ err : "Problem while Generating PDF...Login Again" })
      } else {
        req.session.collCurrent = result._id;
        console.log(req.session.collCurrent)
        db.collection(req.session.collCurrent).find().sort({ _id: 1 }).toArray(function (err, resultData) {
          if (err) throw err;
          let datatoPDF = {
            staffData: result,
            indivData: resultData
          }
          console.log(datatoPDF)
          pdf.create(pdfDoc(datatoPDF)).toFile('./routes/Docs/report.pdf', (err, resp) => {
            if (err) {
              res.send(Promise.reject());
            }
            console.log(resp)
            res.send(Promise.resolve());
          });
        });
      }
    });
  });
});

// Send PDF
router.get("/DownloadPDF", function (req, res) {
  res.sendFile(`${__dirname}/Docs/report.pdf`)
});

module.exports = router;

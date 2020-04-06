import React from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import './App.css';
import Login from './Components/Login/Login';
import DashBoardStudFeedBack from './Components/DashboardStudent/dashBoardFeedback/dashBoardFeedback';
import FeedBackProcess from './Components/DashboardStudent/dashBoardFeedbackProcess/feedbackProcess';
import DashBoardHomeStud from './Components/DashboardStudent/DashboardHome/dashBoardHome';
import HomeStaff from './Components/DashboardStaff/HomeStaff/HomeStaff';
import GraphStaff from './Components/DashboardStaff/GraphStaff/GraphStaff';
import ReportGenStaff from './Components/DashboardStaff/ReportGenerationStaff/ReportGenStaff';

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/feedback" exact component={DashBoardStudFeedBack} />
          <Route path="/feedbackProcess" exact component={FeedBackProcess} />
          <Route path="/studHome" exact component={DashBoardHomeStud} />
          <Route path="/staffHome" exact component={HomeStaff} />
          <Route path="/staffGraph" exact component={GraphStaff} />
          <Route path="/staffReport" exact component={ReportGenStaff} />
          <Route path="/"  render={() => <div className="text-center"><h2>404</h2><span>Page Not Found</span></div>} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;

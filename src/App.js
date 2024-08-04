import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.js';
import AplusValidator from './pages/AplusValidator';
import ResponsiveValidator from './pages/ResponsiveValidator';
import GuidlinesHtml from './pages/GuidelinesHtml';
import GuidlinesCss from './pages/GuidelinesCss';
import GuidlinesJs from './pages/GuidelinesJs';
import Emailers from './pages/Emailers';
import EmailerAdd from './pages/EmailerAdd';
import Help from './pages/Help';
import Healthcheck from './pages/Healthcheck';
import GuidelinesAplusContent from './pages/GuidelinesAplus';
import PageNotFound from './pages/PageNotFound';
import ReactGA from 'react-ga';
import AplusZipValidator from './pages/AplusZipValidator';
import Users from './pages/Users';
import AplusHandbook from './pages/AplusHandbook';
import AplusFaq from './pages/AplusFaq';
import AplusVideo from './pages/AplusVideo';
import './assets/css/App.css';


function App() {
  const appVersion = process.env.REACT_APP_BASE_VERSION;
  const gaId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID; 
  const history = useHistory();
  console.log("App Version:", appVersion); 

  useEffect(() => {
    ReactGA.initialize(gaId);       
    history.listen((location) => { 
      ReactGA.pageview(location.pathname); 
   }) 
  },[appVersion,gaId,history]);



  return (    
    <>      
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={Users} />
        <Route path="/apluszipvalidator" component={AplusZipValidator} />
        <Route path="/guidelinesaplus" component={GuidelinesAplusContent} />
        <Route path="/responsivevalidator" component={ResponsiveValidator} />
        <Route path="/aplusvalidator" component={AplusValidator} />
        <Route path="/guidelineshtml" component={GuidlinesHtml} />
        <Route path="/guidelinescss" component={GuidlinesCss} />
        <Route path="/emailer" component={Emailers} />
        <Route path="/emailer-add" component={EmailerAdd} />
        <Route path="/help" component={Help} />
        <Route path="/aplushandbook" component={AplusHandbook} />
        <Route path="/aplusfaq" component={AplusFaq} />
        <Route path="/aplusvideo" component={AplusVideo} />
        <Route path="/guidelinesjs" component={GuidlinesJs} />
        <Route path="/healthcheck" component={Healthcheck} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  )
};

export default App;

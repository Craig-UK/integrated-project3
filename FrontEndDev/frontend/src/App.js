import React from 'react';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react';


import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import AuthRoute2 from './util/AuthRoute2';

import MenuBar from './components/MenuBar';
import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Launch from './pages/Launch.js';
import User from './pages/User.js';
import SinglePost from './pages/SinglePost.js'

function App() {
  return (
<AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <AuthRoute exact path="/" component={Launch} />
          <AuthRoute2 exact path="/dash" component={Home} /> 
          <AuthRoute2 exact path="/user/:userName" component={User} />           
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute2 exact path= "/posts/:postId" component={SinglePost}/>

        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

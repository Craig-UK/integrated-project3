import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';


import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>      
          <MenuBar />
            <Routes>
              <Route exact path='/login*' element={<AuthRoute> 
                <Route exact path='/*' element={<Login />}></Route>
              </AuthRoute>}>
              </Route>
              <Route exact path='/register*' element={<AuthRoute> 
                <Route exact path='/' element={<Register />}></Route>
              </AuthRoute>}>
              </Route>
              <Route exact path='/' element={<Home />}/> 
            </Routes>
        </Container>


      </Router>
    </AuthProvider>
  );
}

export default App;

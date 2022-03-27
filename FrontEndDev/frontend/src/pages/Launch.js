import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Image, Container } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import pic from '../components/GCU-SOCIAL-LOGO2.png';
import gql from 'graphql-tag';
import '../components/Launch.css';

import { AuthContext } from '../context/auth';
//import  Modal  from '../components/Modal';
import { useForm } from '../util/hooks';

function Launch (props) {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData }}) {
        context.login(userData);
        props.history.push('/dash');
    },
    onError(err) {
        setErrors(err.graphQLErrors[0].extensions.errors);
          console.log(err);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    
    <div className="launchbody">
        <div className="hardleft">
            <div background-image={pic} className="centered">
                <Image src={pic}  />
            </div>
        </div>
        <div className="hardright">
          <div className="centered">
        <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : 'launchForm'}>
        <h1>Login</h1>
        
        <Form.Input
          
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          error={errors.username}
          onChange={onChange}
          className="LaunchForm"
          fontSize="larger"

        />
        <Form.Input
          
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password}
          onChange={onChange}
        />
      
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
        <br></br>
        <Button secondary as={Link} to='/register'>
              Register
        </Button>
        </div>
        

                            

    </div>
    </div>

    </div>
  );

}

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username password: $password
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Launch;
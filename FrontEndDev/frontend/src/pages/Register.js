import React, { useContext, useState } from 'react';

import { Button, Form, Grid } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Register(props) {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    course: ''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData }}) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
        setErrors(err.graphQLErrors[0].extensions.errors);
        console.log(err);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <Grid columns={1} >
    <Grid.Row className="page-title">
        <h1>Register</h1>
    </Grid.Row>
    <Grid.Row className="feed">
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username}
          onChange={onChange}
        />
        <Form.Input
          label="Firstname"
          placeholder="Username.."
          name="first_name"
          type="text"
          value={values.first_name}
          error={errors.first_name}
          onChange={onChange}
        />
        <Form.Input
          label="Lastname"
          placeholder="Username.."
          name="last_name"
          type="text"
          value={values.last_name}
          error={errors.last_name}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={onChange}
        />
        <Form.Input
          label="Course"
          placeholder="Course.."
          name="course"
          type="text"
          value={values.course}
          error={errors.course}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
          {console.log(values.password)}
          {console.log(values.confirmPassword)}
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
    </div>
    </Grid.Row>
  </Grid>);
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $first_name: String!
    $last_name: String!
    $course: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        first_name: $first_name
        last_name: $last_name
        course: $course
      }
    ) {
      id
      email
      username
      first_name
      last_name
      course
      createdAt
      token
    }
  }
`;

export default Register;
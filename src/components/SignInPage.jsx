import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SignInPage=({ onSignIn })=> {
    const Navigate=useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSignIn({ username, password, avatarUrl });
      // Objects are not valid as a React child (found: object with keys {avatarUrl, username, password}). If you meant to render a collection of children, use an array instead.
      Navigate("/all")

    };
  
    return (
      <div className="d-flex justify-content-center mt-5">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4" style={{color:'white',height: '43px'}} >Sign in</h1>

          <Form.Group controlId="username">
            <Form.Label style={{color:'white'}}>Username</Form.Label>
            <Form.Control
            style={{color:'white',height: '43px'}}
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label style={{color:'white'}}>Password</Form.Label>
            <Form.Control
            style={{color:'white',height: '43px'}}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Sign in
          </Button>
          <p className="mt-3" style={{color:'white',height: '43px'}}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </Form>
      </div>
    );
  }
  
export default SignInPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SignUpPage = ({ onSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarUrl(reader.result);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSignUp({ username, password, avatarUrl });
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4" style={{ color: "white" }}>
          Profile
        </h1>
        <Form.Group controlId="avatarUrl">
          <Form.Label style={{ color: "white" }}>Avatar</Form.Label>
          <div>
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Avatar"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ color: "white" }}
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label style={{ color: "white" }}>Username</Form.Label>
          <Form.Control
            style={{ color: "black", height: "43px" }}
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label style={{ color: "white" }}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Sign up
        </Button>
        <p className="mt-3" style={{ color: "white" }}>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUpPage;

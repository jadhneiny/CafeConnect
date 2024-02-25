import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default to 'student'

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Signing up:', email, password, role);
    // Add your sign-up logic here, including role
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student/Staff</option>
          <option value="admin">Administrator</option>
        </select>
      </div>
      <button type="submit">Sign Up</button>
      <div className="form-footer">
        <Link to="/" className="form-link">Back to Home</Link>
      </div>
    </form>
  );
}

export default SignUp;

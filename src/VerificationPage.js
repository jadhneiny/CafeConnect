// VerificationPage.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Components from "./Components";

function VerificationPage({ navigateToLogin }) {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Retrieve the email from the state passed by navigate

  const returnToHome = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email || !code) {
      alert('Email or verification code is missing.');
      return;
    }

    try {
      const response = await fetch('/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode: code }),
      });

      if (response.ok) {
        // Verification successful
        alert('Email verified successfully!');
        navigate('/');
      } else {
        // Handle verification failure
        const errorText = await response.text();
        alert(`Failed to verify email: ${errorText}`);
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('An error occurred during verification. Please try again.');
    }
  };

  return (
    <Components.VerificationContainer>
      <Components.VerificationForm onSubmit={handleSubmit}>
        <Components.VerificationTitle>
          Verify Your Email
        </Components.VerificationTitle>
        <Components.VerificationInput
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <Components.VerificationButton>Verify</Components.VerificationButton>
        <Components.ReturnHomeButton onClick={returnToHome}>
          Return to Homepage
        </Components.ReturnHomeButton>
      </Components.VerificationForm>
    </Components.VerificationContainer>
  );
}

export default VerificationPage;

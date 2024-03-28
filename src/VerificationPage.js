// VerificationPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Components from "./Components";

function VerificationPage({ navigateToLogin }) {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const returnToHome = () => {
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic for verification will go here
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

// VerificationPage.js
import React, { useState } from "react";
import * as Components from "./Components";

function VerificationPage({ navigateToLogin, returnToHome }) { 
  const [code, setCode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Assuming navigateToLogin is defined to handle post-verification logic
    navigateToLogin(); // This could also potentially be returnToHome depending on flow
  };

  return (
    <Components.VerificationContainer>
      <Components.VerificationForm onSubmit={handleSubmit}>
        <Components.VerificationTitle>Verify Your Email</Components.VerificationTitle>
        <Components.VerificationInput
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <Components.VerificationButton>Verify</Components.VerificationButton>
        <Components.ReturnHomeButton onClick={returnToHome}>Return to Homepage</Components.ReturnHomeButton>
      </Components.VerificationForm>
    </Components.VerificationContainer>
  );
}

export default VerificationPage;

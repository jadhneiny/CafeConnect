import React, { useState } from "react";
import VerificationPage from './VerificationPage'; 
import * as Components from "./Components";

function App() {
  const [signIn, toggle] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();
    setIsVerifying(true);
  };

  const returnToHome = () => {
    setIsVerifying(false); // Reset verification state
    toggle(true); // Optional: Reset sign-in state if necessary
  };

  if (isVerifying) {
    return <VerificationPage returnToHome={returnToHome} />;
  }

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" placeholder="Name" />
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Password" />
          {/* <Components.Button>Sign Up</Components.Button> */}
          <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>

        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Password" />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>CafeConnect</Components.Title>
            <Components.Paragraph>
              Check the availability of your favorite items in your local
              cafeteria!
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>CafeConnect</Components.Title>
            <Components.Paragraph>
              Sign Up to view the menu of your local cafeteria!
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default App;

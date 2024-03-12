import React, { useState, useEffect } from "react";
import VerificationPage from "./VerificationPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import * as Components from "./Components";
import WeekDaysPage from "./WeekDaysPage";

function App() {
  const [navigate, setNavigate] = useState();
  useEffect(() => {
    setNavigate(useNavigate());
  }, []);
  
  const [signIn, toggle] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signInError, setSignInError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsVerifying(true);
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      // Send data to the server
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Signup successful");
        setIsSignedIn(true);
        navigate("/weekdays");
        // Success Message here
      } else {
        const errorMessage = await response.text(); // Get error message from response
        console.error("Signup failed:", errorMessage);
        setSignUpError(errorMessage); // Set sign-up error message
      }
    } catch (error) {
      console.error("Signup failed:", error.message);
      setSignUpError("Network error. Please try again."); // Set sign-up error message for network error
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        console.log("Sign in successful");
        setIsSignedIn(true);
        navigate("/weekdays");
        // Perform actions on successful sign-in, e.g., redirect or update UI
      } else {
        const errorMessage = await response.text(); // Get error message from response
        console.error("Sign in failed:", errorMessage);
        setSignInError(errorMessage); // Set sign-in error message
      }
    } catch (error) {
      console.error("Network error:", error);
      setSignInError("Network error. Please try again."); // Set sign-in error message for network error
    }
  };

  const returnToHome = () => {
    setIsVerifying(false); // Reset verification state
    toggle(true); // Optional: Reset sign-in state if necessary
  };

  if (isVerifying) {
    return <VerificationPage returnToHome={returnToHome} />;
  }
  if (isSignedIn) {
    navigate("/weekdays");
    return <WeekDaysPage />;
  }

  return (
<Components.Container>
    {/* Sign-up error message */}
    {signUpError && (
      <Components.ErrorParagraph className="error-message">
        {signUpError}
      </Components.ErrorParagraph>
    )}

    <Components.SignUpContainer signinIn={signIn}>
      <Components.Form onSubmit={handleSignUp}>
        <Components.Title>Create Account</Components.Title>
        <Components.Input name="name" type="text" placeholder="Name" />
        <Components.Input name="email" type="email" placeholder="Email" />
        <Components.Input
          name="password"
          type="password"
          placeholder="Password"
        />
        <Components.Button type="submit">Sign Up</Components.Button>
      </Components.Form>
    </Components.SignUpContainer>

    {/* Sign-in error message */}
    {signInError && (
      <Components.ErrorParagraph className="error-message">
        {signInError}
      </Components.ErrorParagraph>
    )}

    <Components.SignInContainer signinIn={signIn}>
      <Components.Form onSubmit={handleSignIn}>
        <Components.Title>Sign in</Components.Title>
        <Components.Input name="email" type="email" placeholder="Email" />
        <Components.Input
          name="password"
          type="password"
          placeholder="Password"
        />
        <Components.Anchor href="#">Forgot your password?</Components.Anchor>
        <Components.Button type="submit">Sign In</Components.Button>
      </Components.Form>
    </Components.SignInContainer>

    {/* Overlay */}
    <Components.OverlayContainer signinIn={signIn}>
      <Components.Overlay signinIn={signIn}>
        <Components.LeftOverlayPanel signinIn={signIn}>
          <Components.Title>CafeConnect</Components.Title>
          <Components.Paragraph>
            Check the availability of your favorite items in your local cafeteria!
          </Components.Paragraph>
          <Components.GhostButton onClick={() => toggle(true)}>Sign In</Components.GhostButton>
        </Components.LeftOverlayPanel>

        <Components.RightOverlayPanel signinIn={signIn}>
          <Components.Title>CafeConnect</Components.Title>
          <Components.Paragraph>
            Sign Up to view the menu of your local cafeteria!
          </Components.Paragraph>
          <Components.GhostButton onClick={() => toggle(false)}>Sign Up</Components.GhostButton>
        </Components.RightOverlayPanel>
      </Components.Overlay>
    </Components.OverlayContainer>
  </Components.Container>
);
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Main route */}
        <Route path="/weekdays" element={<WeekDaysPage />} />{" "}
        {/* WeekDaysPage route */}
      </Routes>
    </Router>
  );
}

export default AppWrapper;
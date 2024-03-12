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
  const navigate = useNavigate();
  const [signIn, toggle] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signInError, setSignInError] = useState(""); // State to store the sign-in error message

  useEffect(() => {
    if (isSignedIn) {
      navigate("/weekdays");
    }
  }, [isSignedIn, navigate]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsVerifying(true);
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

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
    } else {
      console.error("Signup failed");
      // Handle errors here
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setSignInError(""); // Reset the error message on a new sign-in attempt
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
      } else {
        const errorMessage = "Sign in failed"; // Default error message
        console.error(errorMessage);
        setSignInError(errorMessage);
      }
    } catch (error) {
      console.error("Network error:", error);
      setSignInError("Network error. Please try again.");
    }
  };

  const returnToHome = () => {
    setIsVerifying(false);
    toggle(true);
  };

  if (isVerifying) {
    return <VerificationPage returnToHome={returnToHome} />;
  }

  return (
    <Components.Container>
      {/* Sign-in error message */}
      {signInError && (
        <Components.ErrorParagraph>{signInError}</Components.ErrorParagraph>
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

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignIn}>
          {/* Error message displayed at the top of the form */}
          {signInError && (
            <Components.ErrorParagraph>{signInError}</Components.ErrorParagraph>
          )}

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

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/weekdays" element={<WeekDaysPage />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;

import React, { useState } from "react";
import VerificationPage from "./VerificationPage";
import * as Components from "./Components";
import WeekDaysPage from "./WeekDaysPage";

function App() {
  const [signIn, toggle] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsVerifying(true);
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

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
      return <WeekDaysPage />;
      // Success Message here
    } else {
      console.error("Signup failed");
      // Handle errors here
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
        return <WeekDaysPage />;
        // Perform actions on successful sign-in, e.g., redirect or update UI
      } else {
        console.error("Sign in failed");
        // Handle sign-in errors, e.g., show message to user
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network errors
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
    return <WeekDaysPage />;
  }

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignUp}>
          {" "}
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
          {" "}
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            name="email"
            type="email"
            placeholder="Email"
          />{" "}
          <Components.Input
            name="password"
            type="password"
            placeholder="Password"
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button>{" "}
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

import React, { useState, useEffect } from "react";
import VerificationPage from "./VerificationPage";
import { SuccessMessage } from "./Components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import * as Components from "./Components";
import WeekDaysPage from "./WeekDaysPage";
import MondayMenu from "./MondayMenu";
import TuesdayMenu from "./TuesdayMenu";
import WednesdayMenu from "./WednesdayMenu";
import ThursdayMenu from "./ThursdayMenu";
import FridayMenu from "./FridayMenu";
import SaturdayMenu from "./SaturdayMenu";
import SundayMenu from "./SundayMenu";
import AdminPage from "./AdminPage";

function App() {
  
  const [signIn, toggle] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [signInError, setSignInError] = useState(""); // State to store the sign-in error message
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin"); // navigate to admin page
    } else if (isSignedIn) {
      navigate("/weekdays");
    }
  }, [isSignedIn, navigate]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    //setIsVerifying(true);
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
      navigate("/verification", { state: { email: data.email } });
      setSuccessMessage("Sign Up Successful"); // Set the success message
      setSignInError(""); // Clear any existing error messages
    } else {
      // Handle errors here
      const errorMessage = "Sign Up failed"; // Default error message
      console.error(errorMessage);
      setSignInError(errorMessage);
      setSuccessMessage(""); // Clear any existing success messages
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
        if (formData.get("email") == "cafeconnect@admin.com") {
          setIsAdmin(true);
        }
        setIsSignedIn(true);
      } else {
        const errorMessage = "Sign In failed"; // Default error message
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
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignUp}>
          {signInError && (
            <Components.ErrorParagraph>{signInError}</Components.ErrorParagraph>
          )}
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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/weekdays" element={<WeekDaysPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/MondayMenu" element={<MondayMenu />} />
        <Route path="/TuesdayMenu" element={<TuesdayMenu />} />
        <Route path="/WednesdayMenu" element={<WednesdayMenu />} />
        <Route path="/ThursdayMenu" element={<ThursdayMenu />} />
        <Route path="/FridayMenu" element={<FridayMenu />} />
        <Route path="/SaturdayMenu" element={<SaturdayMenu />} />
        <Route path="/SundayMenu" element={<SundayMenu />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;

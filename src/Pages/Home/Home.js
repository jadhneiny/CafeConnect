import VerificationPage from "../Verification/VerificationPage";
import * as Components from "../Verification/Components";


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SuccessMessage } from "../Verification/Components";
import { handleSignIn, handleSignUp, returnToHome } from "./utils";

function Home() {
    const navigate = useNavigate();
    const [signIn, toggle] = useState(true);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [signInError, setSignInError] = useState(""); // State to store the sign-in error message
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (isAdmin) {
            //navigate("/AdminPage");  //change to navigate to admin page
        }
        else if (isSignedIn) {
            navigate("/weekdays");
        }
    }, [isSignedIn, navigate, isAdmin]);

    if (isVerifying) {
        return <VerificationPage returnToHome={() => returnToHome(setIsVerifying, toggle)} />;
    }

    return (
        <Components.Container>
            {signInError && (
                <Components.ErrorParagraph>{signInError}</Components.ErrorParagraph>
            )}
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form onSubmit={(e) => handleSignUp(e, setSuccessMessage, setSignInError, navigate)}>
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
                <Components.Form onSubmit={(e) => handleSignIn(e, setSignInError, setIsAdmin, setIsSignedIn)}>
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

export default Home;
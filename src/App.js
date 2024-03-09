import React from "react";
import * as Components from "./Components";

function App() {
  const [signIn, toggle] = React.useState(true);
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    // Send data to the server
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Signup successful');
      // Success Message here
    } else {
      console.error('Signup failed');
      // Handle errors here
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSubmit}> {/* Updated this line */}
            <Components.Title>Create Account</Components.Title>
            <Components.Input name="name" type="text" placeholder="Name" />
            <Components.Input name="email" type="email" placeholder="Email" />
            <Components.Input name="password" type="password" placeholder="Password" />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignIn}> {/*updated*/}
          <Components.Title>Sign in</Components.Title>
          <Components.Input name="email" type="email" placeholder="Email" /> {/*add name to both this line and one below*/}
          <Components.Input name="password" type="password" placeholder="Password" />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button> {/*updated button*/}
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

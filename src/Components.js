import styled from "styled-components";

export const Container = styled.div`
  background-color: #86b6f6;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signinIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
      : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #6499e9;
  background-color: #6499e9;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #6499e9;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;
export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
  background: #6499e9;
  background: -webkit-linear-gradient(to right, #6499e9, #6499e9);
  background: linear-gradient(to right, #071952, #6499e9);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)}
`;

export const Paragraph = styled.p`
  font-size: 12px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.7px;
  margin: 20px 0 30px;
`;
export const VerificationContainer = styled(Container)`
  background-color: #fff; // Use a subtle color or white for the background
  display: flex; // Enable flexbox for this container
  justify-content: center; // Horizontally center the contents
  align-items: center; // Vertically center the contents
  padding: 0; // Adjust padding as necessary
`;
// export const VerificationContainer = styled(Container)`
//   background-color: #fff; // Set to white or another subtle color
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center; // Center content vertically
//   height: 100vh; // Adjust height to fill the screen
//   padding-top: 0; // Adjust padding as needed
// `;

export const VerificationForm = styled(Form)`
  width: 100%; // Allow the form to fill the container
  max-width: 500px; // Set a max-width for larger screens
  background-color: transparent; // Remove any distinct background color
  box-shadow: none; // Remove shadow if not needed
`;

export const VerificationTitle = styled(Title)`
  color: #071952; // Adjust color for better contrast or visibility
`;

export const VerificationInput = styled(Input)`
  margin-top: 15px;
  margin-bottom: 20px;
  border: 2px solid #6499e9; // Highlight the input for emphasis
`;

export const VerificationButton = styled(Button)`
  cursor: pointer;
  background-image: linear-gradient(45deg, #6499e9, #71b8f9);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  &:hover {
    background-image: linear-gradient(45deg, #71b8f9, #6499e9);
  }
`;

export const ReturnHomeButton = styled(Button)`
  background-color: #6499e9; // Or any color that matches your theme
  color: white;
  background-image: linear-gradient(45deg, #6499e9, #71b8f9);
  font-size: 8px; // Smaller font size for a smaller button
  padding: 8px 16px; // Smaller padding
  border: none;
  border-radius: 20px; // Consistent with your design
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #507ac7; // Slightly darker on hover for a subtle interaction effect
  }

  margin-top: 20px; // Add some space from other elements
`;

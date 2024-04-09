export const handleSignUp = async (event, setSuccessMessage, setSignInError, navigate) => {
    event.preventDefault();

    //setIsVerifying(true);
    const formData = new FormData(event.target);
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        console.log("Signup successful");
        navigate('/verification', { state: { email: data.email } });
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

export const handleSignIn = async (event, setSignInError, setIsAdmin, setIsSignedIn) => {
    event.preventDefault();
    setSignInError(""); // Reset the error message on a new sign-in attempt
    const formData = new FormData(event.target);
    const credentials = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    try {
        const response = await fetch("http://localhost:8080/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            console.log("Sign in successful");
            if (formData.get("email") === "cafeconnect@admin.com") {
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

export const returnToHome = (setIsVerifying, toggle) => {
    setIsVerifying(false);
    toggle(true);
};
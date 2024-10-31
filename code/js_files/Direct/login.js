async function handelLogin(event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://v2.api.noroff.dev/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            alert("inn loggning feilet Sjekk om epost og passord er riktig");
            throw new Error("inn loggning feilet");
        }

        const data = await response.json();
        const token = data.token;
        const userEmail = data.useremail;
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", userEmail);
        window.location.href = "edit.html"; 

    } catch (error) {
        console.error("Wrong password or email", error);
    }
}


function isLoggedIn() {
    return localStorage.getItem("token") !== null; 
}
if (isLoggedIn()) {
    console.log("Brukeren er innlogget.");
} else {
    console.log("Brukeren er ikke innlogget.");
}
function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    updateUI(); 

    const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", logout);
}
}

const form = document.querySelector("form");
form.addEventListener("submit", handelLogin);
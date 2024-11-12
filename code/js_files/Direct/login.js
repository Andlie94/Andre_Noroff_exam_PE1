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
        const token = data.data.accessToken;
        const userEmail = data.data.email;
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", userEmail);
        window.location.href = "edit.html";
        console.log(data);
    } catch (error) {
        console.error("Wrong password or email", error);
    }
}

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    console.log(localStorage.getItem("token"));
    updateUI(); 

}
const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", logout);

}
const form = document.querySelector("form");
form.addEventListener("submit", handelLogin);
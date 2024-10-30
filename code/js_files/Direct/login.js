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
            throw new Error("inn loggning feilet");
        }

        const data = await response.json();
        const token = data.token; //
        localStorage.setItem("token", token);
        console.log("Innlogging vellykket! Token lagret i localStorage.");

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}
const form = document.querySelector("form");
form.addEventListener("submit", handelLogin);
function isLoggedIn() {
    return localStorage.getItem("token") !== null; 
}
if (isLoggedIn()) {
    console.log("Brukeren er innlogget.");
} else {
    console.log("Brukeren er ikke innlogget.");
}
// Inloggningsuppgifter enligt uppgiftens krav
const CORRECT_USER = "Kalle";
const CORRECT_PASS = "qwe123";

// Referenser till elementen
const form = document.querySelector("form");
const message = document.querySelector("#message");
const logoutButton = document.querySelector("#logout");

// Kontrollerar om namn och lösenord stämmer
function isValidLogin(name, password) {
    return name === CORRECT_USER && password === CORRECT_PASS;
}

// Skriver ut ett meddelande. type är "success" eller "error" och styr färgen i CSS
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// Visar inloggat läge. Används både vid inloggning och när sparad användare hittas
function showLoggedIn(name) {
    showMessage(`Välkommen ${name}, du är nu inloggad`, "success");
    form.hidden = true;
    logoutButton.hidden = false;
}

// Visar inloggningsformuläret igen
function showLoginForm() {
    message.textContent = "";
    message.className = "";
    form.reset();
    form.hidden = false;
    logoutButton.hidden = true;
}

function handleLogin(event) {
    event.preventDefault();

    // Värdena hämtas via formulärets referens
    const name = form.elements.username.value.trim();
    const password = form.elements.password.value;

    if (isValidLogin(name, password)) {
        localStorage.setItem("username", name);
        showLoggedIn(name);
    } else {
        showMessage("Felaktiga inloggningsuppgifter", "error");
    }
}

function handleLogout() {
    localStorage.clear();
    showLoginForm();
}

// Körs när sidan laddas: är en användare sparad är hen fortfarande inloggad
function checkSavedLogin() {
    const savedName = localStorage.getItem("username");

    if (savedName) {
        showLoggedIn(savedName);
    }
}

form.addEventListener("submit", handleLogin);
logoutButton.addEventListener("click", handleLogout);
checkSavedLogin();
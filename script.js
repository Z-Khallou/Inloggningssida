/* =========================================
   1. HÅRDKODADE UPPGIFTER & ELEMENT-REFERENSER
   ========================================= */

// De korrekta inloggningsuppgifterna som krävs för att logga in
const CORRECT_USER = "Kalle";
const CORRECT_PASS = "qwe123";

// Hämtar in alla viktiga HTML-element via deras ID så JavaScript kan styra dem
const loginForm = document.getElementById("loginForm");          // Själva formuläret
const usernameInput = document.getElementById("username");      // Inmatningsfält för användarnamn
const passwordInput = document.getElementById("password");      // Inmatningsfält för lösenord
const messageP = document.getElementById("message");            // Paragrafen för välkomst- eller felmeddelanden
const logoutBtn = document.getElementById("logoutBtn");          // Utloggningsknappen
const togglePassword = document.getElementById("togglePassword");// Ögon-ikonen för att visa/dölja lösenord
const rememberMeCheckbox = document.getElementById("rememberMe");// Kryssrutan "Kom ihåg mig"

/* =========================================
   2. INLOGGNINGSLOGIK & VALIDERING
   ========================================= */

/* =========================================
   3. INLOGGNINGSLOGIK & VALIDERING
   ========================================= */
// Lyssnar efter händelsen "submit" (När användaren klickar på "Logga in" eller trycker Enter i formuläret)
loginForm.addEventListener("submit", function (event) {
    // preventDefault() stoppar webbläsarens standardbeteende som är att ladda om hela sidan vid inskick
    event.preventDefault();

    // Hämtar det som skrivits in. .trim() tar bort eventuella osynliga mellanslag i början och slutet av texten
    const enteredUser = usernameInput.value.trim();
    const enteredPass = passwordInput.value.trim();

    // Rensa gamla klasser (tar bort eventuella röd/grön-färger från tidigare inloggningsförsök) först
    messageP.className = "";

    // Jämför det inmatade värdet med våra hårdkodade konstanter högst upp i filen
    if (enteredUser === CORRECT_USER && enteredPass === CORRECT_PASS) {
        // --- INLOGGNING LYCKADES ---

        // Skriver ut välkomsttexten. Backticks (`) låter oss baka in variabeln direkt i textsträngen
        messageP.textContent = `Välkommen ${CORRECT_USER}!`;
        messageP.classList.add("success-box"); // Lägger till snygg grön bakgrund

        // Gömmer inloggningsrutan genom att applicera .hidden-klassen vi skapade i CSS
        loginForm.classList.add("hidden");
        // Trollar fram utloggningsknappen genom att ta bort samma klass från den
        logoutBtn.classList.remove("hidden");

        // Om rutan var ikryssad, sparar vi datan i webbläsarens lokala minne
        if (rememberMeCheckbox.checked) {
            localStorage.setItem("isLoggedIn", "true"); // Sparar en flagga att vi är inloggade
            localStorage.setItem("username", CORRECT_USER); // Sparar vem som är inloggad
        }

    } else {
        // --- INLOGGNING MISSLYCKADES ---
        messageP.textContent = "Felaktigt användarnamn eller lösenord!";
        messageP.classList.add("error-box"); // Lägger till snygg röd bakgrund
    }
});

/* =========================================
   3. VISA / DÖLJ LÖSENORD (Ögat-ikonen)
   ========================================= */
// Lyssnar efter ett vanligt musklick på ögat
togglePassword.addEventListener("click", function () {
    // Kolla om fältets typ är password (vilket betyder att texten döljs med prickar)
    if (passwordInput.type === "password") {
        passwordInput.type = "text"; // Gör lösenordet synligt genom att ändra fälttypen
        togglePassword.classList.remove("fa-eye-slash"); // Tar bort FontAwesome-klassen för överstruket öga
        togglePassword.classList.add("fa-eye"); // Byt till vanligt öga
    } else {
        passwordInput.type = "password"; // Dölj lösenordet igen (prickar)
        togglePassword.classList.remove("fa-eye"); // Tar bort vanliga ögat
        togglePassword.classList.add("fa-eye-slash"); // Byt till överstruket öga
    }
});

/* =========================================
   4. UTLOGGNINGSLOGIK
   ========================================= */
// Lyssnar efter klick på utloggningsknappen
logoutBtn.addEventListener("click", function () {
    // 1. Dölj utloggningsknappen (applicerar .hidden) och visa formuläret igen (tar bort .hidden)
    logoutBtn.classList.add("hidden");
    loginForm.classList.remove("hidden");

    // 2. Töm inmatningsfälten så att lösenord och namn inte ligger kvar synligt för nästa person
    usernameInput.value = "";
    passwordInput.value = "";

    // Nollställer paragrafen så att den är helt tom inför nästa gång någon loggar in
    messageP.textContent = "";
    messageP.className = "";

    // 3. Rensa localStorage om det sparats där. Detta raderar all data så användaren förblir utloggad vid omladdning
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
});

/* =========================================
   5. KONTROLLERA SPARAD INLOGGNING (Sidladdning)
   ========================================= */
// Körs direkt när sidan öppnas. Kollar om "isLoggedIn" är sparat som "true" i webbläsaren.
if (localStorage.getItem("isLoggedIn") === "true") {
    // Hämtar det sparade namnet (t.ex. "Kalle")
    const savedUser = localStorage.getItem("username");

    // Ändrar gränssnittet direkt till inloggat läge utan att användaren behöver skriva in något
    messageP.textContent = `Välkommen ${savedUser}!`;
    messageP.classList.add("success-box");

    loginForm.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
}
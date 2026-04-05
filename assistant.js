function scanOrders() {
    let amount = parseInt(document.getElementById("targetAmount").value);

    let elements = document.querySelectorAll("div");

    elements.forEach(el => {
        let text = el.innerText;
        if (!text) return;

        let match = text.match(/₹\s?\d+/);
        if (!match) return;

        let price = parseInt(match[0].replace("₹",""));

        el.style.border = "";
        el.style.background = "";

        if (price === amount) {
            el.style.border = "2px solid blue";
            el.style.background = "#e6f0ff";

            console.log("🎯 Found:", price);

            let sound = new Audio("https://www.soundjay.com/buttons/beep-01a.mp3");
            sound.play();
        }
    });
}

// ===== CREATE UI =====
let panel = document.createElement("div");
panel.innerHTML = `
<div style="
position:fixed;
bottom:80px;
right:20px;
background:#ffffff;
padding:15px;
border-radius:12px;
box-shadow:0 0 12px rgba(0,0,0,0.2);
z-index:9999;
width:220px;
font-family:sans-serif;
">
  <b>Smart Assistant</b><br><br>

  <label>Search Amount (₹):</label>
  <input id="targetAmount" type="number" value="110"
  style="width:100%;padding:6px;margin-top:5px;"><br><br>

  <button id="startBtn"
  style="background:#28a745;color:white;width:48%;padding:8px;border:none;border-radius:6px;">
  Start</button>

  <button id="stopBtn"
  style="background:#dc3545;color:white;width:48%;padding:8px;border:none;border-radius:6px;float:right;">
  Stop</button>

  <p id="status" style="margin-top:10px;color:red;">Stopped</p>
</div>
`;

document.body.appendChild(panel);

// ===== BOT LOGIC =====
let running = false;
let interval;

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

// ===== BUTTON CONTROL =====
document.getElementById("startBtn").onclick = () => {
    if (running) return;

    running = true;
    document.getElementById("status").innerText = "Running";
    document.getElementById("status").style.color = "green";

    interval = setInterval(scanOrders, 3000);
};

document.getElementById("stopBtn").onclick = () => {
    running = false;
    clearInterval(interval);

    document.getElementById("status").innerText = "Stopped";
    document.getElementById("status").style.color = "red";
};

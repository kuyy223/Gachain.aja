/* ===============================
   VARIABEL GLOBAL
================================ */
let selectedNominal = "";
let selectedHarga = "";
let sliderIndex = 0;
let sliderInterval;

/* ===============================
   DATA GAME & NOMINAL
================================ */
const dataGame = {
    "Free Fire": [
        { nominal: "70 Diamond", harga: 10000 },
        { nominal: "140 Diamond", harga: 20000 }
    ],
    "Mobile Legends": [
        { nominal: "86 Diamond", harga: 20000 },
        { nominal: "172 Diamond", harga: 40000 }
    ],
    "PUBG Mobile": [
        { nominal: "60 UC", harga: 15000 },
        { nominal: "325 UC", harga: 75000 }
    ],
    "Roblox": [
        { nominal: "80 Robux", harga: 18000 },
        { nominal: "500 Robux", harga: 90000 }
    ]
};

/* ===============================
   SLIDER IMAGE PER GAME
================================ */
const sliderImages = {
    "Free Fire": ["img/ff1.jpeg", "img/ff2.jpeg"],
    "Mobile Legends": ["img/ml1.jpg", "img/ml2.jpg"],
    "PUBG Mobile": ["img/pubg1.jpg"],
    "Roblox": ["img/roblox1.jpeg", "img/roblox2.jpeg"]
};

/* ===============================
   INIT GAME LIST
================================ */
const gameSelect = document.getElementById("game");
Object.keys(dataGame).forEach(game => {
    const opt = document.createElement("option");
    opt.value = game;
    opt.textContent = game;
    gameSelect.appendChild(opt);
});

/* ===============================
   START SLIDER
================================ */
function startSlider(game) {
    const slider = document.getElementById("sliderImage");
    const images = sliderImages[game];

    clearInterval(sliderInterval);
    sliderIndex = 0;
    slider.src = images[0];
    slider.style.opacity = 1;

    sliderInterval = setInterval(() => {
        sliderIndex = (sliderIndex + 1) % images.length;
        slider.style.opacity = 0;

        setTimeout(() => {
            slider.src = images[sliderIndex];
            slider.style.opacity = 1;
        }, 300);
    }, 3000);
}

/* ===============================
   RENDER NOMINAL
================================ */
function renderNominal() {
    const game = gameSelect.value;
    const tbody = document.getElementById("nominalBody");
    const serverBox = document.getElementById("serverBox");
    const displayNameBox = document.getElementById("displayNameBox");

    tbody.innerHTML = "";
    selectedNominal = "";
    selectedHarga = "";

    if (game === "Roblox") {
        serverBox.style.display = "none";
        displayNameBox.style.display = "block";
    } else {
        serverBox.style.display = "block";
        displayNameBox.style.display = "none";
    }

    dataGame[game].forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nominal}</td>
                <td>Rp ${item.harga.toLocaleString("id-ID")}</td>
                <td>
                    <button onclick="pilihNominal('${item.nominal}', '${item.harga}')">
                        Pilih
                    </button>
                </td>
            </tr>
        `;
    });

    startSlider(game);
}

/* ===============================
   PILIH NOMINAL
================================ */
function pilihNominal(nominal, harga) {
    selectedNominal = nominal;
    selectedHarga = harga;
    alert("Nominal dipilih: " + nominal);
}

/* ===============================
   KIRIM PESAN
================================ */
function kirimPesanan() {
    const game = gameSelect.value;
    const gameId = document.getElementById("gameId").value;
    const server = document.getElementById("server").value;
    const displayName = document.getElementById("displayName").value;
    const payment = document.getElementById("payment").value;

    if (!gameId) {
        alert("ID Game wajib diisi!");
        return;
    }

    if (!selectedNominal) {
        alert("Pilih nominal terlebih dahulu!");
        return;
    }

    if (game === "Roblox" && !displayName) {
        alert("Display Name Roblox wajib diisi!");
        return;
    }

    fetch("https://gachainaja-production.up.railway.app/send.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            game,
            gameId,
            server,
            displayName,
            nominal: selectedNominal,
            harga: selectedHarga,
            payment
        })
    })
    .then(res => res.json())
    .then(res => alert(res.message))
    .catch(() => alert("Layanan tidak tersedia, Mohon untuk menhubungi layanan servis"));
}

/* ===============================
   EVENT
================================ */
gameSelect.addEventListener("change", renderNominal);
window.onload = renderNominal;


const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
    const {
        game,
        gameId,
        server,
        displayName,
        nominal,
        harga,
        payment
    } = req.body;

    const message =
`TOP UP BARU 🔔

Game: ${game}
ID: ${gameId}
${game === "Roblox" ? "Display Name: " + displayName : "Server: " + server}

Nominal: ${nominal}
Harga: Rp ${harga}
Pembayaran: ${payment}
`;

    try {
        const response = await fetch("https://api.fonnte.com/send", {
            method: "POST",
            headers: {
                "Authorization": process.env.FONNTE_TOKEN
            },
            body: new URLSearchParams({
                target: "628XXXXXXXXX", // GANTI NOMOR KAMU
                message
            })
        });

        res.json({ success: true, message: "Pesanan berhasil dikirim!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Gagal kirim WA" });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server jalan");
});

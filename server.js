
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

  const message = `
TOP UP BARU 🔔

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
        Authorization: process.env.FONNTE_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        target: "6283142808857", // GANTI NOMOR KAMU
        message: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ success: false, data });
    }

    res.json({ success: true, message: "Pesanan berhasil dikirim!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server berjalan");
});

app.get("/", (req, res) => {
  res.send("Backend berjalan 🚀");
});

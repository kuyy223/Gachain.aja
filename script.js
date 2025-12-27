/* ========== SLIDER ========== */
let slides = document.querySelectorAll(".slider img");
let index = 0;

if (slides.length > 0) {
  slides[0].classList.add("active");
  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3000);
}

/* ========== DATA PAKET GAME ========== */
const paketGame = {
  "Free Fire": [
    { nama: "70 Diamond", harga: 10000 },
    { nama: "140 Diamond", harga: 19000 }
  ],
  "Mobile Legend": [
    { nama: "86 Diamond", harga: 20000 },
    { nama: "172 Diamond", harga: 38000 }
  ],
  "PUBG": [
    { nama: "60 UC", harga: 15000 },
    { nama: "325 UC", harga: 75000 }
  ],
  "Roblox": [
    { nama: "80 Robux", harga: 18000 },
    { nama: "500 Robux", harga: 90000 }
  ]
};

/* ========== CHANGE GAME ========== */
document.getElementById("game").addEventListener("change", function () {
  const paket = document.getElementById("nominal");
  paket.innerHTML = '<option value="">-- Pilih Paket --</option>';

  if (!paketGame[this.value]) return;

  paketGame[this.value].forEach(p => {
    let opt = document.createElement("option");
    opt.value = `${p.nama} - Rp ${p.harga}`;
    opt.textContent = `${p.nama} (Rp ${p.harga.toLocaleString()})`;
    paket.appendChild(opt);
  });

  document.getElementById("serverLabel").innerText =
    this.value === "Roblox" ? "Display Name" : "Server";
});

/* ========== KIRIM WHATSAPP ========== */
function kirimWA() {
  const game = document.getElementById("game").value;
  const id = document.getElementById("gameId").value;
  const server = document.getElementById("server").value;
  const paket = document.getElementById("nominal").value;
  const payment = document.getElementById("payment").value;

  if (!game || !id || !paket || !payment) {
    alert("Mohon lengkapi semua data!");
    return;
  }

  const pesan = `
🔥 *TOP UP GAME BARU* 🔥

🎮 Game: ${game}
🆔 ID: ${id}
📌 ${game === "Roblox" ? "Display Name" : "Server"}: ${server || "-"}

📦 Paket: ${paket}
💳 Pembayaran: ${payment}

Mohon kirimkan instruksi pembayaran 🙏
`;

  const nomorAdmin = "628XXXXXXXXXX"; // GANTI NOMOR KAMU
  const url = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;

  window.open(url, "_blank");
}


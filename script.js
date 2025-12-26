const paketGame = {
  "Free Fire": [
    { nama: "70 Diamond", harga: 10000 },
    { nama: "140 Diamond", harga: 19000 },
    { nama: "355 Diamond", harga: 48000 }
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

document.getElementById("game").addEventListener("change", function () {
  const paketSelect = document.getElementById("nominal");
  paketSelect.innerHTML = "";

  paketGame[this.value]?.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.nama + " - Rp " + p.harga;
    opt.textContent = p.nama + " (Rp " + p.harga.toLocaleString() + ")";
    paketSelect.appendChild(opt);
  });
});


function pesanSekarang() {
  const game = gameSelect.value;
  const userid = document.getElementById("userid").value;
  const server = document.getElementById("server").value;
  const paket = document.querySelector('input[name="paket"]:checked');

  if (!game || !userid || !paket) {
    alert("Mohon lengkapi data terlebih dahulu");
    return;
  }

  const pesan = `
Halo Admin 👋
Saya ingin top up:

🎮 Game: ${game}
🆔 User ID: ${userid}
🌐 Server / Display Name: ${server || "-"}
💎 Paket: ${paket.value}

Terima kasih 🙏
`;

  const nomorAdmin = "6283142808857"; // GANTI
  window.open(`https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`, "_blank");
}

/* SLIDER */
let slideIndex = 0;
const slides = document.querySelectorAll(".slider img");

setInterval(() => {
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}, 3000);


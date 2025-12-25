const paketGame = {
  "Free Fire": [
    "70 Diamond",
    "140 Diamond",
    "355 Diamond",
    "720 Diamond"
  ],
  "Mobile Legends": [
    "86 Diamond",
    "172 Diamond",
    "257 Diamond",
    "514 Diamond"
  ],
  "PUBG Mobile": [
    "60 UC",
    "180 UC",
    "325 UC",
    "660 UC"
  ],
  "Roblox": [
    "80 Robux",
    "400 Robux",
    "800 Robux",
    "1700 Robux"
  ]
};

document.getElementById("game").addEventListener("change", function () {
  const game = this.value;
  const container = document.getElementById("paketContainer");

  container.innerHTML = "";

  if (!paketGame[game]) {
    container.innerHTML = "<p>Pilih game terlebih dahulu</p>";
    return;
  }

  paketGame[game].forEach((paket) => {
    container.innerHTML += `
      <label>
        <input type="radio" name="paket" value="${paket}">
        ${paket}
      </label>
    `;
  });
});

function pesanSekarang() {
  const game = document.getElementById("game").value;
  const userid = document.getElementById("userid").value;
  const server = document.getElementById("server").value;
  const paket = document.querySelector('input[name="paket"]:checked');

  if (!game || !userid || !paket) {
    alert("Lengkapi data terlebih dahulu!");
    return;
  }

  const pesan = `
Halo Admin 👋
Saya mau top up:

🎮 Game: ${game}
🆔 User ID: ${userid}
🌐 Server / Display Name: ${server || "-"}
💎 Paket: ${paket.value}

Terima kasih 🙏
`;

  const nomorAdmin = "628XXXXXXXXX"; // GANTI NOMOR KAMU
  const url = "https://wa.me/" + nomorAdmin + "?text=" + encodeURIComponent(pesan);
  window.open(url, "_blank");
}

/* SLIDER */
let index = 0;
const slides = document.querySelectorAll(".slider img");

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 3000);

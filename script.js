const paketGame = {
  "Free Fire": ["70 Diamond", "140 Diamond", "355 Diamond", "720 Diamond"],
  "Mobile Legends": ["86 Diamond", "172 Diamond", "257 Diamond", "514 Diamond"],
  "PUBG Mobile": ["60 UC", "180 UC", "325 UC", "660 UC"],
  "Roblox": ["80 Robux", "400 Robux", "800 Robux", "1700 Robux"]
};

const gameSelect = document.getElementById("game");
const paketContainer = document.getElementById("paketContainer");

gameSelect.addEventListener("change", () => {
  const game = gameSelect.value;
  paketContainer.innerHTML = "";

  if (!paketGame[game]) {
    paketContainer.innerHTML = `<p class="hint">Pilih game terlebih dahulu</p>`;
    return;
  }

  paketGame[game].forEach(paket => {
    paketContainer.innerHTML += `
      <label>
        <input type="radio" name="paket" value="${paket}">
        <span>${paket}</span>
      </label>
    `;
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

  const nomorAdmin = "628XXXXXXXXXX"; // GANTI
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


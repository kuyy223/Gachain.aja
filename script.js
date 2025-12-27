/* SLIDER */
let slides = document.querySelectorAll(".slider img");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 3000);

/* DATA PAKET */
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

/* CHANGE GAME */
document.getElementById("game").addEventListener("change", function () {
  const paket = document.getElementById("nominal");
  paket.innerHTML = "";

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


/* KIRIM WA */

function kirimWA() {
  const game = document.getElementById("game").value;
  const id = document.getElementById("gameId").value;
  const server = document.getElementById("server").value;
  const paket = document.getElementById("nominal").value;
  const pay = document.getElementById("payment").value;

  if (!game || !id || !paket) {
    alert("Lengkapi data terlebih dahulu!");
    return;
  }

  const text = `TOP UP GAME
Game: ${game}
ID: ${id}
Server: ${server}
Paket: ${paket}
Pembayaran: ${pay}`;

  const wa = "6283142808857"; // nomor kamu SUDAH BENAR
  location.href = `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;
}


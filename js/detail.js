// detail.js

const urlParams = new URLSearchParams(window.location.search);
const idProduk = parseInt(urlParams.get("id"));

const item = produk.find(p => p.id === idProduk);
const detailBox = document.getElementById("detail-produk");

// cek produk sebelum beli
function cekKetersediaan(stok, harga) {
   // hanya bisa dibeli kalau stok ada dan harga ≤ 200000
   if (stok === 0 || harga > 200000) {
      return false;
   }
   return true;
}

if (item) {
   detailBox.innerHTML = `
      <div class="group relative">
         <div class="absolute top-2 right-8 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button class="wishlist-btn bg-white px-2 py-1.5 rounded-full shadow-lg text-pink-500 hover:bg-gray-100"><i class="fa-solid fa-heart"></i></button>
            <button class="maximize-btn bg-white px-2 py-1.5 rounded-full shadow-lg text-blue-600 hover:bg-gray-100"><i class="fa-solid fa-maximize"></i></button>
            <button class="keranjang-btn bg-white px-2 py-1.5 rounded-full shadow-lg text-yellow-400 hover:bg-gray-100"><i class="fa-solid fa-bag-shopping"></i></button>
         </div>

         <img src="src/img/${item.id}.png" 
              alt="${item.nama}" 
              class="mx-auto w-96 h-96 object-cover rounded-lg cursor-pointer mr-6" />
      </div>

      <div>
         <h3 class="text-2xl font-bold mb-3">${item.nama}</h3>
         <p class="text-gray-700 mb-2"><strong>Harga:</strong> Rp ${item.harga.toLocaleString("id-ID")}</p>
         <p class="text-gray-700 mb-2"><strong>Bahan:</strong> ${item.bahan}</p>
         <p class="text-gray-700 mb-2"><strong>Warna:</strong> ${item.warna}</p>
         <p class="text-gray-700 mb-4">${item.deskripsi}</p>

         <p class="mb-4 ${item.stok > 0 ? "text-green-600" : "text-red-600"}">
            <strong>Stok:</strong> ${item.stok > 0 ? "Tersedia" : "Habis"}
         </p>

         <a href="produk.html" 
            class="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900">
            Kembali
         </a>

         <button class="beli-btn inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Beli
         </button>
      </div>
   `;
}

// event dom

// tombol beli
const beliBtn = document.querySelector(".beli-btn");
if (beliBtn) {
   beliBtn.addEventListener("click", () => {
      if (cekKetersediaan(item.stok, item.harga)) {
         alert(`Pembelian berhasil: ${item.nama}`);
      } else {
         alert("Maaf, produk tidak dapat dibeli (stok habis atau terlalu mahal).");
      }
   });
}

// tombol keranjang
const keranjangBtn = document.querySelector(".keranjang-btn");
if (keranjangBtn) {
   keranjangBtn.addEventListener("click", () => {
      alert(`${item.nama} ditambahkan ke keranjang 🛒`);
   });
}

// tombol wishlist
const wishlistBtn = document.querySelector(".wishlist-btn");
if (wishlistBtn) {
   wishlistBtn.addEventListener("click", () => {
      alert(`${item.nama} ditambahkan ke wishlist ❤️`);
   });
}

// tombol buka gambar tab baru
const maximizeBtn = document.querySelector(".maximize-btn");
if (maximizeBtn) {
   maximizeBtn.addEventListener("click", () => {
      confirm("Buka gambar di tab baru?") && window.open(`img/produk/${item.id}.png`, "_blank");
   });
}

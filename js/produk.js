// produk.js

const listContainer = document.getElementById("produk-list");

// fungsi format harga
function formatHarga(harga) {
   return "Rp " + harga.toLocaleString("id-ID");
}

// Loop untuk menampilkan produk
produk.forEach(item => {
   // Logika AND contoh:
   // Produk murah DAN stok masih ada → dikasih label spesial (visual opsional)
   let labelSpesial = "";
   if (item.stok > 0 && item.harga < 100000) {
      labelSpesial = `<span class="text-green-600 text-xs ml-1 font-semibold">(Murah & Ready)</span>`;
   }

   const card = document.createElement("div");
   card.className = "bg-white p-5 rounded-xl shadow border border-gray-200 hover:shadow-lg transition-shadow";
   card.innerHTML = `
      <div class="group relative">
         <div class="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button class="wishlist-btn bg-white px-2 py-1.5 rounded-full shadow-lg text-pink-500 hover:bg-gray-100"><i class="fa-solid fa-heart"></i></button>
            <button class="maximize-btn bg-white px-2 py-1.5 rounded-full shadow-lg text-blue-600 hover:bg-gray-100"><i class="fa-solid fa-maximize"></i></button>
            <button class="keranjang-btn bg-white px-2 py-1.5 rounded-full shadow-lg text-yellow-400 hover:bg-gray-100"><i class="fa-solid fa-bag-shopping"></i></button>
         </div>

         <div>
            <a href="detail.html?id=${item.id}">
               <img src="src/img/${item.id}.png" alt="${item.nama}" class="mx-auto w-full object-cover rounded-lg cursor-pointer mb-2"/>
            </a>

            <p class="text-sm text-gray-600 mb-1">${item.bahan} ${labelSpesial}</p>

            <a href="detail.html?id=${item.id}">
               <h3 class="text-lg font-semibold">
                  ${item.nama} <span class="text-sm text-yellow-400 font-light">⭐${item.rate}</span>
               </h3>
            </a>

            <p class="mb-1 font-semibold text-xl">${formatHarga(item.harga)}</p>
         </div>
      </div>
   `;

   listContainer.appendChild(card);

   // event dom

   // tombol keranjang
   const beliBtn = card.querySelector(".keranjang-btn");
   beliBtn.addEventListener("click", () => {
      alert(`${item.nama} ditambahkan ke keranjang 🛒`);
   });

   // tombol favorite
   const wishlistBtn = card.querySelector(".wishlist-btn");
   wishlistBtn.addEventListener("click", () => {
      alert(`${item.nama} ditambahkan ke wishlist ❤️`);
   });

   // tombol maximize
   const maximizeBtn = card.querySelector(".maximize-btn");
   if (maximizeBtn) {
      maximizeBtn.addEventListener("click", () => {
         confirm("Buka gambar di tab baru?") && window.open(`src/img/${item.id}.png`, "_blank");
      });
   }
});

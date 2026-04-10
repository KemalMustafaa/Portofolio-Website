var type = document.getElementById("title-intro");

var typewriter = new Typewriter(type, {
  loop: true,
});
typewriter
  .typeString(
    "I'm Mustafa Kemal <br> Fullstack Developer<span class='text-2xl'>©</span>",
  )
  .pauseFor(2500)
  .deleteAll()
  .typeString("I'm also Designer")
  .pauseFor(2500)
  .deleteAll()
  .start();

// untuk membuat project li
// Tambahkan titik (.) sebelum nama class
const tag = document.querySelector("section.project");
const projects = tag.querySelectorAll(".list");
const descs = tag.querySelectorAll(".desc");
const mainImg = document.getElementById("main-project-img");

projects.forEach((item, i) => {
  item.addEventListener("click", () => {
    const isCurrentlyOpen = descs[i].classList.contains("h-fit");

    // 1. Tutup SEMUA list terlebih dahulu
    descs.forEach((el) => {
      el.classList.remove("h-fit", "py-4");
      el.classList.add("h-0");
    });
    projects.forEach((el) => {
      el.classList.remove("ml-5", "font-medium");
      el.classList.add("ml-0");
    });

    // 2. Jika yang diklik tadi tidak sedang terbuka, maka buka
    if (!isCurrentlyOpen) {
      descs[i].classList.add("h-fit", "py-4");
      descs[i].classList.remove("h-0");
      projects[i].classList.add("ml-5", "font-medium");
      projects[i].classList.remove("ml-0");

      // 2. Ganti Gambar
      const newImgPath = item.getAttribute("data-img");

      // Efek transisi sederhana
      mainImg.style.opacity = 0;
      setTimeout(() => {
        mainImg.src = newImgPath;
        mainImg.style.opacity = 1;
      }, 200);
    }
  });
});

const track = document.getElementById("carousel-track");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// Fungsi Klik Tombol
nextBtn.addEventListener("click", () => {
  track.scrollLeft += track.offsetWidth / 2;
});

prevBtn.addEventListener("click", () => {
  track.scrollLeft -= track.offsetWidth / 2;
});

// Logika Drag Mouse (Opsional, gunakan kode drag yang kita bahas sebelumnya)
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
});
track.addEventListener("mouseleave", () => (isDown = false));
track.addEventListener("mouseup", () => (isDown = false));
track.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 2;
  track.scrollLeft = scrollLeft - walk;
});

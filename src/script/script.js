/**
 * Mustafa Kemal Portfolio Script
 */

// navbar
document.addEventListener("DOMContentLoaded", () => {
  // Ambil semua link dari Navbar (Desktop & Mobile)
  const allNavLinks = document.querySelectorAll('nav a[href^="#"]');
  const mobileMenu = document.getElementById("mobile-menu");

  allNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // 1. LOGIKA ACTIVE STATE
      // Hapus style aktif dari semua link di seluruh navbar
      allNavLinks.forEach((item) => {
        item.classList.remove("text-white", "border-gray-500");
        item.classList.add("text-gray-300", "border-transparent");
      });

      // Tambahkan style aktif ke link yang diklik
      this.classList.remove("text-gray-300", "border-transparent");
      this.classList.add("text-white", "border-gray-500");

      // 2. LOGIKA AUTO-CLOSE MOBILE MENU
      // Jika link yang diklik berada di dalam mobile menu, tutup menunya
      if (this.closest("#mobile-menu")) {
        // Karena kamu menggunakan Headless UI / Element UI (el-disclosure),
        // cara menutupnya adalah dengan memicu klik pada tombol toggle-nya
        const toggleButton = document.querySelector(
          '[commandfor="mobile-menu"]',
        );
        if (toggleButton) {
          toggleButton.click();
        }
      }
    });
  });
});

// 1. Typewriter Animation
const initTypewriter = () => {
  const typeElement = document.getElementById("title-intro");
  if (!typeElement) return;

  const typewriter = new Typewriter(typeElement, { loop: true });

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
};

// 2. Accordion Component (Project & FAQ)
// Tambahkan parameter isInitializing (default false)
const setupAccordion = (
  triggers,
  contents,
  activeClass = "h-fit",
  isInitializing = false,
) => {
  const mainImg = document.getElementById("main-project-img");

  triggers.forEach((item, i) => {
    // Logika Klik (tetap sama)
    item.addEventListener("click", () => {
      handleAccordionToggle(item, i, triggers, contents, activeClass, mainImg);
    });

    // --- LOGIKA BARU UNTUK INISIALISASI ---
    // Cek apakah item ini sudah memiliki class aktif secara default di HTML
    if (isInitializing && item.classList.contains("font-medium")) {
      const initialImgPath = item.getAttribute("data-img");
      // Langsung set gambar tanpa animasi (agar cepat saat load)
      if (initialImgPath && mainImg) {
        mainImg.src = initialImgPath;
        mainImg.style.opacity = 1; // Pastikan opacity 1
      }
    }
  });
};

// Pindahkan logika toggle ke fungsi terpisah agar lebih rapi
const handleAccordionToggle = (
  clickedItem,
  index,
  triggers,
  contents,
  activeClass,
  mainImg,
) => {
  const targetContent = contents[index];
  const isOpen = targetContent.classList.contains(activeClass);

  // 1. Reset State Semua
  contents.forEach((el) => {
    el.classList.remove(activeClass, "py-4", "h-auto");
    el.classList.add("h-0");
  });
  triggers.forEach((el) => {
    el.classList.remove("ml-5", "font-medium");
    el.classList.add("ml-0");
  });

  // 2. Buka yang diklik
  if (!isOpen) {
    targetContent.classList.add(activeClass, "py-4");
    targetContent.classList.remove("h-0");
    clickedItem.classList.add("font-medium");

    if (clickedItem.closest("section.project")) {
      clickedItem.classList.add("ml-5");
      const newImgPath = clickedItem.getAttribute("data-img");
      if (newImgPath && mainImg) updateMainImage(mainImg, newImgPath);
    }
  }
};

const updateMainImage = (imgElement, path) => {
  imgElement.style.opacity = 0;
  setTimeout(() => {
    imgElement.src = path;
    imgElement.style.opacity = 1;
  }, 200);
};

// 3. Carousel Handler
const initCarousel = () => {
  const track = document.getElementById("carousel-track");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  if (!track || !nextBtn || !prevBtn) return;

  const scrollAmount = 300;

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  // Drag Scroll Logic
  let isDown = false,
    startX,
    scrollLeft;

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    track.classList.add("active"); // Bisa digunakan untuk ganti kursor
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  const stopDragging = () => {
    isDown = false;
    track.classList.remove("active");
  };

  track.addEventListener("mouseleave", stopDragging);
  track.addEventListener("mouseup", stopDragging);

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });
};

// 4. Global Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
  initTypewriter();
  initCarousel();

  // Project Accordion
  const projectTag = document.querySelector("section.project");
  if (projectTag) {
    const triggers = projectTag.querySelectorAll(".list");
    const contents = projectTag.querySelectorAll(".desc");

    // Panggil dengan parameter isInitializing = true
    setupAccordion(triggers, contents, "h-fit", true);
  }

  // FAQ Accordion (Inisialisasi biasa, tanpa load gambar)
  const faqTag = document.querySelector(".faq-items");
  if (faqTag) {
    setupAccordion(
      faqTag.querySelectorAll(".list"),
      faqTag.querySelectorAll(".ans"),
      "h-auto",
    );
  }
});

//button service
document.getElementById("btn-learn-more").addEventListener("click", () => {
  document.getElementById("faq").scrollIntoView({
    behavior: "smooth",
  });
});

//email
const GmailContact = {
  config: {
    email: "mkemal1505@gmail.com",
    subject: "Project Inquiry - [Your Name]",
    body: "Halo Kemal,\n\nSaya tertarik dengan portofolio Anda...",
  },

  init() {
    const btn = document.getElementById("gmail-btn");
    if (btn) {
      btn.addEventListener("click", () => this.openGmail());
    }
  },

  openGmail() {
    const base = "https://mail.google.com/mail/?view=cm&fs=1";
    const to = `&to=${this.config.email}`;
    const su = `&su=${encodeURIComponent(this.config.subject)}`;
    const body = `&body=${encodeURIComponent(this.config.body)}`;

    window.open(`${base}${to}${su}${body}`, "_blank");
  },
};

// Panggil di DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => GmailContact.init());

//Contact - Whatsapp
const WAContact = {
  phone: "6281295652460", // Ganti dengan nomor WA kamu
  message:
    "Halo Mustafa Kemal, saya melihat portofolio Anda dan ingin berdiskusi mengenai project...",

  init() {
    const waBtn = document.getElementById("wa-btn");
    if (waBtn) {
      waBtn.addEventListener("click", () => this.openWhatsApp());
    }
  },

  openWhatsApp() {
    const url = `https://wa.me/${this.phone}?text=${encodeURIComponent(this.message)}`;
    window.open(url, "_blank");
  },
};

// Panggil di dalam DOMContentLoaded bersama inisialisasi lainnya
document.addEventListener("DOMContentLoaded", () => {
  WAContact.init();
});

// emailjs
const ContactService = {
  init() {
    emailjs.init("UMZqSH-29gpomUKn8"); // Masukkan Public Key dari Dashboard EmailJS
  },

  async handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("button");

    try {
      btn.innerText = "Sending...";
      btn.disabled = true;

      await emailjs.sendForm(
        "service_dzx3f2g", // Cek di Dashboard EmailJS
        "template_kcbtzdo", // Cek di Dashboard EmailJS
        form,
      );

      Swal.fire({
        title: "Good job!",
        text: "Message sent! Thank you, Kemal will reply shortly.!",
        icon: "success",
      });
      form.reset();
    } catch (err) {
      console.error("EmailJS Error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to send the message. Please try again.",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } finally {
      btn.innerText = "Submit";
      btn.disabled = false;
    }
  },
};

// --- 2. FUNGSI UI LAINNYA ---
const initUI = () => {
  // Masukkan logika Navbar, Carousel, atau Typewriter kamu di sini
  console.log("UI Initialized");
};

// --- 3. GLOBAL INITIALIZATION (Pusat Kendali) ---
document.addEventListener("DOMContentLoaded", () => {
  // Jalankan EmailJS
  ContactService.init();

  // Jalankan Fungsi UI
  initUI();

  // Pasang Event Listener ke Form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", ContactService.handleFormSubmit);
  }
});

//
const resume = document
  .getElementById("resume")
  .addEventListener("click", () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>',
      confirmButtonColor: "#3085d6",
    });
  });

/**
 * Mustafa Kemal Portfolio Script
 */

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
const setupAccordion = (triggers, contents, activeClass = "h-fit") => {
  const mainImg = document.getElementById("main-project-img");

  triggers.forEach((item, i) => {
    item.addEventListener("click", () => {
      const targetContent = contents[i];
      const isOpen = targetContent.classList.contains(activeClass);

      // Reset State
      contents.forEach((el) => {
        el.classList.remove(activeClass, "py-4", "h-auto");
        el.classList.add("h-0");
      });

      triggers.forEach((el) => {
        el.classList.remove("ml-5", "font-medium");
        el.classList.add("ml-0");
      });

      // Toggle Open State
      if (!isOpen) {
        targetContent.classList.add(activeClass, "py-4");
        targetContent.classList.remove("h-0");
        item.classList.add("font-medium");

        // Logic khusus Project
        if (item.closest("section.project")) {
          item.classList.add("ml-5");
          const newImgPath = item.getAttribute("data-img");
          if (newImgPath && mainImg) updateMainImage(mainImg, newImgPath);
        }
      }
    });
  });
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
    setupAccordion(
      projectTag.querySelectorAll(".list"),
      projectTag.querySelectorAll(".desc"),
      "h-fit",
    );
  }

  // FAQ Accordion
  const faqTag = document.querySelector(".faq-items");
  if (faqTag) {
    setupAccordion(
      faqTag.querySelectorAll(".list"),
      faqTag.querySelectorAll(".ans"),
      "h-auto",
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".site-nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("nav-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const sections = document.querySelectorAll(".fade-section");
  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    sections.forEach((section) => section.classList.add("visible"));
  }

  const heroVideos = document.querySelectorAll(".hero-video");
  heroVideos.forEach((video) => {
    video.addEventListener("error", () => {
      const hero = video.closest(".hero-section");
      if (hero) hero.classList.add("video-fallback-active");
    });
  });

  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm) {
    const formError = document.getElementById("formError");
    const formArea = document.getElementById("feedbackFormArea");
    const successArea = document.getElementById("formSuccess");

    feedbackForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const requiredFields = feedbackForm.querySelectorAll("[required]");
      let isValid = true;
      let firstInvalid = null;

      requiredFields.forEach((field) => {
        const value = (field.value || "").trim();
        if (!value) {
          isValid = false;
          if (!firstInvalid) firstInvalid = field;
          field.setAttribute("aria-invalid", "true");
        } else {
          field.removeAttribute("aria-invalid");
        }
      });

      const emailInput = feedbackForm.querySelector("#email");
      const emailValue = emailInput ? emailInput.value.trim() : "";
      const emailLooksValid = emailValue.includes("@") && emailValue.includes(".");

      if (!emailLooksValid) {
        isValid = false;
        if (!firstInvalid && emailInput) firstInvalid = emailInput;
        if (emailInput) emailInput.setAttribute("aria-invalid", "true");
      }

      if (!isValid) {
        if (formError) {
          formError.textContent = "Please complete all required fields and provide a valid email address.";
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (formError) formError.textContent = "";
      if (formArea) formArea.classList.add("is-hidden");
      if (successArea) successArea.classList.remove("is-hidden");
      feedbackForm.reset();
    });
  }

  const detailImage = document.getElementById("modelDetailImage");
  if (detailImage) {
    const models = {
      executive: {
        name: "EQV 300 Executive",
        finish: "Polar white exterior",
        image: "assets/images/cars/eqv-white.jpg",
        alt: "White Mercedes-Benz EQV 300 Executive exterior",
        copy: "A refined electric van for executive travel, private family movement, and elegant arrival."
      },
      night: {
        name: "EQV Night Edition",
        finish: "Obsidian black profile",
        image: "assets/images/cars/eqv-black-side.jpg",
        alt: "Black Mercedes-Benz EQV Night Edition side profile",
        copy: "A darker EQV expression with quiet authority, chrome restraint, and limousine-like presence."
      },
      rear: {
        name: "EQV Signature Rear",
        finish: "Red rear signature",
        image: "assets/images/cars/eqv-red-rear.jpg",
        alt: "Red Mercedes-Benz EQV rear profile with taillights",
        copy: "A memorable rear view shaped by red light, polished surfaces, and confident electric motion."
      },
      "long-range": {
        name: "EQV Long Range",
        finish: "Touring exterior",
        image: "assets/images/cars/eqv-original.png",
        alt: "Mercedes-Benz EQV Long Range exterior detail",
        copy: "Built for longer journeys where quiet comfort, space, and electric efficiency matter equally."
      },
      cabin: {
        name: "EQV Luxury Cabin",
        finish: "Private cabin atmosphere",
        image: "assets/images/cars/eqv-original-1.png",
        alt: "Mercedes-Benz EQV Luxury Cabin detail",
        copy: "A calm interior environment with flexible space, executive seating, and a lounge-like finish."
      }
    };

    const params = new URLSearchParams(window.location.search);
    const selectedModel = models[params.get("model")] || models.executive;
    const detailName = document.getElementById("modelDetailName");
    const detailFinish = document.getElementById("modelDetailFinish");
    const detailCopy = document.getElementById("modelDetailCopy");

    detailImage.src = selectedModel.image;
    detailImage.alt = selectedModel.alt;
    if (detailName) detailName.textContent = selectedModel.name;
    if (detailFinish) detailFinish.textContent = selectedModel.finish;
    if (detailCopy) detailCopy.textContent = selectedModel.copy;
    document.title = `Mercedes-Benz Electric | ${selectedModel.name}`;
  }
});

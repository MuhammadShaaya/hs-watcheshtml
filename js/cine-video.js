// Cinematic video sections only play while scrolled into view — saves
// bandwidth/battery, and reads as an intentional "reveal" rather than an
// autoplaying background loop running the whole time someone is on the page.

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".cine-video");
  if (!sections.length) return;

  sections.forEach((section) => {
    const video = section.querySelector("video");
    if (!video) return;

    // If the video file is missing/fails to load, just keep showing the
    // poster image forever — never leave a broken player on screen.
    video.addEventListener("error", () => {
      section.classList.add("cine-fallback");
      section.classList.remove("is-playing");
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const section = entry.target;
      const video = section.querySelector("video");
      if (!video || section.classList.contains("cine-fallback")) return;

      if (entry.isIntersecting) {
        section.classList.add("is-playing");
        const playPromise = video.play();
        if (playPromise && playPromise.catch) playPromise.catch(() => {});
      } else {
        section.classList.remove("is-playing");
        video.pause();
      }
    });
  }, { threshold: 0.35 });

  sections.forEach((section) => observer.observe(section));
});

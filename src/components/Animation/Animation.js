import gsap from "gsap";

const tl = gsap.timeline();

export const preLoaderAnim = () => {
  tl.to("body", {
    duration: 0.0,
    css: { overflowY: "hidden" },
    ease: "power2.inOut",
  })

    .to(".texts-container span", {
      //IN
      duration: 1.1,
      delay: 1,
      skewX: 50,
      stagger: 0.3,
      ease: "Sine.easeIn",
    })

    .to("body", {
      duration: 0.2,
      css: { overflowY: "scroll" },
      ease: "power3.inOut",
    })
    .to(
      ".preloader",
      {
        duration: 2.4,
        height: "0vh",
        ease: "Power1.easeOut",
      },
      "-=2"
    );
};

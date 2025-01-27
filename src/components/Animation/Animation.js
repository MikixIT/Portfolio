import gsap from "gsap";

const tl = gsap.timeline();

export const preLoaderAnim = () => {
  tl.to("body", {
    duration: 0.0,
    css: { overflowY: "hidden" },
    ease: "power2.inOut",
  })
    .to(".texts-container", {
      duration: 0,
      opacity: 1,
      ease: "Power3.easeOut",
    })
    .from(".texts-container span", {
      duration: 1.1,
      delay: 1,
      y: 1000,
      skewY: 10,
      stagger: 0.3,
      ease: "Power3.easeOut",
    })
    .to(".texts-container span", {
      duration: 2.2,
      y: 1000,
      skewY: -70,
      stagger: 0.2,
      ease: "Power3.easeOut",
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

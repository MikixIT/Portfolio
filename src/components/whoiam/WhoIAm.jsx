import React, { useEffect, useRef } from "react";
import "./whoIAm.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "../../assets/mtImg.jpg";
import ScrollIndicator from "../ScrollIndicator/ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "React",
  "Next.js",
  "Vue",
  "Nuxt.js",
  "TypeScript",
  "JavaScript",
  "Tailwind",
  "GSAP",
  "Node.js",
  "PostgreSQL",
  "Cypress Testing",
  "Python",
  "Prompt Engineering",
  "Django"
];

function WhoIAm() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const imageButtonRef = useRef(null);
  const imagePopRef = useRef(null);
  const canDragImageRef = useRef(false);
  const imageInteractionRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastTime: 0,
    velocityX: 0,
    hasMoved: false,
  });
  const skillRefs = useRef([]);
  const floatTweensRef = useRef([]);
  const dragStateRef = useRef({
    activeIndex: null,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  useEffect(() => {
    canDragImageRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 100%",
            end: "bottom 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 95%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      floatTweensRef.current = skillRefs.current.map((skill, index) => {
        if (!skill) return null;

        return gsap.to(skill, {
          y: gsap.utils.random(-12, 12),
          x: gsap.utils.random(-8, 8),
          rotation: gsap.utils.random(-3, 3),
          duration: gsap.utils.random(2.8, 4.4),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.07,
        });
      });
    });

    return () => {
      floatTweensRef.current.forEach((tween) => tween?.kill());
      ctx.revert();
    };
  }, []);

  const handleImageClick = () => {
    if (!imageButtonRef.current || !imagePopRef.current) return;
    if (imageInteractionRef.current.hasMoved) {
      imageInteractionRef.current.hasMoved = false;
      return;
    }

    const currentRotation =
      Number(gsap.getProperty(imageButtonRef.current, "rotationY")) || 0;
    const targetRotation =
      (Math.floor(currentRotation / 360) + 1) * 360;

    gsap.killTweensOf(imageButtonRef.current);
    gsap.killTweensOf(imagePopRef.current);

    gsap.to(imageButtonRef.current, {
      rotationY: targetRotation,
      duration: 1.45,
      ease: "power2.inOut",
      overwrite: true,
      onComplete: () => {
        gsap.set(imageButtonRef.current, { rotationY: 0, rotationX: 0 });
      },
    });

    gsap.fromTo(
      imagePopRef.current,
      {
        autoAlpha: 0,
        scale: 0.7,
        x: 0,
        y: 0,
        rotate: -10,
      },
      {
        autoAlpha: 1,
        scale: 1,
        x: 12,
        y: -18,
        rotate: -4,
        duration: 0.18,
        ease: "back.out(2.8)",
      }
    );

    gsap.to(imagePopRef.current, {
      autoAlpha: 0,
      scale: 0.92,
      y: -30,
      duration: 0.35,
      delay: 0.2,
      ease: "power2.in",
    });
  };

  const handleImagePointerDown = (event) => {
    if (!canDragImageRef.current || !imageButtonRef.current) return;

    imageInteractionRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocityX: 0,
      hasMoved: false,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    gsap.killTweensOf(imageButtonRef.current);
  };

  const handleImagePointerMove = (event) => {
    if (!canDragImageRef.current || !imageButtonRef.current) return;

    const interaction = imageInteractionRef.current;
    if (interaction.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - interaction.startX;
    const deltaY = event.clientY - interaction.startY;
    const deltaTime = Math.max(16, event.timeStamp - interaction.lastTime);
    const instantVelocityX = (event.clientX - interaction.lastX) / deltaTime;
    const rotateY = gsap.utils.clamp(-16, 16, deltaX * 0.16);
    const rotateX = gsap.utils.clamp(-8, 8, -deltaY * 0.09);

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      interaction.hasMoved = true;
    }

    interaction.lastX = event.clientX;
    interaction.lastTime = event.timeStamp;
    interaction.velocityX = interaction.velocityX * 0.35 + instantVelocityX * 0.65;

    gsap.to(imageButtonRef.current, {
      rotationY: rotateY,
      rotationX: rotateX,
      scale: 1.02,
      duration: 0.16,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const resetImageTilt = (event) => {
    if (!imageButtonRef.current) return;

    const interaction = imageInteractionRef.current;
    if (event?.pointerId != null && interaction.pointerId !== event.pointerId) {
      return;
    }

    if (event?.currentTarget?.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (interaction.hasMoved) {
      const totalDeltaX = (event?.clientX ?? interaction.lastX) - interaction.startX;
      const flingDirection =
        Math.sign(totalDeltaX) || Math.sign(interaction.velocityX) || 1;
      const spinEnergy =
        Math.abs(totalDeltaX) * 0.02 + Math.abs(interaction.velocityX) * 90;
      const extraTurns = gsap.utils.clamp(
        1,
        2,
        Math.round(spinEnergy / 80) + 1
      );
      const currentRotationY =
        Number(gsap.getProperty(imageButtonRef.current, "rotationY")) || 0;
      const normalizedRotation =
        ((currentRotationY % 360) + 360) % 360;
      const snapOffset =
        flingDirection > 0
          ? normalizedRotation === 0
            ? 360
            : 360 - normalizedRotation
          : normalizedRotation === 0
            ? -360
            : -normalizedRotation;
      const targetRotation =
        currentRotationY +
        snapOffset +
        flingDirection * 360 * (extraTurns - 1);

      gsap.to(imageButtonRef.current, {
        rotationY: targetRotation,
        rotationX: 0,
        scale: 1,
        duration: gsap.utils.clamp(1.05, 1.55, 1.05 + extraTurns * 0.14),
        ease: "power3.out",
        overwrite: true,
        onComplete: () => {
          gsap.set(imageButtonRef.current, { rotationY: 0, rotationX: 0 });
        },
      });
    } else {
      gsap.to(imageButtonRef.current, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    }

    imageInteractionRef.current = {
      pointerId: null,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastTime: 0,
      velocityX: 0,
      hasMoved: interaction.hasMoved,
    };
  };

  const handlePointerDown = (index) => (event) => {
    const skill = skillRefs.current[index];
    if (!skill) return;

    dragStateRef.current = {
      activeIndex: index,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: Number(gsap.getProperty(skill, "x")) || 0,
      originY: Number(gsap.getProperty(skill, "y")) || 0,
    };

    floatTweensRef.current[index]?.pause();
    skill.setPointerCapture(event.pointerId);
    skill.dataset.dragging = "true";

    gsap.to(skill, {
      scale: 1.04,
      duration: 0.18,
      ease: "power2.out",
    });
  };

  const handlePointerMove = (index) => (event) => {
    const dragState = dragStateRef.current;
    if (
      dragState.activeIndex !== index ||
      dragState.pointerId !== event.pointerId
    ) {
      return;
    }

    const skill = skillRefs.current[index];
    if (!skill) return;

    const deltaX = gsap.utils.clamp(-18, 18, event.clientX - dragState.startX);
    const deltaY = gsap.utils.clamp(-14, 14, event.clientY - dragState.startY);

    gsap.set(skill, {
      x: dragState.originX + deltaX,
      y: dragState.originY + deltaY,
      rotation: deltaX * 0.08,
    });
  };

  const handlePointerUp = (index) => (event) => {
    const dragState = dragStateRef.current;
    if (
      dragState.activeIndex !== index ||
      dragState.pointerId !== event.pointerId
    ) {
      return;
    }

    const skill = skillRefs.current[index];
    if (!skill) return;

    skill.releasePointerCapture(event.pointerId);
    skill.dataset.dragging = "false";

    gsap.to(skill, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 0.65,
      ease: "elastic.out(1, 0.45)",
    });

    floatTweensRef.current[index]?.resume();

    dragStateRef.current = {
      activeIndex: null,
      pointerId: null,
      startX: 0,
      startY: 0,
      originX: 0,
      originY: 0,
    };
  };

  return (
    <section className="who-i-am">
      <div className="who-i-am-container">
        <h2 ref={titleRef}>Who I Am</h2>

        <div className="who-i-am-content">
          <div className="content-text" ref={contentRef}>
            <p className="intro-text">
              Hi! I'm Michael Torres, a creative developer based in Hamburg.
            </p>

            <div className="description">
              <p>
                I dedicate myself to creating unique digital experiences that
                combine elegant design with innovative functionality. Every
                project is an opportunity to push the boundaries of
                technological creativity.
              </p>

              <p>
                Specialized in <strong>Vue, React, Nuxt.js, Next.js</strong>,
                JavaScript-based and modern technologies, I transform ideas into
                digital realities that inspire and engage.
              </p>
            </div>

            <div className="skills">
              <h3>Skills</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="skill-tag"
                    ref={(element) => {
                      skillRefs.current[index] = element;
                    }}
                    onPointerDown={handlePointerDown(index)}
                    onPointerMove={handlePointerMove(index)}
                    onPointerUp={handlePointerUp(index)}
                    onPointerCancel={handlePointerUp(index)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="profile-image" ref={imageRef}>
            <div className="image-wrapper">
              <button
                type="button"
                className="image-container"
                ref={imageButtonRef}
                onClick={handleImageClick}
                onDragStart={(event) => event.preventDefault()}
                onPointerDown={handleImagePointerDown}
                onPointerMove={handleImagePointerMove}
                onPointerUp={resetImageTilt}
                onPointerCancel={resetImageTilt}
                onPointerLeave={resetImageTilt}
                aria-label="Spin profile image"
              >
                <img
                  src={profileImage}
                  alt="Michael Torres"
                  draggable={false}
                />
              </button>
              <span className="image-pop" ref={imagePopRef} aria-hidden="true">
                CLICK!
              </span>
            </div>
          </div>
        </div>

        <ScrollIndicator delay={2} position="bottom" />
      </div>
    </section>
  );
}

export default WhoIAm;

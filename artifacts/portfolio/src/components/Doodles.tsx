import { SVGProps } from "react";
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 0.5 + i * 0.2;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export const ArrowMarker = (props: SVGProps<SVGSVGElement> & { delayOrder?: number, wobbly?: boolean }) => (
  <motion.svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <motion.path
      d={props.wobbly ? "M10,90 Q30,60 50,40 T90,10 M65,15 L90,10 L85,35" : "M10,90 Q40,40 90,10 M70,10 L90,10 L90,30"}
      variants={draw}
      custom={props.delayOrder || 0}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />
  </motion.svg>
);

export const CircleMarker = (props: SVGProps<SVGSVGElement> & { delayOrder?: number }) => (
  <motion.svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <motion.path
      d="M50,10 C75,12 90,30 85,60 C80,90 35,95 20,75 C5,55 15,20 40,12 C55,8 65,15 65,25"
      variants={draw}
      custom={props.delayOrder || 0}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />
  </motion.svg>
);

export const UnderlineMarker = (props: SVGProps<SVGSVGElement> & { delayOrder?: number }) => (
  <motion.svg
    width="200"
    height="20"
    viewBox="0 0 200 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    preserveAspectRatio="none"
    {...props}
  >
    <motion.path
      d="M5,10 Q50,15 100,8 T195,12"
      variants={draw}
      custom={props.delayOrder || 0}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />
  </motion.svg>
);

export const StarMarker = (props: SVGProps<SVGSVGElement> & { delayOrder?: number }) => (
  <motion.svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <motion.path
      d="M25,2 L32,18 L48,20 L35,32 L38,48 L25,40 L12,48 L15,32 L2,20 L18,18 Z"
      variants={draw}
      custom={props.delayOrder || 0}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />
  </motion.svg>
);

export const RealMarkerGraphic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="120"
    height="30"
    viewBox="0 0 120 30"
    fill="none"
    {...props}
  >
    <path d="M10,15 L30,5 L110,5 C115,5 118,8 118,15 C118,22 115,25 110,25 L30,25 L10,15 Z" fill="#18a0fb" />
    <path d="M30,5 L30,25" stroke="#fff" strokeWidth="2" opacity="0.3" />
    <path d="M100,5 L100,25" stroke="#fff" strokeWidth="2" opacity="0.3" />
    <path d="M5,12 L10,15 L5,18 Z" fill="#000" />
    <path d="M35,10 L95,10" stroke="#fff" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
  </svg>
);

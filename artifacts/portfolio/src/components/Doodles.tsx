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

export const ArrowDoodle = (props: SVGProps<SVGSVGElement> & { delayOrder?: number }) => (
  <motion.svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <motion.path
      d="M10,90 Q40,40 90,10 M70,10 L90,10 L90,30"
      variants={draw}
      custom={props.delayOrder || 0}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />
  </motion.svg>
);

export const StarDoodle = (props: SVGProps<SVGSVGElement> & { delayOrder?: number }) => (
  <motion.svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
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

export const CircleDoodle = (props: SVGProps<SVGSVGElement> & { delayOrder?: number }) => (
  <motion.svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <motion.path
      d="M50,10 C80,12 90,40 85,70 C80,95 40,95 20,80 C5,65 10,25 35,15 C50,10 60,15 65,25"
      variants={draw}
      custom={props.delayOrder || 0}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />
  </motion.svg>
);

export const UnderlineDoodle = (props: SVGProps<SVGSVGElement> & { delayOrder?: number }) => (
  <motion.svg
    width="200"
    height="20"
    viewBox="0 0 200 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
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

export const BulbDoodle = (props: SVGProps<SVGSVGElement> & { delayOrder?: number }) => (
  <motion.svg
    width="60"
    height="80"
    viewBox="0 0 60 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <motion.path
      d="M30,10 C15,10 10,25 15,35 C20,45 22,50 22,60 L38,60 C38,50 40,45 45,35 C50,25 45,10 30,10 Z M22,65 L38,65 M25,70 L35,70 M10,20 L5,15 M50,20 L55,15 M30,5 L30,0"
      variants={draw}
      custom={props.delayOrder || 0}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />
  </motion.svg>
);

export const CoffeeStain = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="150"
    height="150"
    viewBox="0 0 150 150"
    fill="none"
    {...props}
  >
    <path
      d="M75,10 C110,12 135,40 130,80 C125,120 85,135 50,125 C15,110 5,60 25,30 C45,5 60,8 75,10 Z"
      fill="rgba(139, 69, 19, 0.08)"
      stroke="rgba(139, 69, 19, 0.15)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M75,25 C100,28 115,50 110,80 C105,110 75,120 45,110 C20,100 15,60 30,40 C45,20 60,22 75,25 Z"
      fill="none"
      stroke="rgba(139, 69, 19, 0.25)"
      strokeWidth="1.5"
    />
  </svg>
);
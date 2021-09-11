import { motion } from "framer-motion";
import React from "react";

const TransitionMotion: React.FC<{ children: JSX.Element }> = (props) => {
  return (
    <motion.div
      animate={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      {props.children}
    </motion.div>
  );
};
export default TransitionMotion;

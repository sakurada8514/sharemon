import { motion } from "framer-motion";

export default function TransitionMotion(props) {
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
            {props.contents}
        </motion.div>
    );
}

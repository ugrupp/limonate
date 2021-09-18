import classNames from "classnames";
import { HTMLMotionProps, motion } from "framer-motion";

interface DotProps extends HTMLMotionProps<"button"> {
  text: string;
  theme: "light" | "dark";
}

const Dot: React.FC<DotProps> = ({ text, theme, ...otherProps }) => {
  return (
    <motion.button
      className={classNames([
        "h-15 w-15 md:w-20 md:h-20 2xl:w-30 2xl:h-30 rounded-full",
        "focus:outline-none",
        {
          "bg-light focus-visible:outline-white": theme === "light",
          "bg-dark focus-visible:outline-black": theme === "dark",
        },
      ])}
      {...otherProps}
    >
      <span className="sr-only">{text}</span>
    </motion.button>
  );
};

export default Dot;

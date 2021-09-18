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
        {
          "bg-light": theme === "light",
          "bg-dark": theme === "dark",
        },
      ])}
      {...otherProps}
    >
      <span className="sr-only">{text}</span>
    </motion.button>
  );
};

export default Dot;

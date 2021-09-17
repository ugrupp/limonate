import classNames from "classnames";

interface ButtonProps {
  tagName?: keyof JSX.IntrinsicElements;
  className?: string;
  theme?: "light" | "dark";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  theme = "dark",
  tagName = "a",
  ...otherProps
}) => {
  const Tag = tagName as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${className} ${buttonStyles(theme)}`} {...otherProps}>
      <span>{children}</span>
    </Tag>
  );
};

export default Button;

export const buttonStyles = (theme: ButtonProps["theme"]) =>
  classNames([
    "inline-block leading-[2] whitespace-nowrap uppercase cursor-pointer",
    "text-16 md:text-20 2xl:text-25 leading-none",
    "h-30 md:h-[36px] 2xl:h-[45px] rounded-full px-12 md:px-15 2xl:px-18",
    "transition-colors duration-200",
    "border-[1.2px] md:border-[1.4px] 2xl:border-[2px] focus:outline-none",
    {
      "bg-transparent border-light hover:bg-light text-light hover:text-dark focus-visible:outline-white":
        theme === "light",
      "bg-transparent border-dark hover:bg-dark text-dark hover:text-light focus-visible:outline-black":
        theme === "dark",
    },
  ]);

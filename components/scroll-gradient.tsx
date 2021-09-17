import classNames from "classnames";
import React from "react";

interface GradientProps {
  visible: boolean;
  mobileHidden?: boolean;
  color?: "light" | "dark";
  position: "top" | "bottom";
  dimensions?: string;
  classes?: string;
}

const Gradient: React.FC<GradientProps> = ({
  visible,
  mobileHidden = true,
  color = "light",
  position,
  dimensions = "h-60 -mt-60",
  classes,
}) => (
  <div
    className={classNames([
      "pointer-events-none sticky inset-x-0 z-10 transition-opacity duration-300",
      dimensions,
      classes,
      {
        "hidden xl:block": mobileHidden,
        "opacity-0": visible,
        "from-light via-light": color === "light",
        "from-dark via-dark": color === "dark",
        "bg-gradient-to-b top-0": position === "top",
        "bg-gradient-to-t bottom-0": position === "bottom",
      },
    ])}
  />
);

interface SentinelProps {
  position: "top" | "bottom";
}

const Sentinel = React.forwardRef<HTMLDivElement, SentinelProps>(
  ({ position }, ref) => (
    <div
      className={classNames([
        "absolute inset-x-0 h-px",
        {
          "top-0": position === "top",
          "bottom-0": position === "bottom",
        },
      ])}
      ref={ref}
    />
  )
);

export { Gradient, Sentinel };

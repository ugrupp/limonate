interface ContainerProps {
  className?: string;
  classNameInner?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  classNameInner,
}) => {
  return (
    <div className={`px-15 md:px-40 xl:px-60 2xl:px-90 ${className}`}>
      <div className={`max-w-8xl mx-auto ${classNameInner}`}>{children}</div>
    </div>
  );
};

export default Container;

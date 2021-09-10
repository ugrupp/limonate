interface ContainerProps {}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="px-15 md:px-40 xl:px-60 2xl:px-90">
      <div className="max-w-8xl mx-auto">{children}</div>
    </div>
  );
};

export default Container;

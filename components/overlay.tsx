interface OverlayProps {}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    // TODO: right scrollbar positioning (inset right using js?)
    <div className="fixed inset-15 md:inset-40 2xl:inset-60 z-40 bg-dark rounded-[15px] text-light selection-inverted">
      {children}
    </div>
  );
};

export default Overlay;

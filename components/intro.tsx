import richtextStyles from "../styles/richtext.module.css";

interface IntroProps {
  text: string;
}

const Intro: React.FC<IntroProps> = ({ text }) => {
  return (
    <section
      className={[
        richtextStyles.root,
        "font-serif text-25 md:text-40 xl:text-50 3xl:text-75 leading-none",
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: text }}
    ></section>
  );
};

export default Intro;

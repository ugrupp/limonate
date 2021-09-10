import richtextStyles from "../styles/richtext.module.css";
import Container from "./container";

interface IntroProps {
  text: string;
}

const Intro: React.FC<IntroProps> = ({ text }) => {
  return (
    <section>
      <Container>
        <div
          className={[
            richtextStyles.root,
            "font-serif text-25 md:text-40 xl:text-50 2xl:text-75 leading-none",
          ].join(" ")}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      </Container>
    </section>
  );
};

export default Intro;

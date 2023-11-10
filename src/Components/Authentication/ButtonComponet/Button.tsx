import "./Button.css";

interface PropsI {
  text: string;
  type: "main" | "secondary";
}
const Button = (props: PropsI) => {
  return (
    <button
      className={`btn ${props.type === "main" ? "btnMain" : "btnSecondary"}`}
    >
      {props.text}
    </button>
  );
};

export default Button;

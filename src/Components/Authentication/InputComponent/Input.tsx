import "./Input.css";
import IconProfile from "../Icon-svg.js/IconProfile";
import IconLock from "../Icon-svg.js/IconLock";

interface PropsI {
  type: "email" | "password";
}

const Input = (props: PropsI) => {
  const labelText = {
    email: "Email Address",
    password: "Password",
  }[props.type];

  const icon = {
    email: <IconProfile />,
    password: <IconLock />,
  }[props.type];

  return (
    <div className="field">
      {icon}

      <input
        id={props.type}
        name={props.type}
        type={props.type}
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.email}
      />
      <label htmlFor="email">{labelText}</label>
    </div>
  );
};

export default Input;

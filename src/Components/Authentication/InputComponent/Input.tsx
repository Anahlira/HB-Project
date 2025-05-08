import "./Input.css";
import IconProfile from "../Icon-svg.js/IconProfile";
import IconLock from "../Icon-svg.js/IconLock";
import { useEffect, useState } from "react";

interface PropsI {
  type: "email" | "password";
  formik: any;
}

const Input = (props: PropsI) => {
  const [err, setErr] = useState(false);

  const labelText = {
    email: "Email Address",
    password: "Password",
  }[props.type];

  const icon = {
    email: <IconProfile />,
    password: <IconLock />,
  }[props.type];

  const value = props.formik.values[props.type];

  useEffect(() => {
    setErr(props.formik.errors[props.type] && props.formik.touched[props.type]);
  }, [props.formik.errors, props.formik.touched, value, props.type]);

  return (
    <div className="inputBox">
      <div className={`field ${err ? "errorBorder" : ""}`}>
        {icon}

        <input
          id={props.type}
          name={props.type}
          type={props.type}
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={value}
        />
        <label
          className={value !== "" ? "labelPlaceholder" : "labelUp"}
          htmlFor="email"
        >
          {labelText}
        </label>
      </div>

      <p>{err && props.formik.errors[props.type]}</p>
    </div>
  );
};

export default Input;

import "./Input.css";
import IconProfile from "../Icon-svg.js/IconProfile";
import IconLock from "../Icon-svg.js/IconLock";
import { useEffect, useState } from "react";

interface PropsI {
  type: "email" | "password";
  formik: any;
}

const Input = (props: PropsI) => {
  const [changed, setChanged] = useState(false);
  const [err, setErr] = useState(false);

  const labelText = {
    email: "Email Address",
    password: "Password",
  }[props.type];

  const icon = {
    email: <IconProfile />,
    password: <IconLock />,
  }[props.type];

  const value = {
    email: props.formik.values.email,
    password: props.formik.values.password,
  }[props.type];

  useEffect(() => {
    if (value === props.formik.initialValues[props.type]) {
      setChanged(false);
    } else setChanged(true);

    setErr(props.formik.errors[props.type] && props.formik.touched[props.type]);
  }, [value]);

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
          className={changed ? "labelPlaceholder" : "labelUp"}
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

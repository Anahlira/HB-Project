import "./Input.css";
import IconProfile from "./Icon-svg.js/IconProfile";

function Input() {
  return (
    <div className="field">
      <label htmlFor="email">Email Address</label>

      <IconProfile></IconProfile>
      <input
        id="email"
        name="email"
        type="email"
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.email}
        placeholder="email"
      />
    </div>
  );
}

export default Input;

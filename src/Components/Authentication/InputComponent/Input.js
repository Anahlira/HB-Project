import "./Input.css";
import IconProfile from "../Icon-svg.js/IconProfile";

// props to pass:
// type of input
function Input() {
  return (
    <div className="field">
      <IconProfile></IconProfile>

      <input
        id="email"
        name="email"
        type="email"
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.email}
      />
      <label htmlFor="email">Email Address</label>
    </div>
  );
}

export default Input;

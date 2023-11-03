import "./Input.css";
import IconProfile from "../Icon-svg.js/IconProfile";

interface PropsI {}
// props to pass:
// type of input
const Input = (props: PropsI) => {
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
};

export default Input;

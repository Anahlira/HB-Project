import { useFormik } from "formik";
import Input from "./InputComponent/Input";
import * as Yup from "yup";
import Button from "./ButtonComponet/Button";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = () => {
  const handleLogin = (values: { email: string; password: string }) => {
    console.log(values.email);
    console.log(values.password);
    console.log("Login!! Almost");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: LoginSchema,
  });

  return (
    <>
      <form className="authForm" onSubmit={formik.handleSubmit}>
        <Input key="1" type="email" formik={formik}></Input>
        <Input key="2" type="password" formik={formik}></Input>
        {/* <button type="submit" disabled={formik.isSubmitting}>
          Submit
        </button> */}
        <Button />
      </form>
      <div>{formik.touched.password}</div>
    </>
  );
};

export default Login;

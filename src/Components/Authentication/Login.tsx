import Input from "./InputComponent/Input";

const Login = () => {
  return (
    <>
      <form className="authForm">
        <Input type="email"></Input>
        <Input type="password"></Input>
      </form>
    </>
  );
};

export default Login;

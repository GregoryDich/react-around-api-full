import React from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmitForm(evt) {
    evt.preventDefault();
    handleLogin({
      email: email,
      password: password,
    });
  }
  
  return (
    <section className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmitForm}>
        <h2 className="auth-form__title">Sign in</h2>
        <input
          className="auth-form__input auth-form__input_value_email"
          id="email-input"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          required
          value={email || ""}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <input
          className="auth-form__input auth-form__input_value_password"
          id="password-input"
          type="password"
          name="password"
          placeholder="Password"
          minLength={2}
          required
          value={password || ""}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button className="auth-form__button" type="submit">
          Sign in
        </button>
        <Link className="auth-form__link" to="/signup">
          Not a member yet? Sign up here!
        </Link>
      </form>
    </section>
  );
}
export default Login;

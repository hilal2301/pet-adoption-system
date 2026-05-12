import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../context/useAuth";
import { getFriendlyAuthError } from "../utils/authErrors";

const schema = yup.object({
  email: yup.string().trim().email("Enter a valid email address.").required("Email is required."),
  password: yup.string().required("Password is required."),
});

export default function Login() {
  const [formError, setFormError] = useState("");
  const { login, getDefaultRedirect } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    setFormError("");

    try {
      const result = await login(values);
      navigate(from || getDefaultRedirect(result.role), { replace: true });
    } catch (error) {
      setFormError(getFriendlyAuthError(error));
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="login-title">
        <div className="auth-hero-panel">
          <div className="auth-illustration" aria-hidden="true">
            <div className="pet-face">
              <span className="pet-ear pet-ear-left" />
              <span className="pet-ear pet-ear-right" />
              <span className="pet-eye pet-eye-left" />
              <span className="pet-eye pet-eye-right" />
              <span className="pet-nose" />
            </div>
          </div>
          <p className="auth-kicker">PetAdopt Shelter</p>
          <h1 id="login-title">Welcome back to the adoption desk.</h1>
          <p className="auth-subtitle">
            Sign in to manage pets, applications, and your shelter profile.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <p className="auth-kicker">Sign in</p>
            <h2>Continue your adoption work</h2>
          </div>

          {formError && (
            <div className="auth-alert" role="alert">
              {formError}
            </div>
          )}

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email && <small>{errors.email.message}</small>}
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />
            {errors.password && <small>{errors.password.message}</small>}
          </label>

          <button className="auth-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner spinner--light" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>

          <p className="auth-switch">
            New to the shelter? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../context/useAuth";
import { getFriendlyAuthError } from "../utils/authErrors";

const schema = yup.object({
  fullName: yup.string().trim().required("Full name is required."),
  email: yup.string().trim().email("Enter a valid email address.").required("Email is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Please confirm your password."),
});

export default function Register() {
  const [formError, setFormError] = useState("");
  const { register: createAccount, getDefaultRedirect } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values) => {
    setFormError("");

    try {
      const result = await createAccount(values);
      navigate(getDefaultRedirect(result.role), { replace: true });
    } catch (error) {
      setFormError(getFriendlyAuthError(error));
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="register-title">
        <div className="auth-hero-panel">
          <div className="auth-illustration" aria-hidden="true">
            <div className="paw-print paw-print--large">
              <span />
              <span />
              <span />
              <span />
              <strong />
            </div>
          </div>
          <p className="auth-kicker">PetAdopt Shelter</p>
          <h1 id="register-title">Start helping pets find home.</h1>
          <p className="auth-subtitle">
            Create a secure account for adoption requests and shelter updates.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <p className="auth-kicker">Create account</p>
            <h2>Join the adoption platform</h2>
          </div>

          {formError && (
            <div className="auth-alert" role="alert">
              {formError}
            </div>
          )}

          <label className="field">
            <span>Full name</span>
            <input
              type="text"
              autoComplete="name"
              placeholder="Jane Foster"
              aria-invalid={Boolean(errors.fullName)}
              {...register("fullName")}
            />
            {errors.fullName && <small>{errors.fullName.message}</small>}
          </label>

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
              autoComplete="new-password"
              placeholder="At least 6 characters"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />
            {errors.password && <small>{errors.password.message}</small>}
          </label>

          <label className="field">
            <span>Confirm password</span>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Repeat your password"
              aria-invalid={Boolean(errors.confirmPassword)}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <small>{errors.confirmPassword.message}</small>}
          </label>

          <button className="auth-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner spinner--light" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>

          <p className="auth-switch">
            Already registered? <Link to="/">Sign in</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

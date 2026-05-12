import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Unauthorized() {
  const location = useLocation();
  const { getDefaultRedirect } = useAuth();
  const message = location.state?.message || "You do not have permission to view this page.";

  return (
    <main className="auth-shell">
      <section className="auth-card auth-card--compact" aria-labelledby="unauthorized-title">
        <div className="auth-illustration" aria-hidden="true">
          <div className="paw-print">
            <span />
            <span />
            <span />
            <span />
            <strong />
          </div>
        </div>
        <p className="auth-kicker">Access limited</p>
        <h1 id="unauthorized-title">This area needs different permissions.</h1>
        <p className="auth-subtitle">{message}</p>
        <Link className="auth-button auth-link-button" to={getDefaultRedirect()}>
          Go to my dashboard
        </Link>
      </section>
    </main>
  );
}

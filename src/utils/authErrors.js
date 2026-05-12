export function getFriendlyAuthError(error) {
  const code = error?.code;

  if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
    return "The email or password is incorrect.";
  }

  if (code === "auth/user-not-found") {
    return "No account was found with this email.";
  }

  if (code === "auth/email-already-in-use") {
    return "An account already exists with this email.";
  }

  if (code === "auth/network-request-failed") {
    return "Network error. Please check your connection and try again.";
  }

  if (code === "permission-denied") {
    return "You do not have permission to access this account data.";
  }

  return "Something went wrong. Please try again.";
}

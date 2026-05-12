const ErrorScreen = ({ message = "Something went wrong.", onRetry }) => (
  <div style={wrapperStyle}>
    <div style={iconStyle}>⚠️</div>
    <p style={titleStyle}>Oops!</p>
    <p style={messageStyle}>{message}</p>
    {onRetry && (
      <button
        style={retryButtonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#ea6c00")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#f97316")}
        onClick={onRetry}
      >
        Try Again
      </button>
    )}
  </div>
);

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "200px",
  gap: "10px",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  padding: "40px 24px",
  textAlign: "center",
};

const iconStyle = {
  fontSize: "40px",
};

const titleStyle = {
  margin: 0,
  fontSize: "20px",
  fontWeight: "700",
  color: "#2c3e50",
};

const messageStyle = {
  margin: 0,
  fontSize: "14px",
  color: "#7f8c8d",
  maxWidth: "300px",
};

const retryButtonStyle = {
  marginTop: "8px",
  backgroundColor: "#f97316",
  color: "white",
  border: "none",
  padding: "10px 24px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "700",
  transition: "background-color 0.2s ease",
};

export default ErrorScreen;
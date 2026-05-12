const LoadingSpinner = ({ message = "Loading..." }) => (
  <div style={wrapperStyle}>
    <div style={spinnerStyle} />
    <p style={messageStyle}>{message}</p>
  </div>
);

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "200px",
  gap: "16px",
};

const spinnerStyle = {
  width: "40px",
  height: "40px",
  border: "4px solid #e8eaed",
  borderTop: "4px solid #f97316",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

const messageStyle = {
  margin: 0,
  fontSize: "15px",
  color: "#7f8c8d",
  fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

if (!document.getElementById("spinner-keyframes")) {
  const style = document.createElement("style");
  style.id = "spinner-keyframes";
  style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
}

export default LoadingSpinner;
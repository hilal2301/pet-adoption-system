import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/useAuth";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorScreen from "../components/ErrorScreen";
import { db } from "../firebase";

const getStatusStyle = (status) => {
  const approved = status === "Onaylandı";
  return {
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    backgroundColor: approved ? "#fff4ee" : "#fef9ee",
    color: approved ? "#f97316" : "#b45309",
    border: `1px solid ${approved ? "#fdba74" : "#fcd34d"}`,
    display: "inline-block",
  };
};
const getStatusLabel = (status) => {
  if (status === "Onaylandı") return "Approved";
  if (status === "Beklemede") return "Pending";
  return status || "Unknown";
};

const StaffDashboard = () => {
  const { user, loading } = useAuth();
  const [applications, setApplications] = useState([]);
  const [appLoading, setAppLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      const snapshot = await getDocs(collection(db, "Uygulamalar"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setApplications(data);
      setAppLoading(false);
    };
    fetchApplications();
  }, []);

  if (loading) return <p style={pageMessageStyle}>Loading...</p>;
  if (!user) return <p style={pageMessageStyle}>Please sign in to continue.</p>;

  const mainStyle = {
  ...mainContentStyle,
  marginLeft: isMobile ? "0" : "270px",
  padding: isMobile ? "20px 16px" : "40px",
  paddingTop: isMobile ? "76px" : "40px", 
};

  return (
    <div style={pageWrapperStyle}>
      <Navbar />
      <main style={mainStyle}>
        <div style={headerSectionStyle}>
          <h2 style={titleStyle}>📋 Adoption Requests</h2>
          <p style={subtitleStyle}>
            Welcome, <strong>{user.email}</strong>! Manage incoming adoption requests below.
          </p>
        </div>

        <div style={tableContainerStyle}>
          {isMobile ? (
            // Mobile: card list instead of table
            appLoading ? (
              <p style={{ color: "#7f8c8d" }}>Loading...</p>
            ) : applications.length === 0 ? (
              <p style={{ color: "#7f8c8d" }}>No applications yet.</p>
            ) : (
              applications.map((app) => (
                <div key={app.id} style={mobileCardStyle}>
                  <div style={mobileCardRowStyle}>
                    <span style={mobileLabelStyle}>Animal</span>
                    <span style={mobileValueStyle}>{app["evcil hayvan"]}</span>
                  </div>
                  <div style={mobileCardRowStyle}>
                    <span style={mobileLabelStyle}>Applicant</span>
                    <span style={mobileValueStyle}>{app["Başvuru Başkanı"]}</span>
                  </div>
                  <div style={mobileCardRowStyle}>
                    <span style={mobileLabelStyle}>Status</span>
                    <span style={getStatusStyle(app.Durum)}>
                      {getStatusLabel(app.Durum)}
                    </span>
                  </div>
                </div>
              ))
            )
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr style={tableHeaderRowStyle}>
                  <th style={tableHeaderStyle}>Animal</th>
                  <th style={tableHeaderStyle}>Applicant</th>
                  <th style={tableHeaderStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {appLoading ? (
                  <tr>
                    <td colSpan="3" style={tableCellStyle}>Loading...</td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={tableCellStyle}>No applications found.</td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} style={tableRowStyle}>
                      <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                        {app["evcil hayvan"]}
                      </td>
                      <td style={tableCellStyle}>{app["Başvuru Başkanı"]}</td>
                      <td style={tableCellStyle}>
                        <span style={getStatusStyle(app.Durum)}>
                          {getStatusLabel(app.Durum)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

const pageWrapperStyle = {
  backgroundColor: "#f4f6f9",
  minHeight: "100vh",
  fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const pageMessageStyle = {
  padding: "24px",
  fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const mainContentStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const headerSectionStyle = {
  borderBottom: "2px solid #f97316",
  paddingBottom: "20px",
};

const titleStyle = {
  margin: 0,
  fontSize: "28px",
  color: "#f97316", 
  fontWeight: "700",
};

const subtitleStyle = {
  margin: "10px 0 0 0",
  fontSize: "16px",
  color: "#7f8c8d",
};

const tableContainerStyle = {
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  padding: "20px",
  overflowX: "auto",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "15px",
};

const tableHeaderRowStyle = {
  backgroundColor: "#f8f9fa",
  borderBottom: "2px solid #e1e8ed",
};

const tableHeaderStyle = {
  padding: "15px",
  textAlign: "left",
  color: "#f97316",
  fontWeight: "700",
  textTransform: "uppercase",
  fontSize: "12px",
  letterSpacing: "1px",
};

const tableRowStyle = {
  borderBottom: "1px solid #e1e8ed",
};

const tableCellStyle = {
  padding: "15px",
  color: "#2c3e50",
};

const mobileCardStyle = {
  backgroundColor: "#fafafa",
  border: "1px solid #e8eaed",
  borderRadius: "10px",
  padding: "14px",
  marginBottom: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const mobileCardRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const mobileLabelStyle = {
  fontSize: "12px",
  color: "#7f8c8d",
  textTransform: "uppercase",
  fontWeight: "600",
  letterSpacing: "0.5px",
};

const mobileValueStyle = {
  fontSize: "14px",
  color: "#2c3e50",
  fontWeight: "500",
};

export default StaffDashboard;
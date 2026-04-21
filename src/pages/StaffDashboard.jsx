import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";

import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";



const statusBadgeStyle = (status) => ({

  padding: "5px 12px",

  borderRadius: "20px",

  fontSize: "12px",

  fontWeight: "bold",

  textTransform: "uppercase",

  backgroundColor: status === "Onaylandı" ? "#1cc88a" : "#f6c23e",

  color: status === "Onaylandı" ? "white" : "#34495e",

  display: "inline-block",

});



const StaffDashboard = () => {

  const { user, loading } = useAuth();

  const [applications, setApplications] = useState([]);

  const [appLoading, setAppLoading] = useState(true);



  useEffect(() => {

    const fetchApplications = async () => {

      const snapshot = await getDocs(collection(db, "Uygulamalar"));

      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setApplications(data);

      setAppLoading(false);

    };

    fetchApplications();

  }, []);



  if (loading) return <p>Yükleniyor...</p>;

  if (!user) return <p>Lütfen giriş yapın.</p>;



  return (

    <div style={pageWrapperStyle}>

      <Navbar />

      <main style={mainContentStyle}>

        <div style={headerSectionStyle}>

          <h2 style={titleStyle}>📋 Sahiplendirme Talepleri</h2>

          <p style={subtitleStyle}>Hoş geldin, {user.email}! Gelen talepleri buradan yönetebilirsin.</p>

        </div>

        <div style={tableContainerStyle}>

          <table style={tableStyle}>

            <thead>

              <tr style={tableHeaderRowStyle}>

                <th style={tableHeaderStyle}>Hayvan</th>

                <th style={tableHeaderStyle}>Başvuran</th>

                <th style={tableHeaderStyle}>Durum</th>

              </tr>

            </thead>

            <tbody>

              {appLoading ? (

                <tr><td colSpan="3">Yükleniyor...</td></tr>

              ) : applications.map(app => (

                <tr key={app.id} style={tableRowStyle}>

                  <td style={{ ...tableCellStyle, fontWeight: "bold" }}>{app["evcil hayvan"]}</td>

                  <td style={tableCellStyle}>{app["Başvuru Başkanı"]}</td>

                  <td style={tableCellStyle}>

                    <span style={statusBadgeStyle(app.Durum)}>{app.Durum}</span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

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

const mainContentStyle = {

  marginLeft: "270px",

  padding: "40px",

  display: "flex",

  flexDirection: "column",

  gap: "30px",

};

const headerSectionStyle = {

  borderBottom: "2px solid #e1e8ed",

  paddingBottom: "20px",

};

const titleStyle = {

  margin: 0,

  fontSize: "28px",

  color: "#2c3e50",

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

  overflow: "hidden",

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

  color: "#34495e",

  fontWeight: "600",

  textTransform: "uppercase",

  fontSize: "13px",

  letterSpacing: "1px",

};

const tableRowStyle = {

  borderBottom: "1px solid #e1e8ed",

};

const tableCellStyle = {

  padding: "15px",

  color: "#2c3e50",

};



export default StaffDashboard;
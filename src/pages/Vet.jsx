import AdminSidebar from '../components/AdminSidebar';

const Vet = () => {
    // Veteriner için tamamen operasyonel sahte veriler
    const activePatients = [
        { id: 1, petName: "Pamuk", type: "Kedi", owner: "Hilal", complaint: "Yıllık Aşı", room: "Muayene-1" },
        { id: 2, petName: "Zeytin", type: "Köpek", owner: "Ahmet", complaint: "Pati Yaralanması", room: "Cerrahi" },
        { id: 3, petName: "Bulut", type: "Kuş", owner: "Sude", complaint: "Göz Enfeksiyonu", room: "Muayene-2" },
    ];

    return (
        <div style={pageWrapperStyle}>
            <AdminSidebar />

            <main style={mainContentStyle}>
                {/* Üst Başlık */}
                <div style={headerSectionStyle}>
                    <div>
                        <h2 style={titleStyle}>👨‍⚕️ Veteriner Operasyon Merkezi</h2>
                        <p style={subtitleStyle}>Klinikteki güncel durum ve tıbbi müdahaleler.</p>
                    </div>
                </div>

                {/* Veteriner Odaklı Özet Kartları */}
                <div style={statsContainerStyle}>
                    <div style={statCardStyle('#6366f1')}>
                        <span style={statLabelStyle}>🏥 Muayene Odaları</span>
                        <h3 style={statValueStyle}>3 Aktif</h3>
                    </div>
                    <div style={statCardStyle('#10b981')}>
                        <span style={statLabelStyle}>🐾 Sahiplendirme Bekleyen</span>
                        <h3 style={statValueStyle}>12 Dostumuz</h3>
                    </div>
                    <div style={statCardStyle('#f59e0b')}>
                        <span style={statLabelStyle}>🚑 Acil Çağrı</span>
                        <h3 style={statValueStyle}>Yok</h3>
                    </div>
                </div>

                {/* Aktif Hastalar / Muayeneler Listesi */}
                <div style={tableContainerStyle}>
                    <div style={tableHeaderAreaStyle}>
                        <h3 style={{ margin: 0, color: '#1e293b' }}>Aktif Hasta Takibi</h3>
                        <span style={liveBadgeStyle}>● CANLI TAKİP</span>
                    </div>

                    <table style={tableStyle}>
                        <thead>
                            <tr style={tableHeaderRowStyle}>
                                <th style={tableHeaderStyle}>Hasta Adı</th>
                                <th style={tableHeaderStyle}>Tür</th>
                                <th style={tableHeaderStyle}>Sahibi</th>
                                <th style={tableHeaderStyle}>Şikayet / Sebep</th>
                                <th style={tableHeaderStyle}>Bölüm</th>
                                <th style={tableHeaderStyle}>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activePatients.map((patient) => (
                                <tr key={patient.id} style={tableRowStyle}>
                                    <td style={{ ...tableCellStyle, fontWeight: 'bold' }}>{patient.petName}</td>
                                    <td style={tableCellStyle}>{patient.type}</td>
                                    <td style={tableCellStyle}>{patient.owner}</td>
                                    <td style={{ ...tableCellStyle, fontStyle: 'italic', color: '#64748b' }}>{patient.complaint}</td>
                                    <td style={tableCellStyle}>
                                        <span style={roomBadgeStyle}>{patient.room}</span>
                                    </td>
                                    <td style={tableCellStyle}>
                                        <button style={medicalRecordButtonStyle}>Tıbbi Kayıt Aç</button>
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

// --- STİLLER ---

const pageWrapperStyle = { display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' };
const mainContentStyle = { marginLeft: '260px', padding: '40px', flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' };
const headerSectionStyle = { borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' };
const titleStyle = { margin: 0, fontSize: '26px', color: '#0f172a', fontWeight: '800' };
const subtitleStyle = { margin: '5px 0 0 0', color: '#64748b', fontSize: '15px' };

const statsContainerStyle = { display: 'flex', gap: '20px' };
const statCardStyle = (color) => ({
    flex: 1, backgroundColor: 'white', padding: '24px', borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderTop: `4px solid ${color}`
});
const statLabelStyle = { color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' };
const statValueStyle = { margin: '10px 0 0 0', fontSize: '22px', color: '#1e293b', fontWeight: '800' };

const tableContainerStyle = { backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', padding: '25px' };
const tableHeaderAreaStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };

const liveBadgeStyle = { color: '#ef4444', fontSize: '12px', fontWeight: '800', letterSpacing: '1px' };

const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const tableHeaderRowStyle = { borderBottom: '2px solid #f1f5f9' };
const tableHeaderStyle = { padding: '15px', textAlign: 'left', color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' };
const tableRowStyle = { borderBottom: '1px solid #f1f5f9' };
const tableCellStyle = { padding: '18px 15px', color: '#334155', fontSize: '14px' };

const roomBadgeStyle = {
    backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#475569'
};

const medicalRecordButtonStyle = {
    backgroundColor: 'transparent', border: '1px solid #6366f1', padding: '6px 12px',
    borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#6366f1'
};

export default Vet;
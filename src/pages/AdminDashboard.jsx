import AdminSidebar from '../components/AdminSidebar'; // Import ettiğinden emin ol

const AdminDashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            {/* 1. Sol tarafa Sidebar'ı yerleştiriyoruz */}
            <AdminSidebar />

            {/* 2. Sağ taraftaki ana içerik alanı */}
            <div className="admin-container" style={{ marginLeft: '270px', padding: '20px', flex: 1 }}>
                <h1>Admin Kontrol Paneli</h1>

                <div className="stats-grid" style={gridStyle}>
                    <div className="card" style={cardStyle("#3498db")}>
                        <h3>10</h3>
                        <p>Toplam Kullanıcı</p>
                    </div>
                    <div className="card" style={cardStyle("#e67e22")}>
                        <h3>5</h3>
                        <p>Bekleyen Sahiplendirmeler</p>
                    </div>
                    {/* İstersen yeni kartlar ekleyebilirsin */}
                    <div className="card" style={cardStyle("#2ecc71")}>
                        <h3>12</h3>
                        <p>Sahiplendirilen Hayvanlar</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Basit stil tanımlamaları
const gridStyle = {
    display: 'flex',
    gap: '20px',
    marginTop: '20px'
};

const cardStyle = (bgColor) => ({
    backgroundColor: bgColor,
    color: 'white',
    padding: '20px',
    borderRadius: '12px',
    minWidth: '200px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
});

export default AdminDashboard;
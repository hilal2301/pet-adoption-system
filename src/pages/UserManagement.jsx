import AdminSidebar from '../components/AdminSidebar';

const UserManagement = () => {
    // 1. Sahte kullanıcı verileri (Mock Data)
    const dummyUsers = [
        { id: 1, name: "Hilal", email: "hilal@example.com", role: "Admin" },
        { id: 2, name: "Ahmet", email: "ahmet@test.com", role: "User" },
        { id: 3, name: "Ayşe", email: "ayse@pet.com", role: "Staff" },
    ];

    return (
        <div style={pageWrapperStyle}>
            {/* Sol Taraf - Sabit Sidebar */}
            <AdminSidebar />

            {/* Sağ Taraf - Ana İçerik Alanı */}
            <main style={mainContentStyle}>
                <div style={headerSectionStyle}>
                    <h2 style={titleStyle}>👥 Kullanıcı Yönetimi</h2>
                    <p style={subtitleStyle}>Sistemdeki kayıtlı tüm kullanıcıları buradan yönetebilir, rollerini düzenleyebilirsiniz.</p>
                </div>

                {/* Tablo Konteyneri (Gölge ve Beyaz Arka Plan İçin) */}
                <div style={tableContainerStyle}>
                    <table style={tableStyle}>
                        <thead>
                            <tr style={tableHeaderRowStyle}>
                                <th style={tableHeaderStyle}>ID</th>
                                <th style={tableHeaderStyle}>Kullanıcı Adı</th>
                                <th style={tableHeaderStyle}>E-posta</th>
                                <th style={tableHeaderStyle}>Rol</th>
                                <th style={tableHeaderStyle}>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyUsers.map((user) => (
                                <tr key={user.id} style={tableRowStyle}>
                                    <td style={tableCellStyle}>{user.id}</td>
                                    <td style={{ ...tableCellStyle, fontWeight: 'bold' }}>{user.name}</td>
                                    <td style={tableCellStyle}>{user.email}</td>
                                    <td style={tableCellStyle}>
                                        <span style={roleBadgeStyle(user.role)}>{user.role}</span>
                                    </td>
                                    <td style={tableCellStyle}>
                                        <div style={actionButtonsContainer}>
                                            <button style={editButtonStyle}> Düzenle</button>
                                            <button style={deleteButtonStyle}> Sil</button>
                                        </div>
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

// --- ✨ YENİ VE DÜZELTİLMİŞ STİLLER (RETRO-MODERN) ---

// 1. Sayfa Temeli (Arka Plan Hafif Gri, Yazılar Daha Net)
const pageWrapperStyle = {
    display: 'flex',
    backgroundColor: '#f4f6f9', // Hafif gri arka plan (beyaz kartları öne çıkarır)
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' // Daha modern font
};

// 2. Ana İçerik Alanı (Sidebar'dan Boşluk)
const mainContentStyle = {
    marginLeft: '270px',
    padding: '40px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
};

// 3. Başlık Bölümü
const headerSectionStyle = {
    borderBottom: '2px solid #e1e8ed',
    paddingBottom: '20px'
};

const titleStyle = {
    margin: 0,
    fontSize: '28px',
    color: '#2c3e50',
    fontWeight: '700'
};

const subtitleStyle = {
    margin: '10px 0 0 0',
    fontSize: '16px',
    color: '#7f8c8d'
};

// 4. Tablo Konteyneri (Beyaz Kart, Yumuşak Gölge)
const tableContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)', // Çok yumuşak gölge
    padding: '20px',
    overflow: 'hidden'
};

// 5. Tablo Stilleri
const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '15px'
};

const tableHeaderRowStyle = {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #e1e8ed'
};

const tableHeaderStyle = {
    padding: '15px',
    textAlign: 'left',
    color: '#34495e',
    fontWeight: '600',
    textTransform: 'uppercase', // Başlıkları büyük harf yap
    fontSize: '13px',
    letterSpacing: '1px'
};

const tableRowStyle = {
    borderBottom: '1px solid #e1e8ed',
    transition: 'background-color 0.2s'
};

const tableCellStyle = {
    padding: '15px',
    color: '#2c3e50'
};

// 6. Rol Rozetleri (Badge - Daha Pastel Renkler)
const roleBadgeStyle = (role) => {
    let bgColor = '#e0e0e0'; // Varsayılan (User)
    let color = '#7f8c8d';

    if (role === 'Admin') {
        bgColor = '#4e73df'; // Kurumsal Mavi
        color = 'white';
    } else if (role === 'Staff') {
        bgColor = '#1cc88a'; // Canlı Yeşil
        color = 'white';
    } else if (role === 'User') {
        bgColor = '#f6c23e'; // Sıcak Sarı
        color = '#34495e';
    }

    return {
        padding: '5px 12px',
        borderRadius: '20px', // Tam yuvarlak
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: bgColor,
        color: color,
        display: 'inline-block'
    };
};

// 7. İşlem Butonları (Daha Temiz ve Pastel)
const actionButtonsContainer = {
    display: 'flex',
    gap: '8px'
};

const baseButtonStyle = {
    border: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'opacity 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
};

const editButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#36b9cc', // Açık Mavi
    color: 'white',
};

const deleteButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#e74a3b', // Pastel Kırmızı
    color: 'white',
};

export default UserManagement;
import React from 'react';
import AdminSidebar from '../components/AdminSidebar';

const UserManagement = () => {
    // 1. Sahte kullanıcı verileri (Mock Data)
    const dummyUsers = [
        { id: 1, name: "Hilal", email: "hilal@example.com", role: "Admin" },
        { id: 2, name: "Ahmet", email: "ahmet@test.com", role: "User" },
        { id: 3, name: "Ayşe", email: "ayse@pet.com", role: "Staff" },
    ];

    // Bunları dummyUsers tanımının hemen altına ekleyebilirsin
    const [searchTerm, setSearchTerm] = React.useState("");
    const [filterRole, setFilterRole] = React.useState("Hepsi");

    const filteredUsers = dummyUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === "Hepsi" || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        const handleCloseModal = () => {
            setIsModalOpen(false);
            setSelectedUser(null);
        };

        // BURAYA EKLE:
        const handleDeleteClick = (user) => {
            const confirmDelete = window.confirm(`🐾 Are you sure you want to delete ${user.name}? This action cannot be undone.`);
            if (confirmDelete) {
                alert("Success! The user has been removed from the system.");
            }
        };
        setIsModalOpen(false);
        setSelectedUser(null);
    };



    return (
        <div style={pageWrapperStyle}>
            {/* Sol Taraf - Sabit Sidebar */}
            <AdminSidebar />

            {/* Sağ Taraf - Ana İçerik Alanı */}
            <main style={mainContentStyle}>
                <div style={headerSectionStyle}>
                    {/* Arama ve Filtreleme Alanı */}
                    <div style={filterSectionStyle}>
                        <input
                            type="text"
                            placeholder="İsim veya e-posta ile ara..."
                            style={searchInputStyle}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            style={selectInputStyle}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="Hepsi">Tüm Roller</option>
                            <option value="Admin">Admin</option>
                            <option value="Staff">Staff</option>
                            <option value="User">User</option>
                        </select>
                    </div>
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
                            {filteredUsers.map((user) => (
                                <tr key={user.id} style={tableRowStyle}>
                                    <td style={tableCellStyle}>{user.id}</td>
                                    <td style={{ ...tableCellStyle, fontWeight: 'bold' }}>{user.name}</td>
                                    <td style={tableCellStyle}>{user.email}</td>
                                    <td style={tableCellStyle}>
                                        <span style={roleBadgeStyle(user.role)}>{user.role}</span>
                                    </td>
                                    <td style={tableCellStyle}>
                                        <div style={actionButtonsContainer}>
                                            <button
                                                style={editButtonStyle}
                                                onClick={() => handleEditClick(user)} // user objesini parametre olarak gönderiyoruz
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                style={deleteButtonStyle}
                                                onClick={() => handleDeleteClick(user)}
                                            >
                                                🗑️ Delete
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            {isModalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h3 style={{ color: '#ff8c42', marginBottom: '20px' }}>🐾 Kullanıcıyı Düzenle</h3>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={labelStyle}>Kullanıcı Adı</label>
                            <input style={modalInputStyle} defaultValue={selectedUser?.name} disabled />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={labelStyle}>Rol Değiştir</label>
                            <select style={modalInputStyle} defaultValue={selectedUser?.role}>
                                <option value="Admin">Admin</option>
                                <option value="Staff">Staff</option>
                                <option value="User">User</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={handleCloseModal} style={cancelButtonStyle}>Vazgeç</button>

                            <button
                                onClick={() => {
                                    alert("Success! User has been updated."); // İngilizce yaptık
                                    handleCloseModal();
                                }}
                                style={saveButtonStyle}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- ✨ YENİ VE DÜZELTİLMİŞ STİLLER (RETRO-MODERN) ---

// 1. Sayfa Temeli (Arka Plan Hafif Gri, Yazılar Daha Net)
const pageWrapperStyle = {
    display: 'flex',
    backgroundColor: '#fffaf5', // Sıcak krem tonu
    minHeight: '100vh',
    fontFamily: '"Quicksand", "Segoe UI", sans-serif'
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
    color: '#ff8c42', // Turuncu tonu
    fontWeight: '800'
};

const subtitleStyle = {
    margin: '10px 0 0 0',
    fontSize: '16px',
    color: '#7f8c8d'
};

// 4. Tablo Konteyneri (Beyaz Kart, Yumuşak Gölge)
const tableContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '20px', // Daha yumuşak köşeler
    boxShadow: '0 8px 16px rgba(255, 140, 66, 0.05)', // Hafif turuncu gölge
    padding: '20px',
    overflow: 'hidden',
    border: '1px solid #ffe5d9'
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
const filterSectionStyle = {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px'
};

const searchInputStyle = {
    flex: 2,
    padding: '12px 15px',
    borderRadius: '25px', // Tam yuvarlak
    border: '2px solid #ffe5d9',
    fontSize: '14px',
    outline: 'none'
};

const selectInputStyle = {
    flex: 1,
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #e1e8ed',
    backgroundColor: 'white',
    fontSize: '14px',
    cursor: 'pointer'
};

const modalOverlayStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '25px',
    width: '400px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
};

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#5d4037'
};

const modalInputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '12px',
    border: '1px solid #ffe5d9',
    outline: 'none'
};

const saveButtonStyle = {
    backgroundColor: '#ff8c42',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '15px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const cancelButtonStyle = {
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '15px',
    cursor: 'pointer'
};
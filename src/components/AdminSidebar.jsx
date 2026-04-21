import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation(); // Hangi sayfada olduğumuzu anlamak için

    // Aktif sayfayı belirleme fonksiyonu
    const isActive = (path) => location.pathname === path;

    return (
        <aside style={sidebarStyle}>
            {/* Logo Alanı */}
            <div style={logoContainerStyle}>
                <div style={logoIconStyle}>🐾</div>
                <h2 style={logoTextStyle}>PetAdmin</h2>
            </div>

            <nav style={navStyle}>
                <p style={sectionTitleStyle}>ANA MENÜ</p>

                <Link to="/admin" style={linkStyle(isActive('/admin'))}>
                    <span style={iconStyle}>📊</span> Dashboard
                </Link>

                <Link to="/admin/users" style={linkStyle(isActive('/admin/users'))}>
                    <span style={iconStyle}>👥</span> Kullanıcı Yönetimi
                </Link>

                <Link to="/admin/requests" style={linkStyle(isActive('/admin/requests'))}>
                    <span style={iconStyle}>📨</span> Talepler
                </Link>

                <div style={dividerStyle} />

                <p style={sectionTitleStyle}>SİSTEM</p>

                <Link to="/dashboard" style={exitLinkStyle}>
                    <span style={iconStyle}>🏠</span> Uygulamaya Dön
                </Link>
            </nav>

            {/* Alt Kısım - Kullanıcı Bilgisi (Opsiyonel) */}
            <div style={sidebarFooterStyle}>
                <div style={userAvatarStyle}>H</div>
                <div style={userInfoStyle}>
                    <span style={userNameStyle}>Hilal</span>
                    <span style={userRoleStyle}>Admin</span>
                </div>
            </div>
        </aside>
    );
};

// --- ✨ ESTETİK STİLLER ---

const sidebarStyle = {
    width: '260px',
    height: '100vh',
    backgroundColor: '#1e293b', // Daha yumuşak, laciverte çalan bir koyu gri
    color: '#f8fafc',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    boxShadow: '4px 0 10px rgba(0,0,0,0.05)',
    fontFamily: '"Inter", "Segoe UI", sans-serif'
};

const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '40px',
    paddingLeft: '10px'
};

const logoIconStyle = {
    fontSize: '24px',
    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
    padding: '8px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
};

const logoTextStyle = {
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '0.5px',
    margin: 0,
    background: 'linear-gradient(to right, #fff, #cbd5e1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
};

const navStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
};

const sectionTitleStyle = {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: '1.5px',
    marginBottom: '10px',
    marginTop: '20px',
    paddingLeft: '12px'
};

const linkStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: active ? '#fff' : '#94a3b8',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    padding: '12px 15px',
    borderRadius: '12px',
    backgroundColor: active ? '#334155' : 'transparent',
    transition: 'all 0.2s ease',
    borderLeft: active ? '4px solid #6366f1' : '4px solid transparent'
});

const exitLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '12px 15px',
    borderRadius: '12px',
    marginTop: 'auto', // En alta iter
    transition: 'color 0.2s'
};

const iconStyle = {
    fontSize: '18px',
    opacity: 0.8
};

const dividerStyle = {
    height: '1px',
    backgroundColor: '#334155',
    margin: '20px 10px'
};

const sidebarFooterStyle = {
    marginTop: 'auto',
    padding: '15px',
    backgroundColor: '#334155',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
};

const userAvatarStyle = {
    width: '35px',
    height: '35px',
    borderRadius: '10px',
    backgroundColor: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: 'white'
};

const userInfoStyle = {
    display: 'flex',
    flexDirection: 'column'
};

const userNameStyle = {
    fontSize: '14px',
    fontWeight: '600'
};

const userRoleStyle = {
    fontSize: '11px',
    color: '#94a3b8'
};

export default AdminSidebar;
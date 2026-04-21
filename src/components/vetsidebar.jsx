import { Link, useLocation } from 'react-router-dom';

const VetSidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <aside style={sidebarStyle}>
            {/* Logo Alanı */}
            <div style={logoContainerStyle}>
                <div style={logoIconStyle}>🩺</div>
                <h2 style={logoTextStyle}>VetPanel</h2>
            </div>

            <nav style={navStyle}>
                <p style={sectionTitleStyle}>KLİNİK YÖNETİMİ</p>

                <Link to="/vet" style={linkStyle(isActive('/vet'))}>
                    <span style={iconStyle}>🏥</span> Hasta Takibi
                </Link>

                <Link to="/vet/appointments" style={linkStyle(isActive('/vet/appointments'))}>
                    <span style={iconStyle}>📅</span> Randevular
                </Link>

                <Link to="/vet/medical-records" style={linkStyle(isActive('/vet/medical-records'))}>
                    <span style={iconStyle}>📋</span> Tıbbi Kayıtlar
                </Link>

                <div style={dividerStyle} />

                <p style={sectionTitleStyle}>BARINAK</p>

                <Link to="/vet/adoption-requests" style={linkStyle(isActive('/vet/adoption-requests'))}>
                    <span style={iconStyle}>🐾</span> Sahiplendirme
                </Link>

                <Link to="/dashboard" style={exitLinkStyle}>
                    <span style={iconStyle}>🏠</span> Uygulamaya Dön
                </Link>
            </nav>

            {/* Veteriner Profil Kartı */}
            <div style={sidebarFooterStyle}>
                <div style={userAvatarStyle}>V</div>
                <div style={userInfoStyle}>
                    <span style={userNameStyle}>Hilal</span>
                    <span style={userRoleStyle}>Baş Veteriner</span>
                </div>
            </div>
        </aside>
    );
};

// --- ✨ VETERİNER SİDEBAR STİLLERİ ---

const sidebarStyle = {
    width: '260px',
    height: '100vh',
    backgroundColor: '#0f172a', // Daha derin bir gece mavisi
    color: '#f8fafc',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
    fontFamily: '"Inter", sans-serif',
    zIndex: 1000
};

const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '40px',
    paddingLeft: '10px'
};

const logoIconStyle = {
    fontSize: '22px',
    background: 'linear-gradient(135deg, #10b981, #3b82f6)',
    padding: '8px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
};

const logoTextStyle = {
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '0.5px',
    margin: 0,
    color: '#fff'
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
    color: '#475569',
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
    fontSize: '14px',
    fontWeight: '500',
    padding: '12px 15px',
    borderRadius: '12px',
    backgroundColor: active ? '#1e293b' : 'transparent',
    transition: 'all 0.2s ease',
    borderLeft: active ? '4px solid #10b981' : '4px solid transparent'
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
    marginTop: 'auto',
    transition: 'color 0.2s'
};

const iconStyle = {
    fontSize: '18px',
    opacity: 0.9
};

const dividerStyle = {
    height: '1px',
    backgroundColor: '#1e293b',
    margin: '20px 10px'
};

const sidebarFooterStyle = {
    marginTop: 'auto',
    padding: '15px',
    backgroundColor: '#1e293b',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
};

const userAvatarStyle = {
    width: '35px',
    height: '35px',
    borderRadius: '10px',
    backgroundColor: '#10b981',
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

export default VetSidebar;
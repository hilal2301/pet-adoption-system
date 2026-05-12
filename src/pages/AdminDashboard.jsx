import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AdminSidebar from '../components/AdminSidebar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    // GRAFİK VERİLERİ
    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Adoptions',
                data: [3, 5, 2, 8, 7, 12, 9],
                backgroundColor: '#ff8c42',
                borderRadius: 10,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
    };

    return (
        <div style={pageWrapperStyle}>
            <AdminSidebar />

            <main style={mainContentStyle}>
                <div style={headerSectionStyle}>
                    <h1 style={titleStyle}>🐾 Admin Control Panel</h1>
                    <p style={subtitleStyle}>Welcome back! Here is what's happening with your shelter today.</p>
                </div>

                {/* İstatistik Kartları */}
                <div style={gridStyle}>
                    <div style={cardStyle("#ff8c42")}>
                        <h3 style={cardValueStyle}>10</h3>
                        <p style={cardLabelStyle}>Total Users</p>
                    </div>
                    <div style={cardStyle("#e67e22")}>
                        <h3 style={cardValueStyle}>5</h3>
                        <p style={cardLabelStyle}>Pending Adoptions</p>
                    </div>
                    <div style={cardStyle("#7fb069")}>
                        <h3 style={cardValueStyle}>12</h3>
                        <p style={cardLabelStyle}>Adopted Pets</p>
                    </div>
                </div>

                {/* Grafik Alanı */}
                <div style={recentActivityStyle}>
                    <h3 style={{ color: '#5d4037', marginBottom: '5px' }}>Weekly Adoption Statistics 📈</h3>
                    <div style={{ height: '300px', marginTop: '20px' }}>
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- ✨ STİLLER (Fonksiyon Dışında) ---

const pageWrapperStyle = {
    display: 'flex',
    backgroundColor: '#fffaf5',
    minHeight: '100vh',
    fontFamily: '"Quicksand", sans-serif'
};

const mainContentStyle = {
    marginLeft: '270px',
    padding: '40px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
};

const headerSectionStyle = {
    marginBottom: '10px'
};

const titleStyle = {
    margin: 0,
    fontSize: '32px',
    color: '#ff8c42',
    fontWeight: '800'
};

const subtitleStyle = {
    color: '#8d7b70',
    fontSize: '16px',
    marginTop: '5px'
};

const gridStyle = {
    display: 'flex',
    gap: '25px',
    flexWrap: 'wrap'
};

const cardStyle = (accentColor) => ({
    backgroundColor: 'white',
    flex: 1,
    minWidth: '220px',
    padding: '25px',
    borderRadius: '25px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.02)',
    borderLeft: `8px solid ${accentColor}`,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
});

const cardValueStyle = {
    fontSize: '36px',
    margin: '0',
    color: '#2c3e50',
    fontWeight: '800'
};

const cardLabelStyle = {
    fontSize: '14px',
    color: '#7f8c8d',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: '5px'
};

const recentActivityStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '25px',
    marginTop: '20px',
    border: '1px solid #ffe5d9'
};

export default AdminDashboard;
import React from 'react';

const Dashboard = ({ onNavigate }) => {
  const userStats = {
    amcPlans: 3,
    mplPlans: 2,
    totalSavings: 15200,
    activeAlerts: 2
  };

  const alerts = [
    { type: 'warning', message: 'Washing Machine AMC expires in 15 days', action: 'Renew' },
    { type: 'payment', message: 'Audio MPL payment due in 7 days', action: 'Pay Now' },
    { type: 'success', message: 'AC Service completed yesterday', action: 'Rate Service' }
  ];

  const quickActions = [
    { icon: '🛠️', label: 'Raise Service', onClick: () => console.log('Opening service request...') },
    { icon: '📹', label: 'Upload Video', onClick: () => console.log('Opening video upload...') },
    { icon: '📄', label: 'Documents', onClick: () => console.log('Opening documents...') }
  ];

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>👤 Welcome, User!</h1>
        <div style={styles.navTabs}>
          <button style={styles.tabActive}>Dashboard</button>
          <button style={styles.tab} onClick={() => onNavigate('amc')}>AMC Plans</button>
          <button style={styles.tab} onClick={() => onNavigate('mpl')}>MPL Plans</button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📊 QUICK STATS</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{userStats.amcPlans}</div>
            <div style={styles.statLabel}>AMC Plans</div>
            <div style={styles.statStatus}>Active</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{userStats.mplPlans}</div>
            <div style={styles.statLabel}>MPL Plans</div>
            <div style={styles.statStatus}>Active</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>₹{userStats.totalSavings.toLocaleString()}</div>
            <div style={styles.statLabel}>Savings</div>
            <div style={styles.statStatus}>Total</div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🔔 RECENT ALERTS</h2>
        <div style={styles.alertsList}>
          {alerts.map((alert, index) => (
            <div key={index} style={{...styles.alertItem, ...styles[alert.type]}}>
              <span style={styles.alertMessage}>{alert.message}</span>
              <button style={styles.alertAction}>{alert.action}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🎯 QUICK ACTIONS</h2>
        <div style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <button key={index} style={styles.actionBtn} onClick={action.onClick}>
              <span style={styles.actionIcon}>{action.icon}</span>
              <span style={styles.actionLabel}>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  header: {
    marginBottom: '30px'
  },
  title: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '2rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  navTabs: {
    display: 'flex',
    gap: '10px',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '10px'
  },
  tab: {
    padding: '12px 24px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadius: '8px 8px 0 0',
    fontSize: '16px',
    color: '#666',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  tabActive: {
    padding: '12px 24px',
    border: 'none',
    backgroundColor: '#1976d2',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '8px 8px 0 0',
    fontSize: '16px',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)'
  },
  section: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e1e5e9'
  },
  sectionTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontWeight: '600'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px'
  },
  statCard: {
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #e1e5e9',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  statValue: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: '8px'
  },
  statLabel: {
    fontSize: '16px',
    color: '#6c757d',
    marginBottom: '8px',
    fontWeight: '500'
  },
  statStatus: {
    fontSize: '14px',
    color: '#28a745',
    fontWeight: '600',
    backgroundColor: '#d4edda',
    padding: '4px 12px',
    borderRadius: '20px',
    display: 'inline-block'
  },
  alertsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  alertItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderRadius: '8px',
    borderLeft: '4px solid #ffa000'
  },
  warning: {
    backgroundColor: '#fff3e0',
    borderLeftColor: '#ffa000'
  },
  payment: {
    backgroundColor: '#e8f5e8',
    borderLeftColor: '#4caf50'
  },
  success: {
    backgroundColor: '#e3f2fd',
    borderLeftColor: '#1976d2'
  },
  alertMessage: {
    fontSize: '14px',
    color: '#333'
  },
  alertAction: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px'
  },
  actionBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 20px',
    backgroundColor: '#f8f9fa',
    border: '2px dashed #dee2e6',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: '120px'
  },
  actionIcon: {
    fontSize: '2rem',
    marginBottom: '12px'
  },
  actionLabel: {
    fontSize: '16px',
    color: '#495057',
    fontWeight: '600'
  }
};

// Add hover effects
const addHoverEffects = () => {
  const style = document.createElement('style');
  style.textContent = `
    [style*="statCard"]:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-color: #1976d2;
    }
    
    [style*="actionBtn"]:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border-color: #1976d2;
      background-color: #e3f2fd;
    }
    
    [style*="tab"]:hover:not([style*="tabActive"]) {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    
    [style*="alertAction"]:hover {
      background-color: #1565c0;
      transform: translateY(-1px);
    }
  `;
  document.head.appendChild(style);
};

// Initialize hover effects
if (typeof document !== 'undefined') {
  addHoverEffects();
}

export default Dashboard;
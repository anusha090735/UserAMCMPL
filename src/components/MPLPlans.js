import React, { useState } from 'react';

// Mock toast notification component
const Toast = ({ message, type, onClose }) => (
  <div style={{
    ...styles.toast,
    ...(type === 'success' ? styles.toastSuccess : 
         type === 'error' ? styles.toastError : styles.toastInfo)
  }}>
    <span>{message}</span>
    <button onClick={onClose} style={styles.toastClose}>×</button>
  </div>
);

const MPLPlans = ({ onNavigate }) => {
  const [toasts, setToasts] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const mplPlans = [
    { 
      id: 1,
      name: 'TV Plan', 
      status: 'Active', 
      support: '80%', 
      paymentDue: false,
      amount: 1200,
      daysCompleted: 45,
      totalDays: 365,
      category: 'Electronics'
    },
    { 
      id: 2,
      name: 'Audio System', 
      status: 'Payment Due', 
      support: '70%', 
      paymentDue: true,
      amount: 800,
      daysCompleted: 120,
      totalDays: 365,
      category: 'Electronics'
    },
    { 
      id: 3,
      name: 'Laptop Plan', 
      status: 'Active', 
      support: '85%', 
      paymentDue: false,
      amount: 2500,
      daysCompleted: 200,
      totalDays: 365,
      category: 'Electronics'
    },
    { 
      id: 4,
      name: 'Refrigerator', 
      status: 'Expired', 
      support: '0%', 
      paymentDue: false,
      amount: 1500,
      daysCompleted: 365,
      totalDays: 365,
      category: 'Appliances'
    },
    { 
      id: 5,
      name: 'Washing Machine', 
      status: 'Payment Due', 
      support: '60%', 
      paymentDue: true,
      amount: 1000,
      daysCompleted: 30,
      totalDays: 365,
      category: 'Appliances'
    },
    { 
      id: 6,
      name: 'Mobile Phone', 
      status: 'Active', 
      support: '90%', 
      paymentDue: false,
      amount: 600,
      daysCompleted: 150,
      totalDays: 365,
      category: 'Electronics'
    }
  ];

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (plan) => {
    const res = await loadRazorpay();
    
    if (!res) {
      addToast('Razorpay SDK failed to load', 'error');
      return;
    }

    const options = {
      key: 'rzp_test_ioQq3JhLOeWxyd',
      amount: plan.amount * 100, // Amount in paise
      currency: 'INR',
      name: 'MPL Plans',
      description: `Payment for ${plan.name}`,
      image: '/logo.png',
      handler: function(response) {
        addToast(`Payment successful! Payment ID: ${response.razorpay_payment_id}`, 'success');
        // Update plan status in your backend here
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#1976d2'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleVideoUpload = (plan) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Simulate video upload
        addToast(`Video uploaded successfully for ${plan.name}`, 'success');
        // Here you would typically upload to your backend
        console.log('Video file:', file);
      }
    };
    
    input.click();
  };

  const handleServiceRequest = (plan) => {
    setSelectedPlan(plan);
    addToast(`Service request initiated for ${plan.name}`, 'info');
  };

  const ServiceModal = ({ plan, onClose, onSubmit }) => {
    const [serviceType, setServiceType] = useState('repair');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      addToast(`Service request submitted for ${plan.name}`, 'success');
      onSubmit();
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h3>Service Request - {plan.name}</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Service Type:</label>
              <select 
                value={serviceType} 
                onChange={(e) => setServiceType(e.target.value)}
                style={styles.select}
              >
                <option value="repair">Repair</option>
                <option value="maintenance">Maintenance</option>
                <option value="inspection">Inspection</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label>Issue Description:</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
                placeholder="Describe the issue..."
                required
              />
            </div>
            <div style={styles.modalActions}>
              <button type="button" onClick={onClose} style={styles.cancelButton}>
                Cancel
              </button>
              <button type="submit" style={styles.submitButton}>
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Filter plans based on status
  const filteredPlans = statusFilter === 'all' 
    ? mplPlans 
    : mplPlans.filter(plan => {
        if (statusFilter === 'active') return plan.status === 'Active';
        if (statusFilter === 'expired') return plan.status === 'Expired';
        if (statusFilter === 'payment-due') return plan.status === 'Payment Due';
        return true;
      });

  const activePlans = mplPlans.filter(plan => plan.status !== 'Expired');
  const duePayments = mplPlans.filter(plan => plan.paymentDue).length;
  const totalSavings = mplPlans.reduce((sum, plan) => sum + plan.amount, 0);

  return (
    <div style={styles.container}>
      {/* Toast Notifications */}
      <div style={styles.toastContainer}>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          />
        ))}
      </div>

      {/* Service Modal */}
      {selectedPlan && (
        <ServiceModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSubmit={() => setSelectedPlan(null)}
        />
      )}

      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => onNavigate('dashboard')}>
          ← Back to Dashboard
        </button>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>🔄 MY MPL PLANS ({activePlans.length})</h1>
          <div style={styles.filterDropdownContainer}>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              style={styles.filterDropdown}
            >
              <option value="all">All Plans</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="payment-due">Payment Due</option>
            </select>
          </div>
        </div>
      </div>

      {/* MPL Summary Card */}
      <div style={styles.summaryCard}>
        <div style={styles.summaryHeader}>
          <h3 style={styles.summaryTitle}>MPL Summary</h3>
        </div>
        <div style={styles.summaryStats}>
          <div style={styles.summaryStat}>
            <div style={styles.statValue}>₹{totalSavings}</div>
            <div style={styles.statLabel}>Total Savings</div>
          </div>
          <div style={styles.summaryStat}>
            <div style={styles.statValue}>{activePlans.length}</div>
            <div style={styles.statLabel}>Active Plans</div>
          </div>
          <div style={styles.summaryStat}>
            <div style={styles.statValue}>{duePayments}</div>
            <div style={styles.statLabel}>Due Payments</div>
          </div>
          <div style={styles.summaryStat}>
            <div style={styles.statValue}>3</div>
            <div style={styles.statLabel}>Categories</div>
          </div>
        </div>
      </div>

      {/* MPL Plans Grid */}
      <div style={styles.plansGrid}>
        {filteredPlans.map((plan) => (
          <div key={plan.id} style={styles.planCard}>
            <div style={styles.planHeader}>
              <div>
                <h3 style={styles.planName}>{plan.name}</h3>
                <span style={styles.planCategory}>{plan.category}</span>
              </div>
              <span style={{
                ...styles.statusBadge,
                ...(plan.status === 'Payment Due' ? styles.statusWarning : 
                     plan.status === 'Expired' ? styles.statusError : styles.statusSuccess)
              }}>
                {plan.status}
              </span>
            </div>
            <div style={styles.planDetails}>
              <div style={styles.support}>Support: {plan.support}</div>
              <div style={styles.progressBar}>
                <div style={{
                  ...styles.progressFill,
                  width: `${(plan.daysCompleted / plan.totalDays) * 100}%`,
                  backgroundColor: plan.status === 'Expired' ? '#6c757d' : '#1976d2'
                }}></div>
              </div>
              <div style={styles.daysLeft}>
                {plan.daysCompleted}/{plan.totalDays} days completed
              </div>
              <div style={styles.planAmount}>Amount: ₹{plan.amount}/month</div>
            </div>
            <div style={styles.planActions}>
              {plan.paymentDue ? (
                <button 
                  style={styles.paymentButton}
                  onClick={() => handlePayment(plan)}
                >
                  Pay Now ₹{plan.amount}
                </button>
              ) : (
                <button 
                  style={styles.serviceButton}
                  onClick={() => handleServiceRequest(plan)}
                  disabled={plan.status === 'Expired'}
                >
                  {plan.status === 'Expired' ? 'Plan Expired' : 'Service'}
                </button>
              )}
              <button 
                style={{
                  ...styles.videoButton,
                  ...(plan.status === 'Expired' && styles.disabledButton)
                }}
                onClick={() => handleVideoUpload(plan)}
                disabled={plan.status === 'Expired'}
              >
                Upload Video
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>💡 MPL Benefits</h2>
        <div style={styles.benefitsList}>
          <div style={styles.benefitItem}>✓ Monthly payment flexibility</div>
          <div style={styles.benefitItem}>✓ Support coverage decreases yearly</div>
          <div style={styles.benefitItem}>✓ Video proof for claims</div>
          <div style={styles.benefitItem}>✓ Pause/resume once per year</div>
          <div style={styles.benefitItem}>✓ 24/7 Customer support</div>
          <div style={styles.benefitItem}>✓ Quick service response</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    position: 'relative'
  },
  header: {
    marginBottom: '30px'
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '14px'
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px'
  },
  title: {
    color: '#333',
    fontSize: '28px',
    margin: 0
  },
  filterDropdownContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  filterDropdown: {
    padding: '10px 16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
    minWidth: '150px'
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '30px',
    border: '1px solid #e0e0e0'
  },
  summaryTitle: {
    margin: '0 0 15px 0',
    color: '#333',
    fontSize: '20px'
  },
  summaryStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px'
  },
  summaryStat: {
    textAlign: 'center'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: '5px'
  },
  statLabel: {
    fontSize: '14px',
    color: '#666'
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  planCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'translateY(-2px)'
    }
  },
  planHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px'
  },
  planName: {
    margin: '0 0 5px 0',
    color: '#333',
    fontSize: '18px'
  },
  planCategory: {
    fontSize: '12px',
    color: '#666',
    backgroundColor: '#f8f9fa',
    padding: '2px 8px',
    borderRadius: '4px'
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  statusSuccess: {
    backgroundColor: '#e8f5e8',
    color: '#4caf50'
  },
  statusWarning: {
    backgroundColor: '#fff3e0',
    color: '#ffa000'
  },
  statusError: {
    backgroundColor: '#ffebee',
    color: '#f44336'
  },
  planDetails: {
    marginBottom: '15px'
  },
  support: {
    color: '#666',
    marginBottom: '10px',
    fontSize: '14px'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    marginBottom: '8px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  daysLeft: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '5px'
  },
  planAmount: {
    fontSize: '14px',
    color: '#333',
    fontWeight: 'bold'
  },
  planActions: {
    display: 'flex',
    gap: '10px'
  },
  paymentButton: {
    padding: '10px 20px',
    backgroundColor: '#ffa000',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1,
    fontSize: '14px',
    fontWeight: 'bold'
  },
  serviceButton: {
    padding: '10px 20px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1,
    fontSize: '14px'
  },
  videoButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1,
    fontSize: '14px'
  },
  disabledButton: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed'
  },
  section: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    color: '#333',
    marginBottom: '15px',
    fontSize: '18px'
  },
  benefitsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '10px'
  },
  benefitItem: {
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    color: '#333',
    fontSize: '14px'
  },
  // Toast Styles
  toastContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  toast: {
    padding: '12px 20px',
    borderRadius: '6px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '300px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  toastSuccess: {
    backgroundColor: '#4caf50'
  },
  toastError: {
    backgroundColor: '#f44336'
  },
  toastInfo: {
    backgroundColor: '#2196f3'
  },
  toastClose: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    marginLeft: '10px'
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    minWidth: '400px',
    maxWidth: '500px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  select: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    minHeight: '80px',
    resize: 'vertical'
  },
  modalActions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '20px'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default MPLPlans;
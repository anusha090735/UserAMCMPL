import React, { useState } from 'react';

const AMCPlans = ({ onNavigate }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showRenewForm, setShowRenewForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [showServiceTracking, setShowServiceTracking] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [productImage, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState(null);

  const [amcPlans, setAmcPlans] = useState([
    { 
      name: 'AC Unit', 
      status: 'Active', 
      visits: '1/3', 
      expiring: false,
      image: 'https://media.istockphoto.com/id/495606247/photo/lowering-and-turning-off-air-conditioning-to-conserve-eletricity-energy.webp?a=1&b=1&s=612x612&w=0&k=20&c=Kq29a-7P5ohlIQlwLpiSbDqiM52jYo4VA5qXk65fR3A=',
      model: 'Split AC 1.5 Ton',
      purchaseDate: '15 Jan 2024',
      expiryDate: '14 Jan 2025',
      savings: '₹8,000',
      category: 'Cooling',
      serialNo: 'AC789456123',
      coverage: 'Full Maintenance',
      serviceHistory: ['15 Mar 2024 - Cooling Issue Fixed'],
      serviceRequests: [
        {
          id: 'SR001',
          date: '20 Nov 2024',
          issue: 'Not Cooling Properly',
          status: 'completed',
          technician: 'Rajesh Kumar',
          technicianPhone: '+91 98765 43210',
          scheduledDate: '21 Nov 2024',
          completedDate: '21 Nov 2024',
          tracking: [
            { step: 'Request Registered', timestamp: '20 Nov 2024, 10:30 AM', completed: true },
            { step: 'Technician Assigned', timestamp: '20 Nov 2024, 11:15 AM', completed: true },
            { step: 'Visit Scheduled', timestamp: '20 Nov 2024, 02:00 PM', completed: true },
            { step: 'Service In Progress', timestamp: '21 Nov 2024, 10:00 AM', completed: true },
            { step: 'Service Completed', timestamp: '21 Nov 2024, 12:30 PM', completed: true }
          ],
          cost: '₹0',
          partsUsed: ['Gas Refill', 'Filter Cleaning']
        },
        {
          id: 'SR002',
          date: '15 Dec 2024',
          issue: 'Water Leakage',
          status: 'in_progress',
          technician: 'Sanjay Patel',
          technicianPhone: '+91 98765 43211',
          scheduledDate: '16 Dec 2024',
          completedDate: '',
          tracking: [
            { step: 'Request Registered', timestamp: '15 Dec 2024, 09:15 AM', completed: true },
            { step: 'Technician Assigned', timestamp: '15 Dec 2024, 10:30 AM', completed: true },
            { step: 'Visit Scheduled', timestamp: '15 Dec 2024, 03:00 PM', completed: true },
            { step: 'Service In Progress', timestamp: '16 Dec 2024, 11:00 AM', completed: true },
            { step: 'Service Completed', timestamp: '', completed: false }
          ],
          cost: '₹0',
          partsUsed: ['Drain Pipe Cleaning']
        }
      ]
    },
    { 
      name: 'Washing Machine', 
      status: 'Expiring', 
      visits: '2/3', 
      expiring: true,
      image: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FzaGluZyUyMG1hY2hpbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
      model: 'Front Load 8kg',
      purchaseDate: '20 Dec 2023',
      expiryDate: '19 Dec 2024',
      savings: '₹5,500',
      category: 'Laundry',
      serialNo: 'WM456123789',
      coverage: 'Parts & Labor',
      serviceHistory: ['10 Feb 2024 - Motor Repair', '15 Jan 2024 - Drain Issue'],
      serviceRequests: [
        {
          id: 'SR003',
          date: '18 Nov 2024',
          issue: 'Motor Making Noise',
          status: 'scheduled',
          technician: 'Vikram Singh',
          technicianPhone: '+91 98765 43212',
          scheduledDate: '19 Nov 2024',
          completedDate: '',
          tracking: [
            { step: 'Request Registered', timestamp: '18 Nov 2024, 02:45 PM', completed: true },
            { step: 'Technician Assigned', timestamp: '18 Nov 2024, 04:20 PM', completed: true },
            { step: 'Visit Scheduled', timestamp: '18 Nov 2024, 05:30 PM', completed: true },
            { step: 'Service In Progress', timestamp: '', completed: false },
            { step: 'Service Completed', timestamp: '', completed: false }
          ],
          cost: '₹0',
          partsUsed: []
        }
      ]
    },
    { 
      name: 'Refrigerator', 
      status: 'Active', 
      visits: '0/3', 
      expiring: false,
      image: 'https://images.unsplash.com/photo-1630459065645-549fe5a56db4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVmcmlnZXJhdG9yfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
      model: 'Double Door 300L',
      purchaseDate: '10 Feb 2024',
      expiryDate: '09 Feb 2025',
      savings: '₹6,200',
      category: 'Cooling',
      serialNo: 'RF123789456',
      coverage: 'Compressor & Gas',
      serviceHistory: [],
      serviceRequests: []
    }
  ]);

  // Filter and search functionality
  const filteredPlans = amcPlans
    .filter(plan => {
      const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plan.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plan.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'active' && plan.status === 'Active') ||
                           (filterStatus === 'expiring' && plan.expiring);
      return matchesSearch && matchesStatus;
    });

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const handleServiceRequest = (plan) => {
    setSelectedPlan(plan);
    setShowServiceForm(true);
  };

  const handleRenew = (plan) => {
    setSelectedPlan(plan);
    setShowRenewForm(true);
  };

  const handleShowDetails = (plan) => {
    setSelectedPlan(plan);
    setShowDetails(true);
  };

  const handleEnroll = () => {
    setShowEnrollForm(true);
  };

  const handleServiceTracking = () => {
    setShowServiceTracking(true);
  };

  const handleCloseModal = () => {
    setShowServiceForm(false);
    setShowRenewForm(false);
    setShowDetails(false);
    setShowEnrollForm(false);
    setShowServiceTracking(false);
    setSelectedPlan(null);
    setSelectedService(null);
    setProductImage(null);
    setProductImagePreview(null);
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Create new service request
    const newServiceRequest = {
      id: 'SR' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      issue: formData.get('issueType') + ' - ' + formData.get('issueDescription'),
      status: 'registered',
      technician: 'Awaiting Assignment',
      technicianPhone: '',
      scheduledDate: formData.get('preferredDate') ? new Date(formData.get('preferredDate')).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'To be scheduled',
      completedDate: '',
      tracking: [
        { step: 'Request Registered', timestamp: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }), completed: true },
        { step: 'Technician Assigned', timestamp: '', completed: false },
        { step: 'Visit Scheduled', timestamp: '', completed: false },
        { step: 'Service In Progress', timestamp: '', completed: false },
        { step: 'Service Completed', timestamp: '', completed: false }
      ],
      cost: '₹0',
      partsUsed: []
    };

    // Update the plan with new service request
    setAmcPlans(prevPlans => 
      prevPlans.map(plan => 
        plan.name === selectedPlan.name 
          ? { 
              ...plan, 
              serviceRequests: [newServiceRequest, ...plan.serviceRequests],
              visits: `${parseInt(plan.visits.split('/')[0]) + 1}/3`
            }
          : plan
      )
    );

    alert('Service request submitted successfully!');
    handleCloseModal();
  };

  const handleRenewSubmit = (e) => {
    e.preventDefault();
    handleCloseModal();
  };

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Create new product object
    const newProduct = {
      name: formData.get('productName'),
      status: 'Active',
      visits: '0/3',
      expiring: false,
      image: productImagePreview || 'https://picsum.photos/300/200?random=' + (amcPlans.length + 1),
      model: formData.get('productBrand'),
      purchaseDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      savings: '₹0',
      category: formData.get('productCategory'),
      serialNo: 'SN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      coverage: 'Basic Maintenance',
      serviceHistory: [],
      serviceRequests: []
    };

    // Add new product to the plans
    setAmcPlans(prevPlans => [newProduct, ...prevPlans]);
    
    alert('Product enrolled successfully!');
    handleCloseModal();
  };

  const handleDownloadCertificate = () => {
    if (!selectedPlan) return;
    
    // Create PDF certificate
    const certificateContent = `
      AMC CERTIFICATE
      ================
      
      Product: ${selectedPlan.name}
      Model: ${selectedPlan.model}
      Serial No: ${selectedPlan.serialNo}
      Category: ${selectedPlan.category}
      
      Purchase Date: ${selectedPlan.purchaseDate}
      Expiry Date: ${selectedPlan.expiryDate}
      Status: ${selectedPlan.status}
      
      Coverage: ${selectedPlan.coverage}
      Visits Used: ${selectedPlan.visits}
      Total Savings: ${selectedPlan.savings}
      
      Service History:
      ${selectedPlan.serviceHistory.map(service => `- ${service}`).join('\n')}
      
      This certificate verifies that the above product is covered under our Annual Maintenance Contract.
      
      Generated on: ${new Date().toLocaleDateString()}
    `;
    
    // Create blob and download
    const blob = new Blob([certificateContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AMC_Certificate_${selectedPlan.name.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleViewTracking = (plan, service) => {
    setSelectedPlan(plan);
    setSelectedService(service);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'in_progress': return '#ffc107';
      case 'scheduled': return '#17a2b8';
      case 'registered': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'scheduled': return 'Scheduled';
      case 'registered': return 'Registered';
      default: return status;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <button style={styles.backButton} onClick={() => onNavigate('dashboard')}>
            ← Back to Dashboard
          </button>
          <h1 style={styles.title}>📦 MY AMC PLANS ({filteredPlans.length})</h1>
          <div style={styles.headerActions}>
            <button 
              style={styles.trackingButton}
              onClick={handleServiceTracking}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#17a2b8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#138496'}
            >
              📊 Service Tracking
            </button>
            <button 
              style={styles.enrollButton}
              onClick={handleEnroll}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#28a745'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#20c997'}
            >
              ➕ ENROLL NEW
            </button>
          </div>
        </div>
        
        {/* Search and Filter Bar */}
        <div style={styles.controls}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <span style={styles.searchIcon}>🔍</span>
          </div>
          
          <div style={styles.filterGroup}>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expiring">Expiring</option>
            </select>
          </div>
        </div>
      </div>

      {/* AMC Plans Grid */}
      <div style={styles.plansGrid}>
        {filteredPlans.map((plan, index) => (
          <div 
            key={index} 
            style={{
              ...styles.planCard,
              ...(hoveredCard === index ? styles.planCardHover : {})
            }}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={handleCardLeave}
          >
            {/* Product Image */}
            <div style={styles.imageContainer}>
              <img 
                src={plan.image} 
                alt={plan.name}
                style={styles.productImage}
                onError={(e) => {
                  e.target.src = `https://picsum.photos/300/200?random=${index + 10}`;
                }}
              />
              <div style={styles.imageOverlay}>
                <span style={styles.productModel}>{plan.model}</span>
                <span style={styles.productCategory}>{plan.category}</span>
              </div>
            </div>

            {/* Plan Details */}
            <div style={styles.planContent}>
              <div style={styles.planHeader}>
                <h3 style={styles.planName}>{plan.name}</h3>
                <span style={{
                  ...styles.statusBadge,
                  ...(plan.expiring ? styles.statusWarning : styles.statusSuccess)
                }}>
                  {plan.status}
                </span>
              </div>

              <div style={styles.planDetails}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Visits:</span>
                  <span style={styles.detailValue}>{plan.visits}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Expires:</span>
                  <span style={styles.detailValue}>{plan.expiryDate}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Savings:</span>
                  <span style={styles.savingsValue}>{plan.savings}</span>
                </div>
                
                {/* Service Requests Badge */}
                {plan.serviceRequests && plan.serviceRequests.length > 0 && (
                  <div style={styles.serviceRequestsBadge}>
                    <span style={styles.serviceRequestsText}>
                      {plan.serviceRequests.length} Active Service {plan.serviceRequests.length === 1 ? 'Request' : 'Requests'}
                    </span>
                  </div>
                )}

                {/* Usage Progress Bar */}
                <div style={styles.progressSection}>
                  <div style={styles.progressLabel}>
                    <span>AMC Usage</span>
                    <span>{plan.visits}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        width: `${(parseInt(plan.visits.split('/')[0]) / 3) * 100}%`,
                        backgroundColor: plan.expiring ? '#ffa000' : '#4caf50'
                      }}
                    ></div>
                  </div>
                </div>

                {plan.expiring && (
                  <div style={styles.expiryWarning}>
                    ⚠️ Expires in 15 days
                  </div>
                )}
              </div>

              <div style={styles.planActions}>
                <button 
                  style={styles.primaryButton}
                  onClick={() => handleServiceRequest(plan)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  🛠️ Service
                </button>
                {plan.expiring ? (
                  <button 
                    style={styles.secondaryButton}
                    onClick={() => handleRenew(plan)}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#e56906'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#fd7e14'}
                  >
                    🔄 Renew
                  </button>
                ) : (
                  <button 
                    style={styles.detailsButton}
                    onClick={() => handleShowDetails(plan)}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#545b62'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
                  >
                    📋 Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div style={styles.noResults}>
          <div style={styles.noResultsIcon}>🔍</div>
          <h3 style={styles.noResultsText}>No products found</h3>
          <p style={styles.noResultsSubtext}>Try adjusting your search or filters</p>
          <button 
            style={styles.enrollButton}
            onClick={handleEnroll}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#28a745'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#20c997'}
          >
            ➕ ENROLL NEW PRODUCT
          </button>
        </div>
      )}

      {/* Benefits Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>💡 AMC Benefits</h2>
        <div style={styles.benefitsGrid}>
          <div style={styles.benefitCard}>
            <div style={styles.benefitIcon}>🆓</div>
            <div style={styles.benefitText}>
              <strong>3 Free Visits/Year</strong>
              <span>Complete coverage for maintenance</span>
            </div>
          </div>
          <div style={styles.benefitCard}>
            <div style={styles.benefitIcon}>⚡</div>
            <div style={styles.benefitText}>
              <strong>Priority Service</strong>
              <span>Fast-track scheduling</span>
            </div>
          </div>
          <div style={styles.benefitCard}>
            <div style={styles.benefitIcon}>🚨</div>
            <div style={styles.benefitText}>
              <strong>Emergency Service</strong>
              <span>24-48 hours response</span>
            </div>
          </div>
          <div style={styles.benefitCard}>
            <div style={styles.benefitIcon}>📄</div>
            <div style={styles.benefitText}>
              <strong>Digital Certificate</strong>
              <span>Downloadable proof</span>
            </div>
          </div>
        </div>
      </div>

      {/* Service Tracking Modal */}
      {showServiceTracking && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modal, maxWidth: '900px'}}>
            <div style={styles.modalHeader}>
              <h2>📊 Service Tracking</h2>
              <button style={styles.closeButton} onClick={handleCloseModal}>×</button>
            </div>
            <div style={styles.trackingContent}>
              {amcPlans.filter(plan => plan.serviceRequests && plan.serviceRequests.length > 0).length === 0 ? (
                <div style={styles.noServiceRequests}>
                  <div style={styles.noRequestsIcon}>🔧</div>
                  <h3 style={styles.noRequestsText}>No Service Requests</h3>
                  <p style={styles.noRequestsSubtext}>You haven't raised any service requests yet.</p>
                </div>
              ) : (
                <div style={styles.serviceRequestsList}>
                  {amcPlans.map(plan => 
                    plan.serviceRequests && plan.serviceRequests.map((service, index) => (
                      <div key={service.id} style={styles.serviceRequestCard}>
                        <div style={styles.serviceRequestHeader}>
                          <div style={styles.serviceProductInfo}>
                            <img src={plan.image} alt={plan.name} style={styles.serviceProductImage} />
                            <div>
                              <h4 style={styles.serviceProductName}>{plan.name}</h4>
                              <p style={styles.serviceProductModel}>{plan.model}</p>
                              <p style={styles.serviceId}>Service ID: {service.id}</p>
                            </div>
                          </div>
                          <div style={styles.serviceStatusSection}>
                            <span style={{
                              ...styles.serviceStatus,
                              backgroundColor: getStatusColor(service.status)
                            }}>
                              {getStatusText(service.status)}
                            </span>
                            <button 
                              style={styles.trackButton}
                              onClick={() => handleViewTracking(plan, service)}
                            >
                              Track Service
                            </button>
                          </div>
                        </div>
                        
                        <div style={styles.serviceDetails}>
                          <div style={styles.serviceDetailItem}>
                            <span style={styles.serviceDetailLabel}>Issue:</span>
                            <span style={styles.serviceDetailValue}>{service.issue}</span>
                          </div>
                          <div style={styles.serviceDetailItem}>
                            <span style={styles.serviceDetailLabel}>Request Date:</span>
                            <span style={styles.serviceDetailValue}>{service.date}</span>
                          </div>
                          <div style={styles.serviceDetailItem}>
                            <span style={styles.serviceDetailLabel}>Scheduled Date:</span>
                            <span style={styles.serviceDetailValue}>{service.scheduledDate}</span>
                          </div>
                          {service.technician && service.technician !== 'Awaiting Assignment' && (
                            <div style={styles.serviceDetailItem}>
                              <span style={styles.serviceDetailLabel}>Technician:</span>
                              <span style={styles.serviceDetailValue}>{service.technician} ({service.technicianPhone})</span>
                            </div>
                          )}
                        </div>

                        {/* Mini Tracking */}
                        <div style={styles.miniTracking}>
                          {service.tracking.slice(0, 3).map((step, stepIndex) => (
                            <div key={stepIndex} style={styles.miniStep}>
                              <div style={{
                                ...styles.miniStepDot,
                                backgroundColor: step.completed ? '#28a745' : '#dee2e6'
                              }}></div>
                              <span style={{
                                ...styles.miniStepText,
                                color: step.completed ? '#28a745' : '#6c757d'
                              }}>
                                {step.step}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Service Tracking Detail Modal */}
      {selectedService && selectedPlan && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modal, maxWidth: '800px'}}>
            <div style={styles.modalHeader}>
              <h2>🚚 Service Tracking - {selectedService.id}</h2>
              <button style={styles.closeButton} onClick={handleCloseModal}>×</button>
            </div>
            <div style={styles.trackingDetailContent}>
              {/* Product Info */}
              <div style={styles.trackingProductInfo}>
                <img src={selectedPlan.image} alt={selectedPlan.name} style={styles.trackingProductImage} />
                <div style={styles.trackingProductDetails}>
                  <h3 style={styles.trackingProductName}>{selectedPlan.name}</h3>
                  <p style={styles.trackingProductModel}>{selectedPlan.model}</p>
                  <p style={styles.trackingServiceId}>Service ID: {selectedService.id}</p>
                  <div style={styles.trackingStatusBadge}>
                    <span style={{
                      ...styles.trackingStatusText,
                      backgroundColor: getStatusColor(selectedService.status)
                    }}>
                      {getStatusText(selectedService.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div style={styles.trackingServiceDetails}>
                <div style={styles.trackingDetailGrid}>
                  <div style={styles.trackingDetailItem}>
                    <span style={styles.trackingDetailLabel}>Issue Description:</span>
                    <span style={styles.trackingDetailValue}>{selectedService.issue}</span>
                  </div>
                  <div style={styles.trackingDetailItem}>
                    <span style={styles.trackingDetailLabel}>Request Date:</span>
                    <span style={styles.trackingDetailValue}>{selectedService.date}</span>
                  </div>
                  <div style={styles.trackingDetailItem}>
                    <span style={styles.trackingDetailLabel}>Scheduled Date:</span>
                    <span style={styles.trackingDetailValue}>{selectedService.scheduledDate}</span>
                  </div>
                  {selectedService.completedDate && (
                    <div style={styles.trackingDetailItem}>
                      <span style={styles.trackingDetailLabel}>Completed Date:</span>
                      <span style={styles.trackingDetailValue}>{selectedService.completedDate}</span>
                    </div>
                  )}
                  <div style={styles.trackingDetailItem}>
                    <span style={styles.trackingDetailLabel}>Technician:</span>
                    <span style={styles.trackingDetailValue}>
                      {selectedService.technician} {selectedService.technicianPhone && `(${selectedService.technicianPhone})`}
                    </span>
                  </div>
                  <div style={styles.trackingDetailItem}>
                    <span style={styles.trackingDetailLabel}>Service Cost:</span>
                    <span style={styles.trackingDetailValue}>{selectedService.cost}</span>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div style={styles.trackingTimeline}>
                <h4 style={styles.timelineTitle}>Service Progress</h4>
                <div style={styles.timeline}>
                  {selectedService.tracking.map((step, index) => (
                    <div key={index} style={styles.timelineStep}>
                      <div style={styles.timelineStepHeader}>
                        <div style={{
                          ...styles.timelineDot,
                          backgroundColor: step.completed ? '#28a745' : '#dee2e6',
                          border: step.completed ? '3px solid #28a745' : '3px solid #dee2e6'
                        }}>
                          {step.completed && <div style={styles.timelineDotInner}></div>}
                        </div>
                        <div style={styles.timelineStepInfo}>
                          <span style={{
                            ...styles.timelineStepName,
                            color: step.completed ? '#28a745' : '#6c757d',
                            fontWeight: step.completed ? '600' : '400'
                          }}>
                            {step.step}
                          </span>
                          {step.timestamp && (
                            <span style={styles.timelineStepTime}>{step.timestamp}</span>
                          )}
                        </div>
                      </div>
                      {index < selectedService.tracking.length - 1 && (
                        <div style={{
                          ...styles.timelineConnector,
                          backgroundColor: step.completed ? '#28a745' : '#dee2e6'
                        }}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Parts Used */}
              {selectedService.partsUsed && selectedService.partsUsed.length > 0 && (
                <div style={styles.partsUsedSection}>
                  <h4 style={styles.partsUsedTitle}>Parts Used/Replaced</h4>
                  <div style={styles.partsUsedList}>
                    {selectedService.partsUsed.map((part, index) => (
                      <div key={index} style={styles.partItem}>
                        <span style={styles.partIcon}>🔧</span>
                        <span style={styles.partName}>{part}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Support Section */}
              <div style={styles.supportSection}>
                <h4 style={styles.supportTitle}>Need Help?</h4>
                <div style={styles.supportOptions}>
                  <div style={styles.supportOption}>
                    <span style={styles.supportIcon}>📞</span>
                    <div>
                      <strong>Call Support</strong>
                      <span>1800-123-4567</span>
                    </div>
                  </div>
                  <div style={styles.supportOption}>
                    <span style={styles.supportIcon}>💬</span>
                    <div>
                      <strong>Chat with us</strong>
                      <span>24x7 Available</span>
                    </div>
                  </div>
                  <div style={styles.supportOption}>
                    <span style={styles.supportIcon}>📧</span>
                    <div>
                      <strong>Email Support</strong>
                      <span>support@amcservice.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Request Modal */}
      {showServiceForm && selectedPlan && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2>🛠️ Service Request</h2>
              <button style={styles.closeButton} onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleServiceSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Product:</label>
                <input 
                  type="text" 
                  value={selectedPlan.name} 
                  style={styles.input} 
                  disabled 
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Model:</label>
                <input 
                  type="text" 
                  value={selectedPlan.model} 
                  style={styles.input} 
                  disabled 
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Issue Type:</label>
                <select name="issueType" style={styles.select} required>
                  <option value="">Select Issue</option>
                  <option value="not_working">Not Working</option>
                  <option value="performance">Performance Issue</option>
                  <option value="noise">Unusual Noise</option>
                  <option value="leakage">Water Leakage</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Issue Description:</label>
                <textarea 
                  name="issueDescription"
                  style={styles.textarea} 
                  placeholder="Describe the issue in detail..."
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Preferred Date:</label>
                <input type="date" name="preferredDate" style={styles.input} required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" style={styles.checkbox} />
                  Emergency Service (24-48 hrs)
                </label>
              </div>
              <div style={styles.modalActions}>
                <button 
                  type="button" 
                  style={styles.cancelButton} 
                  onClick={handleCloseModal}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#545b62'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={styles.submitButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Renew Modal */}
      {showRenewForm && selectedPlan && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2>🔄 Renew AMC</h2>
              <button style={styles.closeButton} onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleRenewSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Product:</label>
                <input 
                  type="text" 
                  value={selectedPlan.name} 
                  style={styles.input} 
                  disabled 
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Current Plan Expiry:</label>
                <input 
                  type="text" 
                  value={selectedPlan.expiryDate} 
                  style={styles.input} 
                  disabled 
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Renewal Period:</label>
                <select style={styles.select} required>
                  <option value="1">1 Year - ₹2,999</option>
                  <option value="2">2 Years - ₹5,499</option>
                  <option value="3">3 Years - ₹7,999</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Payment Method:</label>
                <select style={styles.select} required>
                  <option value="">Select Payment</option>
                  <option value="credit">Credit Card</option>
                  <option value="debit">Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="netbanking">Net Banking</option>
                </select>
              </div>
              <div style={styles.renewalBenefits}>
                <h4>Renewal Benefits:</h4>
                <ul style={styles.benefitsList}>
                  <li>✓ Continued 3 free visits per year</li>
                  <li>✓ Priority service scheduling</li>
                  <li>✓ 10% discount on spare parts</li>
                  <li>✓ Extended warranty coverage</li>
                </ul>
              </div>
              <div style={styles.modalActions}>
                <button 
                  type="button" 
                  style={styles.cancelButton} 
                  onClick={handleCloseModal}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#545b62'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={styles.submitButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
                >
                  Proceed to Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedPlan && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2>📋 Plan Details</h2>
              <button style={styles.closeButton} onClick={handleCloseModal}>×</button>
            </div>
            <div style={styles.detailsContent}>
              <div style={styles.detailSection}>
                <h3 style={styles.detailTitle}>Product Information</h3>
                <div style={styles.detailGrid}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Product Name:</span>
                    <span style={styles.detailValue}>{selectedPlan.name}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Model:</span>
                    <span style={styles.detailValue}>{selectedPlan.model}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Serial Number:</span>
                    <span style={styles.detailValue}>{selectedPlan.serialNo}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Category:</span>
                    <span style={styles.detailValue}>{selectedPlan.category}</span>
                  </div>
                </div>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.detailTitle}>AMC Coverage</h3>
                <div style={styles.coverageBox}>
                  <span style={styles.coverageText}>{selectedPlan.coverage}</span>
                </div>
                <div style={styles.coverageDetails}>
                  <div style={styles.coverageItem}>✓ 3 Free service visits per year</div>
                  <div style={styles.coverageItem}>✓ Labor charges included</div>
                  <div style={styles.coverageItem}>✓ Genuine spare parts</div>
                  <div style={styles.coverageItem}>✓ 24/7 customer support</div>
                </div>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.detailTitle}>Service History</h3>
                {selectedPlan.serviceHistory.length > 0 ? (
                  <div style={styles.serviceHistory}>
                    {selectedPlan.serviceHistory.map((service, index) => (
                      <div key={index} style={styles.serviceItem}>
                        <span style={styles.serviceDate}>{service}</span>
                        <span style={styles.serviceStatus}>Completed</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={styles.noHistory}>No service history available</div>
                )}
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.detailTitle}>Plan Summary</h3>
                <div style={styles.summaryGrid}>
                  <div style={styles.summaryItem}>
                    <span>Purchased:</span>
                    <span>{selectedPlan.purchaseDate}</span>
                  </div>
                  <div style={styles.summaryItem}>
                    <span>Expires:</span>
                    <span>{selectedPlan.expiryDate}</span>
                  </div>
                  <div style={styles.summaryItem}>
                    <span>Visits Used:</span>
                    <span>{selectedPlan.visits}</span>
                  </div>
                  <div style={styles.summaryItem}>
                    <span>Total Savings:</span>
                    <span style={styles.savingsHighlight}>{selectedPlan.savings}</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.modalActions}>
              <button 
                style={styles.downloadButton} 
                onClick={handleDownloadCertificate}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#138496'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#17a2b8'}
              >
                📄 Download Certificate
              </button>
              <button 
                style={styles.closeDetailButton} 
                onClick={handleCloseModal}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#545b62'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enroll New Product Modal */}
      {showEnrollForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2>➕ ENROLL NEW PRODUCT</h2>
              <button style={styles.closeButton} onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleEnrollSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>User Name:</label>
                <input 
                  type="text" 
                  name="userName"
                  placeholder="Enter your full name..."
                  style={styles.input} 
                  required 
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number:</label>
                <input 
                  type="tel" 
                  name="phoneNumber"
                  placeholder="Enter your phone number..."
                  style={styles.input} 
                  required 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Product Name:</label>
                <input 
                  type="text" 
                  name="productName"
                  placeholder="Enter product name..."
                  style={styles.input} 
                  required 
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Product Category:</label>
                <select name="productCategory" style={styles.select} required>
                  <option value="">Select Category</option>
                  <option value="Air Conditioner">Air Conditioner</option>
                  <option value="Refrigerator">Refrigerator</option>
                  <option value="Washing Machine">Washing Machine</option>
                  <option value="Television">Television</option>
                  <option value="Microwave Oven">Microwave Oven</option>
                  <option value="Water Purifier">Water Purifier</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Product Brand:</label>
                <input 
                  type="text" 
                  name="productBrand"
                  placeholder="e.g., Samsung, LG, Voltas..."
                  style={styles.input} 
                  required 
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Platform Type:</label>
                <select name="platformType" style={styles.select} required>
                  <option value="">Select Platform</option>
                  <option value="in_platform">In Platform</option>
                  <option value="out_platform">Out of Platform</option>
                </select>
              </div>

              {/* Product Image Upload */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Product Image:</label>
                <div style={styles.imageUploadContainer}>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleProductImageUpload}
                    style={styles.imageUploadInput}
                  />
                  {productImagePreview && (
                    <div style={styles.imagePreview}>
                      <img 
                        src={productImagePreview} 
                        alt="Product preview" 
                        style={styles.previewImage}
                      />
                      <span style={styles.previewText}>Preview</span>
                    </div>
                  )}
                </div>
                <small style={styles.fileHint}>Upload a clear photo of your product (JPG, PNG, JPEG)</small>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Invoice Upload:</label>
                <input 
                  type="file" 
                  name="invoice"
                  accept=".pdf,.jpg,.png"
                  style={styles.fileInput} 
                />
                <small style={styles.fileHint}>Upload purchase invoice (PDF, JPG, PNG)</small>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>AMC Plan:</label>
                <select name="amcPlan" style={styles.select} required>
                  <option value="">Select AMC Plan</option>
                  <option value="basic">Basic Plan - ₹2,999/year (3 visits)</option>
                  <option value="premium">Premium Plan - ₹4,999/year (5 visits + parts)</option>
                  <option value="comprehensive">Comprehensive Plan - ₹7,999/year (Unlimited visits + full coverage)</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" name="terms" style={styles.checkbox} required />
                  I agree to the Terms & Conditions and Privacy Policy
                </label>
              </div>
              
              <div style={styles.enrollmentBenefits}>
                <h4>🎯 Why Enroll in AMC?</h4>
                <ul style={styles.benefitsList}>
                  <li>✅ 3-5 free service visits per year</li>
                  <li>✅ Priority customer support</li>
                  <li>✅ Genuine spare parts with discounts</li>
                  <li>✅ 24/7 emergency service</li>
                  <li>✅ Extended warranty benefits</li>
                  <li>✅ Digital certificate & tracking</li>
                </ul>
              </div>

              <div style={styles.modalActions}>
                <button 
                  type="button" 
                  style={styles.cancelButton} 
                  onClick={handleCloseModal}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#545b62'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={styles.enrollSubmitButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#20c997'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#20c997'}
                >
                  🎯 ENROLL NOW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  header: {
    marginBottom: '30px'
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  },
  trackingButton: {
    padding: '10px 20px',
    backgroundColor: '#138496',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap'
  },
  enrollButton: {
    padding: '12px 24px',
    backgroundColor: '#20c997',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 12px rgba(32, 201, 151, 0.3)'
  },
  title: {
    color: '#2c3e50',
    fontSize: '2rem',
    margin: '0',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    flex: 1,
    textAlign: 'center'
  },
  controls: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  searchContainer: {
    position: 'relative',
    width: '300px'
  },
  searchInput: {
    width: '100%',
    padding: '8px 30px 8px 10px',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '12px',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
  },
  searchIcon: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6c757d',
    fontSize: '12px'
  },
  filterGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  filterSelect: {
    padding: '8px 10px',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '12px',
    backgroundColor: 'white',
    cursor: 'pointer',
    minWidth: '120px'
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '1px solid #e1e5e9',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  planCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
  },
  imageContainer: {
    position: 'relative',
    height: '140px',
    overflow: 'hidden'
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  },
  imageOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
    padding: '10px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productModel: {
    fontSize: '12px',
    fontWeight: '600'
  },
  productCategory: {
    fontSize: '10px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '2px 6px',
    borderRadius: '8px'
  },
  planContent: {
    padding: '16px'
  },
  planHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  planName: {
    margin: '0',
    color: '#2c3e50',
    fontSize: '16px',
    fontWeight: '600'
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: '700',
    whiteSpace: 'nowrap'
  },
  statusSuccess: {
    backgroundColor: '#d4edda',
    color: '#155724'
  },
  statusWarning: {
    backgroundColor: '#fff3cd',
    color: '#856404'
  },
  planDetails: {
    marginBottom: '16px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
    padding: '3px 0'
  },
  detailLabel: {
    color: '#6c757d',
    fontSize: '11px',
    fontWeight: '500'
  },
  detailValue: {
    color: '#495057',
    fontSize: '11px',
    fontWeight: '600'
  },
  savingsValue: {
    color: '#28a745',
    fontSize: '11px',
    fontWeight: '700'
  },
  serviceRequestsBadge: {
    backgroundColor: '#e7f3ff',
    padding: '6px 10px',
    borderRadius: '6px',
    margin: '8px 0',
    border: '1px solid #b3d7ff'
  },
  serviceRequestsText: {
    color: '#0056b3',
    fontSize: '11px',
    fontWeight: '600'
  },
  progressSection: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: '1px solid #e9ecef'
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
    fontSize: '11px',
    color: '#495057',
    fontWeight: '600'
  },
  progressBar: {
    width: '100%',
    height: '5px',
    backgroundColor: '#e9ecef',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  },
  expiryWarning: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '6px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '10px',
    border: '1px solid #f5c6cb'
  },
  planActions: {
    display: 'flex',
    gap: '8px'
  },
  primaryButton: {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1,
    fontSize: '11px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  secondaryButton: {
    padding: '8px 12px',
    backgroundColor: '#fd7e14',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1,
    fontSize: '11px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  detailsButton: {
    padding: '8px 12px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1,
    fontSize: '11px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  noResults: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '40px'
  },
  noResultsIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: '0.5'
  },
  noResultsText: {
    color: '#6c757d',
    marginBottom: '8px',
    fontSize: '18px'
  },
  noResultsSubtext: {
    color: '#6c757d',
    fontSize: '14px',
    opacity: '0.7',
    marginBottom: '20px'
  },
  section: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e1e5e9'
  },
  sectionTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '1.5rem',
    textAlign: 'center',
    fontWeight: '600'
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px'
  },
  benefitCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    transition: 'all 0.3s ease'
  },
  benefitIcon: {
    fontSize: '20px',
    marginRight: '12px',
    minWidth: '28px'
  },
  benefitText: {
    display: 'flex',
    flexDirection: 'column'
  },
  // Service Tracking Styles
  trackingContent: {
    padding: '20px',
    maxHeight: '60vh',
    overflowY: 'auto'
  },
  noServiceRequests: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#6c757d'
  },
  noRequestsIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: '0.5'
  },
  noRequestsText: {
    fontSize: '18px',
    marginBottom: '8px'
  },
  noRequestsSubtext: {
    fontSize: '14px',
    opacity: '0.7'
  },
  serviceRequestsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  serviceRequestCard: {
    backgroundColor: 'white',
    border: '1px solid #e1e5e9',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  serviceRequestHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  serviceProductInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  serviceProductImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '6px'
  },
  serviceProductName: {
    margin: '0 0 4px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50'
  },
  serviceProductModel: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    color: '#6c757d'
  },
  serviceId: {
    margin: '0',
    fontSize: '12px',
    color: '#495057',
    fontWeight: '500'
  },
  serviceStatusSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px'
  },
  serviceStatus: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'white'
  },
  trackButton: {
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  serviceDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '8px',
    marginBottom: '12px'
  },
  serviceDetailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  serviceDetailLabel: {
    fontSize: '12px',
    color: '#6c757d',
    fontWeight: '500'
  },
  serviceDetailValue: {
    fontSize: '14px',
    color: '#495057',
    fontWeight: '500'
  },
  miniTracking: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    paddingTop: '12px',
    borderTop: '1px solid #e9ecef'
  },
  miniStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  miniStepDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  miniStepText: {
    fontSize: '11px',
    fontWeight: '500'
  },
  // Tracking Detail Styles
  trackingDetailContent: {
    padding: '20px'
  },
  trackingProductInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  trackingProductImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  trackingProductDetails: {
    flex: 1
  },
  trackingProductName: {
    margin: '0 0 4px 0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50'
  },
  trackingProductModel: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    color: '#6c757d'
  },
  trackingServiceId: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    color: '#495057',
    fontWeight: '500'
  },
  trackingStatusBadge: {
    display: 'inline-block'
  },
  trackingStatusText: {
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white'
  },
  trackingServiceDetails: {
    marginBottom: '24px'
  },
  trackingDetailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '12px'
  },
  trackingDetailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  trackingDetailLabel: {
    fontSize: '14px',
    color: '#6c757d',
    fontWeight: '500'
  },
  trackingDetailValue: {
    fontSize: '16px',
    color: '#495057',
    fontWeight: '500'
  },
  trackingTimeline: {
    marginBottom: '24px'
  },
  timelineTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '16px'
  },
  timeline: {
    position: 'relative',
    paddingLeft: '20px'
  },
  timelineStep: {
    position: 'relative',
    marginBottom: '20px'
  },
  timelineStepHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  timelineDot: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative',
    zIndex: 2
  },
  timelineDotInner: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'white'
  },
  timelineStepInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    paddingBottom: '8px'
  },
  timelineStepName: {
    fontSize: '14px',
    fontWeight: '500'
  },
  timelineStepTime: {
    fontSize: '12px',
    color: '#6c757d'
  },
  timelineConnector: {
    position: 'absolute',
    left: '10px',
    top: '20px',
    bottom: '-20px',
    width: '2px',
    zIndex: 1
  },
  partsUsedSection: {
    marginBottom: '24px'
  },
  partsUsedTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '12px'
  },
  partsUsedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  partItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: '1px solid #e9ecef'
  },
  partIcon: {
    fontSize: '14px'
  },
  partName: {
    fontSize: '14px',
    color: '#495057',
    fontWeight: '500'
  },
  supportSection: {
    backgroundColor: '#e7f3ff',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #b3d7ff'
  },
  supportTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0056b3',
    marginBottom: '12px'
  },
  supportOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  supportOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  supportIcon: {
    fontSize: '20px'
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
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e9ecef',
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#6c757d',
    fontWeight: 'bold',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    padding: '20px'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    color: '#495057',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    backgroundColor: 'white'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    minHeight: '80px',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  fileInput: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  imageUploadContainer: {
    border: '2px dashed #ced4da',
    borderRadius: '6px',
    padding: '15px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    transition: 'all 0.3s ease'
  },
  imageUploadInput: {
    width: '100%',
    marginBottom: '10px'
  },
  imagePreview: {
    marginTop: '10px',
    position: 'relative'
  },
  previewImage: {
    width: '100%',
    maxHeight: '150px',
    objectFit: 'cover',
    borderRadius: '6px',
    border: '1px solid #dee2e6'
  },
  previewText: {
    position: 'absolute',
    top: '5px',
    left: '5px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '10px'
  },
  fileHint: {
    color: '#6c757d',
    fontSize: '12px',
    marginTop: '4px',
    display: 'block'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#495057'
  },
  checkbox: {
    marginRight: '8px'
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    padding: '20px',
    borderTop: '1px solid #e9ecef'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  enrollSubmitButton: {
    padding: '12px 24px',
    backgroundColor: '#20c997',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  renewalBenefits: {
    backgroundColor: '#e7f3ff',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '16px',
    border: '1px solid #b3d7ff'
  },
  enrollmentBenefits: {
    backgroundColor: '#d1f7e4',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '16px',
    border: '1px solid #a3e9c4'
  },
  benefitsList: {
    margin: '8px 0 0 0',
    paddingLeft: '20px',
    color: '#495057',
    fontSize: '14px'
  },
  // Details Modal Styles
  detailsContent: {
    padding: '20px'
  },
  detailSection: {
    marginBottom: '24px'
  },
  detailTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '2px solid #007bff'
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  detailLabel: {
    fontSize: '12px',
    color: '#6c757d',
    fontWeight: '500'
  },
  detailValue: {
    fontSize: '14px',
    color: '#495057',
    fontWeight: '600'
  },
  coverageBox: {
    backgroundColor: '#d4edda',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '12px',
    border: '1px solid #c3e6cb'
  },
  coverageText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#155724'
  },
  coverageDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '8px'
  },
  coverageItem: {
    fontSize: '13px',
    color: '#495057',
    padding: '4px 0'
  },
  serviceHistory: {
    border: '1px solid #e9ecef',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  serviceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    borderBottom: '1px solid #e9ecef',
    backgroundColor: '#f8f9fa'
  },
  serviceDate: {
    fontSize: '13px',
    color: '#495057'
  },
  serviceStatus: {
    fontSize: '12px',
    color: '#28a745',
    fontWeight: '600',
    backgroundColor: '#d4edda',
    padding: '2px 8px',
    borderRadius: '12px'
  },
  noHistory: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: '14px',
    padding: '20px',
    fontStyle: 'italic'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #e9ecef'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    color: '#495057'
  },
  savingsHighlight: {
    color: '#28a745',
    fontWeight: '700'
  },
  downloadButton: {
    padding: '10px 20px',
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  closeDetailButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  }
};

export default AMCPlans;
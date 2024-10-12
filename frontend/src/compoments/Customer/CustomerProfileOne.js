import React from 'react';

function CustomerProfileOne() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '250px',
          backgroundColor: '#2C3E50',
          color: '#fff',
          padding: '20px',
        }}
      >
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>Customer Dashboard</h2>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li style={{ marginBottom: '10px' }}>
            <a
              href="/CusProfile"
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px',
                display: 'block',
                backgroundColor: '#34495E',
                borderRadius: '5px',
              }}
            >
              Profile
            </a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a
              href="/Or_add"
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px',
                display: 'block',
                backgroundColor: '#34495E',
                borderRadius: '5px',
              }}
            >
              My Orders
            </a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a
              href="/FeedbackForm"
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px',
                display: 'block',
                backgroundColor: '#34495E',
                borderRadius: '5px',
              }}
            >
              Feedback
            </a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a
              href="/PaymentDashBoardOne"
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px',
                display: 'block',
                backgroundColor: '#34495E',
                borderRadius: '5px',
              }}
            >
              Payment
            </a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a
              href="#"
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px',
                display: 'block',
                backgroundColor: '#34495E',
                borderRadius: '5px',
              }}
            >
              Create Package
            </a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a
              href="."
              onClick={() => {
                // navigate('/');
              }}
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px',
                display: 'block',
                backgroundColor: '#34495E',
                borderRadius: '5px',
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>

      <div
        style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#ECF0F1',
        }}
      >
        <header
          style={{
            backgroundColor: '#3498DB',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        >
          <h1>Welcome!</h1>
          <p>Your last login: </p>
        </header>

        <section
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              flex: '1',
              margin: '0 10px',
            }}
          >
            <h3>Total Orders</h3>
            {/* <p>{user.orders}</p> */}
          </div>
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              flex: '1',
              margin: '0 10px',
            }}
          >
            <h3>Pending Orders</h3>
            {/* <p>{user.pendingOrders}</p> */}
          </div>
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              flex: '1',
              margin: '0 10px',
            }}
          >
            <h3>Notifications</h3>
            {/* <p>{user.notifications}</p> */}
          </div>
        </section>

        <section>
          <h2 style={{ marginBottom: '10px' }}>Recent Activity</h2>
          <ul
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            {/* <ul>
              {user.recentActivity.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul> */}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default CustomerProfileOne;

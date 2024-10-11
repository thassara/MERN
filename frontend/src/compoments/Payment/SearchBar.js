import React, { useState } from 'react';
import jsPDF from 'jspdf';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  // Handle clear search button
  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch(''); 
  };

  // Function to generate a simple PDF report
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Report Title', 10, 10);
    doc.text(`Search Term: ${searchTerm}`, 10, 20);
    doc.text('Your report data goes here...', 10, 30);
    doc.save('report.pdf');
  };

  return (
    <div style={styles.searchBarContainer}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by Payment ID or Email"
        style={styles.input}
      />
      {searchTerm && (
        <button onClick={handleClearSearch} style={styles.clearButton}>
          Clear
        </button>
      )}
      <button onClick={handleDownloadPDF} style={styles.downloadButton}>
        Download PDF
      </button>
    </div>
  );
};

const styles = {
  searchBarContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '100px auto 20px', // Adjusted margin for top spacing
    position: 'relative',
    maxWidth: '800px', // Set a maximum width for the search bar
    width: '90%', // Full width within the max limit
  },
  input: {
    flex: 1,
    padding: '12px 20px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border 0.3s ease',
    marginRight: '10px', 
  },
  clearButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#888',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '5px',
    transition: 'color 0.3s ease',
  },
  downloadButton: {
    padding: '12px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px', 
  },
};


export default SearchBar;

import React, { useState } from 'react';
import Navbar from './Navbar';
import './Reports.css';

export default function Reports() {
  const [reports] = useState([
    { id: 1, name: 'Monthly Sales Report', date: '2024-01-15', status: 'Ready' },
    { id: 2, name: 'User Activity Report', date: '2024-01-14', status: 'Processing' },
    { id: 3, name: 'Financial Summary', date: '2024-01-13', status: 'Ready' },
  ]);

  return (
    <div className="reports-container">
      <Navbar title="Reports" />

      <div className="reports-content">
        <h1>Reports Dashboard</h1>
        <div className="reports-actions">
          <button className="generate-btn">Generate New Report</button>
        </div>
        
        <div className="reports-list">
          {reports.map(report => (
            <div key={report.id} className="report-item">
              <div className="report-info">
                <h3>{report.name}</h3>
                <p>Generated: {report.date}</p>
                <span className={`status ${report.status.toLowerCase()}`}>
                  {report.status}
                </span>
              </div>
              <div className="report-actions">
                <button className="btn-download">Download</button>
                <button className="btn-view">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
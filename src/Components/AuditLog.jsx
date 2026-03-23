import axios from "axios";
import React, { useEffect, useState } from "react";

const AuditLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get("${import.meta.env.VITE_API_URL}/auth/audit_log")
      .then((result) => {
        if (result.data.Status) {
          setLogs(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Action badge color
  const getBadgeColor = (action) => {
    switch (action) {
      case "ADDED":
        return "bg-success";
      case "UPDATED":
        return "bg-warning text-dark";
      case "DELETED":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="px-4 mt-3">
      <h3 className="mb-3">📋 Audit Log</h3>
      <p className="text-muted">
        All employee actions are automatically tracked here.
      </p>

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Action</th>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Details</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No logs found yet. Add, update, or delete an employee to see
                  logs.
                </td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr key={log.id}>
                  <td>{index + 1}</td>
                  <td>
                    <span className={`badge ${getBadgeColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td>{log.employee_name}</td>
                  <td>{log.employee_id}</td>
                  <td>{log.details}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLog;

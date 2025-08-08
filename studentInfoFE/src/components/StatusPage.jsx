import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatusPage = () => {
  const [services, setServices] = useState({
    studentService: null,
    courseService: null,
    error: null,
  });

useEffect(() => {
  const fetchStatus = async () => {
    let studentStatus = null;
    let courseStatus = null;
    let errorMessages = [];

    try {
      const res = await axios.get("http://localhost:8085/student/actuator/health");
      studentStatus = res.data.status;
    } catch (err) {
      console.error("❌ Student Service down:", err);
      errorMessages.push("Student Service is unreachable.");
    }

    try {
      const res = await axios.get("http://localhost:8085/course/actuator/health");
      courseStatus = res.data.status;
    } catch (err) {
      console.error("❌ Course Service down:", err);
      errorMessages.push("Course Service is unreachable.");
    }

    setServices({
      studentService: studentStatus,
      courseService: courseStatus,
      error: errorMessages.length ? errorMessages.join(" | ") : null,
    });
  };

  fetchStatus();
}, []);


  const renderStatusBadge = (status) => {
    if (!status) return <span className="text-gray-400">Checking...</span>;
    const isUp = status.toLowerCase() === 'up';

    return (
      <span
        className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
          isUp
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
        }`}
      >
        {isUp ? '🟢 UP' : '🔴 DOWN'}
      </span>
    );
  };

  return (
    <div className="w-full bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">🚦 Service Health Dashboard</h2>

        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Student Service</span>
            {renderStatusBadge(services.studentService)}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Course Service</span>
            {renderStatusBadge(services.courseService)}
          </div>
{services.error && (
  <div className="mt-4 p-4 bg-red-700 text-white rounded-lg text-sm">
    ⚠️ {services.error.message || String(services.error)}
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default StatusPage;

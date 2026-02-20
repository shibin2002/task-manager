import React, { useState, useEffect } from "react";

const HistoryLog = ({ logs = [], searchQuery = "", departmentFilter = "" }) => {
  const [logData, setLogData] = useState([...logs]);

  // Update logData when logs change (to reflect filtered results)
  useEffect(() => {
    setLogData([...logs]);
  }, [logs]);

  // Filter logs based on searchQuery and departmentFilter
  const filteredLogs = logData.filter((log) => {
    const matchesSearch = log.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter ? log.department === departmentFilter : true;
    return matchesSearch && matchesDepartment;
  });

  // Sort logs by dueDate in ascending order
  const sortedLogs = [...filteredLogs].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Handle status change
  const handleStatusChange = (index, newStatus) => {
    const updatedLogs = [...logData];
    updatedLogs[index].status = newStatus;
    setLogData(updatedLogs);
  };

  // Get status styles
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-700  ";
      case "Progress":
        return "text-orange-600";
      case "Pending":
      default:
        return "text-red-600 ";
    }
  };

  return (
    <div className=" bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Detailed History Log</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
          <thead>
            <tr className="bg-[#002147] text-white">
              <th className="py-3 px-4 border border-gray-300">ID</th>
              <th className="py-3 px-4 border border-gray-300">Title</th>
              <th className="py-3 px-4 border border-gray-300">Department</th>
              <th className="py-3 px-4 border border-gray-300">Status</th>
              <th className="py-3 px-4 border border-gray-300">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedLogs.length > 0 ? (
              sortedLogs.map((log, index) => (
                <tr 
                  key={index} 
                  className={`text-center border border-gray-300 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200 transition-all`}
                >
                  <td className="py-3 px-4 border border-gray-300 font-semibold">{index + 1}</td>
                  <td className="py-3 px-4 border border-gray-300">{log.title}</td>
                  <td className="py-3 px-4 border border-gray-300">{log.department}</td>
                  <td className="py-3 px-4 border border-gray-300">
                  <select
  value={log.status}
  onChange={(e) => handleStatusChange(index, e.target.value)}
  className={`p-2 rounded border border-black w-full ${getStatusClass(log.status)}`}
>
  <option value="Pending" className="text-red-600">Pending</option>
  <option value="Progress" className="text-orange-600">Progress</option>
  <option value="Completed" className="text-green-700">Completed</option>
</select>

                  </td>
                  <td className="py-3 px-4 border border-gray-300">{log.dueDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500 border border-gray-300">
                  No history logs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryLog;

import React, { useState, useEffect } from "react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend 
} from "recharts";
import moment from "moment";

const AnalyticsDashboard = ({ followUps = [] }) => {
  const [conversionData, setConversionData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const groupedData = followUps.reduce((acc, item) => {
      const month = moment(item.dueDate).format("YYYY-MM");
      if (!acc[month]) {
        acc[month] = { month, total: 0, converted: 0 };
      }
      acc[month].total += 1;
      if (item.status === "Completed") {
        acc[month].converted += 1;
      }
      return acc;
    }, {});

    const processedData = Object.values(groupedData)
      .map((data) => ({
        ...data,
        conversionRate: ((data.converted / data.total) * 100).toFixed(2),
      }))
      .sort((a, b) => moment(a.month).valueOf() - moment(b.month).valueOf());

    setConversionData(processedData);

    const completed = followUps.filter((item) => item.status === "Completed").length;
    const pending = followUps.length - completed;
    setPieData([
      { name: "Completed", value: completed },
      { name: "Pending", value: pending },
    ]);
  }, [followUps]);

  const COLORS = ["#4CAF50", "#FF6B6B"];

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        📊 Follow-up Conversion Analytics
      </h2>

      {/* Pie Chart - Completed vs Pending Follow-ups */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h3 className="text-lg font-semibold text-center text-gray-700 mb-3">Completion Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Follow-ups vs. Conversions */}
      <div className="bg-white shadow-md rounded-xl p-4 my-6">
        <h3 className="text-lg font-semibold text-center text-gray-700 mb-3">Follow-ups vs. Conversions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={conversionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#4C6EF5" name="Total Follow-ups" />
            <Bar dataKey="converted" fill="#16A34A" name="Conversions" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Conversion Rate */}
<div className="bg-white shadow-md rounded-xl p-4">
  <h3 className="text-lg font-semibold text-center text-gray-700 mb-3">
    Conversion Rate Over Time
  </h3>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={conversionData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
      <XAxis dataKey="month" />
      <YAxis 
        domain={[0, 100]} // Limits values between 0 and 100
        tickCount={6} // Ensures proper distribution
        interval="preserveStartEnd" 
        allowDecimals={false} 
        tick={{ fontSize: 14, fontWeight: "bold", fill: "#333" }} 
        tickFormatter={(tick) => `${tick}%`}
      />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="conversionRate" stroke="#FF9F43" strokeWidth={3} dot={{ r: 5 }} />
    </LineChart>
  </ResponsiveContainer>
</div>


    </div>
  );
};

export default AnalyticsDashboard;

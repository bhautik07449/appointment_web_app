import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  const chartData = dashData
    ? [
        { name: "Doctors", value: dashData.doctors },
        { name: "Appointments", value: dashData.appointments },
        { name: "Patients", value: dashData.patients },
      ]
    : [];

  const COLORS = ["#60A5FA", "#34D399", "#FBBF24"];

  return (
    dashData && (
      <div className="flex flex-wrap">
        <div className="m-5">
          <div className="flex flex-wrap gap-3">
            <Link to="/doctor-list">
            <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
              <img className="w-14" src={assets.doctor_icon} alt="" />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {dashData.doctors}
                </p>
                <p className="text-gray-400">Doctors</p>
              </div>
            </div>
            </Link>

            <Link to="/all-appointments">
            <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
              <img className="w-14" src={assets.appointments_icon} alt="" />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {dashData.appointments}
                </p>
                <p className="text-gray-400">Appointments</p>
              </div>
            </div>
            </Link>

            <Link to="/patients-list">
            <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
              <img className="w-14" src={assets.patients_icon} alt="" />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {dashData.patients}
                </p>
                <p className="text-gray-400">Patients</p>
              </div>
            </div>
            </Link>
          </div>

          <div className="bg-white">
            <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold">Latest Bookings</p>
            </div>

            <div className="pt-4 border border-t-0">
              {dashData.latestAppointments.slice(0, 5).map((item, index) => (
                <div
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                  key={index}
                >
                  <img
                    className="rounded-full w-10"
                    src={item.docData.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {item.docData.name}
                    </p>
                    <p className="text-gray-600 ">
                      Booking on {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='bg-white p-5 m-8 rounded shadow border min-w-[400px]'>
        <h2 className='text-lg font-semibold mb-4 text-gray-700'>Overview Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      </div>
    )
  );
};

export default Dashboard;

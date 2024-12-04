import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import UserPage from "./page/UserPage";
import LoginPage from "./LoginPage"; // Import trang đăng nhập
import { fetchUsers } from "./utils/api"; // Giả định hàm fetch dữ liệu từ API

const App = () => {
  const [user, setUsers] = useState([]);
  const [onlineData, setOnlineData] = useState([]);
  const [taskStatusData, setTaskStatusData] = useState([]);
  const [userLocations, setUserLocations] = useState([]);
  const [newUserData, setNewUserData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Kiểm tra xem người dùng đã đăng nhập hay chưa

  // Tải dữ liệu khi ứng dụng khởi động
  useEffect(() => {
    const loadData = async () => {
      const users = await fetchUsers(); // Giả định hàm fetch dữ liệu từ API
      setUsers(users);
      // Dữ liệu biểu đồ đường (Số lượng người dùng online theo thời gian)
      setOnlineData([
        { time: " ", onlineUsers: 5 },
        { time: "10:00", onlineUsers: 10 },
        { time: "11:00", onlineUsers: 8 },
        { time: "12:00", onlineUsers: 12 },
        { time: "13:00", onlineUsers: 20 },
      ]);
      // Dữ liệu biểu đồ tròn (Phân tích trạng thái nhiệm vụ)
      setTaskStatusData([
        { name: "Hoàn thành", value: 60, color: "#2196F3" },
        { name: "Đang làm", value: 30, color: "#FFC107" },
        { name: "Bị trì hoãn", value: 10, color: "#F44336" },
      ]);
      // Dữ liệu biểu đồ cột (Thống kê số lượng người dùng mới đăng ký theo ngày)
      setNewUserData([
        { date: "2023-02-01", newUsers: 10 },
        { date: "2023-10-02", newUsers: 15 },
        { date: "2023-12-03", newUsers: 20 },
        { date: "2024-03-15", newUsers: 40 },
        { date: "2024-06-01", newUsers: 65 },
        { date: "2024-10-30", newUsers: 17 },
        { date: "2024-12-01", newUsers: 45 },
      ]);
      setUserLocations(
        users.map((user, index) => ({
          name: user.name,
          email: user.email,
          address: user.address.street,
          lat: parseFloat(user.address.geo.lat),
          lng: parseFloat(user.address.geo.lng),
          image: `https://randomuser.me/api/portraits/men/${index}.jpg`,
        }))
      );
    };
    loadData();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Nếu chưa đăng nhập, sẽ chuyển hướng đến trang Login */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Dashboard
                user={user}
                onlineData={onlineData}
                taskStatusData={taskStatusData}
                newUserData={newUserData}
                userLocations={userLocations}
              />
            ) : (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        {/* Route cho UserPage */}
        <Route
          path="/"
          element={
            <UserPage
              onlineData={onlineData}
              taskStatusData={taskStatusData}
              newUserData={newUserData}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

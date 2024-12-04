import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link để điều hướng
import { fetchUsers } from "../utils/api"; // Hàm lấy dữ liệu người dùng
import LineChartComponent from "../components/LineChart";
import PieChartComponent from "../components/PieChart";
import BarChartComponent from "../components/BarChart";
import MapComponent from "../components/Map";
import UserManagement from "../components/UserManagement";
import { CSVLink } from "react-csv"; // Import CSVLink để xuất CSV
import * as XLSX from "xlsx"; // Import thư viện xlsx để xuất Excel
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { blue, orange } from "@mui/material/colors";

const Dashboard = ({
  onlineData,
  taskStatusData,
  newUserData,
  userLocations,
}) => {
  const [user, setUsers] = useState([]); // Dữ liệu người dùng
  const [darkMode, setDarkMode] = useState(false); // Trạng thái chế độ sáng/tối

  // Tạo theme cho Dark Mode và Light Mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: blue[500] },
      secondary: { main: orange[500] },
    },
  });

  // Tải dữ liệu người dùng từ API
  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers(); // Lấy dữ liệu từ API
      setUsers(data);
    };
    loadUsers();
  }, []);

  // Hàm chuyển đổi chế độ sáng/tối
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Hàm xuất dữ liệu dưới dạng Excel
  const exportToExcel = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data); // Chuyển dữ liệu thành bảng tính
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename); // Tải file Excel
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        {/* Tiêu đề Dashboard */}
        <Box my={4} textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: darkMode ? "white" : "black" }}
          >
            Dashboard of Admin
          </Typography>
        </Box>

        {/* Nút chuyển đổi giữa Dark Mode và Light Mode */}
        <Box
          position="fixed"
          top={16}
          left={16}
          zIndex={1000}
          display="flex"
          alignItems="center"
        >
          <Button variant="contained" color="primary" onClick={toggleDarkMode}>
            Switch to {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </Box>

        {/* Điều hướng User Page */}
        <Box mb={4} textAlign="center">
          <Button variant="contained" color="primary" component={Link} to="/">
            Go to User Page
          </Button>
        </Box>

        {/* Nút xuất dữ liệu CSV và Excel */}
        <Box my={4} textAlign="center">
          <Typography variant="h6" gutterBottom>
            Export User Management Data:
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            {/* Nút xuất CSV */}
            <Button variant="contained" color="primary">
              <CSVLink
                data={user}
                filename="user_management_data.csv"
                style={{ color: "white", textDecoration: "none" }}
              >
                Export as CSV
              </CSVLink>
            </Button>

            {/* Nút xuất Excel */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => exportToExcel(user, "user_management_data.xlsx")}
            >
              Export as Excel
            </Button>
          </Box>
        </Box>

        {/* User Management */}
        <Box my={4} textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: "pink" }}
          >
            User Management
          </Typography>
          <UserManagement users={user} />
        </Box>

        {/* Line Chart */}
        <Box my={4} textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: "pink" }}
          >
            LineChart
          </Typography>
          <LineChartComponent data={onlineData} />
        </Box>

        {/* Pie Chart */}
        <Box my={4} textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: "pink" }}
          >
            PieChart
          </Typography>
          <Box display="flex" justifyContent="center" mt={2} gap={3}>
            {taskStatusData.map((item, index) => (
              <Box key={index} display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "50px",
                    height: "20px",
                    backgroundColor: item.color,
                    borderRadius: "4px",
                    border: "1px solid black",
                    marginRight: "8px",
                  }}
                />
                <Typography sx={{ color: "Brown" }}>{item.name}</Typography>
              </Box>
            ))}
          </Box>
          <PieChartComponent data={taskStatusData} />
        </Box>

        {/* Bar Chart */}
        <Box my={4} textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: "pink" }}
          >
            BarChart
          </Typography>
          <BarChartComponent data={newUserData} />
        </Box>

        {/* Map Component */}
        <Box my={4} textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: "pink" }}
          >
            Map position user online
          </Typography>
          <MapComponent locations={userLocations} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;

import React, { useState } from "react"; // Chỉ cần nhập React và useState
import { Link } from "react-router-dom";
import LineChartComponent from "../components/LineChart";
import PieChartComponent from "../components/PieChart";
import BarChartComponent from "../components/BarChart";
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

const UserPage = ({ onlineData, taskStatusData, newUserData }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Tạo theme cho Dark Mode và Light Mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light", // Chế độ tối hoặc sáng
      primary: {
        main: blue[500],
      },
      secondary: {
        main: orange[500],
      },
    },
  });

  // Chức năng chuyển đổi chế độ sáng tối
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box my={4} textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: darkMode ? "white" : "black" }}
          >
            Dashboard of User
          </Typography>
        </Box>
        <Box
          position="fixed"
          top={16}
          left={16}
          zIndex={1000}
          display="flex"
          alignItems="center"
        >
          {/* Nút chuyển đổi giữa Dark Mode và Light Mode */}
          <Button variant="contained" color="primary" onClick={toggleDarkMode}>
            Switch to {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin"
          >
            Go to Admin Page
          </Button>
        </Box>

        {/* Biểu đồ Line */}
        <Box my={4} textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: "pink" }}
          >
            LineChart
          </Typography>
        </Box>
        <LineChartComponent data={onlineData} />

        {/* Biểu đồ Pie */}
        <Box my={4} textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: "pink" }}
          >
            PieChart
          </Typography>
          {/* Ký hiệu cho PieChart */}
          <Box display="flex" justifyContent="center" mt={2} gap={3}>
            {taskStatusData.map((item, index) => (
              <Box key={index} display="flex" alignItems="center">
                {/* Ký hiệu hình chữ nhật */}
                <Box
                  sx={{
                    width: "50px",
                    height: "20px",
                    backgroundColor: item.color,
                    borderRadius: "4px",
                    border: "1px solid black",
                    marginRight: "8px", // Khoảng cách giữa ký hiệu và văn bản
                  }}
                />
                {/* Văn bản mô tả */}
                <Typography sx={{ color: "Brown" }}>{item.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <PieChartComponent data={taskStatusData} />

        {/* Biểu đồ Bar */}
        <Box my={4} textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: "pink" }}
          >
            BarChart
          </Typography>
        </Box>
        <BarChartComponent data={newUserData} />
      </Container>
    </ThemeProvider>
  );
};

export default UserPage;

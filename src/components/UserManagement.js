import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";

const UserManagement = ({ users }) => {
  // State để lưu trữ giá trị tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");

  // Các cột dữ liệu cho DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "role", headerName: "Role", width: 180 },
  ];

  // Chuyển đổi dữ liệu người dùng thành các dòng trong bảng
  const rows = users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    email: user.email,
    address: `${user.address.street}, ${user.address.city}`,
    role: user.role || "User", // Giả sử bạn có trường role cho người dùng
  }));

  // Lọc dữ liệu người dùng theo từ khóa tìm kiếm
  const filteredRows = rows.filter((row) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      row.name.toLowerCase().includes(searchValue) ||
      row.email.toLowerCase().includes(searchValue) ||
      row.address.toLowerCase().includes(searchValue) ||
      row.id.toString().includes(searchValue) ||
      row.role.toLowerCase().includes(searchValue)
    );
  });

  // Hàm xử lý thay đổi trong thanh tìm kiếm
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box>
      {/* Thanh tìm kiếm */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        margin="normal"
        sx={{ width: "80%" }} // Giảm chiều rộng của thanh tìm kiếm
      />

      {/* Căn giữa bảng */}
      <Box display="flex" justifyContent="center" mt={4}>
        {" "}
        {/* Căn giữa bảng */}
        <div style={{ height: 500, width: "80%" }}>
          {" "}
          {/* Giảm chiều cao và chiều rộng của bảng */}
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            sx={{
              borderColor: "black", // Màu đường viền của bảng
              border: "1px solid black", // Đường viền chung của bảng
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#C97B3D", // Màu nền của header
                borderBottom: "1px solid black", // Đường kẻ dưới header
                color: "black", // Màu chữ header
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid black", // Đường kẻ dưới mỗi cell
              },
              "& .MuiDataGrid-row": {
                "&:hover": {
                  backgroundColor: "#f5f5f5", // Màu nền khi hover qua hàng
                },
              },
            }}
          />
        </div>
      </Box>
    </Box>
  );
};

export default UserManagement;

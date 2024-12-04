import axios from "axios";

// Hàm lấy dữ liệu người dùng từ API
export const fetchUsers = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Hàm lọc người dùng theo tên, email hoặc vai trò
export const filterUsers = (users, filters) => {
  const { search, role } = filters;
  return users.filter((user) => {
    // Tìm kiếm theo tên hoặc email
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    // Lọc theo vai trò (Giả sử vai trò được lưu trữ trong một thuộc tính role của người dùng)
    const matchesRole = role === "All" || user.role === role;

    return matchesSearch && matchesRole;
  });
};

import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  colors,
} from "@mui/material";
const FilterComponent = ({ filters, setFilters }) => (
  <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
    <TextField
      label="Tìm kiếm"
      variant="outlined"
      value={filters.search}
      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
    />
    <FormControl variant="outlined">
      <InputLabel>Role</InputLabel>
      <Select
        value={filters.role}
        onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        label="Role"
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="User">User</MenuItem>
        <MenuItem value="Guest">Guest</MenuItem>
      </Select>
    </FormControl>
  </div>
);

export default FilterComponent;

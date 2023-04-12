import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function NewUserPost() {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    role: "admin",
  });

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }));
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/addAdmin", admin);
      if (response.status === 201) {
        toast.success("Admin user created successfully!");
        setAdmin({ name: "", email: "", role: "admin" });
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-container-content user-form">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={admin.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={admin.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <select
  id="role"
  name="role"
  value={admin.role}
  onChange={handleInputChange}
 
  required
>
  <option value="" disabled>
    -- Select Role --
  </option>
  <option value="admin">Admin</option>
  <option value="moderator">Moderator</option>
</select>

      </div>
      <button type="submit">Create Admin User</button>
    </form>

    </div></div>
  );
}

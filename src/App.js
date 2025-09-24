import { useEffect, useState } from "react";
import { fetchUsers, createUser, modifyUser, removeUser } from "./api/services";
import UsersTable from "./components/UsersTable";
import UserEditor from "./components/UserEditor";
import "./styles.css";
import "./App.css";


export default function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState(10);

  // Load initial data
  useEffect(() => {
    fetchUsers()
      .then((res) => {
        const enriched = res.data.map((u) => ({ ...u, dept: "Engineering" }));
        setAllUsers(enriched);
        setVisibleUsers(enriched);
      })
      .catch(() => alert("Could not retrieve data"));
  }, []);

  // Add new user
  const handleCreate = (entry) => {
    const payload = { name: `${entry.first} ${entry.last}`, email: entry.email, dept: entry.dept };
    createUser(payload)
      .then((res) => {
        const updated = [...allUsers, res.data];
        setAllUsers(updated);
        setVisibleUsers(updated);
        setFormOpen(false);
      })
      .catch(() => alert("Failed to add user"));
  };

  // Update existing user
  const handleUpdate = (entry) => {
    const payload = { name: `${entry.first} ${entry.last}`, email: entry.email, dept: entry.dept };
    modifyUser(editing.id, payload)
      .then((res) => {
        const updated = allUsers.map((u) => (u.id === editing.id ? res.data : u));
        setAllUsers(updated);
        setVisibleUsers(updated);
        setFormOpen(false);
        setEditing(null);
      })
      .catch(() => alert("Update failed"));
  };

  // Delete
  const handleRemove = (id) => {
    removeUser(id)
      .then(() => {
        const updated = allUsers.filter((u) => u.id !== id);
        setAllUsers(updated);
        setVisibleUsers(updated);
      })
      .catch(() => alert("Could not delete user"));
  };

  // Search
  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setQuery(val);
    setVisibleUsers(allUsers.filter((u) =>
      u.name.toLowerCase().includes(val) || u.email.toLowerCase().includes(val)
    ));
  };


  // Sorting
  const handleSort = (col) => {
    const sorted = [...visibleUsers];
    if (col === "First") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (col === "Email") sorted.sort((a, b) => a.email.localeCompare(b.email));
    setVisibleUsers(sorted);
  };

  return (
    <div className="container">
      <div className="hero"><h2>User Management Dashboard</h2></div>

      <div className="main-form">
        <button onClick={() => { setFormOpen(true); setEditing(null); }} className="add-btn">Add User</button>
        
        <input type="text" placeholder="Search..." value={query} onChange={handleSearch} className="search-bar" />
        <select value={rows} onChange={(e) => setRows(Number(e.target.value))} className="">
          {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      {formOpen && (
        <UserEditor
          selectedUser={editing}
          onSave={editing ? handleUpdate : handleCreate}
          onCancel={() => setFormOpen(false)}
        />
      )}

      <UsersTable
        records={visibleUsers.slice(0, rows)}
        onEdit={(u) => { setEditing(u); setFormOpen(true); }}
        onDelete={handleRemove}
        onSort={handleSort}
      />



    </div>
  );
}

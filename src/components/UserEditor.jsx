import { useEffect, useState } from "react";

export default function UserEditor({ selectedUser, onSave, onCancel }) {
  const [data, setData] = useState({ first: "", last: "", email: "", dept: "" });

  useEffect(() => {
    if (selectedUser) {
      const [first, last] = selectedUser.name?.split(" ") || ["", ""];
      setData({
        first,
        last,
        email: selectedUser.email || "",
        dept: selectedUser.dept || "",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSave(data);
  };

  return (
    <form onSubmit={submitForm} className="user-form">
      <input className="form-dtls" name="first" placeholder="First Name" value={data.first} onChange={handleChange} required />
      <input className="form-dtls" name="last" placeholder="Last Name" value={data.last} onChange={handleChange} required />
      <input className="form-dtls" type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required />
      <input className="form-dtls" name="dept" placeholder="Department" value={data.dept} onChange={handleChange} />

      <div className="form-btns">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel} className="">Cancel</button>
      </div>
    </form>
  );
}

export default function UsersTable({ records, onEdit, onDelete, onSort }) {
  return (
    <table className="user-tab">
      <thead>
        <tr>
          {["ID", "First", "Last", "Email", "Dept"].map((col) => (
            <th key={col} className="tab-hed" onClick={() => onSort(col)}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.length === 0 ? (
          <tr>
            <td className="no-user">No users available</td>
          </tr>
        ) : (
          records.map((user) => {
            const [first, last] = user.name?.split(" ") || ["", ""];
            return (
              <tr key={user.id}>
                <td className="user-data">{user.id}</td>
                <td className="user-data">{first}</td>
                <td className="user-data">{last}</td>
                <td className="user-data">{user.email}</td>
                <td className="user-data">{user.dept || "-"}</td>
                <td className="custm-btns">
                  <button onClick={() => onEdit(user)} className="edt-btn">Edit</button>
                  <button onClick={() => onDelete(user.id)} className="dlt-btn">Delete</button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

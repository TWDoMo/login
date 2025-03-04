import { useState } from "react";
import "./App.css";

// 🔹 靜態 JSON 模擬使用者資料
const initialUsers = [
  { id: 1, name: "Alice", account: "alice123", password: "pass123" },
  { id: 2, name: "Bob", account: "bob456", password: "pass456" },
  { id: 3, name: "Charlie", account: "charlie789", password: "pass789" }
];

const Login = () => {
  const [users, setUsers] = useState(initialUsers); // 🔹 狀態管理所有帳號
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  // 🔹 處理登入邏輯
  const handleLogin = () => {
    const user = users.find(user => user.account === account && user.password === password);

    if (user) {
      setLoggedInUser(user);
    } else {
      setMessage("❌ 帳號或密碼錯誤，請再試一次！");
    }
  };

  return (
    <div className="container">
      <UserList users={users} /> {/* 🔹 帳號列表放到頂部 */}
      {loggedInUser ? (
        <ProfileEditor 
          user={loggedInUser} 
          setLoggedInUser={setLoggedInUser} 
          users={users} 
          setUsers={setUsers} 
        />
      ) : (
        <div className="login-box">
          <h2>🔑 使用者登入</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label>📧 帳號：</label>
              <input 
                type="text" 
                value={account} 
                onChange={(e) => setAccount(e.target.value)} 
                required 
              />
            </div>
            <div className="input-group">
              <label>🔒 密碼：</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button className="btn login-btn" type="submit" onClick={handleLogin}>
              登入
            </button>
            {message && <p className="error-message">{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

// 🔹 帳號列表組件
const UserList = ({ users }) => (
  <div className="user-list">
    <h3>📋 帳號列表</h3>
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <strong>姓名:</strong> {user.name} | <strong>帳號:</strong> {user.account} | <strong>密碼:</strong> {user.password}
        </li>
      ))}
    </ul>
  </div>
);

// 🔹 修改帳戶資訊組件
const ProfileEditor = ({ user, setLoggedInUser, users, setUsers }) => {
  const [newName, setNewName] = useState(user.name);
  const [newAccount, setNewAccount] = useState(user.account);
  const [newPassword, setNewPassword] = useState(user.password);
  const [message, setMessage] = useState("");

  // 🔹 更新帳戶資訊
  const handleUpdate = () => {
    const updatedUsers = users.map(u =>
      u.id === user.id 
        ? { ...u, name: newName, account: newAccount, password: newPassword } 
        : u
    );

    setUsers(updatedUsers);
    setMessage("✅ 帳號資訊更新成功！");
  };

  // 🔹 登出
  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="profile-box">
      <h2>⚙️ 修改帳戶資訊</h2>
      <div className="input-group">
        <label>📝 姓名：</label>
        <input 
          type="text" 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)} 
        />
      </div>
      <div className="input-group">
        <label>📧 帳號：</label>
        <input 
          type="text" 
          value={newAccount} 
          onChange={(e) => setNewAccount(e.target.value)} 
        />
      </div>
      <div className="input-group">
        <label>🔒 密碼：</label>
        <input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
        />
      </div>
      <button className="btn update-btn" onClick={handleUpdate}>
        更新資訊
      </button>
      <button className="btn logout-btn" onClick={handleLogout}>
        登出
      </button>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default Login;

import { useState } from "react";
import { supabase } from "./supabaseClient";
import Dashboard from "./Dashboard";
import "./App.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = async () => {
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("account", account)
      .eq("password", password);
    if (error) {
      setMessage("❌ 錯誤：" + error.message);
    } else if (users && users.length > 0) {
      setLoggedInUser(users[0]);
      setMessage("✅ 登入成功！");
    } else {
      setMessage("❌ 帳號或密碼錯誤！");
    }
  };

  const handleRegister = async () => {
    if (!name || !account || !password) {
      setMessage("⚠️ 所有欄位皆為必填！");
      return;
    }
    const { data: existing } = await supabase
      .from("users")
      .select("*")
      .eq("account", account);
    if (existing.length > 0) {
      setMessage("⚠️ 此帳號已存在！");
      return;
    }
    const { error } = await supabase
      .from("users")
      .insert([{ name, account, password }]);
    if (error) {
      setMessage("❌ 註冊失敗：" + error.message);
    } else {
      setMessage("✅ 註冊成功，請登入！");
      setIsLogin(true);
      setName("");
      setAccount("");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setAccount("");
    setPassword("");
    setMessage("");
  };

  // ✅ 登入後顯示 Dashboard 頁面
  if (loggedInUser) {
    return <Dashboard user={loggedInUser} onLogout={handleLogout} />;
  }

  // ✅ 登入／註冊表單畫面
  return (
    <div className="container mt-5">
      <div className={`form-box ${isLogin ? "" : "active"}`}>
        {/* 登入表單 */}
        <div className="form login-form">
          <h3 className="mb-3 text-center">🔑 登入</h3>
          <input
            className="form-control mb-2"
            placeholder="帳號"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <input
            className="form-control mb-2"
            placeholder="密碼"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" onClick={handleLogin}>
            登入
          </button>
          {message && (
            <div
              className={
                message.startsWith("✅") ? "success-message" : "error-message"
              }
            >
              {message}
            </div>
          )}
        </div>

        {/* 註冊表單 */}
        <div className="form register-form">
          <h3 className="mb-3 text-center">📝 註冊</h3>
          <input
            className="form-control mb-2"
            placeholder="姓名"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-control mb-2"
            placeholder="帳號"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <input
            className="form-control mb-2"
            placeholder="密碼"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" onClick={handleRegister}>
            註冊
          </button>
        </div>
      </div>

      {/* 切換按鈕 + 訊息 */}
      <div className="toggle-box">
        <button
          className="btn btn-outline-secondary mt-3"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "👉 前往註冊" : "👈 回到登入"}
        </button>
      </div>
    </div>
  );
};

export default App;
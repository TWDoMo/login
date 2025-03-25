import React, { useState } from "react";
import { supabase } from "./supabaseClient";

const ProfileEditor = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [account, setAccount] = useState(user.account);
  const [password, setPassword] = useState(user.password);
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("users")
      .update({ name, account, password })
      .eq("id", user.id);

    if (error) {
      setMessage("❌ 更新失敗：" + error.message);
    } else {
      setMessage("✅ 資料更新成功！");
      onUpdate({ ...user, name, account, password });
    }
  };

  return (
    <div className="card p-4">
      <h4 className="mb-3">👤 修改個人資訊</h4>
      <div className="mb-3">
        <label className="form-label">姓名：</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">帳號：</label>
        <input
          type="text"
          className="form-control"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">密碼：</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary w-100" onClick={handleUpdate}>
        儲存變更
      </button>
      {message && (
        <div
          className={
            message.startsWith("✅") ? "success-message mt-3" : "error-message mt-3"
          }
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ProfileEditor;

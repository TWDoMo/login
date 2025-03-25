import React, { useState } from "react";
import TetrisGame from "./TetrisGame";
import ProfileEditor from "./ProfileEditor";
import { supabase } from "./supabaseClient";
import "./Dashboard.css";

const Dashboard = ({ user, onLogout }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [deleteMessage, setDeleteMessage] = useState("");

  const handleDelete = async () => {
    const confirm = window.confirm("⚠️ 確定要刪除這個帳號嗎？此操作無法復原。");
    if (!confirm) return;

    const { error } = await supabase.from("users").delete().eq("id", currentUser.id);

    if (error) {
      setDeleteMessage("❌ 刪除失敗：" + error.message);
    } else {
      setDeleteMessage("✅ 帳號已刪除！即將登出...");
      setTimeout(() => {
        onLogout();
      }, 2000);
    }
  };

  return (
    <div className="dashboard-container">
      {/* 🔝 頂部導覽列 */}
      <div className="dashboard-navbar">
        <div className="user-info">
          👤 歡迎，<strong>{currentUser.name}</strong>
        </div>
        <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
          登出
        </button>
      </div>

      {/* 🔀 主內容區塊 */}
      <div className="dashboard-main">
        {/* 📁 左側：使用者區塊 */}
        <div className="dashboard-sidebar">
          <ProfileEditor user={currentUser} onUpdate={setCurrentUser} />
          <button className="btn btn-outline-danger mt-3 w-100" onClick={handleDelete}>
            🗑️ 刪除帳號
          </button>
          {deleteMessage && (
            <div className="mt-2 text-center" style={{ color: deleteMessage.startsWith("✅") ? "green" : "red" }}>
              {deleteMessage}
            </div>
          )}
        </div>

        {/* 🎮 右側：遊戲區塊 */}
        <div className="dashboard-content">
          <h4 className="mb-3">🎮 今日任務：挑戰俄羅斯方塊！</h4>
          <TetrisGame />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

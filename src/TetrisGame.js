// TetrisGame.js
import { useEffect, useRef, useState } from "react";

const TetrisGame = () => {
  const canvasRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.font = "20px Arial";
    ctx.fillText("🚧 Tetris 遊戲畫面", 30, 100);
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header text-white bg-primary">
          <h4 className="mb-0">🎮 俄羅斯方塊遊戲區</h4>
        </div>
        <div className="card-body text-center">
          <canvas ref={canvasRef} width={300} height={400} className="border rounded" />
          {!started ? (
            <button
              className="btn btn-success mt-3"
              onClick={() => setStarted(true)}
            >
              ▶️ 開始遊戲
            </button>
          ) : (
            <p className="text-muted mt-3">🚀 遊戲已開始（開發中...）</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;

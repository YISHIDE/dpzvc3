// src/skeleton/skeletonStyle.ts
export const skeletonStyle = `
#skeleton {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  z-index: 9999; /* 确保覆盖内容 */
}

.sk-title,
.sk-subtitle,
.sk-line,
.sk-avatar {
  background: #e0e0e0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.sk-title {
  height: 28px;
  width: 60%;
}

.sk-subtitle {
  height: 20px;
  width: 40%;
}

.sk-line {
  height: 16px;
  width: 100%;
}

.sk-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

/* Shimmer 动画 */
.sk-title::after,
.sk-subtitle::after,
.sk-line::after,
.sk-avatar::after {
  content: "";
  position: absolute;
  top: 0; left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
`
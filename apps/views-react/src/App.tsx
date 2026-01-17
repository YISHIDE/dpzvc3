import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Button } from '@dpzvc3/react';
import Guide from './views/Guide';
import '@dpzvc3/styles/dist/index.css';

function Home() {
  return <div>
    <h1>Home 页面</h1>
    {/* <Button>点击按钮</Button> */}
    <Link to="/about">去 About</Link>
  </div>;
}

function About() {
  return <div>
    <h1>About 页面</h1>
    <Link to="/">回 Home</Link>
  </div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Guide />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
    </Router>
  );
}

export default App;
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

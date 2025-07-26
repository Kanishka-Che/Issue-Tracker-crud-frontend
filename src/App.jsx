import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import EditIssue from './pages/editIssue';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditIssue />} />
      </Routes>
    </BrowserRouter>
  );
}

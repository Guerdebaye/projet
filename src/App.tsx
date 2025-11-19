import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Carnets } from './pages/carnets';
import { Appointments } from './pages/Appointments';
import { Health } from './pages/Health';
import { Doctors } from './pages/Doctors';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Notifications } from './pages/Notifications';
import { Contact } from './pages/Contact';
import { Profile } from './pages/Profile';
import { Chatbot } from './components/chat/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-pro flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/carnets" element={<Carnets />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/health" element={<Health />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Chatbot />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

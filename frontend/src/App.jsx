import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterCompany from './pages/RegisterCompany';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AdminDashboard from './pages/admin_dashboard/Dashboard';
import ManageUsers from './pages/admin_dashboard/ManageUsers';
import ManageCVs from './pages/admin_dashboard/ManageCVs';
import CompanyCode from './pages/CompanyCode';
import ContactUs from './pages/ContactUs';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <Router>
      <div className="font-font-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-company" element={<RegisterCompany />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/company-code" element={<CompanyCode />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/thank-you" element={<ThankYou />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/manage/users" element={<ManageUsers />} />
          <Route path="/manage/cvs" element={<ManageCVs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

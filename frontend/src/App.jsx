import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterCompany from './pages/RegisterCompany';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AdminDashboard from './pages/admin_dashboard/Dashboard';
import ManageUsers from './pages/admin_dashboard/ManageUsers';
import ManageCVs from './pages/admin_dashboard/ManageCVs';
import RecruiterDashboard from './pages/recruiter_dashboard/Dashboard';
import RecruiterManageCVs from './pages/recruiter_dashboard/ManageCVs';
import RecruiterManageCandidates from './pages/recruiter_dashboard/ManageCandidates';
import HiringManagerDashboard from './pages/hiring_manager_dashboard/Dashboard';
import HiringManagerManageCVs from './pages/hiring_manager_dashboard/ManageCVs';
import HiringManagerManageCandidates from './pages/hiring_manager_dashboard/ManageCandidates';
import ManageJobRoles from './pages/hiring_manager_dashboard/ManageJobRoles';
import CreateJobRole from './pages/hiring_manager_dashboard/CreateJobRole';
import ModifyJobRole from './pages/hiring_manager_dashboard/ModifyJobRole';
import ViewJobRole from './pages/hiring_manager_dashboard/ViewJobRole';
import ManageRecruiters from './pages/hiring_manager_dashboard/ManageRecruiters';
import Feedback from './pages/shared/Feedback';
import CompanyCode from './pages/CompanyCode';
import ContactUs from './pages/ContactUs';
import ThankYou from './pages/ThankYou';
import UploadCV from './pages/recruiter_dashboard/UploadCV';
import FinalListing from './pages/hiring_manager_dashboard/FinalListing';

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
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage/users" element={<ManageUsers />} />
          <Route path="/admin/manage/cvs" element={<ManageCVs />} />
          <Route path="/admin/feedback/:candidateName" element={<Feedback />} />

          {/* Recruiter Routes */}
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/manage/cvs" element={<RecruiterManageCVs />} />
          <Route path="/recruiter/manage/candidates" element={<RecruiterManageCandidates />} />
          <Route path="/recruiter/upload-cv" element={<UploadCV />} />
          <Route path="/recruiter/feedback/:candidateName" element={<Feedback />} />
          
          {/* Hiring Manager Routes */}
          <Route path="/hiring-manager/dashboard" element={<HiringManagerDashboard />} />
          <Route path="/hiring-manager/manage/cvs" element={<HiringManagerManageCVs />} />
          <Route path="/hiring-manager/manage/candidates" element={<HiringManagerManageCandidates />} />
          <Route path="/hiring-manager/final-listing" element={<FinalListing />} />
          <Route path="/hiring-manager/feedback/:candidateName" element={<Feedback />} />
          <Route path="/hiring-manager/manage/job-roles" element={<ManageJobRoles />} />
          <Route path="/hiring-manager/manage/create-job-role" element={<CreateJobRole />} />
          <Route path="/hiring-manager/manage/job-roles/:id/edit" element={<ModifyJobRole />} />
          <Route path="/hiring-manager/manage/job-roles/:id" element={<ViewJobRole />} />
          <Route path="/hiring-manager/manage/recruiters" element={<ManageRecruiters />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

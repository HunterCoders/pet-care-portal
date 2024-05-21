import './App.css';
import Homepage from './Homepage';
import AdminOptionsPage from './AdminOptions';
import DocLogin from './DoctorLogin';
import CusRegister from './CusRegister';
import DocRegister from './DocRegister';
import CustomerLogin from './CustomerLogin';
import AdminLogin from './AdminLogin';
import AddFoodPage from './AddFoodPage';
import CustomerOptionsPage from './CustomerDash';
import BuyFoodPage from './BuyFood';
import BookAppointment from './getDoctor';
import ViewOrdersPage from './ViewOrder';
import ViewAppointmentsPage from './CustAppt';
import AdminOrdersPage from './AdminOrderPage';
import DoctorAppointmentsPage from './DoctorAppts';
import ViewDoctorsPage from './ViewDoctors';
import ViewAdminAppointmentsPage from './ViewAdminAppts';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/adminOptions" element={<AdminOptionsPage />} />
        <Route path="/docRegister" element={<DocRegister />} />
        <Route path="/cusRegister" element={<CusRegister />} />
        <Route path="/doclogin" element={<DocLogin />} />
        <Route path="/cusLogin" element={<CustomerLogin />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/addFood" element={<AddFoodPage />} />
        <Route path="/cusHome" element={<CustomerOptionsPage />} />
        <Route path="/buyFood" element={<BuyFoodPage />} />
        <Route path="/getDoctor" element={<BookAppointment />} />
        <Route path="/viewOrders" element={<ViewOrdersPage />} />
        <Route path="/viewAppt" element={<ViewAppointmentsPage />} />
        <Route path="/adminOrders" element={<AdminOrdersPage />} />
        <Route path="/docAppt" element={<DoctorAppointmentsPage />} />
        <Route path="/viewDocs" element={<ViewDoctorsPage />} />
        <Route path="/viewAdminAppts" element={<ViewAdminAppointmentsPage />} />





      </Routes>
    </Router>
  );
}

export default App;

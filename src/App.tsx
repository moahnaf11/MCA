import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AuctionDashboard from './pages/AuctionDashboard';
import SoldVehicles from './pages/SoldVehicles';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AuctionDashboard />} />
          <Route path="/sold-vehicles" element={<SoldVehicles />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
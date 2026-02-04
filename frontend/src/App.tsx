import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

// Temporary Dashboard Component
// (We define it here for now, but in Phase 3 we will move it to its own file)
const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        
        {/* Widget Grid */}
        <div className="grid gap-4 md:grid-cols-3">
           {/* Widget 1 */}
           <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-gray-500">Glucose Readings</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold">128 mg/dL</div>
               <p className="text-xs text-gray-500 mt-1">+2.5% from last hour</p>
             </CardContent>
           </Card>

           {/* Widget 2 */}
           <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-gray-500">Active Risk Level</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold text-green-600">Low</div>
               <p className="text-xs text-gray-500 mt-1">Based on recent AI analysis</p>
             </CardContent>
           </Card>

           {/* Widget 3 */}
           <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-gray-500">Next Assessment</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold">Today</div>
               <p className="text-xs text-gray-500 mt-1">Scheduled for 14:00 PM</p>
             </CardContent>
           </Card>
        </div>
      </div>
    </AppLayout>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
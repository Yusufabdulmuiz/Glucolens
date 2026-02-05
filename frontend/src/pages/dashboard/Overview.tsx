import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { AppLayout } from '@/components/layout/AppLayout';

export default function DashboardOverview() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
        
        {/* Widget Grid */}
        <div className="grid gap-4 md:grid-cols-3">
           {/* Glucose Widget */}
           <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-gray-500">Glucose Readings</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold">128 mg/dL</div>
               <p className="text-xs text-gray-500 mt-1">+2.5% from last hour</p>
             </CardContent>
           </Card>

           {/* Risk Widget */}
           <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-gray-500">Active Risk Level</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold text-green-600">Low</div>
               <p className="text-xs text-gray-500 mt-1">Based on recent AI analysis</p>
             </CardContent>
           </Card>

           {/* Schedule Widget */}
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
}
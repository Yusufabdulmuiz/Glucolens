import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlucoseChart } from '@/components/dashboard/GlucoseChart';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Activity, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dashboardService, type DashboardStats, type GlucoseDataPoint, type ActivityItem } from '@/services/dashboardService';

export default function DashboardOverview() {
  const navigate = useNavigate();
  
  // State for all our data
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<GlucoseDataPoint[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Run all requests in parallel for speed
        const [statsData, historyData, activityData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getGlucoseHistory(),
          dashboardService.getRecentActivity()
        ]);
        
        setStats(statsData);
        setChartData(historyData);
        setActivities(activityData);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
       <AppLayout>
         <div className="p-8 text-red-500">{error}</div>
       </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Health Overview</h1>
            <p className="text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Button onClick={() => navigate('/assessment')}>
            Start New Assessment <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {/* Top Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-3">
           <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-gray-500">Avg Glucose</CardTitle>
               <Activity className="h-4 w-4 text-gray-400" />
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold">{stats?.avgGlucose} mg/dL</div>
               <p className="text-xs text-green-600 font-medium mt-1">
                  {stats?.glucoseChange && stats.glucoseChange < 0 ? '↓' : '↑'} {Math.abs(stats?.glucoseChange || 0)}% from last week
               </p>
             </CardContent>
           </Card>

           <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-gray-500">Risk Score</CardTitle>
               <AlertCircle className="h-4 w-4 text-gray-400" />
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold text-green-600">{stats?.riskScore}</div>
               <p className="text-xs text-gray-500 mt-1">AI Confidence: {stats?.riskConfidence}%</p>
             </CardContent>
           </Card>

           <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-gray-500">HbA1c Projection</CardTitle>
               <TrendingUp className="h-4 w-4 text-gray-400" />
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold">{stats?.hba1c}%</div>
               <p className="text-xs text-gray-500 mt-1">Estimated based on logs</p>
             </CardContent>
           </Card>
        </div>

        {/* Main Content Split */}
        <div className="grid md:grid-cols-7 gap-6">
          
          {/* Left Column: Chart */}
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Glucose Trends (24h)</CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
               {/* Pass the fetched data to the chart */}
              <GlucoseChart data={chartData} />
            </CardContent>
          </Card>

          {/* Right Column: Recent Activity */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activities.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <div className="ml-auto font-medium text-xs text-gray-500">{item.time}</div>
                  </div>
                ))}
                
                {activities.length === 0 && (
                   <p className="text-sm text-gray-400 text-center py-4">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
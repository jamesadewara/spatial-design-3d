import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, Eye, MousePointerClick, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import SectionHeader from "@/components/SectionHeader";
import TargetCursor from "@/components/TargetCursor";

const trafficData = [
  { name: "Jan", visits: 4000, conversions: 240 },
  { name: "Feb", visits: 3000, conversions: 198 },
  { name: "Mar", visits: 5000, conversions: 380 },
  { name: "Apr", visits: 7800, conversions: 508 },
  { name: "May", visits: 8900, conversions: 623 },
  { name: "Jun", visits: 10200, conversions: 714 },
];

const deviceData = [
  { name: "Desktop", value: 58 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 7 },
];

const COLORS = ["hsl(217, 91%, 60%)", "hsl(330, 81%, 60%)", "hsl(280, 70%, 60%)"];

const Analytics = () => {
  const stats = [
    { icon: Users, label: "Total Visitors", value: "38.9K", change: "+12.5%", positive: true },
    { icon: Eye, label: "Page Views", value: "127.4K", change: "+8.2%", positive: true },
    { icon: MousePointerClick, label: "Conversions", value: "2,663", change: "+15.3%", positive: true },
    { icon: TrendingUp, label: "Conversion Rate", value: "6.8%", change: "+2.1%", positive: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Defer custom cursor load to prevent initial render issues */}
      {typeof window !== 'undefined' && (
        <TargetCursor 
          spinDuration={1}
          hideDefaultCursor={true}
        />
      )}
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeader title="Analytics Dashboard" subtitle="Real-time insights into your website performance"/>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="cursor-target p-6 glass hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                  <span className={`text-sm font-medium ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Traffic Chart */}
            <Card className="p-6 glass cursor-target">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Traffic & Conversions</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Line type="monotone" dataKey="visits" stroke="hsl(217, 91%, 60%)" strokeWidth={2} />
                  <Line type="monotone" dataKey="conversions" stroke="hsl(330, 81%, 60%)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Device Distribution */}
            <Card className="p-6 glass cursor-target">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Device Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      color: "hsl(var(--muted-foreground))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Session Recordings & Heatmaps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Session Recordings */}
            <Card className="p-6 glass cursor-target">
              <h3 className="text-xl font-semibold mb-4">Session Recordings</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((session) => (
                  <div key={session} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="w-16 h-12 rounded bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Session #{session}</div>
                      <div className="text-sm text-muted-foreground">Duration: {3 + session} mins</div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Heatmap Preview */}
            <Card className="p-6 glass cursor-target">
              <h3 className="text-xl font-semibold mb-4">Click Heatmap</h3>
              <div className="relative aspect-video rounded-lg bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MousePointerClick className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Heatmap visualization</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Shows user click patterns and engagement zones
                    </p>
                  </div>
                </div>
                {/* Simulated heat spots */}
                <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-primary/30 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-secondary/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: "0.5s" }} />
              </div>
            </Card>
          </div>

          {/* Integration Info */}
          <Card className="p-6 glass mt-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Analytics Integration</h3>
              <p className="text-muted-foreground mb-4">
                This dashboard shows mock data. Integrate Google Analytics 4 and Microsoft Clarity for real-time insights.
              </p>
              <div className="flex gap-4 justify-center">
                <a 
                  href="https://analytics.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Setup GA4
                </a>
                <a 
                  href="https://clarity.microsoft.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors"
                >
                  Setup Clarity
                </a>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;

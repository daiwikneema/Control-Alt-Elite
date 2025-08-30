import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MetricCard from "@/components/ui/metric-card";
import InteractiveMap from "@/components/ui/interactive-map";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star,
  Users, 
  CheckCircle,
  AlertTriangle,
  Zap,
  Droplets,
  GraduationCap,
  TrendingUp
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  priority: "high" | "medium" | "low";
  payment: number;
  duration: string;
  category: "storm-prep" | "maintenance" | "energy" | "waste";
  status: "available" | "claimed" | "completed";
}

const ServicePartner = () => {
  const [claimedJobs, setClaimedJobs] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const jobs: Job[] = [
    {
      id: "1",
      title: "Clear Rain Garden Inlet - Enmore Park",
      location: "Enmore",
      coordinates: [151.1782, -33.8985], // Enmore coordinates
      priority: "high",
      payment: 20,
      duration: "30 mins",
      category: "storm-prep",
      status: "available"
    },
    {
      id: "2", 
      title: "Check Community Battery Status",
      location: "Newtown",
      coordinates: [151.1795, -33.8968], // Newtown coordinates
      priority: "high", 
      payment: 35,
      duration: "45 mins",
      category: "energy",
      status: "available"
    },
    {
      id: "3",
      title: "Stormwater Drain Inspection",
      location: "Glebe",
      coordinates: [151.1869, -33.8792], // Glebe coordinates
      priority: "high",
      payment: 25,
      duration: "20 mins", 
      category: "storm-prep",
      status: "available"
    },
    {
      id: "4",
      title: "Solar Panel Cleaning",
      location: "Surry Hills",
      coordinates: [151.2099, -33.8886], // Surry Hills coordinates
      priority: "medium",
      payment: 40,
      duration: "1 hour",
      category: "energy", 
      status: "available"
    },
    {
      id: "5",
      title: "E-bike Rebalancing",
      location: "CBD",
      coordinates: [151.2093, -33.8688], // Sydney CBD coordinates
      priority: "medium",
      payment: 15,
      duration: "15 mins",
      category: "maintenance",
      status: "available"
    }
  ];

  const handleClaimJob = (jobId: string) => {
    setClaimedJobs([...claimedJobs, jobId]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "storm-prep": return <Droplets className="w-4 h-4" />;
      case "energy": return <Zap className="w-4 h-4" />;
      case "maintenance": return <Users className="w-4 h-4" />;
      case "waste": return <AlertTriangle className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Service Partner Dashboard
          </h1>
          <p className="text-muted-foreground">
            Find meaningful work that helps build Sydney's resilient future
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Today's Earnings"
            value="$145"
            subtitle="3 jobs completed"
            icon={<DollarSign className="w-4 h-4" />}
            trend="up"
            trendValue="+$45"
            variant="success"
          />
          
          <MetricCard
            title="Available Jobs"
            value="24"
            subtitle="High demand in CBD"
            icon={<MapPin className="w-4 h-4" />}
            trend="up"
            trendValue="+18"
            variant="accent"
          />
          
          <MetricCard
            title="Skill Level"
            value="4.8"
            subtitle="★ Community rating"
            icon={<Star className="w-4 h-4" />}
            trend="up"
            trendValue="+0.2"
          />
          
          <MetricCard
            title="This Week"
            value="12"
            subtitle="Jobs completed"
            icon={<CheckCircle className="w-4 h-4" />}
            trend="up"
            trendValue="+3"
            variant="success"
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Job List/Map */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Available Jobs
                  </CardTitle>
                  <CardDescription>
                    Storm preparation jobs are high priority
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                  <Button 
                    variant={viewMode === "map" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                  >
                    Map
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "list" ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {jobs.map((job) => (
                    <div key={job.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-smooth">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(job.category)}
                            <h3 className="font-semibold text-foreground">{job.title}</h3>
                            <Badge className={getPriorityColor(job.priority)}>
                              {job.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {job.duration}
                            </span>
                            <span className="flex items-center gap-1 text-success font-medium">
                              <DollarSign className="w-3 h-3" />
                              ${job.payment}
                            </span>
                          </div>
                        </div>
                        
                        {claimedJobs.includes(job.id) ? (
                          <Button variant="outline" disabled className="ml-4">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Claimed
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleClaimJob(job.id)}
                            className="ml-4 shadow-glow"
                          >
                            Claim Job
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <InteractiveMap
                  jobs={jobs.map(job => ({
                    id: job.id,
                    title: job.title,
                    location: job.location,
                    coordinates: job.coordinates,
                    priority: job.priority,
                    payment: job.payment,
                    category: job.category,
                  }))}
                  onJobClick={handleClaimJob}
                  className="h-96"
                />
              )}
            </CardContent>
          </Card>

          {/* Skills & Tools */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Skills & Tools
              </CardTitle>
              <CardDescription>
                Unlock higher-paying opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Basic Maintenance</span>
                  <Badge variant="secondary">Certified</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">IoT Sensor Tech</span>
                  <Button variant="outline" size="sm">
                    Take Course
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Solar Specialist</span>
                  <Button variant="outline" size="sm">
                    Start Learning
                  </Button>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-medium mb-3">Demand Heatmap</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>CBD E-bike Rebalancing</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span className="text-destructive">High</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Inner West Maintenance</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="text-warning">Medium</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Community Impact */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Your Impact This Month</CardTitle>
              <CardDescription>Contributing to Sydney's sustainability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">CO₂ Prevented</span>
                  <span className="font-semibold text-success">145kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Equivalent to Planting</span>
                  <span className="font-semibold text-primary">3 trees</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Community Rating</span>
                  <span className="font-semibold text-accent">4.8/5 ★</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Share Impact Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Earnings Breakdown</CardTitle>
              <CardDescription>Weekly performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Base Jobs</span>
                  <span className="font-semibold">$280</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Priority Bonus</span>
                  <span className="font-semibold text-success">+$85</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Skill Premium</span>
                  <span className="font-semibold text-accent">+$45</span>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total This Week</span>
                    <span className="text-lg text-primary">$410</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServicePartner;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/ui/metric-card";
import AlertBanner from "@/components/ui/alert-banner";
import { 
  MapPin, 
  Zap, 
  Droplets, 
  Users, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Play,
  BarChart3
} from "lucide-react";

const CityPlanner = () => {
  const [stormProtocolActive, setStormProtocolActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleStormProtocol = () => {
    setStormProtocolActive(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-surface pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            City Planner Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time oversight of Sydney's responsive urban grid
          </p>
        </div>

        {/* Alerts */}
        <div className="space-y-4 mb-8">
          {!stormProtocolActive && (
            <AlertBanner
              variant="warning"
              title="STORM WARNING"
              description="Severe thunderstorm forecast. Predicted flood risk is HIGH. AI recommends activating Storm Prep Protocol to drain water tanks and create 75 emergency maintenance jobs."
              action={{
                label: "APPROVE ACTION",
                onClick: handleStormProtocol
              }}
            />
          )}
          
          {showSuccess && (
            <AlertBanner
              variant="success"
              title="Storm Protocol Activated"
              description="Successfully initiated city-wide storm preparation. Water tanks draining automatically. 75 high-priority jobs created for Service Partners."
              dismissible
              onDismiss={() => setShowSuccess(false)}
            />
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Energy Generation"
            value="15 MWh"
            subtitle="Decentralized solar today"
            icon={<Zap className="w-4 h-4" />}
            trend="up"
            trendValue="+12%"
            variant="success"
          />
          
          <MetricCard
            title="Water Capacity"
            value={stormProtocolActive ? "78%" : "55%"}
            subtitle="Available stormwater storage"
            icon={<Droplets className="w-4 h-4" />}
            trend={stormProtocolActive ? "up" : "neutral"}
            trendValue={stormProtocolActive ? "+23%" : "stable"}
            variant={stormProtocolActive ? "success" : "warning"}
          />
          
          <MetricCard
            title="Active Jobs"
            value={stormProtocolActive ? "92" : "17"}
            subtitle="Service partners deployed"
            icon={<Users className="w-4 h-4" />}
            trend={stormProtocolActive ? "up" : "neutral"}
            trendValue={stormProtocolActive ? "+75" : "5 pending"}
            variant="accent"
          />
          
          <MetricCard
            title="System Health"
            value="98.2%"
            subtitle="Infrastructure uptime"
            icon={<BarChart3 className="w-4 h-4" />}
            trend="up"
            trendValue="+0.3%"
            variant="success"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Interactive Map */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Sydney Infrastructure Map
              </CardTitle>
              <CardDescription>
                Live view of connected infrastructure and ongoing activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-border overflow-hidden">
                {/* Mock Map Interface */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                
                {/* Map Markers */}
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-success rounded-full animate-pulse shadow-glow"></div>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                
                {stormProtocolActive && (
                  <>
                    <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-warning rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-warning rounded-full animate-ping"></div>
                    <div className="absolute top-2/3 left-2/3 w-4 h-4 bg-warning rounded-full animate-ping"></div>
                  </>
                )}
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Solar Generation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>Water Storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Community Hubs</span>
                    </div>
                    {stormProtocolActive && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                        <span>Storm Prep Active</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Overlay */}
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-sm font-medium text-foreground">Live Status</div>
                  <div className="text-xs text-muted-foreground">
                    {stormProtocolActive ? "Storm Protocol Active" : "Normal Operations"}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-success">Connected</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Panel */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Strategic tools and simulations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                disabled={stormProtocolActive}
              >
                <Play className="w-4 h-4 mr-2" />
                Run Simulation
              </Button>
              
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Financial Analysis
              </Button>
              
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Impact Forecast
              </Button>

              {stormProtocolActive && (
                <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium">Protocol Active</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Storm preparation measures are being executed automatically across the city.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
              <CardDescription>Real-time sustainability metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">CO₂ Reduced Today</span>
                  <span className="font-semibold text-success">2.3 tonnes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Water Conserved</span>
                  <span className="font-semibold text-secondary">8,400L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Waste Diverted</span>
                  <span className="font-semibold text-accent">94%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Economic Performance</CardTitle>
              <CardDescription>Financial benefits and savings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Operational Savings</span>
                  <span className="font-semibold text-primary">$12,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Jobs Created</span>
                  <span className="font-semibold text-secondary">{stormProtocolActive ? "92" : "17"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Community ROI</span>
                  <span className="font-semibold text-success">+18.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CityPlanner;
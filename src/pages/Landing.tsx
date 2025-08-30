import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, BarChart3, Zap, Droplets, Recycle, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const dashboards = [
    {
      title: "City Planner Dashboard",
      description: "Real-time city-wide oversight with AI-powered insights and automated response systems",
      icon: MapPin,
      href: "/city-planner",
      color: "bg-gradient-primary"
    },
    {
      title: "Service Partner Platform", 
      description: "Dynamic job marketplace connecting gig workers with essential infrastructure tasks",
      icon: Users,
      href: "/service-partner",
      color: "bg-gradient-secondary"
    },
    {
      title: "Resident Dashboard",
      description: "Personal utility management with community engagement and impact tracking",
      icon: BarChart3,
      href: "/resident", 
      color: "bg-gradient-accent"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Smart Energy Grid",
      description: "Decentralized solar networks with peer-to-peer energy trading"
    },
    {
      icon: Droplets,
      title: "Water Management",
      description: "Predictive flood prevention and optimized resource distribution"
    },
    {
      icon: Recycle,
      title: "Circular Economy",
      description: "Community-driven waste reduction and resource recovery"
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Measurable environmental and social benefits for all residents"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              AuraGrid
            </h1>
            <p className="text-xl md:text-2xl text-foreground mb-4">
              The Responsive Urban Grid
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transforming Sydney's infrastructure into a responsive, decentralized, and 
              community-powered network through smart technology and local engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/city-planner">
                <Button size="lg" className="w-full sm:w-auto shadow-glow">
                  Explore Platform
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Demo Scenario
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
            <p className="text-lg text-muted-foreground">
              Modern cities face interconnected challenges that require innovative, 
              integrated solutions for a sustainable future.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-destructive">Vulnerable Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Centralized grids struggle with climate shocks and renewable integration
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-warning">Resource Waste</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Inefficient energy, water, and waste systems increase costs and emissions
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-secondary">Economic Instability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gig economy lacks stability and meaningful community contribution
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Integrated Solutions</h2>
            <p className="text-lg text-muted-foreground">
              Three interconnected layers working together to create resilient, 
              efficient, and economically inclusive communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Showcase */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Explore the Platform</h2>
            <p className="text-lg text-muted-foreground">
              Experience how AuraGrid connects city planners, service partners, 
              and residents in a unified ecosystem.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {dashboards.map((dashboard, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth group">
                <CardHeader>
                  <div className={`w-12 h-12 ${dashboard.color} rounded-lg flex items-center justify-center mb-4`}>
                    <dashboard.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{dashboard.title}</CardTitle>
                  <CardDescription>{dashboard.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={dashboard.href}>
                    <Button className="w-full group-hover:shadow-glow transition-smooth">
                      Explore Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your City?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the future of urban sustainability with AuraGrid's integrated platform.
            </p>
            <Link to="/city-planner">
              <Button size="lg" className="shadow-glow">
                Start Demo Experience
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
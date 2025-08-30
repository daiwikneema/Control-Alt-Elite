import { ReactNode } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";

interface AlertBannerProps {
  variant?: "warning" | "success" | "info" | "destructive";
  title?: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const AlertBanner = ({
  variant = "info",
  title,
  description,
  action,
  dismissible = false,
  onDismiss,
  className
}: AlertBannerProps) => {
  const icons = {
    warning: AlertTriangle,
    success: CheckCircle,
    info: Info,
    destructive: AlertTriangle
  };

  const Icon = icons[variant];

  const variantStyles = {
    warning: "border-warning/30 bg-warning/15 text-warning-foreground shadow-warning/10",
    success: "border-success/30 bg-success/15 text-success-foreground shadow-success/10", 
    info: "border-info/30 bg-info/15 text-info-foreground shadow-info/10",
    destructive: "border-destructive/30 bg-destructive/15 text-destructive-foreground shadow-destructive/10"
  };

  return (
    <Alert className={cn(
      "shadow-card border-2",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            {title && (
              <h4 className="font-semibold mb-1 text-foreground">{title}</h4>
            )}
            <AlertDescription className="text-sm text-foreground/90">
              {description}
            </AlertDescription>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          {action && (
            <Button
              size="sm"
              variant={variant === "warning" ? "default" : "secondary"}
              onClick={action.onClick}
              className="transition-smooth"
            >
              {action.label}
            </Button>
          )}
          {dismissible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="h-6 w-6 p-0 hover:bg-foreground/10"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
};

export default AlertBanner;
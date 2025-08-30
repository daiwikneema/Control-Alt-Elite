import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// You'll need to add your Mapbox public token here
// For demo purposes, using a placeholder - in production you'd add this to environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNsZjc4bWdqejAzaGU0M3M0ZWZnZ2JkZzgifQ.placeholder'; // Replace with actual token

interface JobMarker {
  id: string;
  title: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  priority: "high" | "medium" | "low";
  payment: number;
  category: string;
  onJobClick?: (jobId: string) => void;
}

interface InteractiveMapProps {
  jobs: JobMarker[];
  onJobClick?: (jobId: string) => void;
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  jobs, 
  onJobClick,
  className = ""
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Check if we have a valid Mapbox token
    if (!MAPBOX_TOKEN || MAPBOX_TOKEN.includes('placeholder')) {
      // Show fallback UI when no token is available
      if (mapContainer.current) {
        mapContainer.current.innerHTML = `
          <div class="h-full flex items-center justify-center bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg border border-border">
            <div class="text-center p-6">
              <div class="text-lg font-semibold text-foreground mb-2">Interactive Map Ready</div>
              <div class="text-sm text-muted-foreground mb-4">Add your Mapbox token to enable the full map experience</div>
              <div class="text-xs text-muted-foreground">For now, showing job locations:</div>
              <div class="mt-4 space-y-2">
                ${jobs.map(job => `
                  <div class="flex items-center justify-between p-2 bg-card/50 rounded text-xs">
                    <span>${job.title}</span>
                    <span class="text-${job.priority === 'high' ? 'destructive' : job.priority === 'medium' ? 'warning' : 'muted-foreground'}">${job.priority}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }
      return;
    }

    // Initialize map with actual Mapbox
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [151.2093, -33.8688], // Sydney coordinates
      zoom: 11,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each job
    jobs.forEach((job) => {
      const markerColor = job.priority === 'high' ? '#ef4444' : 
                         job.priority === 'medium' ? '#f59e0b' : '#6b7280';
      
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'job-marker';
      markerElement.style.cssText = `
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${markerColor};
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: transform 0.2s ease;
      `;
      
      // Add hover effect
      markerElement.addEventListener('mouseenter', () => {
        markerElement.style.transform = 'scale(1.3)';
      });
      
      markerElement.addEventListener('mouseleave', () => {
        markerElement.style.transform = 'scale(1)';
      });

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 15 }).setHTML(`
        <div class="p-2">
          <div class="font-semibold text-sm">${job.title}</div>
          <div class="text-xs text-gray-600 mb-1">${job.location}</div>
          <div class="text-xs">
            <span class="font-medium text-green-600">$${job.payment}</span>
            <span class="mx-1">•</span>
            <span class="capitalize text-${job.priority === 'high' ? 'red' : job.priority === 'medium' ? 'yellow' : 'gray'}-600">${job.priority} priority</span>
          </div>
          <button 
            onclick="window.handleJobClaim('${job.id}')" 
            class="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
          >
            Claim Job
          </button>
        </div>
      `);

      // Create marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(job.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });

    // Global function for job claiming (accessible from popup)
    (window as any).handleJobClaim = (jobId: string) => {
      if (onJobClick) {
        onJobClick(jobId);
      }
    };

    // Cleanup function
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
    };
  }, [jobs, onJobClick]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="absolute inset-0 rounded-lg overflow-hidden" />
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 text-xs shadow-lg">
        <div className="font-medium mb-2">Job Priorities</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span>Medium Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
            <span>Low Priority</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
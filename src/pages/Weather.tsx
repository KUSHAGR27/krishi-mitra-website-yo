import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Thermometer,
  Eye,
  Droplets,
  ArrowLeft,
  MapPin,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  description: string;
  icon: string;
}

interface ForecastData {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

const Weather = () => {
  const navigate = useNavigate();
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [location, setLocation] = useState<string>("Getting location...");
  const [loading, setLoading] = useState(true);

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain') || lowerCondition.includes('shower')) {
      return <CloudRain className="h-16 w-16 text-blue-500" />;
    } else if (lowerCondition.includes('snow')) {
      return <CloudSnow className="h-16 w-16 text-blue-200" />;
    } else if (lowerCondition.includes('cloud')) {
      return <Cloud className="h-16 w-16 text-gray-500" />;
    } else {
      return <Sun className="h-16 w-16 text-yellow-500" />;
    }
  };

  const getBackgroundClass = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain')) {
      return "bg-gradient-to-br from-gray-600 via-gray-700 to-blue-800";
    } else if (lowerCondition.includes('snow')) {
      return "bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400";
    } else if (lowerCondition.includes('cloud')) {
      return "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600";
    } else {
      return "bg-gradient-to-br from-blue-400 via-blue-500 to-yellow-400";
    }
  };

  const fetchWeatherData = async () => {
    try {
      // Get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          // Mock weather data for demo (replace with actual AccuWeather API call)
          const mockCurrentWeather: WeatherData = {
            temperature: Math.floor(Math.random() * 20) + 20,
            condition: "Partly Cloudy",
            humidity: Math.floor(Math.random() * 30) + 50,
            windSpeed: Math.floor(Math.random() * 10) + 5,
            visibility: Math.floor(Math.random() * 5) + 10,
            description: "A partly cloudy day with comfortable temperatures",
            icon: "partly-cloudy"
          };

          const mockForecast: ForecastData[] = [
            { date: "2024-01-15", day: "Today", high: 28, low: 18, condition: "Sunny", icon: "sunny" },
            { date: "2024-01-16", day: "Tomorrow", high: 30, low: 20, condition: "Partly Cloudy", icon: "partly-cloudy" },
            { date: "2024-01-17", day: "Wednesday", high: 26, low: 16, condition: "Light Rain", icon: "rainy" },
            { date: "2024-01-18", day: "Thursday", high: 24, low: 14, condition: "Cloudy", icon: "cloudy" },
            { date: "2024-01-19", day: "Friday", high: 27, low: 17, condition: "Sunny", icon: "sunny" },
          ];

          setCurrentWeather(mockCurrentWeather);
          setForecast(mockForecast);
          setLocation(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`);
          setLoading(false);
        });
      }
    } catch (error) {
      console.error("Weather fetch error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading weather data...</p>
        </div>
      </div>
    );
  }

  const backgroundClass = currentWeather ? getBackgroundClass(currentWeather.condition) : "bg-gradient-to-br from-blue-400 to-blue-600";

  return (
    <div className={`min-h-screen ${backgroundClass} text-white`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="outline" 
            className="bg-white/20 border-white/30 hover:bg-white/30 text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Weather Forecast</h1>
        </div>

        {/* Current Weather */}
        {currentWeather && (
          <Card className="mb-6 bg-white/10 border-white/20 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    {getWeatherIcon(currentWeather.condition)}
                    <div>
                      <div className="text-4xl md:text-6xl font-bold text-white">
                        {currentWeather.temperature}°C
                      </div>
                      <div className="text-lg text-white/80">{currentWeather.condition}</div>
                    </div>
                  </div>
                  <p className="text-white/70">{currentWeather.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <Droplets className="h-6 w-6 mx-auto mb-2 text-blue-300" />
                    <div className="text-sm text-white/70">Humidity</div>
                    <div className="text-lg font-semibold text-white">{currentWeather.humidity}%</div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <Wind className="h-6 w-6 mx-auto mb-2 text-green-300" />
                    <div className="text-sm text-white/70">Wind Speed</div>
                    <div className="text-lg font-semibold text-white">{currentWeather.windSpeed} km/h</div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <Eye className="h-6 w-6 mx-auto mb-2 text-purple-300" />
                    <div className="text-sm text-white/70">Visibility</div>
                    <div className="text-lg font-semibold text-white">{currentWeather.visibility} km</div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <Thermometer className="h-6 w-6 mx-auto mb-2 text-red-300" />
                    <div className="text-sm text-white/70">Feels Like</div>
                    <div className="text-lg font-semibold text-white">{currentWeather.temperature + 2}°C</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 5-Day Forecast */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              5-Day Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-sm text-white/70 mb-2">{day.day}</div>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <div className="text-sm text-white/80 mb-2">{day.condition}</div>
                  <div className="flex justify-between text-white">
                    <span className="font-semibold">{day.high}°</span>
                    <span className="text-white/70">{day.low}°</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agricultural Advisory */}
        <Card className="mt-6 bg-white/10 border-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white">Agricultural Advisory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-white/90">
              <div className="bg-green-500/20 rounded-lg p-3">
                <h4 className="font-semibold mb-1">Good Conditions for Planting</h4>
                <p className="text-sm">Current weather conditions are favorable for sowing winter crops. Soil moisture is adequate.</p>
              </div>
              <div className="bg-yellow-500/20 rounded-lg p-3">
                <h4 className="font-semibold mb-1">Irrigation Advice</h4>
                <p className="text-sm">Light rainfall expected in 2 days. You may reduce irrigation accordingly.</p>
              </div>
              <div className="bg-blue-500/20 rounded-lg p-3">
                <h4 className="font-semibold mb-1">Weather Alert</h4>
                <p className="text-sm">Moderate wind speeds expected. Secure loose structures and avoid spraying operations.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weather;
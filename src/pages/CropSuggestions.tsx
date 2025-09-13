import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  MapPin,
  Thermometer,
  Droplets,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CropRecommendation {
  id: string;
  name: string;
  nameHindi: string;
  suitabilityScore: number;
  season: string;
  plantingMonth: string;
  harvestMonth: string;
  waterRequirement: string;
  soilType: string;
  expectedYield: string;
  marketPrice: string;
  profitability: 'High' | 'Medium' | 'Low';
  growthDuration: string;
  benefits: string[];
  risks: string[];
}

const CropSuggestions = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>("Getting location...");
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [season, setSeason] = useState<string>("Rabi");
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<CropRecommendation | null>(null);
  const [loading, setLoading] = useState(true);

  const mockCropData: CropRecommendation[] = [
    {
      id: "wheat",
      name: "Wheat",
      nameHindi: "गेहूं",
      suitabilityScore: 95,
      season: "Rabi",
      plantingMonth: "November-December",
      harvestMonth: "April-May",
      waterRequirement: "Medium (450-650mm)",
      soilType: "Loamy, Well-drained",
      expectedYield: "40-50 quintals/hectare",
      marketPrice: "₹2,200-2,500/quintal",
      profitability: "High",
      growthDuration: "120-150 days",
      benefits: [
        "High market demand",
        "Government procurement guarantee",
        "Good storage life",
        "Multiple varieties available"
      ],
      risks: [
        "Susceptible to rust diseases",
        "Requires timely irrigation",
        "Price fluctuations"
      ]
    },
    {
      id: "mustard",
      name: "Mustard",
      nameHindi: "सरसों",
      suitabilityScore: 88,
      season: "Rabi",
      plantingMonth: "October-November",
      harvestMonth: "February-March",
      waterRequirement: "Low (300-400mm)",
      soilType: "Sandy loam to clay loam",
      expectedYield: "12-18 quintals/hectare",
      marketPrice: "₹5,000-6,000/quintal",
      profitability: "High",
      growthDuration: "90-120 days",
      benefits: [
        "High oil content",
        "Good market price",
        "Less water requirement",
        "Pest resistant varieties"
      ],
      risks: [
        "Aphid attacks",
        "Market price volatility",
        "Storage challenges"
      ]
    },
    {
      id: "gram",
      name: "Chickpea (Gram)",
      nameHindi: "चना",
      suitabilityScore: 85,
      season: "Rabi",
      plantingMonth: "October-November",
      harvestMonth: "March-April",
      waterRequirement: "Low (300-400mm)",
      soilType: "Well-drained loamy soil",
      expectedYield: "20-25 quintals/hectare",
      marketPrice: "₹5,500-6,500/quintal",
      profitability: "High",
      growthDuration: "90-120 days",
      benefits: [
        "High protein content",
        "Nitrogen fixing crop",
        "Good market demand",
        "Drought tolerant"
      ],
      risks: [
        "Pod borer attacks",
        "Wilt disease",
        "Hail damage risk"
      ]
    },
    {
      id: "barley",
      name: "Barley",
      nameHindi: "जौ",
      suitabilityScore: 78,
      season: "Rabi",
      plantingMonth: "November-December",
      harvestMonth: "April-May",
      waterRequirement: "Medium (450-500mm)",
      soilType: "Sandy loam to clay loam",
      expectedYield: "35-45 quintals/hectare",
      marketPrice: "₹1,800-2,200/quintal",
      profitability: "Medium",
      growthDuration: "110-140 days",
      benefits: [
        "Hardy crop",
        "Multiple uses (food, feed, malt)",
        "Tolerates saline conditions",
        "Good for marginal lands"
      ],
      risks: [
        "Lower market price",
        "Limited processing facilities",
        "Competition from wheat"
      ]
    }
  ];

  const getProfitabilityColor = (profitability: string) => {
    switch (profitability) {
      case 'High': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-yellow-500';
    if (score >= 70) return 'text-orange-500';
    return 'text-red-500';
  };

  useEffect(() => {
    // Mock location and weather data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`);
      });
    }

    // Mock weather data
    setTemperature(Math.floor(Math.random() * 10) + 20);
    setHumidity(Math.floor(Math.random() * 30) + 50);
    
    // Sort recommendations by suitability score
    const sortedRecommendations = [...mockCropData].sort((a, b) => b.suitabilityScore - a.suitabilityScore);
    setRecommendations(sortedRecommendations);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-xl text-green-700">Analyzing crop suitability...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="outline" 
            className="border-green-200 hover:bg-green-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">Crop Recommendations</h1>
        </div>

        {/* Current Conditions */}
        <Card className="mb-6 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Current Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">Location</div>
                  <div className="font-semibold">{location}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-red-500" />
                <div>
                  <div className="text-sm text-gray-600">Temperature</div>
                  <div className="font-semibold">{temperature}°C</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm text-gray-600">Humidity</div>
                  <div className="font-semibold">{humidity}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="text-sm text-gray-600">Season</div>
                  <div className="font-semibold">{season}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crop Recommendations List */}
          <div>
            <h2 className="text-xl font-bold text-green-800 mb-4">Recommended Crops</h2>
            <div className="space-y-4">
              {recommendations.map((crop) => (
                <Card 
                  key={crop.id} 
                  className={`cursor-pointer transition-all border-green-200 hover:shadow-md ${
                    selectedCrop?.id === crop.id ? 'ring-2 ring-green-500' : ''
                  }`}
                  onClick={() => setSelectedCrop(crop)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{crop.name}</h3>
                        <p className="text-sm text-gray-600">{crop.nameHindi}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getSuitabilityColor(crop.suitabilityScore)}`}>
                          {crop.suitabilityScore}%
                        </div>
                        <div className="text-xs text-gray-500">Suitability</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-green-300">
                        {crop.season}
                      </Badge>
                      <Badge className={getProfitabilityColor(crop.profitability)}>
                        {crop.profitability} Profit
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        <span>{crop.growthDuration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-gray-500" />
                        <span>{crop.marketPrice}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Detailed Crop Information */}
          <div>
            {selectedCrop ? (
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6" />
                    {selectedCrop.name} ({selectedCrop.nameHindi})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Planting Details</h4>
                      <div className="space-y-1 text-sm">
                        <div><span className="font-medium">Planting:</span> {selectedCrop.plantingMonth}</div>
                        <div><span className="font-medium">Harvest:</span> {selectedCrop.harvestMonth}</div>
                        <div><span className="font-medium">Duration:</span> {selectedCrop.growthDuration}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Growing Conditions</h4>
                      <div className="space-y-1 text-sm">
                        <div><span className="font-medium">Water:</span> {selectedCrop.waterRequirement}</div>
                        <div><span className="font-medium">Soil:</span> {selectedCrop.soilType}</div>
                        <div><span className="font-medium">Season:</span> {selectedCrop.season}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        Expected Returns
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div><span className="font-medium">Yield:</span> {selectedCrop.expectedYield}</div>
                        <div><span className="font-medium">Price:</span> {selectedCrop.marketPrice}</div>
                        <div><span className="font-medium">Profitability:</span> 
                          <Badge className={`ml-1 ${getProfitabilityColor(selectedCrop.profitability)}`}>
                            {selectedCrop.profitability}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-green-700">Benefits</h4>
                    <ul className="text-sm space-y-1">
                      {selectedCrop.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-orange-700">Risks & Challenges</h4>
                    <ul className="text-sm space-y-1">
                      {selectedCrop.risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Clock className="h-3 w-3 text-orange-500 mt-0.5" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Get Detailed Growing Guide
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-green-200">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <TrendingUp className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Crop</h3>
                  <p className="text-gray-500">Click on any crop from the list to see detailed information and growing guidelines.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropSuggestions;
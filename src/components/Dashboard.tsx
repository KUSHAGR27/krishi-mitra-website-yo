import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sprout, 
  AlertTriangle, 
  Calendar, 
  Droplets, 
  Thermometer,
  Sun
} from "lucide-react";

interface DashboardProps {
  isHindi: boolean;
}

const Dashboard = ({ isHindi }: DashboardProps) => {
  return (
    <div className="space-y-6 p-6">
      {/* Crop Progress Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-agricultural" />
            {isHindi ? "फसल प्रगति डैशबोर्ड" : "Crop Progress Dashboard"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {isHindi ? "धान (बुआई से 45 दिन)" : "Rice (45 days from sowing)"}
                </span>
                <Badge variant="secondary">75%</Badge>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {isHindi ? "अगला चरण: फूल आना (15 दिन में)" : "Next stage: Flowering (in 15 days)"}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {isHindi ? "गेहूं (बुआई से 30 दिन)" : "Wheat (30 days from sowing)"}
                </span>
                <Badge variant="secondary">60%</Badge>
              </div>
              <Progress value={60} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {isHindi ? "अगला चरण: कल्ले निकलना (10 दिन में)" : "Next stage: Tillering (in 10 days)"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warnings/Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            {isHindi ? "चेतावनी और अलर्ट" : "Warnings & Alerts"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="font-medium text-red-700">
                {isHindi ? "मौसम चेतावनी" : "Weather Alert"}
              </span>
            </div>
            <p className="text-sm text-red-600">
              {isHindi 
                ? "अगले 48 घंटों में भारी बारिश की संभावना। फसल की सुरक्षा करें।"
                : "Heavy rainfall expected in next 48 hours. Protect your crops."
              }
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-yellow-600" />
              <span className="font-medium text-yellow-700">
                {isHindi ? "कार्य अनुस्मारक" : "Task Reminder"}
              </span>
            </div>
            <p className="text-sm text-yellow-600">
              {isHindi 
                ? "15 दिन में यूरिया का छिड़काव करना है (धान की फसल के लिए)"
                : "Apply Urea fertilizer in 15 days (for rice crop)"
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Fertilizer Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            {isHindi ? "उर्वरक सिफारिशें" : "Fertilizer Recommendations"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">
                  {isHindi ? "यूरिया" : "Urea"}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {isHindi ? "25 किग्रा प्रति एकड़" : "25 kg per acre"}
                </p>
                <Button size="sm" variant="agricultural" className="w-full">
                  {isHindi ? "अभी ऑर्डर करें" : "Order Now"}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">DAP</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {isHindi ? "20 किग्रा प्रति एकड़" : "20 kg per acre"}
                </p>
                <Button size="sm" variant="agricultural" className="w-full">
                  {isHindi ? "अभी ऑर्डर करें" : "Order Now"}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">
                  {isHindi ? "पोटाश" : "Potash"}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {isHindi ? "15 किग्रा प्रति एकड़" : "15 kg per acre"}
                </p>
                <Button size="sm" variant="agricultural" className="w-full">
                  {isHindi ? "अभी ऑर्डर करें" : "Order Now"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Weather Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            {isHindi ? "आज का मौसम" : "Today's Weather"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Thermometer className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <p className="font-medium">28°C</p>
              <p className="text-xs text-muted-foreground">
                {isHindi ? "तापमान" : "Temperature"}
              </p>
            </div>
            <div className="text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="font-medium">65%</p>
              <p className="text-xs text-muted-foreground">
                {isHindi ? "आर्द्रता" : "Humidity"}
              </p>
            </div>
            <div className="text-center">
              <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <p className="font-medium">
                {isHindi ? "धूप" : "Sunny"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isHindi ? "मौसम" : "Condition"}
              </p>
            </div>
            <div className="text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              <p className="font-medium">0mm</p>
              <p className="text-xs text-muted-foreground">
                {isHindi ? "बारिश" : "Rainfall"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
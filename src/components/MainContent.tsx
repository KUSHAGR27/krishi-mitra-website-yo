import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Mic, Sprout, TrendingUp, Users, Shield, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-agriculture.jpg";

interface MainContentProps {
  isHindi: boolean;
}

const MainContent = ({ isHindi }: MainContentProps) => {
  const [location, setLocation] = useState("");
  const [cropSuggestion, setCropSuggestion] = useState("");
  const { toast } = useToast();

  const featuresCards = [
    {
      icon: MapPin,
      title: isHindi ? "मेरे स्थान के लिए सर्वोत्तम फसल" : "Best Crop for My Location",
      description: isHindi 
        ? "अपने स्थान के आधार पर सबसे उपयुक्त फसल की सिफारिश पाएं"
        : "Get recommendations for the most suitable crops based on your location",
      action: "checkCrop"
    },
    {
      icon: TrendingUp,
      title: isHindi ? "नवीनतम सरकारी योजनाएं" : "Latest Government Schemes",
      description: isHindi
        ? "किसानों के लिए नई और अपडेटेड सरकारी योजनाओं की जानकारी"
        : "Information about new and updated government schemes for farmers",
      action: "schemes"
    },
    {
      icon: Users,
      title: isHindi ? "किसान समुदाय" : "Farmer Community",
      description: isHindi
        ? "अन्य किसानों से जुड़ें और अनुभव साझा करें"
        : "Connect with other farmers and share experiences",
      action: "community"
    },
    {
      icon: Shield,
      title: isHindi ? "फसल सुरक्षा" : "Crop Protection",
      description: isHindi
        ? "कीट-पतंगों और बीमारियों से फसल की सुरक्षा के उपाय"
        : "Measures to protect crops from pests and diseases",
      action: "protection"
    }
  ];

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          
          // Mock crop suggestion based on location
          const suggestions = isHindi 
            ? ["धान (Rice)", "गेहूं (Wheat)", "मक्का (Corn)", "सरसों (Mustard)"]
            : ["Rice", "Wheat", "Corn", "Mustard"];
          
          const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
          setCropSuggestion(randomSuggestion);
          
          toast({
            title: isHindi ? "स्थान मिला!" : "Location Found!",
            description: isHindi 
              ? `आपके स्थान के लिए सुझावित फसल: ${randomSuggestion}`
              : `Suggested crop for your location: ${randomSuggestion}`,
          });
        },
        (error) => {
          toast({
            title: isHindi ? "त्रुटि" : "Error",
            description: isHindi 
              ? "स्थान प्राप्त करने में असमर्थ। कृपया मैन्युअल रूप से दर्ज करें।"
              : "Unable to get location. Please enter manually.",
            variant: "destructive"
          });
        }
      );
    }
  };

  const handleCardAction = (action: string) => {
    switch (action) {
      case "checkCrop":
        handleGetLocation();
        break;
      case "schemes":
        toast({
          title: isHindi ? "योजनाएं" : "Schemes",
          description: isHindi 
            ? "बाएं साइडबार में सरकारी योजनाएं देखें"
            : "Check government schemes in the left sidebar"
        });
        break;
      case "community":
        toast({
          title: isHindi ? "समुदाय" : "Community",
          description: isHindi 
            ? "यह सुविधा जल्द ही उपलब्ध होगी"
            : "This feature will be available soon"
        });
        break;
      case "protection":
        toast({
          title: isHindi ? "फसल सुरक्षा" : "Crop Protection",
          description: isHindi 
            ? "कृषि बॉट से पूछें या विशेषज्ञ से संपर्क करें"
            : "Ask KrishiBot or contact an expert"
        });
        break;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-primary/90 to-primary overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-primary-foreground">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {isHindi ? "कृषि मित्र में आपका स्वागत है" : "Welcome to KrishiMitra"}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-4">
              {isHindi 
                ? "आपका स्मार्ट कृषि सलाह साथी"
                : "Your Smart Agricultural Advisory Partner"
              }
            </p>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Phone className="h-4 w-4" />
              {isHindi ? "24/7 सहायता उपलब्ध" : "24/7 Support Available"}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {isHindi ? "त्वरित सेवाएं" : "Quick Services"}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {featuresCards.map((feature, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCardAction(feature.action)}
              >
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    {feature.description}
                  </p>
                  <Button variant="farmer" size="sm" className="w-full">
                    {isHindi ? "शुरू करें" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Location Input for Manual Entry */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sprout className="h-5 w-5 text-primary" />
                {isHindi ? "फसल सुझाव जांचकर्ता" : "Crop Suggestion Checker"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 mb-4">
                <Input
                  placeholder={isHindi 
                    ? "अपना स्थान दर्ज करें या GPS का उपयोग करें"
                    : "Enter your location or use GPS"
                  }
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" onClick={handleGetLocation}>
                  <MapPin className="h-4 w-4 mr-2" />
                  GPS
                </Button>
                <Button variant="outline">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              
              {cropSuggestion && (
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <h3 className="font-semibold text-success mb-2">
                    {isHindi ? "सुझावित फसल:" : "Suggested Crop:"}
                  </h3>
                  <p className="text-success-foreground font-medium">{cropSuggestion}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Quick Stats */}
        <section className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-primary mb-1">50,000+</div>
              <div className="text-sm text-muted-foreground">
                {isHindi ? "पंजीकृत किसान" : "Registered Farmers"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-success mb-1">1,200+</div>
              <div className="text-sm text-muted-foreground">
                {isHindi ? "सफल परामर्श" : "Successful Consultations"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-warning mb-1">95%</div>
              <div className="text-sm text-muted-foreground">
                {isHindi ? "संतुष्टि दर" : "Satisfaction Rate"}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default MainContent;
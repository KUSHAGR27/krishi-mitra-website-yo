import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  MessageSquare, 
  Send, 
  IndianRupee,
  Bot,
  Mic,
  Camera,
  Upload,
  Shield,
  CreditCard,
  Phone,
  Video,
  HelpCircle,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

interface ResponsiveSidebarProps {
  isHindi: boolean;
}

const ResponsiveSidebar = ({ isHindi }: ResponsiveSidebarProps) => {
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [soilCondition, setSoilCondition] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(isHindi ? "hindi" : "english");
  const { toast } = useToast();
  const { state } = useSidebar();

  const governmentSchemes = [
    {
      id: "pm-kisan",
      name: isHindi ? "पीएम किसान सम्मान निधि" : "PM-Kisan Samman Nidhi",
      shortDesc: isHindi ? "₹6000 वार्षिक सहायता" : "₹6000 annual support",
      details: isHindi 
        ? "प्रधानमंत्री किसान सम्मान निधि योजना के तहत छोटे और सीमांत किसानों को प्रति वर्ष ₹6000 की आर्थिक सहायता प्रदान की जाती है। यह राशि तीन किश्तों में ₹2000 की दर से दी जाती है।"
        : "Under PM-Kisan Samman Nidhi scheme, small and marginal farmers receive ₹6000 annual financial assistance. This amount is given in three installments of ₹2000 each."
    },
    {
      id: "soil-health",
      name: isHindi ? "मृदा स्वास्थ्य कार्ड" : "Soil Health Card",
      shortDesc: isHindi ? "मिट्टी की जांच निःशुल्क" : "Free soil testing",
      details: isHindi
        ? "मृदा स्वास्थ्य कार्ड योजना के तहत किसानों को अपनी मिट्टी की पोषक तत्वों की स्थिति की जानकारी प्रदान की जाती है। इससे किसान सही मात्रा में खाद और उर्वरक का उपयोग कर सकते हैं।"
        : "Under Soil Health Card scheme, farmers get information about nutrient status of their soil. This helps farmers use appropriate amounts of fertilizers and nutrients."
    },
    {
      id: "pmfby",
      name: isHindi ? "प्रधानमंत्री फसल बीमा योजना" : "PM Fasal Bima Yojana (PMFBY)",
      shortDesc: isHindi ? "फसल बीमा सुरक्षा" : "Crop insurance protection",
      details: isHindi
        ? "प्राकृतिक आपदाओं, कीट और रोगों के कारण फसल हानि की स्थिति में किसानों को बीमा राशि प्रदान की जाती है। यह योजना कम प्रीमियम पर व्यापक कवरेज प्रदान करती है।"
        : "Farmers are provided insurance amount in case of crop loss due to natural disasters, pests and diseases. This scheme provides comprehensive coverage at low premium."
    },
    {
      id: "kcc",
      name: isHindi ? "किसान क्रेडिट कार्ड" : "Kisan Credit Card (KCC)",
      shortDesc: isHindi ? "आसान कृषि ऋण" : "Easy agricultural loan",
      details: isHindi
        ? "किसान क्रेडिट कार्ड के माध्यम से किसानों को कम ब्याज दर पर कृषि कार्यों के लिए ऋण उपलब्ध कराया जाता है। यह फसल की जरूरतों को पूरा करने में मदद करता है।"
        : "Through Kisan Credit Card, farmers get loans at low interest rates for agricultural activities. This helps meet crop requirements."
    }
  ];

  const handleSchemeClick = (schemeId: string) => {
    setExpandedScheme(expandedScheme === schemeId ? null : schemeId);
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      toast({
        title: isHindi ? "धन्यवाद!" : "Thank you!",
        description: isHindi 
          ? "आपकी प्रतिक्रिया सफलतापूर्वक भेजी गई है।" 
          : "Your feedback has been submitted successfully.",
      });
      setFeedback("");
    }
  };

  const handleChatSubmit = () => {
    if (chatMessage.trim()) {
      toast({
        title: isHindi ? "संदेश भेजा गया" : "Message Sent",
        description: isHindi 
          ? "आपका संदेश AI बॉट को भेज दिया गया है।"
          : "Your message has been sent to the AI bot."
      });
      setChatMessage("");
    }
  };

  const handlePhotoUpload = () => {
    toast({
      title: isHindi ? "फोटो अपलोड" : "Photo Upload",
      description: isHindi 
        ? "यह फीचर जल्द ही उपलब्ध होगा।"
        : "This feature will be available soon."
    });
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r">
      <SidebarContent className="overflow-y-auto">
        <div className="p-2 md:p-4 space-y-3 md:space-y-4">
          {/* AI Chatbot Section */}
          <Card>
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                <Bot className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                {!isCollapsed && (isHindi ? "AI चैटबॉट" : "AI Chatbot")}
              </CardTitle>
            </CardHeader>
            {!isCollapsed && (
              <CardContent className="space-y-2 md:space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder={isHindi ? "अपना सवाल पूछें..." : "Ask your question..."}
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="text-xs md:text-sm"
                  />
                  <Button 
                    onClick={handleChatSubmit}
                    size="icon"
                    variant="agricultural"
                    disabled={!chatMessage.trim()}
                  >
                    <Send className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    <Mic className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    {isHindi ? "बोलें" : "Voice"}
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    <Globe className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    {selectedLanguage === "hindi" ? "हिं" : "EN"}
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Upload Farm Photo Section */}
          <Card>
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                <Camera className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                {!isCollapsed && (isHindi ? "खेत की फोटो अपलोड" : "Upload Farm Photo")}
              </CardTitle>
            </CardHeader>
            {!isCollapsed && (
              <CardContent className="space-y-2 md:space-y-3">
                <Button 
                  onClick={handlePhotoUpload}
                  variant="outline" 
                  className="w-full text-xs md:text-sm"
                >
                  <Upload className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  {isHindi ? "फोटो चुनें" : "Choose Photo"}
                </Button>
                <div className="space-y-2">
                  <Label className="text-xs md:text-sm">
                    {isHindi ? "मिट्टी की स्थिति" : "Soil Condition"}
                  </Label>
                  <select 
                    className="w-full p-2 text-xs md:text-sm border border-border rounded"
                    value={soilCondition}
                    onChange={(e) => setSoilCondition(e.target.value)}
                  >
                    <option value="">
                      {isHindi ? "चुनें" : "Select"}
                    </option>
                    <option value="dry">
                      {isHindi ? "सूखी" : "Dry"}
                    </option>
                    <option value="moist">
                      {isHindi ? "नम" : "Moist"}
                    </option>
                    <option value="wet">
                      {isHindi ? "गीली" : "Wet"}
                    </option>
                  </select>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Government Schemes Section */}
          <Card>
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                <FileText className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                {!isCollapsed && (isHindi ? "सरकारी योजनाएं" : "Government Schemes")}
              </CardTitle>
            </CardHeader>
            {!isCollapsed && (
              <CardContent className="space-y-2">
                {governmentSchemes.map((scheme) => (
                  <div key={scheme.id} className="border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-2 md:p-3 h-auto text-left"
                      onClick={() => handleSchemeClick(scheme.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1">
                          <div className="font-medium text-xs md:text-sm">{scheme.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <IndianRupee className="h-3 w-3" />
                            {scheme.shortDesc}
                          </div>
                        </div>
                        {expandedScheme === scheme.id ? 
                          <ChevronDown className="h-3 w-3 md:h-4 md:w-4" /> : 
                          <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                        }
                      </div>
                    </Button>
                    
                    {expandedScheme === scheme.id && (
                      <div className="px-2 md:px-3 pb-2 md:pb-3">
                        <div className="text-xs text-foreground bg-background p-2 md:p-3 rounded border-t border-border">
                          {scheme.details}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            )}
          </Card>

          {/* Insurance & Loan Section */}
          <Card>
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                {!isCollapsed && (isHindi ? "बीमा और लोन" : "Insurance & Loan")}
              </CardTitle>
            </CardHeader>
            {!isCollapsed && (
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-background rounded">
                    <span className="text-xs md:text-sm">
                      {isHindi ? "SBI कृषि लोन" : "SBI Agri Loan"}
                    </span>
                    <span className="text-xs md:text-sm font-medium text-agricultural">7.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background rounded">
                    <span className="text-xs md:text-sm">
                      {isHindi ? "PMFBY बीमा" : "PMFBY Insurance"}
                    </span>
                    <span className="text-xs md:text-sm font-medium text-agricultural">₹50/acre</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Help Section */}
          <Card>
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                <HelpCircle className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                {!isCollapsed && (isHindi ? "सहायता" : "Help")}
              </CardTitle>
            </CardHeader>
            {!isCollapsed && (
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  999333xxxx
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  98765432XX
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Video className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  {isHindi ? "वीडियो सहायता" : "Video Support"}
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Feedback Section */}
          <Card>
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                {!isCollapsed && (isHindi ? "प्रतिक्रिया" : "Feedback")}
              </CardTitle>
            </CardHeader>
            {!isCollapsed && (
              <CardContent className="space-y-2 md:space-y-3">
                <Textarea
                  placeholder={isHindi 
                    ? "आपकी सुझाव या समस्या साझा करें..."
                    : "Share your suggestions or problems..."
                  }
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[60px] text-xs md:text-sm"
                />
                <Button 
                  onClick={handleFeedbackSubmit}
                  variant="agricultural"
                  size="sm"
                  className="w-full text-xs"
                  disabled={!feedback.trim()}
                >
                  <Send className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  {isHindi ? "भेजें" : "Submit"}
                </Button>
              </CardContent>
            )}
          </Card>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default ResponsiveSidebar;
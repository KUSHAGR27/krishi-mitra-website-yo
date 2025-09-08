import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight, FileText, MessageSquare, Send, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  isHindi: boolean;
}

const Sidebar = ({ isHindi }: SidebarProps) => {
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

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

  return (
    <aside className="w-80 bg-muted/30 border-r border-border h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Government Schemes Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5 text-primary" />
              {isHindi ? "सरकारी योजनाएं" : "Government Schemes"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {governmentSchemes.map((scheme) => (
              <div key={scheme.id} className="border border-border rounded-lg">
                <Button
                  variant="ghost"
                  className="w-full justify-start p-3 h-auto text-left"
                  onClick={() => handleSchemeClick(scheme.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{scheme.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <IndianRupee className="h-3 w-3" />
                        {scheme.shortDesc}
                      </div>
                    </div>
                    {expandedScheme === scheme.id ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </div>
                </Button>
                
                {expandedScheme === scheme.id && (
                  <div className="px-3 pb-3">
                    <div className="text-xs text-foreground bg-background p-3 rounded border-t border-border">
                      {scheme.details}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Feedback Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-5 w-5 text-primary" />
              {isHindi ? "प्रतिक्रिया" : "Feedback"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              placeholder={isHindi 
                ? "आपकी सुझाव या समस्या साझा करें..."
                : "Share your suggestions or problems..."
              }
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[80px] text-sm"
            />
            <Button 
              onClick={handleFeedbackSubmit}
              variant="agricultural"
              size="sm"
              className="w-full"
              disabled={!feedback.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              {isHindi ? "भेजें" : "Submit"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};

export default Sidebar;
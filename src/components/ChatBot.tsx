import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface ChatBotProps {
  isHindi: boolean;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = ({ isHindi }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: isHindi 
        ? "नमस्ते! मैं कृषि बॉट हूं। मैं आपकी कृषि संबंधी समस्याओं में मदद कर सकता हूं।"
        : "Hello! I'm KrishiBot. I can help you with your farming-related queries.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const predefinedResponses = {
    hindi: {
      "मौसम": "आज का मौसम फसल के लिए अनुकूल है। आर्द्रता 65% है और तापमान 28°C है।",
      "उर्वरक": "आपकी मिट्टी के प्रकार के अनुसार, यूरिया और DAP का उपयोग करें। विस्तृत जानकारी के लिए मृदा जांच कराएं।",
      "बीज": "इस सीजन के लिए उच्च गुणवत्ता वाले हाइब्रिड बीजों का चयन करें। स्थानीय कृषि विभाग से संपर्क करें।",
      "फसल": "आपके क्षेत्र के लिए धान, गेहूं, और दलहन की फसलें उपयुक्त हैं।",
      "default": "मैं समझ नहीं पाया। कृपया मौसम, उर्वरक, बीज, या फसल के बारे में पूछें।"
    },
    english: {
      "weather": "Today's weather is suitable for crops. Humidity is 65% and temperature is 28°C.",
      "fertilizer": "Based on your soil type, use Urea and DAP. Get detailed soil testing for precise recommendations.",
      "seeds": "Choose high-quality hybrid seeds for this season. Contact your local agriculture department.",
      "crop": "Rice, wheat, and pulses are suitable crops for your region.",
      "default": "I don't understand. Please ask about weather, fertilizer, seeds, or crops."
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase();
      const responses = isHindi ? predefinedResponses.hindi : predefinedResponses.english;
      
      let botResponse = isHindi ? responses.default : responses.default;
      
      // Simple keyword matching
      if (isHindi) {
        if (lowerInput.includes("मौसम")) botResponse = responses["मौसम"];
        else if (lowerInput.includes("उर्वरक") || lowerInput.includes("खाद")) botResponse = responses["उर्वरक"];
        else if (lowerInput.includes("बीज")) botResponse = responses["बीज"];
        else if (lowerInput.includes("फसल")) botResponse = responses["फसल"];
      } else {
        if (lowerInput.includes("weather")) botResponse = responses["weather"];
        else if (lowerInput.includes("fertilizer")) botResponse = responses["fertilizer"];
        else if (lowerInput.includes("seed")) botResponse = responses["seeds"];
        else if (lowerInput.includes("crop")) botResponse = responses["crop"];
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg z-40 ${isOpen ? 'hidden' : 'flex'}`}
        variant="agricultural"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between py-3 bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bot className="h-5 w-5" />
              {isHindi ? "कृषि बॉट" : "KrishiBot"}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`p-1 rounded-full ${
                      message.isUser ? 'bg-primary' : 'bg-muted'
                    }`}>
                      {message.isUser ? (
                        <User className="h-3 w-3 text-primary-foreground" />
                      ) : (
                        <Bot className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <div
                      className={`px-3 py-2 rounded-lg text-xs ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isHindi ? "अपना सवाल पूछें..." : "Ask your question..."}
                  className="text-xs"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  variant="agricultural"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
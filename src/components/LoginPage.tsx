import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Wheat, User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginPageProps {
  onLogin: () => void;
  isHindi: boolean;
}

const LoginPage = ({ onLogin, isHindi }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = () => {
    if (username === "ABC" && password === "123456") {
      onLogin();
      toast({
        title: isHindi ? "सफल लॉगिन!" : "Login Successful!",
        description: isHindi ? "KrishiMitra में आपका स्वागत है" : "Welcome to KrishiMitra"
      });
    } else {
      toast({
        title: isHindi ? "लॉगिन त्रुटि" : "Login Error",
        description: isHindi 
          ? "गलत उपयोगकर्ता नाम या पासवर्ड। कृपया पुनः प्रयास करें।"
          : "Invalid username or password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agricultural-light to-agricultural-lighter flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Wheat className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            KrishiMitra
          </CardTitle>
          <p className="text-muted-foreground">
            {isHindi ? "स्मार्ट कृषि सलाहकार पोर्टल" : "Smart Agricultural Advisory Portal"}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {isHindi ? "उपयोगकर्ता नाम" : "Username"}
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isHindi ? "उपयोगकर्ता नाम दर्ज करें" : "Enter username"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              {isHindi ? "पासवर्ड" : "Password"}
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isHindi ? "पासवर्ड दर्ज करें" : "Enter password"}
            />
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full" 
            variant="agricultural"
            size="lg"
          >
            {isHindi ? "लॉगिन करें" : "Sign In"}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-1">
              {isHindi ? "डेमो लॉगिन:" : "Demo Login:"}
            </p>
            <p>Username: ABC</p>
            <p>Password: 123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
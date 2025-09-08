import { useEffect, useState } from "react";
import { AlertTriangle, Megaphone } from "lucide-react";

interface CrawlingTickerProps {
  isHindi: boolean;
}

const CrawlingTicker = ({ isHindi }: CrawlingTickerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const notifications = [
    {
      type: "scheme",
      icon: <Megaphone className="h-4 w-4" />,
      text: isHindi 
        ? "नई सरकारी योजना: किसान सम्मान निधि की 15वीं किस्त जारी"
        : "New Government Scheme: PM-Kisan 15th installment released"
    },
    {
      type: "warning",
      icon: <AlertTriangle className="h-4 w-4" />,
      text: isHindi
        ? "चेतावनी: अगले 3 दिनों में भारी बारिश की संभावना"
        : "Warning: Heavy rainfall expected in next 3 days"
    },
    {
      type: "scheme",
      icon: <Megaphone className="h-4 w-4" />,
      text: isHindi
        ? "मुफ्त मृदा जांच कार्ड: अपने नजदीकी केंद्र पर संपर्क करें"
        : "Free Soil Health Card: Contact your nearest center"
    },
    {
      type: "warning",
      icon: <AlertTriangle className="h-4 w-4" />,
      text: isHindi
        ? "कीट प्रकोप चेतावनी: कपास की फसल में सफेद मक्खी का प्रकोप"
        : "Pest Alert: Whitefly outbreak in cotton crops"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  const currentNotification = notifications[currentIndex];

  return (
    <div className={`h-8 overflow-hidden ${
      currentNotification.type === 'scheme' 
        ? 'bg-yellow-500 text-yellow-900' 
        : 'bg-red-500 text-red-50'
    }`}>
      <div className="animate-slide-in-right h-full flex items-center px-4 gap-2">
        {currentNotification.icon}
        <span className="text-sm font-medium whitespace-nowrap">
          {currentNotification.text}
        </span>
      </div>
    </div>
  );
};

export default CrawlingTicker;
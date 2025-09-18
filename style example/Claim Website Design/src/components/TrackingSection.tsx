import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";

export function TrackingSection() {
  const [claimNumber, setClaimNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);

  const handleTrack = () => {
    // Mock tracking data for demo
    const mockData = {
      claimNumber: claimNumber || "CTF-CLAIM-12345",
      status: "In Transit",
      statusColor: "blue",
      product: "iPhone 14 Pro Clear Case",
      submittedDate: "Sep 15, 2025",
      estimatedCompletion: "Sep 22, 2025",
      timeline: [
        { step: "Claim Submitted", date: "Sep 15, 2025", status: "completed", icon: CheckCircle },
        { step: "Under Review", date: "Sep 16, 2025", status: "completed", icon: Clock },
        { step: "Approved & Shipped", date: "Sep 18, 2025", status: "current", icon: Truck },
        { step: "Delivered", date: "Expected Sep 22", status: "pending", icon: Package }
      ]
    };
    setTrackingData(mockData);
  };

  return (
    <section id="track" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Track Your Claim</h2>
          <p className="text-gray-600 mt-4">Enter your claim number to see the current status</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Claim Lookup</CardTitle>
            <CardDescription>
              Enter your claim number (found in your confirmation email)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="claimNumber" className="sr-only">Claim Number</Label>
                <Input
                  id="claimNumber"
                  placeholder="CTF-CLAIM-12345"
                  value={claimNumber}
                  onChange={(e) => setClaimNumber(e.target.value)}
                />
              </div>
              <Button onClick={handleTrack} className="bg-black hover:bg-gray-800">
                <Search className="h-4 w-4 mr-2" />
                Track Claim
              </Button>
            </div>
          </CardContent>
        </Card>

        {trackingData && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Claim #{trackingData.claimNumber}</CardTitle>
                  <CardDescription>{trackingData.product}</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {trackingData.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Submitted:</span>
                  <span className="ml-2 font-medium">{trackingData.submittedDate}</span>
                </div>
                <div>
                  <span className="text-gray-600">Expected Completion:</span>
                  <span className="ml-2 font-medium">{trackingData.estimatedCompletion}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Claim Progress</h3>
                <div className="space-y-4">
                  {trackingData.timeline.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          item.status === 'completed' 
                            ? 'bg-green-100 text-green-600' 
                            : item.status === 'current'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className={`font-medium ${
                              item.status === 'pending' ? 'text-gray-500' : 'text-gray-900'
                            }`}>
                              {item.step}
                            </h4>
                            <span className="text-sm text-gray-500">{item.date}</span>
                          </div>
                          {item.status === 'current' && (
                            <p className="text-sm text-blue-600 mt-1">
                              Your replacement is on its way! Track with shipping number: USP123456789
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Have questions about your claim? Our support team is here to help.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">Contact Support</Button>
                  <Button variant="outline" size="sm">Live Chat</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
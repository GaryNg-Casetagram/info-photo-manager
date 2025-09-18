import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Upload, ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ClaimForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    orderNumber: "",
    email: "",
    productType: "",
    issueType: "",
    description: "",
    photos: []
  });

  const steps = [
    { number: 1, title: "Order Details", description: "Provide your order information" },
    { number: 2, title: "Issue Description", description: "Tell us what happened" },
    { number: 3, title: "Upload Evidence", description: "Share photos of the issue" },
    { number: 4, title: "Review & Submit", description: "Confirm your claim details" }
  ];

  const productTypes = [
    "iPhone Case",
    "Samsung Case",
    "AirPods Case", 
    "Apple Watch Band",
    "MagSafe Accessories",
    "Screen Protector",
    "Other"
  ];

  const issueTypes = [
    "Cracked/Broken Case",
    "Color Fading",
    "Material Defect",
    "Poor Fit",
    "Missing Parts",
    "Shipping Damage",
    "Other"
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Claim submitted:", formData);
    alert("Your claim has been submitted successfully! You'll receive a confirmation email shortly.");
  };

  return (
    <section id="claim" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Submit a Claim</h2>
          <p className="text-gray-600 mt-4">Follow the simple steps below to get your issue resolved</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number 
                  ? 'bg-primary border-primary text-white' 
                  : 'border-gray-300 text-gray-500'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  step.number
                )}
              </div>
              <div className="ml-3 hidden sm:block">
                <p className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="h-5 w-5 text-gray-400 mx-4" />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input
                    id="orderNumber"
                    placeholder="e.g., CTF-12345678"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type</Label>
                  <Select value={formData.productType} onValueChange={(value) => setFormData({ ...formData, productType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your product" />
                    </SelectTrigger>
                    <SelectContent>
                      {productTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="issueType">What type of issue are you experiencing?</Label>
                  <Select value={formData.issueType} onValueChange={(value) => setFormData({ ...formData, issueType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe the issue in detail, including when it occurred and any relevant circumstances..."
                    className="min-h-32"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">Upload Photos</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Please upload clear photos showing the issue. Include multiple angles if possible.
                    </p>
                    <Button variant="outline">Choose Files</Button>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB each</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1633078654544-61b3455b9161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW1hZ2VkJTIwcGhvbmUlMjBzY3JlZW4lMjBjcmFja3xlbnwxfHx8fDE3NTgxNjE1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Example of damage photo"
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Badge variant="secondary">Example Photo</Badge>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Your photo here</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Claim Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Order Number:</span>
                      <span className="ml-2 font-medium">{formData.orderNumber || "Not provided"}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-2 font-medium">{formData.email || "Not provided"}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Product:</span>
                      <span className="ml-2 font-medium">{formData.productType || "Not selected"}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Issue Type:</span>
                      <span className="ml-2 font-medium">{formData.issueType || "Not selected"}</span>
                    </div>
                  </div>
                  {formData.description && (
                    <div className="mt-4">
                      <span className="text-gray-600 block">Description:</span>
                      <p className="text-sm mt-1 text-gray-800">{formData.description}</p>
                    </div>
                  )}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• You'll receive a confirmation email with your claim number</li>
                    <li>• Our team will review your case within 24-48 hours</li>
                    <li>• We'll send you a prepaid shipping label if needed</li>
                    <li>• Track your claim status anytime on this portal</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {currentStep === steps.length ? (
                <Button onClick={handleSubmit} className="bg-black hover:bg-gray-800">
                  Submit Claim
                </Button>
              ) : (
                <Button onClick={nextStep} className="flex items-center">
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
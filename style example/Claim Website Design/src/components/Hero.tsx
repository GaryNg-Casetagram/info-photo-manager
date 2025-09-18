import { Button } from "./ui/button";
import { Shield, Clock, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Hassle-Free
              <span className="block text-primary">Product Claims</span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              Get your CASETiFY products repaired or replaced quickly. Our streamlined claims process 
              ensures you're back to being protected in no time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" className="bg-black hover:bg-gray-800">
                Start Your Claim
              </Button>
              <Button variant="outline" size="lg">
                Track Existing Claim
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Protected</h3>
                <p className="text-xs text-gray-600 mt-1">Lifetime warranty coverage</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Fast Process</h3>
                <p className="text-xs text-gray-600 mt-1">24-48 hour response</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Easy Tracking</h3>
                <p className="text-xs text-gray-600 mt-1">Real-time status updates</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 p-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1634878656584-edad74494c35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhc2UlMjBwcm90ZWN0aW9uJTIwbW9kZXJufGVufDF8fHx8MTc1ODE2MTU4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="CASETiFY phone protection"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Claims processed daily</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">2,847</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
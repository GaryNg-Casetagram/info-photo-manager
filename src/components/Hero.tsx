import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Shield, Clock, CheckCircle } from "lucide-react"

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-6">
              🚀 Professional Expense Management
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Streamline Your
              <span className="block text-primary">Expense Tracking</span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              Professional expense tracking and receipt management for business claims. 
              Your financial data deserves the best organization and reporting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/expenses">
                <Button size="lg" className="bg-black hover:bg-gray-800">
                  Manage Expenses
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                View Reports
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Secure</h3>
                <p className="text-xs text-gray-600 mt-1">Bank-level encryption</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Fast Processing</h3>
                <p className="text-xs text-gray-600 mt-1">Real-time updates</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Easy Export</h3>
                <p className="text-xs text-gray-600 mt-1">CSV & ZIP downloads</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Recent Expenses</h3>
                  <span className="text-sm text-gray-500">This Month</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm">🍽️</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Business Lunch</p>
                        <p className="text-xs text-gray-500">Travel & Meals</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">$45.50</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm">🚗</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Taxi Ride</p>
                        <p className="text-xs text-gray-500">Transportation</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">$12.30</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-sm">📱</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Software License</p>
                        <p className="text-xs text-gray-500">Office Supplies</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">$89.99</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total This Month</span>
                    <span className="text-lg font-bold text-primary">$147.79</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Expenses tracked daily</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">2,847</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

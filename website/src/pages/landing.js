import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LinkedinIcon as LinkedIn, Chrome, Users, Briefcase, TrendingUp, Shield, Star } from 'lucide-react'



function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <LinkedIn className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">LinkedInBooster</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#features" className="text-gray-600 hover:text-gray-800">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-gray-800">How It Works</a></li>
              <li><a href="#install" className="text-gray-600 hover:text-gray-800">Install</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                Supercharge Your LinkedIn Experience
              </h1>
              <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
                Boost your networking, job search, and professional growth with LinkedInBooster Chrome Extension.
              </p>
              <div className="mt-10 flex justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 flex items-center space-x-2">
                  <Chrome className="h-5 w-5" />
                  <span>Add to Chrome</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Users, title: "Smart Networking", description: "Automatically connect with relevant professionals in your industry." },
                { icon: Briefcase, title: "Job Application Tracker", description: "Keep track of your job applications and follow-ups in one place." },
                { icon: TrendingUp, title: "Profile Optimizer", description: "Get suggestions to improve your LinkedIn profile visibility." },
                { icon: Shield, title: "Privacy Guard", description: "Control who sees your activity and manage your online presence." },
                { icon: Star, title: "Content Booster", description: "Enhance your posts with AI-powered suggestions for better engagement." },
                { icon: Chrome, title: "Seamless Integration", description: "Works right within your LinkedIn page for a smooth experience." },
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Install the Extension", description: "Add LinkedInBooster to your Chrome browser with just one click." },
                { step: "2", title: "Authorize on LinkedIn", description: "Log in to your LinkedIn account and grant necessary permissions." },
                { step: "3", title: "Enjoy Enhanced LinkedIn", description: "Experience a more powerful and efficient LinkedIn right away!" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="install" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
                Ready to Boost Your LinkedIn Experience?
              </h2>
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-2 mx-auto">
                <Chrome className="h-5 w-5" />
                <span>Add to Chrome - It's Free!</span>
              </Button>
              <p className="mt-4 text-gray-600">
                Compatible with Chrome, Edge, and other Chromium-based browsers.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
                Stay Updated
              </h2>
              <form className="mt-8 sm:flex justify-center">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                  className="w-full sm:max-w-xs"
                />
                <Button type="submit" className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700">
                  Get Notified
                </Button>
              </form>
              <p className="mt-3 text-sm text-gray-500 text-center">
                We'll keep you updated with the latest features and improvements.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between items-center">
            <p className="text-base text-gray-400">&copy; 2023 LinkedInBooster. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <LinkedIn className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Chrome Web Store</span>
                <Chrome className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


export default Landing;
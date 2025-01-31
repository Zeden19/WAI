import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: ["5 users", "10GB storage", "Basic support"],
  },
  {
    name: "Pro",
    price: "$19.99",
    features: ["25 users", "100GB storage", "Priority support", "Advanced features"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited users", "Unlimited storage", "24/7 dedicated support", "Custom integrations"],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-orange-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 animate-gradient">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                {plan.price}
              </p>
              <ul className="mb-8 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-300"
                  >
                    <CheckCircle className="h-5 w-5 mr-2 text-orange-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white transition-all duration-300">
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


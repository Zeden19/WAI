import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white transition-all duration-300"
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h2 className="text-4xl font-bold mb-6 animate-pulse">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers and transform your business today.</p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-orange-600 hover:bg-gray-100 transition-all duration-300"
          >
            Start Your Free Trial
          </Button>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="/placeholder.svg?height=300&width=300"
            alt="Get Started"
            width={300}
            height={300}
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}


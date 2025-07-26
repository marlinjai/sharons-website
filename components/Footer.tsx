// components/Footer.tsx - Footer component
export default function Footer() {
  return (
    <footer className="py-16" style={{ backgroundColor: '#f7f6f2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="font-secondary text-3xl font-semibold text-gray-900 mb-4">
              ReTurn
            </div>
            <p className="text-gray-600 mb-6 max-w-md font-primary leading-relaxed">
              Regression Hypnosis for the curious, the bold, and the ready. 
              Transform your life through deep healing and self-discovery.
            </p>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="font-secondary font-semibold text-gray-900 mb-4">Menu</h3>
            <ul className="space-y-2">
              <li><a href="#sessions" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-primary">Sessions</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-primary">About</a></li>
              <li><a href="#reviews" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-primary">Reviews</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-primary">Contact</a></li>
            </ul>
          </div>

          {/* Utility Links */}
          <div>
            <h3 className="font-secondary font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-primary">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-primary">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-12 pt-8 text-center">
          <p className="text-gray-500 mb-2 font-primary">
            © Copyright 2024 ReTurn Hypnotherapy
          </p>
          <p className="text-gray-400 text-sm font-primary">
            Designed with love • Powered by Next.js
          </p>
        </div>
      </div>
    </footer>
  )
} 
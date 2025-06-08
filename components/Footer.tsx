// components/Footer.tsx - Footer component
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="font-heading text-3xl font-bold text-white mb-4">
              YogaStudio
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. 
              Voluptate exercitation incididunt aliquip deserunt.
            </p>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Menu</h3>
            <ul className="space-y-2">
              <li><a href="#sessions" className="text-gray-300 hover:text-white transition-colors duration-200">Classes</a></li>
              <li><a href="#instructors" className="text-gray-300 hover:text-white transition-colors duration-200">Trainers</a></li>
              <li><a href="#reviews" className="text-gray-300 hover:text-white transition-colors duration-200">Reviews</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-200">Memberships</a></li>
            </ul>
          </div>

          {/* Utility Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Utility pages</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Licences Page</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Changelog Page</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">404 Not Found Page</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Style Guide Page</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 mb-2">
            © Copyright 2023 YogaStudio
          </p>
          <p className="text-gray-500 text-sm">
            Designed by Digital Butlers • Powered by Webflow
          </p>
        </div>
      </div>
    </footer>
  )
} 
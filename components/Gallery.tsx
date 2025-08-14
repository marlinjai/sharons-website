// components/Gallery.tsx - Visual gallery section component
export default function Gallery() {
  return (
    <section className="py-20 bg-gradient-to-br from-yoga-sand to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-secondary text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            A visual journey of mind and body harmony
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-full h-full bg-gradient-to-br from-yoga-sage/30 to-yoga-ocean/30 flex items-center justify-center">
                <span className="text-gray-600 font-primary font-medium text-lg">Yoga Image {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// components/Instructors.tsx - Instructors section component
export default function Instructors() {
  const instructors = [
    {
      name: 'Javier Morales',
      experience: 8,
      description: 'A yoga instructor dedicated to guiding individuals on their journey towards physical, mental, and spiritual well-being through the practice of yoga.',
      specialties: ['Effective communication', 'Proper technique guidance', 'Breathwork monitoring', 'Personalized attention'],
    },
    {
      name: 'Raj Gupta',
      experience: 5,
      description: 'A skilled professional focused on helping students achieve balance and inner peace through traditional and modern yoga practices.',
      specialties: ['Mindfulness training', 'Meditation guidance', 'Flexibility enhancement', 'Stress reduction'],
    },
    {
      name: 'Mia Thompson',
      experience: 3,
      description: 'An enthusiastic yoga teacher who combines traditional wisdom with contemporary approaches to create transformative experiences.',
      specialties: ['Dynamic flow sequences', 'Core strengthening', 'Injury prevention', 'Beginner-friendly classes'],
    },
    {
      name: 'Catherine Miller',
      experience: 8,
      description: 'An experienced instructor specializing in therapeutic yoga and helping students develop deeper mind-body connections.',
      specialties: ['Therapeutic yoga', 'Restorative practices', 'Pain management', 'Senior-friendly classes'],
    },
    {
      name: 'Ava Garcia',
      experience: 8,
      description: 'A passionate yoga teacher who believes in the power of yoga to transform lives and create lasting positive change.',
      specialties: ['Power yoga', 'Strength building', 'Advanced poses', 'Athletic performance'],
    },
  ]

  return (
    <section id="instructors" className="py-20 bg-gradient-to-br from-yoga-sand to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Expert instructors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each instructor is certified in their respective yoga discipline and is dedicated to 
            guiding you on your journey with personalized attention.
          </p>
          <button className="btn-primary mt-8">
            Buy a subscription
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Instructor Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-yoga-sage to-yoga-ocean rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-white font-bold text-2xl">
                  {instructor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-2">
                  {instructor.name}
                </h3>
                <p className="text-yoga-earth font-medium">
                  Experience: {instructor.experience} years
                </p>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {instructor.description}
              </p>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Specialties:</h4>
                <ul className="space-y-2">
                  {instructor.specialties.map((specialty, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-yoga-sage rounded-full mr-3"></span>
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
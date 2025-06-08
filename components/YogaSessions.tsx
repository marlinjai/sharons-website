// components/YogaSessions.tsx - Yoga sessions component
export default function YogaSessions() {
  const sessions = [
    {
      name: 'Vinyasa Flow',
      description: 'Vinyasa Flow is a dynamic and fluid style of yoga that synchronizes breath with movement. The classes involve a sequence of poses that transition smoothly, promoting strength, flexibility, and mindfulness.',
    },
    {
      name: 'Hatha Yoga',
      description: 'Hatha Yoga focuses on the fundamental postures and breathing techniques. It\'s a great starting point for beginners and emphasizes balance, flexibility, and relaxation.',
    },
    {
      name: 'Kundalini Yoga',
      description: 'Kundalini Yoga aims to awaken the spiritual energy within the body through a combination of breathwork, meditation, and dynamic postures. This practice focuses on expanding consciousness.',
    },
    {
      name: 'Yin Yoga',
      description: 'Yin Yoga is a slow-paced style that targets the connective tissues and joints. Poses are held for longer durations, promoting deep relaxation and increased flexibility.',
    },
    {
      name: 'Power Yoga',
      description: 'Power Yoga is a more vigorous and fitness-focused style. It builds strength, endurance, and flexibility through a series of challenging poses.',
    },
  ]

  return (
    <section id="sessions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Yoga sessions to find balance and inner peace
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session, index) => (
            <div key={index} className="bg-gradient-to-br from-yoga-sand to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yoga-sage rounded-full flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">
                  {session.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-4">
                {session.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {session.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
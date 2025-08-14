// components/Pricing.tsx - Pricing plans section component
export default function Pricing() {
  const plans = [
    {
      name: 'Basic membership',
      price: '$125/month',
      features: [
        'Unlimited access to yoga classes for one month',
        'Participation in group classes of various yoga styles',
        'Access to equipment and recreational areas at the studio',
      ],
    },
    {
      name: 'VIP membership',
      price: '$150/month',
      features: [
        'All the benefits of the "Basic Membership"',
        'Personalized individual sessions with an experienced instructor',
        'Priority booking for high-demand classes',
      ],
      popular: true,
    },
    {
      name: 'Online membership',
      price: '$225/month',
      features: [
        'Access to an online platform for yoga classes from anywhere in the world',
        'Daily live streams with professional instructors',
        'The ability to view recordings of previous classes at your convenience',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pricing plans for your yoga wellness journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${
                plan.popular ? 'from-yoga-sage to-yoga-ocean text-white' : 'from-yoga-sand to-white'
              } p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3
                  className={`font-heading text-2xl font-semibold mb-4 ${plan.popular ? 'text-white' : 'text-gray-900'}`}
                >
                  {plan.name}
                </h3>
                <div className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-yoga-earth'}`}>
                  {plan.price}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start ${plan.popular ? 'text-white' : 'text-gray-600'}`}>
                    <span
                      className={`w-2 h-2 ${plan.popular ? 'bg-white' : 'bg-yoga-sage'} rounded-full mr-3 mt-2 flex-shrink-0`}
                    ></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white text-yoga-sage hover:bg-gray-100'
                    : 'bg-yoga-sage text-white hover:bg-yoga-earth'
                }`}
              >
                Buy a subscription
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

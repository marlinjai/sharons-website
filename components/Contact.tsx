'use client';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Here you would typically send the form data to your backend
    // For now, we'll just log it to the console
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="pb-16 pt-2 md:py-16 bg-[#f7f6f2]">
      <div id="contact" className="-mt-[140px] mb-[140px] h-16"></div>
      <div className="max-w-[--content-max-width] md:max-w-[90vw] mx-auto md:px-[--content-padding]">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-24">
          <h2 className="font-secondary text-2xl sm:text-4xl md:text-5xl font-semibold mb-4" style={{ color: '#A32015' }}>
            Get in Touch
          </h2>
          <p className="font-primary text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Curious? Stuck? <br />Ready for something to shift?
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 lg:gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 ">
            <h3 className="font-secondary text-xl sm:text-2xl font-semibold mb-6" style={{ color: '#A32015' }}>
              Reach out.
              <br />
              I'm here to answer, clarify, or help you take the next step.
              <br />
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col gap-2 justify-center">
              <div>
                <label htmlFor="name" className="block font-primary text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C93F2F] focus:border-transparent outline-none transition-all duration-200 font-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-primary text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C93F2F] focus:border-transparent outline-none transition-all duration-200 font-primary"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-primary text-sm font-medium text-gray-700 mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C93F2F] focus:border-transparent outline-none transition-all duration-200 font-primary"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-primary text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C93F2F] focus:border-transparent outline-none transition-all duration-200 font-primary resize-none"
                  placeholder={`Tell me about what you'd like to explore or any questions you might have...`}
                />
              </div>

              <button
                type="submit"
                className=" bg-[#C5441E] text-white px-8 py-4 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-[rgb(245,124,0)] mx-auto"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Location Section */}
          <div className="flex flex-col justify-between bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h3 className="font-secondary text-2xl font-semibold mb-6" style={{ color: '#A32015' }}>
              Visit the Studio
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block font-primary text-base sm:text-lg font-medium text-gray-700 mb-2">Location</label>
                <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                  <p className="font-primary text-gray-700 mb-3">Here is where sessions take place:</p>
                  <p className="font-primary text-lg font-semibold text-[#4b5563] mb-2">Praxis am Zionskirchplatz</p>
                  <p className="font-primary text-gray-600">10-11, 10117 Berlin</p>
                </div>
              </div>

              <div>
                <label className="block font-primary text-base sm:text-lg font-medium text-gray-700 mb-2">Map</label>
                <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 h-[350px] sm:h-[480px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4853.770537225342!2d13.401955876629824!3d52.535509972065256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851fb9a297cfd%3A0x5dfea125c03cacd1!2sPraxis%20am%20Zionskirchplatz!5e0!3m2!1sen!2sde!4v1753217975364!5m2!1sen!2sde"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

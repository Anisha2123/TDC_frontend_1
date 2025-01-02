export default function LeadingEdTech() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Left Section: Image */}
        <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center relative">
          <img
            src="https://via.placeholder.com/400x400?text=GUVI+Student"
            alt="GUVI Student"
            className="rounded-lg shadow-lg w-3/4 md:w-full"
          />
          {/* Floating Vernacular Icons */}
          <div className="absolute -top-4 -left-4 flex flex-col gap-4">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <span className="text-[#00c853] text-xl font-bold">अ</span>
            </div>
            <div className="bg-white rounded-full p-3 shadow-lg">
              <span className="text-[#00c853] text-xl font-bold">A</span>
            </div>
            <div className="bg-white rounded-full p-3 shadow-lg">
              <span className="text-[#00c853] text-xl font-bold">௦</span>
            </div>
          </div>
        </div>

        {/* Right Section: Text */}
        <div className="md:w-1/2 md:pl-8 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6 leading-snug">
            Leading EdTech Platform for{' '}
            <span className="text-[#00c853]">Vernacular Upskilling</span>
          </h2>
          <p className="text-[#333333] text-lg leading-relaxed mb-6">
            GUVI – India's premier tech-powered vernacular EdTech platform,
            incubated by IIT-M, IIM-A, and a prestigious part of the HCL group,
            leads the way in tech upskilling with instruction in regional and
            international languages. With over 3 million global learners, GUVI
            focuses on providing personalized learning solutions for its
            learners right from online learning, upskilling, and recruitment
            opportunities in world-class quality.
          </p>
          <div className="bg-gray-100 py-3 px-6 rounded-lg inline-block">
            <span className="font-semibold text-lg">GUVI - </span>
            <span className="text-[#00c853] font-semibold">G</span>rab{' '}
            <span className="text-[#00c853] font-semibold">U</span>r{' '}
            <span className="text-[#00c853] font-semibold">V</span>ernacular{' '}
            <span className="text-[#00c853] font-semibold">I</span>mprint
          </div>
        </div>
      </div>
    </section>
  );
}

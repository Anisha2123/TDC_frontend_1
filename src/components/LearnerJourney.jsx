
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import "./styles.css";
import i2 from "../images/i2.jpg"
import i3 from "../images/i3.jpg"
import i4 from "../images/i4.jpg"


const learners = [
  {
    name: 'Padmini Kadhirvel',
    company: 'TechoMind',
    companyLogo: '/placeholder.svg?height=30&width=120&text=TechoMind',
    previousRole: 'Online Support Associate',
    currentRole: 'Automation Engineer',
    image: i4
  },
  {
    name: 'B Swathy',
    company: 'SmartHealth',
    companyLogo: '/placeholder.svg?height=30&width=120&text=SmartHealth',
    previousRole: 'Associate',
    currentRole: 'UI/UX Designer',
    image: i2
  },
  {
    name: 'Vignesh G',
    company: 'Agnikul',
    companyLogo: '/placeholder.svg?height=30&width=120&text=Agnikul',
    previousRole: 'Fresher, MSc (Arts & Science)',
    currentRole: 'Junior Developer',
    image: i4
  },
  {
    name: 'Ramapriya Prasathe',
    company: 'RemitBee',
    companyLogo: '/placeholder.svg?height=30&width=120&text=RemitBee',
    previousRole: '9 years gap after graduation',
    currentRole: 'Automation Engineer',
    image: i2
  },
  // Add more learners for demonstration
  // {
  //   name: 'John Doe',
  //   company: 'TechCorp',
  //   companyLogo: '/placeholder.svg?height=30&width=120&text=TechCorp',
  //   previousRole: 'Fresh Graduate',
  //   currentRole: 'Full Stack Developer',
  //   image: i4
  // }
]

export default function LearnerJourney() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleLearners, setVisibleLearners] = useState([])

  const updateVisibleLearners = () => {
    const windowWidth = window.innerWidth
    let itemsToShow = 1
    
    if (windowWidth >= 1280) itemsToShow = 4
    else if (windowWidth >= 1024) itemsToShow = 3
    else if (windowWidth >= 768) itemsToShow = 2

    const startIndex = currentSlide
    let items = []
    
    for (let i = 0; i < itemsToShow; i++) {
      const index = (startIndex + i) % learners.length
      items.push(learners[index])
    }
    
    setVisibleLearners(items)
  }

  useEffect(() => {
    updateVisibleLearners()
    window.addEventListener('resize', updateVisibleLearners)
    return () => window.removeEventListener('resize', updateVisibleLearners)
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % learners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + learners.length) % learners.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="journey py-16 bg-white">
      <div className="container mx-auto px-14">
        <h2 className="text-4xl font-bold text-center text-[#333333] mb-12">
          Journey Of Our Learners
        </h2>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleLearners.map((learner, index) => (
              <div
                key={index}
                className="box bg-white rounded-lg p-6 shadow-md border border-[#91a3b0]/10"
              >
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ">
                    <img
                      src={learner.image}
                      alt={learner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#333333] mb-2">
                    {learner.name}
                  </h3>
                  {/* <img src={learner.companyLogo}
                    alt={learner.company}
                    className="mb-4"
                  /> */}
                  <div className="border border-gray-500 w-max-content px-2 py-2 bg-gray-50 rounded-md text-center mb-4">
                    <span className="text-sm text-[#91a3b0]">{learner.previousRole}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#333333]" />
                    <span className="text-sm text-[#333333] font-bold">After TDC</span>
                  </div>
                  <div className="btn w-full p-3 bg-[#91a3b0] rounded-md text-center">
                    <span className="text-sm font-medium text-[#333333]">
                      {learner.currentRole}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
          >
            <ChevronLeft className="w-6 h-6 text-[#333333]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
          >
            <ChevronRight className="w-6 h-6 text-[#333333]" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {learners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-[#00c853]' : 'bg-[#91a3b0]/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


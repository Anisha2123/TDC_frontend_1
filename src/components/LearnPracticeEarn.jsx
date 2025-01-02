
import { useState } from 'react'
import { Link } from 'react-router-dom'

const tabs = [
  {
    id: 'codekata',
    title: 'Codekata',
    content: {
      title: 'Codekata',
      description: 'Practice coding problems curated by industry experts. Solve problems in various programming languages and improve your coding skills.',
      image: '/placeholder.svg?height=400&width=600&text=Codekata+Interface'
    }
  },
  {
    id: 'webkata',
    title: 'Webkata',
    content: {
      title: 'Webkata',
      description: 'Learn and practice web development with interactive exercises. Build responsive websites and master HTML, CSS, and JavaScript.',
      image: '/placeholder.svg?height=400&width=600&text=Webkata+Interface'
    }
  },
  {
    id: 'debugging',
    title: 'Debugging',
    content: {
      title: 'Debugging',
      description: 'Debugging a series of programs curated by industry experts. Practicing debugging will help you get started and become familiar with programming.',
      image: '/placeholder.svg?height=400&width=600&text=Debugging+Interface'
    }
  },
  {
    id: 'ide',
    title: 'IDE',
    content: {
      title: 'IDE',
      description: 'Use our integrated development environment to write, test, and debug your code in multiple programming languages.',
      image: '/placeholder.svg?height=400&width=600&text=IDE+Interface'
    }
  },
  {
    id: 'rewards',
    title: 'Rewards',
    content: {
      title: 'Rewards',
      description: 'Earn rewards and badges as you complete challenges and improve your skills. Showcase your achievements to potential employers.',
      image: '/placeholder.svg?height=400&width=600&text=Rewards+Interface'
    }
  },
  {
    id: 'referral',
    title: 'Referral',
    content: {
      title: 'Referral',
      description: 'Refer friends and earn rewards. Help others start their learning journey while earning benefits for yourself.',
      image: '/placeholder.svg?height=400&width=600&text=Referral+Interface'
    }
  },
  {
    id: 'forum',
    title: 'Forum',
    content: {
      title: 'Forum',
      description: 'Join our community forum to discuss programming concepts, share knowledge, and get help from fellow learners.',
      image: '/placeholder.svg?height=400&width=600&text=Forum+Interface'
    }
  }
]

export default function LearnPracticeEarn() {
  const [activeTab, setActiveTab] = useState('debugging')

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <section className="py-16 bg-[#fefefa]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#333333] mb-12">
          Learn. Practice. Earn. Have Fun!
        </h2>
        
        <div className="mb-8 overflow-x-auto">
          <div className="flex justify-center space-x-6 min-w-max border-b border-[#91a3b0]/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 text-[#333333] relative ${
                  activeTab === tab.id ? 'font-medium' : 'hover:text-[#91a3b0]'
                }`}
              >
                {tab.title}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00c853]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img
              src={activeContent?.image || ''}
              alt={activeContent?.title || ''}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-bold text-[#333333] mb-4">
              {activeContent?.title}
            </h3>
            <p className="text-[#91a3b0] mb-6">
              {activeContent?.description}
            </p>
            <Link to={`/${activeTab}`} className="bg-[#00c853] text-white px-6 py-3 rounded-md hover:bg-[#00a846] transition-colors">
              Explore {activeContent?.title}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


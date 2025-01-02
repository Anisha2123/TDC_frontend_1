import Banner from '../components/Banner'
import TDCOffers from '../components/TDCOffers'
import LatestCourses from '../components/LatestCourses'
import Footer from '../components/Footer'
import HomeFeatures from '../components/HomeFeatures'
import StudentSuccess from '../components/StudentSuccess'
import LearningStats from '../components/LearningStats'
import LearnPracticeSection from '../components/LearnPracticeSection'

export default function Home() {
  console.log("Home component rendered");
  
  return (
    <div className="home-container">
      <Banner />
      <TDCOffers />
      <LatestCourses />
      <LearnPracticeSection />
      <HomeFeatures />
      <StudentSuccess />
      <LearningStats />
      <Footer />
    </div>
  );
}

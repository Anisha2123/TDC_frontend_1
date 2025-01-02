import { Book, Tv, Gamepad2, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import "./styles.css";
const offerItems = [
  {
    icon: Book,
    title: 'Self-paced Courses',
    description: 'Learn & get certified via online courses',
  },
  {
    icon: Tv,
    title: 'LIVE Classes',
    description: 'Upskill live online with placement guidance',
  },
  {
    icon: Gamepad2,
    title: 'Interactive Practice Platforms',
    description: 'Learn through Hands-on Coding Experience',
  },
  {
    icon: Building2,
    title: 'For Corporates',
    description: 'One-stop solution for training, hiring, & CSR',
  },
];

export default function GuviOffers() {
  return (
    <section className=" gufi bg-[#fcfcf8] py-16 px-10">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#000000] ">What TDC offers you?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {offerItems.map((item, index) => (
              <div
                key={index}
                className=" box bg-white p-6 rounded-lg shadow-md text-center sm:text-left"
              >
                <item.icon className="w-12 h-12 text-[#333333] mb-4 mx-auto sm:mx-0" />
                <h3 className="text-xl font-semibold mb-2 text-[#3688c2] ">{item.title}</h3>
                <p className="text-[#333333]">{item.description}</p>
                <Link
                  to="#"
                  className="text-[#3688c2] font-medium mt-4 inline-block"
                >
                  Take a look &gt;
                </Link>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <img
              src="https://www.guvi.in/assets/CNxjiM73-man-with-laptop.webp"
              alt="Student with Laptop"
              className="rounded-full w-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

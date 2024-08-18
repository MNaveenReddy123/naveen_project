import SlideBar from '@/components/dashboard/SlideBar';
import React from 'react';
import Image from 'next/image';
import Event1 from "@/assets/Resources/dashboard/Event1.svg";
import Event2 from "@/assets/Resources/dashboard/Event2.svg";
import Event3 from "@/assets/Resources/dashboard/Event3.svg";
import EventCard1 from "@/assets/Images/Event Card/be8d1b473c9bc73dce8397acace05dd2.jpeg";
import EventCard2 from "@/assets/Images/Event Card/162cd1e7d132a7cd3d3faca93effdef4.jpeg";
import EventCard3 from "@/assets/Images/Event Card/6fc85454b8182288d6abdef5c0e65121.jpeg";

// Local component to display an SVG with an optional heading
const SvgWithHeading = ({ SvgComponent, heading }: { SvgComponent: React.FC<React.SVGProps<SVGSVGElement>>; heading?: string }) => (
  <div className="flex flex-col items-center mx-4 mb-4 md:mb-0">
    <SvgComponent className="w-56 h-56 object-cover" />
    {heading && <h2 className="text-lg font-semibold mt-2">{heading}</h2>}
  </div>
);

const Dashboard = () => {
  const events = [
    { SvgComponent: Event1, heading: "00 Days 00 Hrs" },
    { SvgComponent: Event2, heading: "00 Days 00 Hrs" },
    { SvgComponent: Event3, heading: "00 Days 00 Hrs" }
  ];

  const tournaments = [
    EventCard1,
    EventCard2,
    EventCard3,
  ];

  return (
    <main className="flex h-auto bg-gradient-to-tr from-[#3A0153] to-[#1D022A]">
      <SlideBar />

      {/* Main Content */}
      <section className="flex-grow p-8 pt-0 text-white md:ml-64 flex flex-col items-center">
        {/* Photos with Headings in One Line */}
        <div className="flex flex-wrap justify-center items-center mb-8">
          {events.map((event, index) => (
            <SvgWithHeading key={index} SvgComponent={event.SvgComponent} heading={event.heading} />
          ))}
        </div>

        {/* Combined Box for Tournaments and Headings */}
        <div className="w-full max-w-screen-lg px-12 py-8 rounded-3xl border-2 border-[#D700E1]">
          <div className="flex flex-col items-start mb-8">
            {/* Tournaments */}
            <h2 className="text-3xl font-semibold mb-4">Tournaments</h2>
            <div className="flex flex-wrap justify-between gap-10">
              {tournaments.map((src, index) => (
                <div key={index} className="w-64 h-64">
                  <Image
                    src={src}
                    alt={`Tournament ${index + 1}`}
                    layout="responsive"
                    width={200} // Adjust width according to your requirement
                    height={200} // Adjust height according to your requirement
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Additional Headings */}
          <div className="flex flex-col items-start mb-8">
            <h2 className="text-3xl font-semibold mb-2">Total Earnings</h2>
            <p className='view_all text-5xl tracking-tighter font-semibold'>1000 INR</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
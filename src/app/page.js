"use client"
import Hero from "../components/layout/Hero.js";
import HomeMenu from "../components/layout/HomeMenu.js";
import SectionHeaders from "../components/layout/SectionHeaders.js";


export default function Home() {





  return (


    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-8" id="about">
        <SectionHeaders
          firstHeader={'قصتنا'}
          secondHeader={'أعرفنا أكتر'}
        />

        <div className="text-gray-500 my-4 text-2xl">
          <p>
          أقدم وأكبر مطاعم المشويات ببني سويف وأعلاها مبيعاً منذ عام ١٩٦٢ ، فرع ميدان المدرية - فرع الأباصيري
          </p>
        </div>

      </section>

      <section className="text-center my-10 " id="contact">

        <SectionHeaders
          firstHeader={'لا تتردد'}
          secondHeader={'تواصل معانا'}
        />

        <div className="my-6">
          <a className="text-4xl underline text-gray-500 "> 

            19923
          </a>
        </div>
      </section>


    
    </>

  );
}

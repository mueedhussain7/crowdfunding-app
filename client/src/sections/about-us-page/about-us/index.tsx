import { Card, Divider } from "@nextui-org/react";
import React from "react";

// const AboutUs: React.FC = () => {
//   return (
//     <div className="bg-gradient-to-b from-purple-600 to-pink-500 text-white p-8 md:p-16">
//       <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
//         <span className="text-white">About</span>
//       <span className="text-[#FF00C7]">Us</span></h1>
//       <p className="text-base md:text-lg lg:text-xl mb-6">
//         BitRaise is more than just a crowdfunding platform — we're a passionate team of dreamers, innovators, and problem-solvers on a mission to reshape the way ideas come to life.
//         <br />
//         <br />
//         Founded in 2023, our journey began with a simple belief: that everyone should have the opportunity to pursue their passions and make a difference in the world. Since then, we've been dedicated to empowering creators and driving positive change through the power of crowdfunding.
//       </p>
//       <p className="text-base md:text-lg lg:text-xl">
//         <strong className="text-white">What sets us apart:</strong>
//         <br/>
//         <br/>
//         <span className="ml-2">
//           <strong className="text-black">Commitment to Transparency:</strong> We believe in transparency and accountability every step of the way. From project submission to fund distribution, we strive to keep our community informed and engaged.
//           <br />
//           <br />
//           <strong className="text-black">Focus on Impact:</strong> Our platform goes beyond fundraising; we're committed to supporting projects that make a meaningful impact on society and the world at large.
//           <br />
//           <br />
//           <strong className="text-black">Innovation at Our Core:</strong> As pioneers in the crowdfunding space, we're constantly pushing the boundaries of what's possible. Through cutting-edge technology and forward-thinking strategies, we're shaping the future of crowdfunding.
//           <br />
//           <br />
//           Join us in our mission to empower creators, build communities, and drive positive change. Together, we can turn ideas into reality and make a difference in the world.
//         </span>
//       </p>
//     </div>
//   );
// };

const AboutUs: React.FC = () => {
  return (
    <section>
      <Card className="shadow shadow-2xl bg-bg border border-primary shadow-primary mb-10">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-secondary">Our Story</p>
            <h2 className="text-3xl font-bold sm:text-4xl text-primary">
              The Birth of BitRaise
            </h2>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
    <img
        alt="Innovative project conceptual image"
        src="https://www.fundraisingscript.com/blog/wp-content/uploads/2021/09/featured-img-design.jpg"
        className="absolute inset-0 h-full w-full object-contain object-center"
    />
</div>


            <div className="lg:py-16">
              <article className="space-y-4 text-text">
                <p>
                  Launched in 2024, BitRaise revolutionizes the way innovative
                  ideas reach fruition by offering a blockchain-based platform
                  where creators can share their visions and raise funds
                  transparently and securely. Inspired by the transformative
                  potential of decentralization, we set out to build a community
                  where every dream has the chance to be realized.
                </p>
                <Divider className="bg-default-600" />
                <p className="text-sm text-center">
                  <i>
                    "Our commitment extends beyond funding. BitRaise is a
                    catalyst for change, fostering a new era of digital
                    entrepreneurship that values integrity, inclusivity, and
                    innovation. Join us in paving the way towards a more
                    equitable and creative world."
                  </i>
                  <p className="font-semibold mt-2">Mueed Hussain - Founder</p>
                </p>
              </article>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default AboutUs;

// const AboutUs: React.FC = () => {
//   return (
//     <section>
//       <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8 border border-primary">
//         <div className="max-w-3xl">
//           <p className="text-secondary">Our Story</p>
//           <h2 className="text-3xl font-bold sm:text-4xl text-primary">
//             Where did it all start?
//           </h2>
//         </div>

//         <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
//           <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
//             <img
//               alt=""
//               src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
//               className="absolute inset-0 h-full w-full object-cover"
//             />
//           </div>

//           <div className="lg:py-16">
//             <article className="space-y-4 text-text">
//               <p>
//                 Founded in 2023, our journey began with a simple belief: that
//                 everyone should have the opportunity to pursue their passions
//                 and make a difference in the world. Since then, we've been
//                 dedicated to empowering creators and driving positive change
//                 through the power of crowdfunding.
//               </p>

//               <p>

//               </p>
//             </article>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;

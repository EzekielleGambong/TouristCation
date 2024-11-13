import { LazyLoadImage } from "react-lazy-load-image-component";

export default function FooterDefault() {
  return (
    <>
      {/* <section id="contact_us" className="flex flex-col w-full mt-8">
        <LazyLoadImage src="https://picsum.photos/2000" alt="sample" className="max-h-[25rem] aspect-[5/3] object-cover object-center brightness-50 bg-gray-400" />

        <div className="bg-sky-500 text-white p-6 sm:p-16">
          <div className="relative 2xl:container 2xl:mx-auto flex flex-col gap-8 sm:~px-0/36">
            <div className="flex flex-col sm:flex-row gap-8">
              <section className="flex flex-col gap-4">
                <p className="~text-lg/2xl">Visit Us</p>
                <p className="~text-sm/lg">
                  58 Middle Point Rd
                  <br />
                  San Francisco, 94124
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <p className="~text-lg/2xl">Contact Us</p>

                <div className="flex flex-col">
                  <p className="~text-sm/lg">(123) 456 - 789</p>
                  <p className="~text-sm/lg">(123) 456 - 789</p>
                  <p className="~text-sm/lg">contact@company.com</p>
                </div>
              </section>
            </div>

            <form className="lg:absolute lg:bottom-0 lg:right-0 w-full max-w-96 rounded-3xl shadow-2xl bg-white ~p-4/14">
              <p className="font-bold ~text-lg/2xl text-sky-500">Contact Us</p>
              <p className="font-normal ~text-sm/lg text-gray-400 pb-8">We want to hear from you</p>

              <div className="flex flex-col gap-6 pb-8">
                <input type="text" className="rounded-xl bg-gray-100 border-transparent focus:border-transparent focus:ring-0 text-black" placeholder="Name" />
                <input type="email" className="rounded-xl bg-gray-100 border-transparent focus:border-transparent focus:ring-0 text-black" placeholder="Email" />
                <textarea className="h-28 rounded-xl resize-none bg-gray-100 border-transparent focus:border-transparent focus:ring-0 text-black" placeholder="Please type your message here..." />
              </div>

              <button className="w-full rounded-full transition-all bg-sky-500 hover:bg-sky-700 font-bold text-white ~text-sm/lg p-4">Send message</button>
            </form>
          </div>
        </div>
      </section> */}

      <footer className="bg-sky-500 mt-8">
        <p className="text-white text-center ~text-sm/lg p-6">
          © 2024 TouristCation All Rights Reserved |{" "}
          <a href="/terms_and_conditions" className="inline-block">
            Terms and Conditions
          </a>{" "}
          |{" "}
          <a href="/privacy_policy" className="inline-block">
            Privacy Policy
          </a>
        </p>
      </footer>
    </>
  );
}

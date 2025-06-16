import Navbar from "../Sections/Navbar"
import Hero from "../Sections/Hero"
import Items from "../Sections/Items"
import Features from "../Sections/Features"
import AboutUs from "../Sections/Aboutus"
import Footer from "../Sections/footer"
export default function Landingpage() {
  return (
    <>
      <Navbar />
      <Hero/>
      <Items/>
      <Features/>
      <div id="about-section">
        <AboutUs />
      </div>
      <Footer/>
    </>
  )
}
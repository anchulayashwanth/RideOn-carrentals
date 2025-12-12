import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-accent mb-4">
              RideOn
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Experience the freedom of the road with our premium car rental service. Affordable, reliable, and convenient.
            </p>
            <div className="flex gap-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-brand-purple transition-colors text-lg">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-brand-purple transition-colors">Home</Link></li>
              <li><Link to="/cars" className="hover:text-brand-purple transition-colors">Our Fleet</Link></li>
              <li><Link to="/contact" className="hover:text-brand-purple transition-colors">Contact Us</Link></li>
              <li><Link to="/login" className="hover:text-brand-purple transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-purple transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Subscribe</h3>
            <p className="text-gray-400 text-sm mb-4">Get the latest updates and offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-purple w-full"
              />
              <button className="bg-brand-purple text-white px-4 py-2 rounded-r-lg hover:bg-brand-purple/90 transition">
                →
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} RideOn. All rights reserved.</p>
          <p>Designed by <span className="text-gray-400">anchula yashwanth</span></p>
        </div>
      </div>
    </footer>
  );
}

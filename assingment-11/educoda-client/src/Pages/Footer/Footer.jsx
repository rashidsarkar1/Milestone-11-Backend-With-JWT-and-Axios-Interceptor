import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-6 text-gray-300 bg-[#1a2c2e]">
      <div className="container mx-auto text-center">
        <div className="md:flex md:justify-around">
          <div className="">
            <h3 className="mb-4 text-2xl font-bold">Contact Us</h3>
            <p className="mb-2">Email: contact@Educoda.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div className="flex justify-center lg:block">
            <img
              src="https://i.ibb.co/rQd3sFn/download.png"
              className=""
              alt=""
            />
          </div>
          <div className="mt-6">
            <h3 className="mb-4 text-2xl font-bold">Quick Links</h3>
            <div className="flex justify-center gap-3">
              <Link
                to="/"
                className="text-lg text-white transition duration-300 hover:text-[#6440FA] block mb-2"
              >
                Home
              </Link>
              <Link
                to="/assignments"
                className="text-lg text-white transition duration-300 hover:text-[#6440FA] block mb-2"
              >
                Assignments
              </Link>
              <Link
                to="/myAssignments"
                className="text-lg text-white transition duration-300 hover:text-[#6440FA] block mb-2"
              >
                My Assignments
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm">
          &copy; {new Date().getFullYear()} Educoda. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

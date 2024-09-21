import React from "react";
import Center from "../Center";
import Switcher from "../Switcher/Switcher";

function Footer() {
  return (
    <footer className="p-8 bg-[#33435b] mt-8">
      <Center>
        <Switcher>
          <div className=" text-gray-50">
            <ul>
              <li className=" text-gray-50">
                <a href="#">Home</a>
              </li>
              <li className=" text-gray-50">
                <a href="#">About Us</a>
              </li>
              <li className=" text-gray-50">
                <a href="#">Contact Us</a>
              </li>
              <li className=" text-gray-50">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className=" text-gray-50">
            <ul>
              <li className=" text-gray-50">
                <a href="#">Services</a>
              </li>
              <li className=" text-gray-50">
                <a href="#">FAQs</a>
              </li>
              <li className=" text-gray-50">
                <a href="#">Terms of Service</a>
              </li>
              <li className=" text-gray-50">
                <a href="#">Sitemap</a>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className=" text-gray-50">
                <a href="#">Blog</a>
              </li>
              <li className=" text-gray-50">
                <a href="#">Careers</a>
              </li>
              <li className=" text-gray-50">
                <a href="#">Feedback</a>
              </li>
            </ul>
          </div>
        </Switcher>
      </Center>
    </footer>
  );
}

export default Footer;

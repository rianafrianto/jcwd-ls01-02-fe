import React from "react";
import logo from "../../Assets/logo.png";
import whatsappIcon from "../../Assets/whatsapp-footer-icon.png";
import emailIcon from "../../Assets/email-footer-icon.png";
import callIcon from "../../Assets/call-footer-icon.png";
import facebookIcon from "../../Assets/facebook-footer-icon.png";
import twitterIcon from "../../Assets/twitter-footer-icon.png";
import instagramIcon from "../../Assets/instagram-footer-icon.png";

function Footer() {
  return (
    <div className="h-[500px] w-full hidden sm:flex sm:flex-col items-center">
      <div className="container h-full flex flex-col justify-center items-center">
        <div className="w-full h-5/6 px-24 py-16">
          <div className="w-full flex justify-center gap-x-32">
            <div className="flex flex-col gap-y-5">
              <figure className="h-14 w-60">
                <img src={logo} alt="" className="h-full" />
              </figure>
              <div className="flex items-center gap-5">
                <figure className="h-12">
                  <img src={whatsappIcon} alt="" className="h-full" />
                </figure>
                <div className="flex flex-col">
                  <div className="text-sm font-bold">Chat Whatsapp</div>
                  <div className="">+62 12345</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <figure className="h-12">
                  <img src={emailIcon} alt="" className="h-full" />
                </figure>
                <div className="flex flex-col">
                  <div className="text-sm font-bold">Email</div>
                  <div className="">contact@healthymed.com</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <figure className="h-12">
                  <img src={callIcon} alt="" className="h-full" />
                </figure>
                <div className="flex flex-col">
                  <div className="text-sm font-bold">Call Center</div>
                  <div className="">+62 123451313</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-md font-semibold text-secondary gap-y-7 w-48">
              <button className="text-left hover:underline">
                Tentang Kami
              </button>
              <button className="text-left hover:underline">FAQ</button>
              <button className="text-left hover:underline">
                Kebijakan Privasi
              </button>
              <button className="text-left hover:underline">
                Syarat & Ketentuan
              </button>
              <button className="text-left hover:underline">Karir</button>
            </div>
            <div className="flex flex-col text-md font-semibold text-secondary gap-y-7 w-48">
              <button className="text-left hover:underline">Blog</button>
              <button className="text-left hover:underline">
                Cara Belanja
              </button>
              <button className="text-left hover:underline">Promo</button>
              <button className="text-left hover:underline">Diagnosis</button>
            </div>
            <div className="flex flex-col text-secondary w-48 gap-y-5">
              <div className="text-2xl font-bold ">Ikuti Kami</div>
              <div className="flex flex-col gap-y-3">
                <button className="flex items-center gap-3">
                  <figure className="h-8">
                    <img src={facebookIcon} alt="" className="h-full" />
                  </figure>
                  <div className="font-bold">Facebook</div>
                </button>
                <button className="flex items-center gap-3">
                  <figure className="h-8">
                    {" "}
                    <img src={twitterIcon} alt="" className="h-full" />
                  </figure>
                  <div className="font-bold">Twitter</div>
                </button>
                <button className="flex items-center gap-3">
                  <figure className="h-8">
                    {" "}
                    <img src={instagramIcon} alt="" className="h-full" />
                  </figure>
                  <div className="font-bold">Instagram</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-1/6 bg-secondary flex items-center justify-center text-white">
        &copy; 2022 HealthyMed. All Right Reserved{" "}
      </div>
    </div>
  );
}
<div className="hidden  md:inline-block w-[100%] h-[480px] bg-white relative">
  <div className="flex justify-between items-center mx-16"></div>
  <div className="w-full h-[100px] absolute bottom-0 bg-[#F7F7F7]"></div>
</div>;

export default Footer;

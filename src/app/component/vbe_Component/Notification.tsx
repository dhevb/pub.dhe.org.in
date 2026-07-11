import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Link from "next/link";

interface Item {
  imageUrl: string;
  text: string;
  link: string;
}

const items: Item[] = [
  { imageUrl: "/vbe/new.gif", text: "New Issue for Viksit Bharat to submit paper or To read guidelines Click Here.", link: "/vbe.rase/NewIssue" },
//   { imageUrl: '/vbe/new.gif', text: '4th Edition of RASE Conferences is going to held at IIT Ropar on October 4-6, 2024. Stay tuned for more updates.', link: 'https://sm24.rase.co.in' },
//   { imageUrl: '/vbe/new.gif', text: 'To view the photos of RASE conferences 2024 Day-1, Click Here.', link: 'https://drive.google.com/drive/folders/1PpyJY91vF-ldoS9d2sdPWcBVvscXRq_0' },
//   { imageUrl: '/vbe/new.gif', text: 'To view the photos of RASE conferences 2024 Day-2, Click Here.', link: 'https://drive.google.com/drive/folders/1SgwPcXC3xRR7V3hAtKJSzeggBB9Xpwnk' },
  

];

const Notification: React.FC = () => {
    return (
      <div className="bg-[#f5f0e7] flex">
        <div className="bg-[#232323] p-2 text-base font-bold text-white">Announcement</div>
  <Marquee pauseOnHover={true}  pauseOnClick={true}>
  <div className="flex flex-wrap pt-2 ">
    
      {items.map((item, index) => (
        <div key={index} className="mb-4 ms-4 flex items-center">
          <Image
            src={item.imageUrl}
            alt=""
            width={24}
            height={24}
            className="me-1 mt-1 object-cover"
            unoptimized
          />
          <Link href={item.link}>
      
          <p className="mr-2 font-semibold text-base  text-primary ">{item.text}</p>
         
          </Link>
        </div>
      ))}
    </div>
  </Marquee>
      </div>
     
    );
  };
  
  export default Notification;
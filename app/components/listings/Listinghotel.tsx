'use client';
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "./slideCss/slider.css";


interface ListingEventProps {
    // icon: Icon,
    //hotels: SafeListing;
  }
const Listinghotel : React.FC<ListingEventProps> = ({ 
    //hotels,
   }) => {  
    const filteredItems = [
      {
        id: 1,
        img: "/images/hotels/maroua_palace.jpeg",
        nom: "Hotel Maroua Palace",
        price: 33774,
      },
      {
        id: 2,
        img: "/images/hotels/Sahel.jpeg",
        nom: "Hotel le Sahel",
        price: 28555,
      },
      {
        id: 3,
        img: "/images/hotels/hotel-le-sahel.jpg",
        nom: "Hotel le mont",
        price: 42250,
      },
      {
        id: 4,
        img: "/images/hotels/faya.jpg",
        nom: "Hotel Faya",
        price: 20000,
      },
      {
        id: 5,
        img: "/images/hotels/hotel-mizao.jpg",
        nom: "Hotel Mizao",
        price: 29990,
      },
    ];
  
    const slideLeft = () => {
      let slider = document.getElementById("slider") ;
      if(slider === null){
        return console.log(slider, "id is null")
      }
      slider.scrollLeft = slider.scrollLeft - 235;
    };
  
    const slideRight = () => {
      let slider = document.getElementById("slider");
      if(slider === null){
        return console.log(slider, "id is null")
      }
      slider.scrollLeft = slider.scrollLeft + 235;
    };
    return (
      <>
        <div className="trending">
          <div className="container">
            <div className="row-container" id="slider">
              {filteredItems.map((item) => (
                <div key={item.id} className="row-item">
                  <Link href={'/'} className="link">
                    <div className="item-header">
                      <img src={item.img} alt="product" />
                      <p className="item-price">{item.price}XAF</p>
                    </div>
                    <div className="item-description">
                      <p className="font-semibold text-base text-black-500">{item.nom}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="title-btns">
              <div className="btns">
                <button title="scroll left" onClick={slideLeft}>
                  <AiOutlineArrowLeft />
                </button>
                <button title="scroll right" onClick={slideRight}>
                  <AiOutlineArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
export default Listinghotel;
 
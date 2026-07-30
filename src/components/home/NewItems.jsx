import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";  

const CountdownTimer = ({expiryDate}) => {
  const [timeText, setTimeText] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    function calculateTime(){
      const now = Date.now();
      const distance = expiryDate - now;

      if (distance <= 0) {
        setTimeText("Expired");
      } else {
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");




        setTimeText(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
      }
    };

   calculateTime();
    const interval = setInterval(calculateTime, 1000);


    return () => clearInterval(interval);
  }, [expiryDate]); 

  if (!expiryDate) return null;

  return <div className="de_countdown">{timeText}</div>;
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(data); 
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
        }
      };
    fetchNewItems();
  }, []);

      


const options = {
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    1200: { items: 4 },
  },
};
        return (
          <section id="section-items" className="no-bottom">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center">
                    <h2>New Items</h2>  
                    <div className="small-border bg-color-2"></div>
                  </div>
                </div>  

              <div className="col-lg-12">
                {loading ? (
                  
                  <div className="row">
                    {new Array(4).fill(0).map((_, index) => (
                    <div
                     className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                      >
                        <div className="nft__item">
                          <div className="author__list_pp">
                            <div className="skeleton-box"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",

                            }}
                            ></div>
                            <div className="nft__item_wrap">
                              <div
                              className="skeleton_box"
                              style={{ width: "100%", height: "200px" }}
                              ></div>
                              </div>
                              <div
                              className="nft__item_info"
                              style={{marginTop: "15px" }}
                              >
                                <div
                                className="skeleton_box"
                                style={{width: "120px", height: "20px" }}
                                ></div>
                                <div
                                className="skeleton_box"
                                style={{
                                  width: "80px",
                                  height: "15px",
                                  marginTop: "10px",  
                                }}
                                ></div>
                                </div>
                                </div>
     </div>
                                </div>
  ))}
  </div>
  ) : (
    /* Owl Carousel */
    items.length > 0 && (
    <OwlCarousel
    key={items.length}
    className="Owl-theme"
    {...options}
  >
    {items.map((item) => (
      <div className="nft__item" key={item.id}>
        <div className="authoer_list_pp">
          <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"     data-bs-placement="top"
          title={ `Author: ${item.authorName}` }
          >
            <img className="lazy" src={item.authorImage} alt="" />
            <i classname="fa fa-check"></i>
            </Link>
            </div>
{/* Live Dynamic Countdown */ }
<CountdownTimer expiryDate={item.expiryDate} />

<div className="nft__item_wrap">



  <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="/" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="/" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="mailto:?subject=I'm looking at this NFT&amp;body=Check out this NFT">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                          </div>
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title}
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
        </div>
                  ))}
                </OwlCarousel>
              )
            )}
          </div>
          </div> 
      </div>
    </section>
  );
};

export default NewItems;












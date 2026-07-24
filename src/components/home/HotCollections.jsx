import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import $ from "jquery";
window.$ = window.jQuery = $;
import OwlCarousel from "react-owl-carousel2";
import "../../css/styles/owl.carousel.css";
import "../../css/styles/owl.theme.css";

const carouselOptions = {
  items: 3,
  loop: true,
  margin: 20,
  nav: true,
  dots: true,
  autoplay: true,
  autoplayTimeout: 5000,
  smartSpeed: 600,
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    992: { items: 3 },
  },
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(data);
      } catch (error) {
        console.error("HotCollections fetch failed:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {collections.length === 0 ? (
          <div className="row">
            <div className="col-lg-12 text-center">
              <p>Loading hot collections...</p>
            </div>
          </div>
        ) : (
          <OwlCarousel options={carouselOptions} className="owl-theme">
            {collections.map((collection, index) => {
              const itemImage = collection?.nftImage || collection?.image || nftImage;
              const authorImage = collection?.authorImage || collection?.authorImg || AuthorImage;
              const title = collection?.title || collection?.name || "Collection";
              const key = collection?.id || index;

              return (
                <div className="item" key={key}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={itemImage}
                          className="lazy img-fluid"
                          alt={title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={authorImage}
                          alt={title}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{title}</h4>
                      </Link>
                      <span>ERC-192</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </OwlCarousel>
        )}
      </div>
    </section>
  );
};

export default HotCollections;

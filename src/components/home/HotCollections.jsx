import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from  "axios";


const HotCollections = () => {
const [collections, setCollections] = useState([]);



  useEffect(() => {
    const fetchCollections = async () => {
      const { data } = await axios.get(
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
);

      console.log(data);
      setCollections(data);
    };

    fetchCollections();
  },[]);
    
  






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
          {collections.map((collection, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src= "https://nft-place.web.app/static/media/static-1.0299eed903ee71c8c953.jpg" className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src="https://nft-place.web.app/static/media/author-1.04ee784f53cbe427d362.jpg"
                    alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>collections.title</h4>
                  </Link>
                  <span>ERC-192</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

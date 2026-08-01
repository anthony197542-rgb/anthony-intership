<<<<<<< HEAD
=======

>>>>>>> e68c6e4 (first commit)
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  // Click handler
  const handleSellerClick = (seller) => {
    console.log("Seller clicked:", seller);
  };

  useEffect(() => {
    async function fetchTopSellers() {
      try {
        const { data } = await axios.get(
             "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
          console.log(data[0]);
        setSellers(data);
      } catch (error) {
      
      } finally {
        setLoading(false);
      }
    }

=======
  // 1. Fetch top sellers data from API
  async function fetchTopSellers() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setSellers(data);
    } catch (error) {
      console.error("Error fetching top sellers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
>>>>>>> e68c6e4 (first commit)
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="col-md-12">
            <ol className="author_list">
<<<<<<< HEAD
              {loading
                ? Array.from({ length: 12 }).map((_, index) => (
=======
              {/* 2. Loading Skeleton State */}
              {loading
                ? new Array(12).fill(0).map((_, index) => (
>>>>>>> e68c6e4 (first commit)
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>
                      <div className="author_list_info">
<<<<<<< HEAD
                        <Skeleton width="100px" height="20px" />
                        <Skeleton width="40px" height="15px" />
                      </div>
                    </li>
                  ))
                : sellers.map((seller) => (
                    <li
                      key={seller.id}
                      onClick={() => handleSellerClick(seller)}
                      style={{ cursor: "pointer" }}
                    >
=======
                        <Skeleton
                          width="100px"
                          height="20px"
                          borderRadius="4px"
                        />
                        <Skeleton
                          width="40px"
                          height="15px"
                          borderRadius="4px"
                        />
                      </div>
                    </li>
                  ))
                : /* 3. Rendered Content */
                  sellers.map((seller) => (
                    <li key={seller.id}>
>>>>>>> e68c6e4 (first commit)
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt={seller.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
<<<<<<< HEAD

=======
>>>>>>> e68c6e4 (first commit)
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default TopSellers;

                    
            
=======
export default TopSellers;
>>>>>>> e68c6e4 (first commit)

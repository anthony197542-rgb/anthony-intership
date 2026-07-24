import React, { useEffect, useState } from "react";
import axios from "axios";
import NewItem from "./NewItem";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        console.error("NewItems fetch failed:", fetchError);
        setError("Unable to load new items.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

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
          {isLoading ? (
            <div className="col-lg-12 text-center">
              <p>Loading new items...</p>
            </div>
          ) : error ? (
            <div className="col-lg-12 text-center">
              <p>{error}</p>
            </div>
          ) : (
            items.map((item, index) => {
              const itemData = {
                title: item.title || "Untitled",
                price: item.price || "0 ETH",
                likes: item.likes ?? 0,
                creator: item.authorId || "Unknown",
                countdown: item.expiryDate || "",
                link: "/item-details",
                authorImage: item.authorImage || AuthorImage,
                image: item.nftImage || nftImage,
              };
              return <NewItem key={item.id || index} item={itemData} />;
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;

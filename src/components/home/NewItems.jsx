import React from "react";
import NewItem from "./NewItem";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const itemList = [
  {
    title: "Pinky Ocean",
    price: "3.08 ETH",
    likes: 69,
    creator: "Monica Lucas",
    countdown: "5h 30m 32s",
    link: "/item-details",
    authorImage: AuthorImage,
    image: nftImage,
  },
  {
    title: "Golden Sunset",
    price: "2.45 ETH",
    likes: 42,
    creator: "Alex Reed",
    countdown: "4h 10m 12s",
    link: "/item-details",
    authorImage: AuthorImage,
    image: nftImage,
  },
  {
    title: "Moonlit Dream",
    price: "1.99 ETH",
    likes: 78,
    creator: "Luna Reed",
    countdown: "7h 12m 05s",
    link: "/item-details",
    authorImage: AuthorImage,
    image: nftImage,
  },
  {
    title: "Cyber Horizon",
    price: "4.56 ETH",
    likes: 91,
    creator: "Nina Fox",
    countdown: "2h 05m 18s",
    link: "/item-details",
    authorImage: AuthorImage,
    image: nftImage,
  },
];

const NewItems = () => {
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
          {itemList.map((item, index) => (
            <NewItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;

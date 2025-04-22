import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { getItemDetails } from "../api/api";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(nftId);
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getItemDetails(nftId);
        console.log("Fetched item details data:", data);
        if (data) {
          setItemData(data);
        } else {
          setError("Failed to fetch NFT details");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching NFT details");
      } finally {
        setLoading(false);
      }
    };
    if (nftId) {
      fetchItemDetails();
    }
  }, [nftId]);
  if (loading) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h3>Loading...</h3>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h3>Error: {error}</h3>
          </div>
        </div>
      </div>
    );
  }
  if (!itemData) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h3>NFT not found</h3>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemData.image || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={itemData.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemData.title}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemData.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemData.likes || 0}
                    </div>
                  </div>
                  <p>{itemData.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemData.owner?.id}`}>
                            <img className="lazy" src={itemData.owner?.image || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemData.owner?.id}`}>{itemData.owner?.name}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemData.creator?.id}`}>
                            <img className="lazy" src={itemData.creator?.image || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemData.creator?.id}`}>{itemData.creator?.name}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemData.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;

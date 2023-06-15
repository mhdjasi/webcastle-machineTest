import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const RelatedDetails = () => {
  const [product, setProduct] = useState();
  const { productId } = useParams();

  // tabs functions
  const [activeTab, setActiveTab] = useState("description");
  const [isLoading, setIsLoading] = useState(true);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // logout function
  const logout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      auth.signOut();
    }
  };

  // get api function
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  //   image magnifier
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleClose = () => {
    setIsZoomed(false);
  };

  // review static data
  const reviews = [
    {
      id: 1,
      title: "Great product!",
      content: "This product exceeded my expectations. Highly recommended!",
      author: "John Doe",
      src: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
    },
    {
      id: 2,
      title: "Good quality",
      content: "The quality of this product is excellent. Im very satisfied.",
      author: "Jane Smith",
      src: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
    },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* header section start here*/}
      <header>
        <div
          className="headerSection"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to={"/"}>
            <button className="btn btn-success me-3"> Home</button>
          </Link>

          <button className=" btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </header>
      {/* header section end here */}

      {/* Main section  start here*/}

      <div className="container-fluid" style={{ marginTop: 50 }}>
        <div className="mt-5">
          <div className="row mb-5 mt-3">
            {/* image section start here*/}
            <div className="col-lg-6">
              <center>
                <img
                  src={product?.image}
                  alt="product"
                  className="mainProductImage"
                  onClick={handleImageClick}
                  style={{ cursor: "zoom-in" }}
                />
                {isZoomed && (
                  <div className="modal" onClick={handleClose}>
                    <div className="modal-content">
                      <img
                        src={product?.image}
                        alt="Zoomed Product"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                )}
              </center>
            </div>
            {/* image section  end here*/}
            {/* product details section start here */}

            <div className="col-lg-6">
              <h2>{product?.title}</h2>

              <p className="mt-3" style={{ fontSize: "18px" }}>
                {product?.category}
              </p>
              <h1 className="mt-3">$ {product?.price}</h1>

              <h5 className="mt-4">
                <span className="fa fa-star checked me-2 text-warning"></span>
                {product?.rating?.rate} ({product?.rating?.count})
              </h5>
            </div>
            {/* product details section end here */}
          </div>
          {/* tabs section start here */}

          <div className="product-tabs" style={{maxHeight:"200vh"}}>
            <ul className="tab-list">
              <li
                className={activeTab === "description" ? "active" : ""}
                onClick={() => handleTabChange("description")}
              >
                <span className="tab-heading">Description</span>
              </li>
              <li
                className={activeTab === "features" ? "active" : ""}
                onClick={() => handleTabChange("features")}
              >
                <span className="tab-heading">Features</span>
              </li>
              <li
                className={activeTab === "reviews" ? "active" : ""}
                onClick={() => handleTabChange("reviews")}
              >
                <span className="tab-heading">Reviews</span>
              </li>
            </ul>

            <div className="tab-content">
              {activeTab === "description" && (
                <div>
                  <h2>Description</h2>
                  {/* Description content */}
                  <h5 style={{ textAlign: "justify" }}>
                    {product?.description}
                  </h5>
                </div>
              )}

              {activeTab === "features" && (
                <div>
                  <h2>Features</h2>
                  <ul style={{ textAlign: "justify" }}>
                    <li>
                      Multi-Level Organizer: The backpack has a front zipper
                      pocket for the ID card, Sanitizer, House keys, Pen. First
                      compartment with pockets for the earphones, pens,
                      notebook, Fitness Band. Spacious second compartment for
                      all your electronics. Compatible Laptop Size 16 inch
                    </li>
                    <li>
                      Ergonomic Design: Thick cushioning around the shoulders
                      and on the back panel makes the backpack super light and
                      comfortable on the move. “S” Shaped shoulder strap
                      distribute the weight of the backpack across your upper
                      body.
                    </li>
                    <li>
                      1 Year Warranty: The Wesley Business casual backpack comes
                      with 1 year of warranty
                    </li>
                    <li>
                      Water Resistant Material: Advanced IPX4 coating on the
                      material ensures resistance to water entering from any
                      direction.
                    </li>
                    <li>
                      30L Capacity: The Backpack has a padded laptop compartment
                      that can fit 15.6 inch laptop. It can also accommodate
                      essentials such as a Lunch box, Charger, Tablet, Books,
                      Power Bank, Wallet, and Sunglass.
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h2>Reviews</h2>
                  <div>
                    {reviews.map((review) => (
                      <div key={review.id}>
                        <div className="row d-flex">
                          <div className="col-lg-1">
                            <div className="my-3 d-flex justify-content-center">
                              <img
                                style={{ height: "60px" }}
                                src={review?.src}
                                className="rounded-circle"
                                alt="Avatar"
                              />
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <h5>{review?.title}</h5>
                            <p>{review?.content}</p>
                            <p>By: {review?.author}</p>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* tabs section end here */}
      {/* Main section  end here*/}

      {/* footer section */}
      <footer>
        <div className="text-center footerSection mt-5">
          <p>Developed for Machine Test</p>
        </div>
      </footer>
    </>
  );
};

export default RelatedDetails;

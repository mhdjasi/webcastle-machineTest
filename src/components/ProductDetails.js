import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { productId } = useParams();

  // product get API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/1`);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        setRelatedProducts(response.data);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [productId]);

  // image magnifier function
  const [isZoomed, setIsZoomed] = useState(false);
  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleClose = () => {
    setIsZoomed(false);
  };

  // tabs functions
  const [activeTab, setActiveTab] = useState("description");
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
          <h5 className=" usernumber">
            <span style={{ color: "black" }}>Welcome</span>{" "}
            {auth.currentUser.phoneNumber}
          </h5>
          <Link to={"/"}>
            <button className="btn btn-primary me-3">Home</button>
          </Link>

          <button className="btn btn-danger m-1" onClick={logout}>
            Logout
          </button>
        </div>
      </header>
      {/* header section end here */}

      {/* Main section  start here*/}
      <div className="container-fluid mainPart">
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

              <p className="mt-3 text-primary" style={{ fontSize: "18px" }}>
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
          <div className="product-tabs">
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
                  {/* Features content */}
                  <h5 style={{ textAlign: "justify" }}>
                    {product?.description}
                  </h5>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h2>Reviews</h2>
                  {/* Reviews content */}
                  <h5 style={{ textAlign: "justify" }}>
                    {product?.description}
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* tabs section end here */}

        {/* related products cards start here */}
        <h3 className="mt-5">Related Products</h3>
        <div className="scrollable-product-card-list">
          {relatedProducts.map((product) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`details/${product.id}`}
            >
              <div key={product.id} className="card">
                <img src={product?.image} alt={product.name} />
                <h6>{product?.title}</h6>
              </div>
            </Link>
          ))}
        </div>
        {/* related products cards start here */}
      </div>
      {/* Main section  end here*/}

      {/* footer section */}
      <footer>
        <div className="text-center footerSection">
          <p>Developed for Machine Test</p>
        </div>
      </footer>
    </>
  );
};

export default ProductDetails;

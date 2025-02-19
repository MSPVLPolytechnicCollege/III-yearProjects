import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SellingPage = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");

  // console.log(user.isSeller);
  if (!user?.isSeller) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", {
        name,
        description,
        brand,
        category,
        price,
        countInStock,
        isSeller: user.isSeller,
        userId: user._id
      }, { withCredentials: true });
      toast.success("Product added successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Upload New Product</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input type="text" className="form-control" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Count In Stock</label>
          <input type="number" className="form-control" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Upload Product</button>
      </form>
    </div>
  );
};

export default SellingPage;

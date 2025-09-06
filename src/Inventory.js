// src/Inventory.js
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import "./Inventory.css"; // CSS file for styling

function Inventory({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: ""
  });

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(items);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex === -1) {
        const docRef = await addDoc(collection(db, "products"), formData);
        setProducts([...products, { id: docRef.id, ...formData }]);
      } else {
        const productToUpdate = products[editIndex];
        const docRef = doc(db, "products", productToUpdate.id);
        await updateDoc(docRef, formData);
        const updatedProducts = [...products];
        updatedProducts[editIndex] = { id: productToUpdate.id, ...formData };
        setProducts(updatedProducts);
        setEditIndex(-1);
      }
      setFormData({ name: "", price: "", quantity: "", category: "" });
    } catch (error) {
      console.error("Error adding/updating product: ", error);
      alert("Error adding/updating product. Check console.");
    }
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      const productToDelete = products[index];
      await deleteDoc(doc(db, "products", productToDelete.id));
      setProducts(products.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting product: ", error);
      alert("Error deleting product. Check console.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Inventory Management System</h1>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" id="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <input type="number" id="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="number" id="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
        <select id="category" value={formData.category} onChange={handleChange} required>
          <option value="">Category</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Groceries</option>
          <option>Furniture</option>
          <option>Other</option>
        </select>
        <button type="submit">{editIndex === -1 ? "Add Product" : "Update Product"}</button>
      </form>

      <table className="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.category}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(i)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;

import '../styles/admin.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');

  const [editId, setEditId] = useState(null);

  const url = `${API_URL}/products`;

  const fetchProducts = () => {
    axios.get(url)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setName('');
    setCategory('');
    setPrice('');
    setMrp('');
    setBrand('');
    setStock('');
    setImage('');
    setEditId(null);
  };

  const validate = () => {
    if (!name || !category || !price || !mrp || !brand || !stock || !image) {
      alert('Please fill all fields');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const discount = Math.round(((mrp - price) / mrp) * 100);

    const productData = {
      name: name,
      category: category,
      price: Number(price),
      mrp: Number(mrp),
      discount: discount,
      brand: brand,
      stock: Number(stock),
      image: image,
      isDeal: false,
      rating: 4.0,
      description: `${name} from ${brand}`,
    };

    if (editId) {
      axios.put(`${url}/${editId}`, productData)
        .then(() => {
          alert('Product updated successfully');
          resetForm();
          fetchProducts();
        })
        .catch((err) => {
          console.log(err);
          alert('Update failed');
        });
    } else {
      axios.post(url, productData)
        .then(() => {
          alert('Product added successfully');
          resetForm();
          fetchProducts();
        })
        .catch((err) => {
          console.log(err);
          alert('Add product failed');
        });
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setMrp(product.mrp);
    setBrand(product.brand);
    setStock(product.stock);
    setImage(product.image);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');

    if (!confirmDelete) {
      return;
    }

    axios.delete(`${url}/${id}`)
      .then(() => {
        alert('Product deleted successfully');
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
        alert('Delete failed');
      });
  };

  return (
    <div className="admin-page">
      <h2>Admin Panel - Manage Products</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <h3>{editId ? 'Edit Product' : 'Add New Product'}</h3>

        <label htmlFor="">Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="">Category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />

        <label htmlFor="">Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label htmlFor="">MRP</label>
        <input type="number" value={mrp} onChange={(e) => setMrp(e.target.value)} />

        <label htmlFor="">Brand</label>
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />

        <label htmlFor="">Stock</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />

        <label htmlFor="">Image URL</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

        <div className="form-buttons">
          <button type="submit">{editId ? 'Update Product' : 'Add Product'}</button>
          {editId && <button type="button" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <h3>All Products</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td><img src={product.image} alt={product.name} /></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin
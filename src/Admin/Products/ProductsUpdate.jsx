import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../api/Products";

function ProductsUpdate() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id);
        setFormData({
          title: productData.title || "",
          description: productData.description || "",
          price: productData.price || "",
          discountPercentage: productData.discountPercentage || "",
          rating: productData.rating || "",
          stock: productData.stock || "",
          brand: productData.brand || "",
          category: productData.category || "",
          thumbnail: productData.thumbnail || "",
          images: productData.images || "",
        });
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData, images: formData.images.split(", ") };
      const response = await updateProduct(id, updatedData);
      console.log("Product Updated:", response);
      // Optionally, you can redirect to another page after successful update
    } catch (error) {
      console.error("Error updating Product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-5 p-5 border rounded shadow-lg bg-white">
      <div className="mt-3">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        ></textarea>
      </div>
      <div className="mt-3">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">
          Discount Percentage:
        </label>
        <input
          type="number"
          id="discountPercentage"
          name="discountPercentage"
          value={formData.discountPercentage}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
        />
      </div>
      <div className="mt-3">
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Rating:
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
        />
      </div>
      <div className="mt-3">
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
          Stock:
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
          Brand:
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category:
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required        />
      </div>
      <div className="mt-3">
        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
          Thumbnail URL:
        </label>
        <input
          type="text"
          id="thumbnail"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
          Image URLs (comma separated):
        </label>
        <textarea
          id="images"
          name="images"
          value={formData.images}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        ></textarea>
      </div>
      <button type="submit" className="mt-5 bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Update Product
      </button>
    </form>
  );
}

export default ProductsUpdate;


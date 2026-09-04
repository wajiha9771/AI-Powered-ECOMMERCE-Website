import React, { useState } from "react";
import {
  useProducts,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../hooks/useProducts";
import "./AdminLayout.css";

export default function AdminProducts() {
  const { data: products, isLoading, isError, error } = useProducts();
  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const [editingProductId, setEditingProductId] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [category, setCategory] = useState("men");
  const [badge, setBadge] = useState("");
  const [images, setImages] = useState([""]);
  const [rawImageFiles, setRawImageFiles] = useState([null]);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("10");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const handleProductFileSelection = (index, fileObject) => {
    if (!fileObject) return;

    const localPreviewUrl = URL.createObjectURL(fileObject);

    const updatedImages = [...images];
    updatedImages[index] = localPreviewUrl;
    setImages(updatedImages);

    const updatedFiles = [...rawImageFiles];
    updatedFiles[index] = fileObject;
    setRawImageFiles(updatedFiles);
  };

  const handleAddImageField = () => {
    setImages([...images, ""]);
    setRawImageFiles([...rawImageFiles, null]);
  };

  const handleRemoveImageField = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setRawImageFiles(rawImageFiles.filter((_, i) => i !== index));
  };

  const handleEditClick = (product) => {
    setEditingProductId(product._id);

    setName(product.name);
    setPrice(product.price.toString());
    setOldPrice(product.oldPrice ? product.oldPrice.toString() : "");
    setCategory(product.category);
    setBadge(product.badge || "");

    setImages(
      product.images && product.images.length > 0 ? product.images : [""],
    );

    setRawImageFiles(
      product.images && product.images.length > 0
        ? new Array(product.images.length).fill(null)
        : [null],
    );

    setDescription(product.description || "");

    // Load existing stock when editing
    setStock(
      product.stock !== undefined && product.stock !== null
        ? product.stock.toString()
        : "0",
    );

    setIsFeatured(product.isFeatured || false);
    setIsTrending(product.isTrending || false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);

    setName("");
    setPrice("");
    setOldPrice("");
    setCategory("men");
    setBadge("");
    setImages([""]);
    setRawImageFiles([null]);
    setDescription("");
    setStock("10");
    setIsFeatured(false);
    setIsTrending(false);
  };

  const handleDelete = (productId) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this product?",
      )
    ) {
      deleteProductMutation.mutate(productId, {
        onSuccess: () => alert("Product deleted successfully! 🗑️"),
        onError: (err) => alert(`Error: ${err.message}`),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validatedImages = images.filter(
      (url) => url.trim() !== "" && !url.startsWith("blob:"),
    );

    const numericStock = Number(stock);

    if (!Number.isInteger(numericStock) || numericStock < 0) {
      alert("Stock must be a whole number equal to or greater than 0.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name.trim());
    formData.append("price", Number(price));

    if (oldPrice) {
      formData.append("oldPrice", Number(oldPrice));
    }

    formData.append("category", category.toLowerCase());

    if (badge) {
      formData.append("badge", badge.trim());
    }

    formData.append("description", description.trim());

    // Actual inventory stock
    formData.append("stock", numericStock);

    formData.append("isFeatured", isFeatured);
    formData.append("isTrending", isTrending);

    formData.append(
      "tags",
      JSON.stringify([name.trim().toLowerCase(), category.toLowerCase()]),
    );

    if (validatedImages.length > 0) {
      formData.append("images", JSON.stringify(validatedImages));
    }

    if (rawImageFiles && rawImageFiles.length > 0) {
      rawImageFiles.forEach((file) => {
        if (file) {
          formData.append("productImages", file);
        }
      });
    }

    if (editingProductId) {
      updateProductMutation.mutate(
        {
          id: editingProductId,
          updatedData: formData,
        },
        {
          onSuccess: () => {
            alert("Product updated successfully! ");
            handleCancelEdit();
          },
          onError: (err) => alert(`Error updating: ${err.message}`),
        },
      );
    } else {
      addProductMutation.mutate(formData, {
        onSuccess: () => {
          alert("Product added successfully! ");
          handleCancelEdit();
        },
        onError: (err) => alert(`Error: ${err.message}`),
      });
    }
  };

  if (isLoading) {
    return <div className="admin-loading">Loading Store Inventory... ⏳</div>;
  }

  if (isError) {
    return <div className="admin-error">Error: {error.message} ❌</div>;
  }

  return (
    <div className="admin-products-page">
      <h2>Products Inventory Management</h2>

      <p className="admin-subtitle">
        Create new product cards or monitor current active listing stocks.
      </p>

      <form onSubmit={handleSubmit} className="admin-form" noValidate>
        <div className="admin-form-header-row">
          <h3>
            {editingProductId
              ? "Edit Product Configuration ✏️"
              : "Add New Product Asset "}
          </h3>

          {editingProductId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn-danger-sm"
            >
              Cancel Edit ❌
            </button>
          )}
        </div>

        <div className="admin-grid">
          <div className="form-group">
            <label>Product Name *</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Slim Fit Cotton Linen Shirt"
            />
          </div>

          <div className="form-group">
            <label>Category Selection *</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="men">Men's Collection</option>
              <option value="women">Women's Collection</option>
              <option value="kids">Kids' Collection</option>
              <option value="accessories">Accessories</option>
              <option value="new-arrivals">New Arrivals</option>
            </select>
          </div>
        </div>

        <div className="admin-grid">
          <div className="form-group">
            <label>Price ($ Pure Numbers Only) *</label>

            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="e.g., 49.99"
            />
          </div>

          <div className="form-group">
            <label>Old Price (Optional Strikethrough Sale)</label>

            <input
              type="number"
              step="0.01"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              placeholder="e.g., 75.00"
            />
          </div>
        </div>

        {/* =============================== */}
        {/* INVENTORY STOCK */}
        {/* =============================== */}

        <div className="form-group">
          <label>Available Stock *</label>

          <input
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            placeholder="e.g., 25"
          />

          <small
            style={{
              display: "block",
              marginTop: "6px",
              color: "#6b7280",
              fontSize: "12px",
            }}
          >
            Enter the number of units currently available.
          </small>
        </div>

        <div className="form-group">
          <label>Badge Label Text (Optional)</label>

          <input
            type="text"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            placeholder="e.g., New, Sale 20%, Hot, New Drop"
          />
        </div>

        <div className="form-group">
          <div
            className="image-stack-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <label>Product Image Assets Configuration *</label>

            <button
              type="button"
              className="btn-secondary"
              onClick={handleAddImageField}
            >
              + Add More Product Images
            </button>
          </div>

          {images &&
            images.map((url, index) => (
              <div
                key={index}
                className="admin-image-upload-box"
                style={{ marginBottom: "15px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    className="admin-upload-section-title"
                    style={{ margin: 0 }}
                  >
                    Picture Asset #{index + 1} {index === 0 && "*"}
                  </span>

                  {index > 0 && (
                    <button
                      type="button"
                      className="btn-danger-sm"
                      style={{
                        padding: "2px 8px",
                        fontSize: "11px",
                      }}
                      onClick={() => handleRemoveImageField(index)}
                    >
                      Remove Slot 🗑️
                    </button>
                  )}
                </div>

                <div>
                  <span className="admin-upload-option-label">
                    Option A: Paste Image URL
                  </span>

                  <input
                    type="text"
                    value={url && url.startsWith("blob:") ? "" : url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Paste online image link here..."
                    className="admin-url-input-field"
                  />
                </div>

                <div className="admin-upload-divider">
                  <hr />
                  <span>OR</span>
                  <hr />
                </div>

                <div>
                  <span className="admin-upload-option-label">
                    Option B: Upload from Computer
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (file) {
                        handleProductFileSelection(index, file);
                      }
                    }}
                    className="admin-file-input-field"
                  />
                </div>

                {url && (
                  <div className="admin-preview-wrapper">
                    <span
                      className="admin-preview-label"
                      style={{ color: "#0984e3" }}
                    >
                      Image Preview:
                    </span>

                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="admin-preview-img"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>

        <div className="form-group" style={{ marginTop: "15px" }}>
          <label>Product Specification Summary Description</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe fabrics, measurements, aesthetics..."
            rows="3"
          ></textarea>
        </div>

        <div className="checkbox-stack">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            Display on Homepage (Featured Grid) ⭐️
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isTrending}
              onChange={(e) => setIsTrending(e.target.checked)}
            />
            Display on Trending Section 🔥
          </label>
        </div>

        <button
          type="submit"
          className="btn-success-full"
          disabled={
            addProductMutation.isPending || updateProductMutation.isPending
          }
        >
          {editingProductId
            ? updateProductMutation.isPending
              ? "Updating Configuration... ⏳"
              : "Save Product Changes ✏️"
            : addProductMutation.isPending
              ? "Syncing System Data Config... ⏳"
              : "Save Product "}
        </button>
      </form>

      <h3>Active Products Listing ({products?.length || 0})</h3>

      <div className="admin-table-container">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Promotional States</th>
              <th className="text-center">System Actions</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td className="font-semibold">{product.name}</td>

                <td className="capitalize">{product.category}</td>

                <td>${product.price?.toFixed(2)}</td>

                <td>
                  {product.stock === 0 ? (
                    <span
                      className="badge-tag"
                      style={{
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                      }}
                    >
                      Out of Stock
                    </span>
                  ) : product.stock <= 5 ? (
                    <span
                      className="badge-tag"
                      style={{
                        backgroundColor: "#fef3c7",
                        color: "#d97706",
                      }}
                    >
                      Low Stock ({product.stock})
                    </span>
                  ) : (
                    <span
                      className="badge-tag"
                      style={{
                        backgroundColor: "#d1fae5",
                        color: "#059669",
                      }}
                    >
                      {product.stock} Available
                    </span>
                  )}
                </td>

                <td>
                  {product.isFeatured && (
                    <span className="badge-tag featured">Featured ⭐️</span>
                  )}

                  {product.isTrending && (
                    <span className="badge-tag trending">Trending 🔥</span>
                  )}
                </td>

                <td className="text-center admin-action-cell">
                  <button
                    type="button"
                    className="btn-secondary-sm"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit ✏️
                  </button>

                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete Asset 🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

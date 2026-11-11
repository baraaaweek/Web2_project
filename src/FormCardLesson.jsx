import { useState } from "react";
import "./FormCardLesson.css";

const emptyProduct = {
  image: "",
  title: "",
  price: "",
  description: "",
};

function FormCardLesson() {
  const [formData, setFormData] = useState(emptyProduct);
  const [products, setProducts] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProducts((currentProducts) => [...currentProducts, formData]);
    setFormData(emptyProduct);
  };

  return (
    <main className="form-card-lesson">
      <section className="product-form-panel">
        <h1>Create a Product</h1>
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="product-form-field">
            <label htmlFor="product-image">Image link:</label>
            <input
              id="product-image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
          <div className="product-form-field">
            <label htmlFor="product-title">Product title:</label>
            <input
              id="product-title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="product-form-field">
            <label htmlFor="product-price">Price:</label>
            <input
              id="product-price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="product-form-field">
            <label htmlFor="product-description">Description:</label>
            <textarea
              id="product-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <button className="product-submit-button" type="submit">
            Submit
          </button>
        </form>
      </section>

      <section className="product-list" aria-label="Products">
        {products.map((product, index) => (
          <article className="product-card" key={`${product.title}-${index}`}>
            <img src={product.image} alt={product.title} />
            <div className="product-card-content">
              <h2>{product.title}</h2>
              <p className="product-card-price">
                ${Number(product.price).toFixed(2)}
              </p>
              <p className="product-card-description">{product.description}</p>
              <button className="add-to-cart-button" type="button">
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default FormCardLesson;
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Add from "./pages/Add";
import CardFormLesson from "./FormCardLesson";
import SavedBooks from "./pages/SavedBooks";

const emptyForm = {
  booktitle: "",
  bookurl: "",
  bookprice: "",
  bookdescription: "",
};

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState("shop");
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.booktitle.trim() || !formData.bookurl.trim()) {
      return;
    }

    const newProduct = {
      ...formData,
      id: `${Date.now()}-${Math.random()}`,
      imagetitle: formData.booktitle.trim(),
      imageurl: formData.bookurl.trim(),
      price: formData.bookprice.trim() || "Price not set",
      description: formData.bookdescription.trim() || "No description yet",
    };

    setProducts((current) => [newProduct, ...current]);
    setFormData(emptyForm);
  };

  const handleAddToCart = (product) => {
    setCart((current) => {
      const nextCart = [
      ...current,
      {
        ...product,
        cartId: `${product.id}-cart-${Date.now()}`,
      },
      ];

      window.localStorage.setItem("savedBooks", JSON.stringify(nextCart));
      return nextCart;
    });
  };

  const handleRemoveFromCart = (cartId) => {
    setCart((current) => {
      const nextCart = current.filter((item) => item.cartId !== cartId);
      window.localStorage.setItem("savedBooks", JSON.stringify(nextCart));
      return nextCart;
    });
  };

  const total = cart.reduce((sum, item) => {
    const itemPrice = Number(String(item.price).replace(/[^\d.]/g, "")) || 0;
    return sum + itemPrice;
  }, 0);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="brand">The Book Nook</p>
        </div>

        <nav className="nav-buttons" aria-label="Main navigation">
          <button
            type="button"
            className={currentView === "shop" ? "nav-btn active" : "nav-btn"}
            onClick={() => setCurrentView("shop")}
          >
            Shop
          </button>
          <button
            type="button"
            className={currentView === "cart" ? "nav-btn active" : "nav-btn"}
            onClick={() => setCurrentView("cart")}
          >
            My Cart ({cart.length})
          </button>
        </nav>
      </header>

      {currentView === "shop" ? (
        <main className="shop-layout">
          <section className="form-card">
            <h2 className="form-heading">Add New book</h2>
            <form className="image-form" onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="label-control" htmlFor="booktitle">
                  Image Title
                </label>
                <input
                  id="booktitle"
                  type="text"
                  className="form-control"
                  value={formData.booktitle}
                  name="booktitle"
                  onChange={handleChange}
                  placeholder="Enter book title"
                />
              </div>

              <div className="field-group">
                <label className="label-control" htmlFor="bookurl">
                  Image URL
                </label>
                <input
                  id="bookurl"
                  type="text"
                  className="form-control"
                  value={formData.bookurl}
                  name="bookurl"
                  onChange={handleChange}
                  placeholder="Paste book URL"
                />
              </div>

              <div className="field-group">
                <label className="label-control" htmlFor="bookprice">
                  Price
                </label>
                <input
                  id="bookprice"
                  type="text"
                  className="form-control"
                  value={formData.bookprice}
                  name="bookprice"
                  onChange={handleChange}
                  placeholder="e.g. $29.99"
                />
              </div>

              <div className="field-group">
                <label className="label-control" htmlFor="bookdescription">
                  Book Description
                </label>
                <input
                  id="bookdescription"
                  type="text"
                  className="form-control"
                  value={formData.bookdescription}
                  name="bookdescription"
                  onChange={handleChange}
                  placeholder="Write a short book description"
                />
              </div>

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </section>

          <section className="catalog-section">
            <div className="section-header">
              <h3>Products</h3>
              <span>
                {products.length} item{products.length === 1 ? "" : "s"}
              </span>
            </div>

            {products.length === 0 ? (
              <div className="empty-state">
                <p>
                  No products yet. Add one from the form to start your catalog.
                </p>
              </div>
            ) : (
              <div className="book-grid">
                {products.map((product) => (
                  <article className="book-card" key={product.id}>
                    <img
                      src={product.bookurl}
                      alt={product.booktitle}
                      className="product-image"
                    />
                    <div className="product-body">
                      <div className="product-heading">
                        <h4>{product.booktitle}</h4>
                        <strong>{product.bookprice}</strong>
                      </div>
                      <p>{product.bookdescription}</p>
                      <button
                        type="button"
                        className="add-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      ) : (
        <main className="cart-page">
          <div className="cart-panel">
            <div className="section-header cart-header">
              <h3>My Cart</h3>
              <span>
                {cart.length} item{cart.length === 1 ? "" : "s"}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="empty-state cart-empty">
                <p>
                  Your cart is empty. Add a few products from the shop page.
                </p>
              </div>
            ) : (
              <>
                <ul className="cart-list">
                  {cart.map((item) => (
                    <li key={item.cartId} className="cart-item">
                      <img
                        src={item.bookurl}
                        alt={item.booktitle}
                        className="cart-thumb"
                      />
                      <div className="cart-item-copy">
                        <h4>{item.booktitle}</h4>
                        <p>{item.bookdescription}</p>
                        <strong>{item.bookprice}</strong>
                      </div>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => handleRemoveFromCart(item.cartId)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="cart-summary">
                  <span>Total</span>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </>
            )}
          </div>
        </main>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/card-form-lesson" element={<CardFormLesson />} />
        <Route path="/add" element={<Add />} />
        <Route path="/saved-books" element={<SavedBooks />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

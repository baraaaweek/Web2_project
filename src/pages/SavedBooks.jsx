import { useState } from "react";
import { Link } from "react-router-dom";

const getSavedBooks = () => {
  try {
    return JSON.parse(window.localStorage.getItem("savedBooks") || "[]");
  } catch {
    return [];
  }
};

const SavedBooks = () => {
  const [savedBooks, setSavedBooks] = useState(getSavedBooks);

  const removeBook = (cartId) => {
    setSavedBooks((currentBooks) => {
      const nextBooks = currentBooks.filter((book) => book.cartId !== cartId);
      window.localStorage.setItem("savedBooks", JSON.stringify(nextBooks));
      return nextBooks;
    });
  };

  return (
    <main className="cart-page">
      <section className="cart-panel">
        <div className="section-header cart-header">
          <h1>Saved Books</h1>
          <span>
            {savedBooks.length} book{savedBooks.length === 1 ? "" : "s"}
          </span>
        </div>

        {savedBooks.length === 0 ? (
          <div className="empty-state cart-empty">
            <p>No saved books yet. Add a book from the shop.</p>
          </div>
        ) : (
          <ul className="cart-list">
            {savedBooks.map((book) => (
              <li className="cart-item" key={book.cartId || book.id}>
                <img
                  className="cart-thumb"
                  src={book.bookurl}
                  alt={book.booktitle}
                />
                <div className="cart-item-copy">
                  <h2>{book.booktitle}</h2>
                  <p>{book.bookdescription}</p>
                  <strong>{book.bookprice}</strong>
                </div>
                <button
                  className="remove-btn"
                  type="button"
                  onClick={() => removeBook(book.cartId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Link to="/form-card-lesson">Open product form</Link>
    </main>
  );
};

export default SavedBooks;

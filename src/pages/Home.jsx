import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-copy">
          <p className="home-eyebrow">Your next great read is waiting</p>
          <h1>Discover books that stay with you.</h1>
          <p className="home-intro">
            The Book Nook is a welcoming place to explore new titles, build your
            personal collection, and keep every must-read book close at hand.
          </p>
          <div className="home-actions">
            <Link className="home-primary-action" to="/">
              Explore books
            </Link>
            <Link className="home-secondary-action" to="/saved-books">
              View saved books
            </Link>
          </div>
        </div>

        <div className="home-gallery" aria-label="Featured books">
          <img
            className="home-gallery-main"
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=85"
            alt="A collection of colorful books"
          />
          <img
            className="home-gallery-small home-gallery-small-top"
            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=85"
            alt="Open book on a desk"
          />
          <img
            className="home-gallery-small home-gallery-small-bottom"
            src="https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=500&q=85"
            alt="A quiet reading corner"
          />
        </div>
      </section>

      <section className="home-features" aria-labelledby="features-heading">
        <div className="home-section-heading">
          <p className="home-eyebrow">Made for curious readers</p>
          <h2 id="features-heading">Everything in one cosy place</h2>
        </div>
        <div className="home-feature-grid">
          <article className="home-feature-card">
            <span className="home-feature-icon" aria-hidden="true">01</span>
            <h3>Add your favourites</h3>
            <p>Create your own collection with a cover, title, price, and description.</p>
          </article>
          <article className="home-feature-card">
            <span className="home-feature-icon" aria-hidden="true">02</span>
            <h3>Browse your shelf</h3>
            <p>See all your books together in a simple, beautiful catalog.</p>
          </article>
          <article className="home-feature-card">
            <span className="home-feature-icon" aria-hidden="true">03</span>
            <h3>Save the ones you love</h3>
            <p>Keep your favorite picks saved so you can come back to them anytime.</p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;

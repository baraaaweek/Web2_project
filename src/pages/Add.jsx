import { Link } from "react-router-dom";

const Add = () => {
  return (
    <main>
      <h1>Add a Product</h1>
      <p>Use the product form to add an item to the catalog.</p>
      <Link to="/card-form-lesson">Open product form</Link>
    </main>
  );
};

export default Add;
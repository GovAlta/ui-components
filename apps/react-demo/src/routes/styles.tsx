export default function Table() {
  return (
    <>
      <h1>Styles</h1>

      <h2>Ordered List</h2>
      <ol className="goa-ordered-list">
        <li>
          Mix flour, baking powder, sugar, and salt. Lots of really long text,
          let's see how this wraps, I have no idea what's going to happen, fun
          times.
        </li>
        <li>In another bowl, mix eggs, milk, and oil.</li>
        <li>Stir both mixtures together.</li>
        <li>Fill muffin tray 3/4 full.</li>
        <li>Bake for 20 minutes.</li>
      </ol>

      <h2>Unordered List</h2>
      <ul className="goa-unordered-list">
        <li>Milk</li>
        <li>
          Cheese
          <ul className="goa-unordered-list">
            <li>Blue cheese</li>
            <li>Feta</li>
          </ul>
        </li>
      </ul>
    </>
  );
}

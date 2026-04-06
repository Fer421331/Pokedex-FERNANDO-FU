const CardGrid = ({ gridItems = null }) => {
  return (
    <section className="card-grid">
      {gridItems?.map((o) => o)}
    </section>
  );
};

export default CardGrid;

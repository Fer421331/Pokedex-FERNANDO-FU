const Card = ({
  cardHeader = null,
  cardBody = null,
  cardFooter = null,
}) => {
  return (
    <div className="poke-card">
      {cardHeader}
      {cardBody}
      {cardFooter}
    </div>
  );
};

export default Card;

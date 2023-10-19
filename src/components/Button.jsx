export const Button = ({ loadMore }) => {
  return (
    <button className="load-more" type="button" onClick={loadMore}>
      Load more
    </button>
  );
};

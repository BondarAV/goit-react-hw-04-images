import { AiOutlineSearch } from 'react-icons/ai';

export const Searchbar = ({ handleQuery }) => {
  const hadleSubmit = event => {
    event.preventDefault();

    const query = event.target.lastChild.value;

    if (query.trim() === '') {
      alert('Please, enter a non-empty query');
      return;
    }

    handleQuery(query);
  };

  return (
    <header className="Searchbar">
      <form className="form" onSubmit={hadleSubmit}>
        <button type="submit" className="button">
          <AiOutlineSearch size={30} />
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

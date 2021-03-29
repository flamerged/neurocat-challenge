import "./App.scss";
import lunr from "lunr";
import { v4 as uuid } from "uuid";
import randomWords from "random-words";
import { useState, useRef } from "react";

const App = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInput = useRef(null);

  const createItem = () => {
    const newItem = { id: uuid(), name: randomWords() };
    setList([...list, newItem]);
  };

  const searchIndex = lunr(function () {
    this.ref("id");
    this.field("name");

    list.forEach((doc) => {
      this.add(doc);
    });
  });

  const searchItems = () => {
    const searchQuery = searchInput.current.value;
    if (searchQuery) {
      setIsSearching(true);
      const searchResult = searchIndex.search(`*${searchQuery}*`);
      const newItemList = searchResult.map((item) => {
        return list.find((entry) => item.ref === entry.id);
      });

      setSearch(newItemList);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <div className="App">
      <input
        ref={searchInput}
        placeholder="search"
        onChange={searchItems}
      ></input>
      <button onClick={createItem}>add item</button>
      {isSearching &&
        search.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      {!isSearching &&
        list.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
    </div>
  );
};

export default App;

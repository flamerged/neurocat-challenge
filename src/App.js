import "./App.scss";
import lunr from "lunr";
import { v4 as uuid } from "uuid";
import randomWords from "random-words";
import { useState, useRef } from "react";
import { RiAddLine } from "react-icons/ri";

import ItemList from "./components/ItemList";

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

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  return (
    <div className="app">
      <div className="app-control">
        <input
          ref={searchInput}
          placeholder="Search"
          onChange={searchItems}
        ></input>
        <button onClick={createItem}>
          <RiAddLine />
        </button>
      </div>
      {isSearching && <ItemList items={search} />}
      {!isSearching && <ItemList items={list} removeItem={removeItem} />}
      {!isSearching && list.length !== 0 && (
        <div className="app-end">
          <button onClick={() => setList([])} className="app-end-button">
            Clear List
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

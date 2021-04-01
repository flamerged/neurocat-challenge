import "./itemList.scss";

import Item from "./item";

const ItemList = ({ items, removeItem }) => {
  return (
    <div className="itemlist">
      {items.map((item) => (
        <Item key={item.id} item={item} removeItem={removeItem} />
      ))}
    </div>
  );
};

export default ItemList;

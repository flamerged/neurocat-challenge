import "./itemList.scss";

import Item from "./item";

const ItemList = ({ items }) => {
  return items.map((item) => <Item key={item.id} item={item} />);
};

export default ItemList;

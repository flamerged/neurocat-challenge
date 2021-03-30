import "./itemList.scss";

import Item from "./item";

const ItemList = ({ items }) => {
  return items.map((item) => <Item item={item} />);
};

export default ItemList;

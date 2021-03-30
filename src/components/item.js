import "./item.scss";

const Item = ({ item }) => {
  return <li className={"item"} key={item.id}>{item.name}</li>;
};

export default Item;

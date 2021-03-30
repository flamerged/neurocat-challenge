import "./item.scss";

const Item = ({ item }) => {
  return <li key={item.id}>{item.name}</li>;
};

export default Item;

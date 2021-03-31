import "./item.scss";

const Item = ({ item }) => {
  return <li className={"item"}>{item.name}</li>;
};

export default Item;

import "./item.scss";
import { VscChromeClose } from "react-icons/vsc";

const Item = ({ item, removeItem }) => {
  return (
    <li className={"item"}>
      {item.name}
      <VscChromeClose onClick={() => removeItem(item.id)} />
    </li>
  );
};

export default Item;

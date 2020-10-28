import React from "react";
import "./SidebarAddItem.scss";
interface SidebarItemProps {
  items: {};
  setItem: (x: string) => any;
}

export default function SidebarAddItem(props: SidebarItemProps): JSX.Element {
  function generateItems(items: any) {
    let cards = [];
    for (let key in items) {
      cards.push(
        <div id="sidebarItem" key={key}>
          <div className="card" onClick={() => props.setItem(key)}>
            <img className="card-img-top" src={items[key]} alt="" />
            <div className="card-body">
              <h5 className="card-title" style={{ color: "black" }}>
                {key}
              </h5>
            </div>
          </div>
        </div>
      );
    }
    return cards;
  }

  return <>{generateItems(props.items)}</>;
}

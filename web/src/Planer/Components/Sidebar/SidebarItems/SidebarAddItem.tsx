import React from "react";
import { CatalogueItem } from "../../../PlanerTypes";
import { items as wallItem } from "./Items";
import "./SidebarAddItem.scss";
interface SidebarItemProps {
  items: CatalogueItem[];
  setItem: (x: string) => any;
}

export default function SidebarAddItem(props: SidebarItemProps): JSX.Element {
  const { setItem, items } = props;

  return (
    <>
      <div id="sidebarItem" key={"Wall"}>
        <div className="card" onClick={() => setItem("Wall")}>
          <img className="card-img-top" src={wallItem.Wall} alt="" />
          <div className="card-body">
            <h5 className="card-title" style={{ color: "black" }}>
              {"Wall"}
            </h5>
          </div>
        </div>
      </div>
      {items.map((item) => {
        return (
          <div id="sidebarItem" key={item.name}>
            <div className="card" onClick={() => setItem(item.name)}>
              <img className="card-img-top" src={item.image} alt="" />
              <div className="card-body">
                <h5 className="card-title" style={{ color: "black" }}>
                  {item.name}
                </h5>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

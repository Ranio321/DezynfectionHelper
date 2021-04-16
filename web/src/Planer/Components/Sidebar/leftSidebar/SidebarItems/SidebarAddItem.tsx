import React from "react";
import ReactTooltip from "react-tooltip";
import { CatalogueItem } from "../../../../PlanerTypes";
import { itemList, items as wallItem } from "./Items";
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
          <div key={item.image}>
            <div id="sidebarItem" data-tip data-for={item.image}>
              <div className="card" onClick={() => setItem(item.displayName)}>
                <img
                  className="card-img-top"
                  src={
                    require("../../../../catalogue/images/" + item.image)
                      .default
                  }
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "black" }}>
                    {item.name}
                  </h5>
                </div>
              </div>
            </div>
            <ReactTooltip
              id={item.name === itemList.lamp ? item.image : ""}
              place="right"
              effect="solid"
              offset={{ right: 20 }}
            >
              Flux: {item.flux} mW/m<sup>2</sup>
              <br />
              Light angle: {item.angle}
              <sup>o</sup>
            </ReactTooltip>
          </div>
        );
      })}
    </>
  );
}

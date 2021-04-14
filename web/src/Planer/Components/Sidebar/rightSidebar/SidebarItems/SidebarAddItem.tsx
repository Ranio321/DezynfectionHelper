import React from "react";
import { OverlayTrigger } from "react-bootstrap";
import { PopoverBox } from "../../../../../common/PopoverBox";
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
          <>
            <OverlayTrigger
              placement="right"
              delay={{ show: 100, hide: 100 }}
              transition={false}
              overlay={
                <div>
                  {item.name === itemList.lamp && (
                    <PopoverBox title="Item information" width="200px">
                      Flux: {item.flux} mW/m<sup>2</sup>
                      <br />
                      Light angle: {item.angle}
                      <sup>o</sup>
                    </PopoverBox>
                  )}
                </div>
              }
            >
              <div id="sidebarItem" key={item.name}>
                <div className="card" onClick={() => setItem(item.displayName)}>
                  <img
                    className="card-img-top"
                    src={require("../../../../catalogue/images/" + item.image)}
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: "black" }}>
                      {item.name}
                    </h5>
                  </div>
                </div>
              </div>
            </OverlayTrigger>
          </>
        );
      })}
    </>
  );
}

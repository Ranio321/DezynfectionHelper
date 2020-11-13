import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./EmptyViewForArray.scss";
interface EmptyViewForArrayProps {
  items?: any[];
  children?: React.ReactNode;
}

export function EmptyViewForArray(props: EmptyViewForArrayProps) {
  const { items, children } = props;
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (items && items.length > 0) {
      setIsEmpty(false);
    }
  }, [items]);

  return (
    <>
      {isEmpty ? (
        <div className="emptyView">
          <div className="innerItems">
            <FontAwesomeIcon
              className="icon"
              style={{ position: "absolute" }}
              icon={faBoxOpen}
              width={500}
              height={500}
              size="10x"
            />
            <h1 style={{ paddingTop: "22%" }}>There is no data available</h1>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}

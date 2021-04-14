import React, { useEffect, useState } from "react";
import { Line, Text } from "react-konva";
import { Centroid, getPolygonCentroid } from "../../utils/getPolygonCentroid";
import { Room as RoomType } from "../../PlanerTypes";
interface RoomProps {
  room: RoomType;
}
function Room(props: RoomProps) {
  const { room } = props;
  const [points, setPoints] = useState<number[]>([]);
  const [textPosition, setTextPosition] = useState<Centroid>();

  useEffect(() => {
    let newPoints: number[] = [];
    room.vertices.forEach((item) => {
      newPoints.push(item.x);
      newPoints.push(item.y);
    });
    if (newPoints) {
      setPoints(newPoints);
    }
    setTextPosition(getPolygonCentroid(room.vertices));
  }, [room]);

  return (
    <>
      <Line
        points={points}
        closed
        fill="pink"
        opacity={0.2}
        listening={false}
      />
      <Text
        x={textPosition?.x}
        y={textPosition?.y}
        text={(room.area / 10000).toFixed(2).toString() + " m2"}
        fill="black"
        fontSize={14}
        font
      />
    </>
  );
}

export default React.memo(Room, (prevProps, nextProps) => {
  return prevProps.room === nextProps.room;
});

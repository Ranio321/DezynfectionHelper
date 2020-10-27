import { snapSize } from "../Constants/SnapConstatns";

export function snapToGrid(points: number[]): number[] {
    let startX = Math.round(points[0] / snapSize) * snapSize;
    let startY = Math.round(points[1] / snapSize) * snapSize;
    let endX = Math.round(points[2] / snapSize) * snapSize;
    let endY = Math.round(points[3] / snapSize) * snapSize;
    return [startX, startY, endX, endY];
  }
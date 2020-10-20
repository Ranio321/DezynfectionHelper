
export interface ClickPoints {
    start: Point
    end: Point
}

interface Point{
    x: number,
    y: number
}

export interface Walls{
    walls: ClickPoints[]
}

export interface DrawingLine{
    start: Point,
    end: Point
}
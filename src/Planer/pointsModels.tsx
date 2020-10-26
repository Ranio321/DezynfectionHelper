
export interface ClickPoints {
    start: Point
    end: Point
}

interface Point{
    x: number,
    y: number
}

export interface MousePosition{
    x: number,
    y: number
}

export interface Walls{
    walls: Item[]
}

export interface Wall{
    wall:Item
}

export interface DrawingLine{
    start: Point,
    end: Point
}
export interface Item
{
    id?: number,
    position: ClickPoints,
    height?: number
    type?: string
}
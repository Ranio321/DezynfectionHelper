export function calculateDisinfectionRadius(angle?: number, height?: number): number {
    let radius = 0;
    if (angle && height) {
     let ratio = Math.tan((angle * Math.PI) / 180);
     radius = ratio * height;
    }
  
    return radius;
  }
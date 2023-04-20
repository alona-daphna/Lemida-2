// Clamps value to the range [min, max] (inclusive)
export const clampValue = (value, min, max) => {
    return Math.min(Math.max(value, min), max)  
}
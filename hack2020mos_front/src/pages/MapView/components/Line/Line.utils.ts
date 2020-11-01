export const getArrayDepth = (obj: any[]): number =>
    Array.isArray(obj) ? 1 + Math.max(...obj.map(t => getArrayDepth(t))) : 0
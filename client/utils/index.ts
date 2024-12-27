// Define the type for the input object which can have any keys and nested objects or arrays
type NestedObject = {
  [key: string]: any
}

// Define the type for the flattened object with string keys and primitive values
type FlattenedObject = {
  [key: string]: any
}

export function flatten(
  obj: NestedObject = {},
  parentKey: string = '',
  result: FlattenedObject = {}
): FlattenedObject {
  for (const [key, value] of Object.entries(obj)) {
    // If a key contains a dot, encode it using a Unicode character, e.g., \uff0E
    const encodedKey = key.replace(/\./g, '\uff0E')
    const newKey = parentKey ? `${parentKey}.${encodedKey}` : encodedKey
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flatten(value, newKey, result)
    } else {
      result[newKey] = value
    }
  }
  return result
}

// Unflatten an object with path-like keys into a nested object
export function unFlatten(obj: FlattenedObject = {}): NestedObject {
  const result: NestedObject = {}
  for (const [key, value] of Object.entries(obj)) {
    let parts = key.split('.').map((part) => part.replace(/\uff0E/g, '.')) // Decode each part of the key
    let current: NestedObject | any = result
    for (let i = 0; i < parts.length; i++) {
      if (i === parts.length - 1) {
        current[parts[i]] = value
      } else {
        current = current[parts[i]] = current[parts[i]] || {}
      }
    }
  }
  return result
}

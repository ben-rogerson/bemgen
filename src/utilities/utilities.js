
export const applyNamingRules = (name) => name.replace(" ", "-").replace(/[^a-z0-9-_]/gi,'')

export const randomItem = (array) => array[Math.floor(Math.random()*array.length)];

export const bemChildTypePrefix = typeId => typeId === 0 ? '__' : '--'

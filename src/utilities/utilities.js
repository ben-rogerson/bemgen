import React from 'react'

export const applyNamingRules = (name) => name.replace(" ", "-").replace(/[^a-z0-9-_]/gi,'')

export const randomItem = (array) => array[Math.floor(Math.random()*array.length)];

export const bemChildTypePrefix = (
  typeId,
  elementStyle = 'classic',
  modifierStyle = 'classic',
  isCss = false,
) => {
  const elementSymbols = elementStyle === 'classic' ? '__' : '_'
  const modifierSymbols = modifierStyle === 'classic' ? '--' : (isCss ? '.-' : ' -')
  return typeId === 0 ? elementSymbols : modifierSymbols
}

export const light = (lightcodestuff) => <span className="code__light">{lightcodestuff}</span>

export const enterKey = 13

export const isDev = process.env.NODE_ENV === 'development'

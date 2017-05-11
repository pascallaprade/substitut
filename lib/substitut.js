/*! substitut : a functional pattern substitution library.
 * Copyright (C) 2017  Pascal Laprade <laprade.p@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict"

const {
  List,
  Map
} = require('immutable')

const substitute = (input, object) => {
  const dictionary = Map(object)

  return findAndApplyFunctionTo(
    input.slice(0),
    dictionary.keySeq(),
    key => dictionary.get(key),
    current => typeof current === 'string' ? current : ""
  )
}

const countOccurences = (input, object) => {
  const patterns = Array.isArray(object)
    ? List(object).toSeq()
    : Map(object).keySeq()

  return findAndApplyFunctionTo(
    input.slice(0),
    patterns,
    found => 1,
    () => 0
  )
}

module.exports = { countOccurences, substitute }

const findAndApplyFunctionTo = (input, patterns, fn, defaultFn, currentIndex = 0) => {
  if (patterns.size === 0 || currentIndex >= patterns.size ||
    input === null || input === undefined ||
    typeof input !== 'string' || input.length <= 0) {
    return defaultFn(input)
  }

  const recurse = (newInput, nextIndex) =>
    findAndApplyFunctionTo(newInput, patterns, fn, defaultFn, nextIndex)

  const current = patterns.get(currentIndex)

  const indexOfLower = input.indexOf(current.toLowerCase())
  const indexOfUpper = input.indexOf(current.toUpperCase())

  if (indexOfLower === -1 && indexOfUpper === -1) {
    return currentIndex + 1 === patterns.size
      ? defaultFn(input)
      : recurse(input, currentIndex + 1)
  }

  const index = indexOfLower !== -1
    ? indexOfLower
    : indexOfUpper

  const left = recurse(input.slice(0, index), currentIndex + 1)
  const middle = fn(current)
  const right = recurse(input.slice(index + current.length), currentIndex)

  return left + middle + right
}

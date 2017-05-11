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

const substitute = (input, dictionary) =>
  Map(dictionary).reduce(substituteReducer, input)

const countOccurences = (input, dictionary) => {
  const patterns = Array.isArray(dictionary)
    ? List(dictionary).toMap().flip()
    : Map(dictionary)

  const lower = input.toLowerCase()

  const reducer = (acc, val, key) =>
    matchesReducer(lower, acc, key)

  return patterns.reduce(reducer, 0)
}

module.exports = { countOccurences, substitute }

const substituteReducer = (acc, val, key) => {
  const lower = key.toLowerCase()
  const upper = key.toUpperCase()

  const makeRegex = (str) => toGlobalRegex(str)

  return acc
    .replace(makeRegex(lower), val.toLowerCase())
    .replace(makeRegex(upper), val.toUpperCase())
}

const matchesReducer = (input, reduced, value) => {
  const matches = input.match(toGlobalRegex(input))

  return matches == null
    ? reduced
    : reduced + matches.length
}

const regexify = (input) =>
  input
    .replace('\\', '\\\\')
    .replace('(', '\\(')
    .replace(')', '\\)')

const toGlobalRegex = (input) =>
  new RegExp(regexify(input), 'g')

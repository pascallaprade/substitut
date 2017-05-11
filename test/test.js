"use strict"

const expect = require('chai').expect
const {
  countOccurences,
  substitute
} = require('..')

const objectDictionary = {
  'a': '42',
  'z': 'c',
  'c': '()',
  'i': '1',
  '6': 'mail',
  'car': 'thing'
}

const arrayDictionary = [
  'a','z','c','i','6','car'
]

describe('In the substitut library,', function() {
  describe('#substitute()', function() {
    it('should return a new string with the patterns found in the dictionary ' +
       'substituted with their associated value', function() {
      const input = "Hello i am a zi6-model"
      const expected = "Hello 1 42m 42 c1mail-model"
      const result = substitute(input, objectDictionary)
      expect(result).to.equal(expected)
    })
  })

  describe('#countOccurences()', function() {
    it('should return the correct number of occurences when ' +
       'passed an object dictionary', function() {
      const input = "Hello i am a zi6-model"
      const expected = 6
      const result = countOccurences(input, objectDictionary)
      expect(result).to.equal(expected)
    })


    it('should return the correct number of occurences when ' +
       'passed an array dictionary', function() {
      const input = "Hello i am a zi6-model"
      const expected = 6
      const result = countOccurences(input, arrayDictionary)
      expect(result).to.equal(expected)
    })
  })
})

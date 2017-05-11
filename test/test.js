"use strict"

const expect = require('chai').expect
const {
  countOccurences
} = require('../index')

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

describe('', function() {
  describe('#substitute()', function() {
    it('should ', function() {

    })
  })

  describe('#countOccurences()', function() {
    it('should reurn the correct number of occurences when ' +
       'passed an object dictionary', function() {
      const input = "Hello i am a zi6-model"
      const expected = 6
      const result = countOccurences(input, objectDictionary)
      expect(result).to.equal(expected)
    })


    it('should reurn the correct number of occurences when ' +
       'passed an array dictionary', function() {
      const input = "Hello i am a zi6-model"
      const expected = 6
      const result = countOccurences(input, arrayDictionary)
      expect(result).to.equal(expected)
    })
  })
})

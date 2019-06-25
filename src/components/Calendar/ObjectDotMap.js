/* eslint-disable no-extend-native */
/**
|--------------------------------------------------
| A method to replicate the Array.prototype.map() API, but for usage 
| on the Object.prototype.
|
| This API call the supplied callback on each item in a flat object
|
| Usage:
|   
|    let obj = { first: 1, second: 2, third: 3 }
|    let newObj = obj.map((item, index, object) => item * 2)
|    console.log(newObj)
|
|    returns -> { first: 2, second: 4, third: 6 }
|--------------------------------------------------
*/
Object.prototype.map = function(func) {
  // Create an array that contains each value from the object
  let oldValues = Object.values(this)

  // Manipulate those values with the provided callback method
  let newValues = oldValues.map((item, index) =>
    func.call(null, item, index, this)
  )

  // Reconstruct the obj with each modified value
  let mappedObj = {}
  Object.keys(this).forEach((key, index) => (mappedObj[key] = newValues[index]))

  return mappedObj
}

let obj = { first: 1, second: 2, third: 3 }
const doubled = obj.map(value => value * 2)

console.log(doubled)

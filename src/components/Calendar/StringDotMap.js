/* eslint-disable no-extend-native */
/**
|--------------------------------------------------
| A method to replicate the Array.prototype.map() API, but for usage 
| on the String.prototype.
|
| This API call the supplied callback on each item in a flat object
|
| Usage:
|   
|    let str = 'I want to apply a callback on each word in this string'
|    let newStr = str.map((item, index, string) => item.toUpperCase)
|    console.log(newStr)
|
|    returns -> 'I WANT TO APPLY A CALLBACK ON EACH WORD IN THIS STRING'
|--------------------------------------------------
*/
String.prototype.map = function(func) {
  let stringArray = this.split(' ')
  let newStringArray = stringArray.map(word => word.toUpperCase())
  return newStringArray.join(' ')
}

const upperCaseString = 'I want to apply a callback on each word in this string'.map(
  function(item, index, thing) {
    return item.toUpperCase()
  }
)

console.log(upperCaseString)

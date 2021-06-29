function removeDuplicatesById(objArr) {
  const newArray = [];
  const lookupObject = {};

  for (let i in objArr) {
    lookupObject[objArr[i][1]] = objArr[i][0];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }

  return newArray;
}

module.exports = removeDuplicatesById
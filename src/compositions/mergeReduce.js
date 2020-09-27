export default function mergeReduce() {

  // Basic reduce (sum)
  function reduceSum(input) {
    return input.reduce((acc, cur) => {
      return parseFloat(acc) + parseFloat(cur);
    }, 0);
  }

  // Get sum of specified property in array of objects
  function reduceProp(input, sumProp) {
    return input.reduce((acc, cur) => {
      return parseFloat(acc) + parseFloat(cur[sumProp]);
    }, 0);
  }

  // If 2 objects in array have the same property value for (mergeBy), sum the defined props (sumProp) of those objects
  function reduceMergeSum(input, mergeBy, sumProp) {
    return input.reduce((acc, cur) => {
      if (acc.some((element) => element[mergeBy] === cur[mergeBy])) {
        acc.filter((element) => element[mergeBy] === cur[mergeBy])[0][sumProp] += +cur[sumProp];
      } else {
        acc.push({
          [mergeBy]: cur[mergeBy],
          [sumProp]: parseFloat(cur[sumProp]),
        });
      }
      return acc;
    }, [])
  }

  return { reduceSum, reduceProp, reduceMergeSum }
}
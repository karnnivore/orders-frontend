export const useTransformToUpper = (item: string) => {
  let tempString = item
  tempString = tempString.replace(/(^|[\s-])\S/g, function (match) {
    return match.toUpperCase();
  });
  return tempString
}
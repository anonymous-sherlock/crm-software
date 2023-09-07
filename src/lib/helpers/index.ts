export function getFileExtension(fileName: string): string {
  return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
}

export function parsePrice(productPrice: string) {
  const cleanedProductPrice = (productPrice as string).replace(/,/g, ""); // Remove commas
  let price = parseFloat(cleanedProductPrice);
  // Ensure the price always has two decimal places
  if (!isNaN(price)) {
    return (price = parseFloat(price.toFixed(2)));
  }
  return price;
}

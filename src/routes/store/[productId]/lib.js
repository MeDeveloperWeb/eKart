/**
 * Converts USD to INR, assuming 1 USD = 83 INR
 * @param {number} price
 * @returns Price in INR
 */
export function getINRPrice(price) {
  return Math.round(price * 83);
}

/**
 *
 * @param {number} price
 * @returns Inflated price in INR
 * @description adds 10% to actual pricing
 */
export function getInflatedINRPrice(price) {
  return getINRPrice(price + price / 10);
}

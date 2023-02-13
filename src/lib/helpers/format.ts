
export type AmountFormatOptions = {
  abbreviate?: boolean,
}

/**
 * Format timestamp
 * ==================================================
 */
export function formatTimestamp (timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString();
}

/**
 * Format an Algo amount (microalgos to algo)
 * ==================================================
 */
export function formatAlgoAmount (amount: number) {
  return formatAssetAmount(amount, 6);
}

/**
 * Format an asset amount
 * ==================================================
 */
export function formatAssetAmount (amount: number, decimals:number = 0, options: AmountFormatOptions = {}) {
  if (typeof amount !== 'number') return '—';
  
  if (options.abbreviate) {
    const ints = Math.floor(amount / (10 ** decimals));
    return abbreviateNumber(ints);
  }
  
  return formatNumber(amount, decimals)
}
/**
 * Tinify addresses (XXXXXX...XXXXXX)
 * ==================================================
 */
export function tinifyAddress (address: string) {
  return `${address.slice(0, 5)}…${address.slice(-5)}`
}



/**
 * Truncate string (XXXXXX...)
 * ==================================================
 */
 export function truncateString (str: string, len: number = 8) {
  if (!str) return '—';
  if (str.length <= len + 3) return str;
  return `${str.slice(0, len)}…`
}

/**
* Plurify word
* ==================================================
*/
export function plurify(word: string, qty: number) {
  return word + (qty > 1 ? 's' : '');
}


/**
* Helpers
* ==================================================
*/
export function abbreviateNumber(num: number, options?: Record<string, any>) {
  const abbr = [
    { min: 1E9,  round: 1E9, symbol: "B" },
    { min: 1E6,  round: 1E6, symbol: "M" },
    { min: 1E3,  round: 1E3, symbol: "k" },
    { min: 500,  round: 1000, symbol: "k" }
  ];
  for (let i=0; i<abbr.length; i++) {
    if (num >= abbr[i].min) {
      const round = abbr[i].round;
      if (options?.roundingMode === 'floor') {
        num = Math.floor(num / round * 10) / 10 * round; 
      }
      return (num / round)
        .toLocaleString(undefined, options)
        .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + abbr[i].symbol;
    }
  }
  return num.toLocaleString();
}


export function formatNumber(num: number, decimals: number = 0) {
  const ints = Math.floor(num / (10 ** decimals));
  const fractions = (ints > 0
    ? Number(String(num).slice(String(ints).length))
    : num
  ) / (10 ** decimals);
  const minDecimals = fractions.toString().match(/(\.0*d?)/)?.[0].length || 0;
  return  ints
            .toLocaleString() + 
          fractions
            .toLocaleString(undefined, { minimumFractionDigits: minDecimals > 0 ? minDecimals + 1 : 0})
            .replace(/^0/, '');
}
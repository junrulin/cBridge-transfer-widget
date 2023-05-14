import { providers, Contract, BigNumber, utils as etherUtils } from 'ethers';

const noExponents = (exponent: number) => {
  const data = String(exponent).split(/[eE]/);
  if (data.length === 1) return data[0];
  let z = '',
    sign = exponent < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1;
  if (mag < 0) {
    z = sign + '0.';
    while (mag++) z += '0';
    return z + str.replace(/^-/, '');
  }
  mag -= str.length;
  while (mag--) z += '0';
  return str + z;
};

/**
 * Transfer bigNumber to string
 * @param {number | string | BigNumber} bigNumber
 * @param {number} fractionDigits
 * @param {boolean} noRound - no round number
 * @returns {string|any}
 */
export function formatEther(bigNumber: number | string | BigNumber, fractionDigits = 2, noRound = false): number | string {
  if (typeof bigNumber === 'number' || typeof bigNumber === 'string') {
    try {
      bigNumber = BigNumber.from(
        ('' + noExponents(Number(bigNumber))).replace(/\.\d+/g, '')
      );
    } catch (e) {
      console.error(e);
      return isNaN(bigNumber as number) ? '' : (bigNumber as string);
    }
  }
  if (!bigNumber || !(bigNumber instanceof BigNumber)) {
    return bigNumber;
  }
  try {
    let num;
    if (noRound) {
      num =
        Math.floor(
          parseFloat(etherUtils.formatEther(BigNumber.from(bigNumber))) *
            Math.pow(10, fractionDigits)
        ) / Math.pow(10, fractionDigits);
    } else {
      num = parseFloat(
        parseFloat(etherUtils.formatEther(BigNumber.from(bigNumber))).toFixed(
          fractionDigits
        )
      );
    }
    return isNaN(num) ? '' : num;
  } catch (e) {
    console.error(e);
    return '';
  }
}

/**
 * Transfer bigNumber to string
 * @param {any} bigNumber
 * @param {number} fractionDigits
 * @returns {string|any}
 */
export function formatUnits(
  bigNumber: number | string | BigNumber,
  fractionDigits = 2,
  decimals = 18
): number | string {
  if (typeof bigNumber === 'number' || typeof bigNumber === 'string') {
    try {
      bigNumber = BigNumber.from(
        ('' + noExponents(Number(bigNumber))).replace(/\.\d+/g, '')
      );
    } catch (e) {
      console.error(e);
      return isNaN(bigNumber as number) ? '' : (bigNumber as string);
    }
  }
  if (!bigNumber || !(bigNumber instanceof BigNumber)) {
    return bigNumber;
  }
  try {
    let num;
    num = parseFloat(
      parseFloat(
        etherUtils.formatUnits(BigNumber.from(bigNumber), decimals)
      ).toFixed(fractionDigits)
    );
    return isNaN(num) ? '' : num;
  } catch (e) {
    console.error(e);
    return '';
  }
}

/**
 * eth to number
 * @param {*} value
 * @returns
 */
export function parseEther(value): BigNumber {
  try {
    return etherUtils.parseUnits(value + '', 'ether');
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export function parseUnits(value, unit) {
  if (value instanceof BigNumber) {
    value = value.toString();
  }
  try {
    return etherUtils.parseUnits(value + '', unit);
  } catch (e) {
    console.error(e);
    return value;
  }
}

/**
 *
 * @param value
 * @returns
 */
export function parseWei(value) {
  if (value instanceof BigNumber) {
    value = value.toString();
  }
  try {
    return etherUtils.parseUnits(value + '', 'wei');
  } catch (e) {
    console.error(e);
    return value;
  }
}

// export async function getAccounts() {
//   if(typeof window !== 'undefined') {
//     const accounts = await window?.ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     return accounts;
//   } else {

//   }
// }

export function formatDate(
  time: number | string,
  formatter,
  useUTC: Boolean = false
) {
  const d = new Date(time);
  if (!d || isNaN(d.getTime())) {
    return '';
  }

  function fillZero(num) {
    return (num + '').replace(/^(\d)$/, '0$1');
  }

  let ret = formatter || 'YYYY-MM-DD';

  ret = ret
    .replace(/YYYY/gi, useUTC ? d.getUTCFullYear() : d.getFullYear())
    .replace(/MM/g, fillZero((useUTC ? d.getUTCMonth() : d.getMonth()) + 1))
    .replace(
      /Month/g,
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ][useUTC ? d.getUTCMonth() : d.getMonth()]
    )
    .replace(
      /Mon\./g,
      [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ][useUTC ? d.getUTCMonth() : d.getMonth()]
    )
    .replace(/DD/gi, fillZero(useUTC ? d.getUTCDate() : d.getDate()))
    .replace(/HH/gi, fillZero(useUTC ? d.getUTCHours() : d.getHours()))
    .replace(/mm/g, fillZero(useUTC ? d.getUTCMinutes() : d.getMinutes()))
    .replace(/ss/g, fillZero(useUTC ? d.getUTCSeconds() : d.getSeconds()));

  return ret;
}

export function formatUTCDate(timestamp: number | string, formatter) {
  const d = new Date(new Number(timestamp) as number);
  if (!d || isNaN(d.getTime())) {
    return '';
  }

  function fillZero(num) {
    return (num + '').replace(/^(\d)$/, '0$1');
  }

  let ret = formatter || 'YYYY-MM-DD';

  ret = ret
    .replace(/YYYY/gi, d.getUTCFullYear())
    .replace(/MM/g, fillZero(d.getUTCMonth() + 1))
    .replace(
      /Month/g,
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ][d.getUTCMonth()]
    )
    .replace(/DD/gi, fillZero(d.getUTCDate()))
    .replace(/HH/gi, fillZero(d.getUTCHours()))
    .replace(/mm/g, fillZero(d.getUTCMinutes()))
    .replace(/ss/g, fillZero(d.getUTCSeconds()));

  return ret;
}

export function formatTimeLeft(timestamp: number | string, formatter) {
  timestamp = Number(timestamp);
  if (isNaN(timestamp)) {
    return '';
  }

  function fillZero(num) {
    return (num + '').replace(/^(\d)$/, '0$1');
  }

  let ret = formatter || 'hh:mm:ss';

  const days = Math.floor(timestamp / (1000 * 60 * 60 * 24)) + '';
  const hours = (Math.floor(timestamp / 1000 / 60 / 60) % 24) + '';
  const minutes = (Math.floor(timestamp / 1000 / 60) % 60) + '';
  const seconds = (Math.floor(timestamp / 1000) % 60) + '';
  ret = ret
    .replace(/dd/gi, days)
    .replace(/HH/gi, fillZero(hours))
    .replace(/mm/g, fillZero(minutes))
    .replace(/ss/g, fillZero(seconds));

  return ret;
}

// Convert a hex string to a byte array
export function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

// Convert a byte array to a hex string
export function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xf).toString(16));
  }
  return hex.join('');
}

export function formatNumber(num) {
  num = num >= 1000000 ? ~~(num / 1000000).toFixed(2) + 'M' : num;
  return (
    (/\d/.test(num) && ('' + num).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')) || ''
  );
}

export function seperateNumWithComma(num) {
  return (
    (/\d/.test(num) && ('' + num).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')) || ''
  );
}

/**
 *
 * @param {Function} fn
 * @param {number} timeout delay to exec
 * @param arg
 * @returns
 */
export function delayExecuteFn(fn, timeout = 1000) {
  let timer = null;
  return (...arg) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...arg), timeout);
  };
}

export function omitStr(str, startLength, endLength, fillText) {
  const _fillText = fillText || '...';
  if (!str || !str.substr) {
    return str;
  }
  if (startLength && endLength) {
    return str.substr(0, startLength) + _fillText + str.substr(-endLength);
  }
  if (startLength) {
    return str.substr(0, startLength) + _fillText;
  }
  if (endLength) {
    return _fillText + str.substr(-endLength);
  }
  return str;
}

export const getScanWebDomain = function (chainId) {
  switch (~~chainId) {
    case 1:
      return 'https://etherscan.io';
    case 10:
      return 'https://optimistic.etherscan.io';
    case 56:
      return 'http://bscscan.com';
    case 137:
      return 'https://polygonscan.com';
    case 5:
      return 'https://goerli.etherscan.io';
    case 42161:
      return 'https://arbiscan.io';
    case 43114:
      return 'https://avascan.info';
    case 420:
      return 'https://goerli-optimism.etherscan.io';
    default:
      return undefined;
  }
};

export function openLink(href?) {
  if (typeof window !== 'undefined') {
    href && window.open(href);
  }
}

export function gtag(name, record, category = 'event') {
  if (typeof window !== 'undefined') {
    window?.gtag('event', name, {
      event_category: category,
      event_label: record[0],
      value: record[1] ? record[1] : '',
    });
  }
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

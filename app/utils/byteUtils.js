function stringToByteArray(s){
  // Otherwise, fall back to 7-bit ASCII only
  const result = new Uint8Array(s.length);
  for (let i=0; i<s.length; i++){
    result[i] = s.charCodeAt(i);/* w ww. ja  v  a 2s . co  m*/
  }
  return result;
}

function base64_decode(base64String) {
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var h1, h2, h3, h4, o1, o2, o3, bits, i = 0, bytes = [];

  do {
    h1 = b64.indexOf(base64String.charAt(i++));
    h2 = b64.indexOf(base64String.charAt(i++));
    h3 = b64.indexOf(base64String.charAt(i++));
    h4 = b64.indexOf(base64String.charAt(i++));

    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

    o1 = bits >> 16 & 0xff;
    o2 = bits >> 8 & 0xff;
    o3 = bits & 0xff;

    bytes.push(o1);
    bytes.push(o2);
    bytes.push(o3);
  } while (i < base64String.length);

  return bytes;
}

function b64ToBn(b64) {
  var bin = atob(b64);
  var hex = [];

  bin.split('').forEach(function (ch) {
    var h = ch.charCodeAt(0).toString(16);
    if (h.length % 2) { h = '0' + h; }
    hex.push(h);
  });

  return BigInt('0x' + hex.join(''));
}

function powermod(base, exp, p) {
  var result = 1n;
  while (exp !== 0n) {
    if (exp % 2n === 1n) result = result * base % p;
    base = base * base % p;
    exp >>= 1n;
  }
  return result;
}

export {stringToByteArray, base64_decode, powermod, b64ToBn}
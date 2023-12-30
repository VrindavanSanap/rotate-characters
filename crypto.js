const chars = "abcdefghijklmnopqrstuvwxyz"; 
const charsC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
import { chisquare } from "jstat"
import {add, dotDivide, inv, pow, map, sum, multiply, square, subtract, divide} from "mathjs"
let expected_prob = [0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015,
  0.06094, 0.06966, 0.00153, 0.00772, 0.04025, 0.02406, 0.06749, 0.07507,
  0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758, 0.00978, 0.02360,
  0.00150, 0.01974, 0.00074]

export const stoi = {};
export const itos = {};
for (let i = 0; i < chars.length; i++) {
  const ch = chars[i];
  stoi[ch] = i;
  itos[i] = ch;
}

export const stoiC = {};
export const itosC = {};
for (let i = 0; i < chars.length; i++) {
  const ch = charsC[i];
  stoiC[ch] = i;
  itosC[i] = ch;
}

export function ceaser_cipher(string, n = 0){
  string = string.replace(/[^a-zA-Z\s]/g, '');
  let result = "";
  for (let i = 0; i < string.length; i++) {
    let c = string[i];
    if (c == " "){
      result += " "
    }
    else if(c == c.toLowerCase()){
      result +=  itos[(stoi[c] + n) % 26]
    }
    else if(c == c.toUpperCase()){
      result +=  itosC[(stoiC[c] + n) % 26]
    }


  }
  return result;
}
export function word_freq(string) {
  /*
    Given a string, return frequencies as a list 
  */
  let frequencies = new Array(26).fill(0);

  for (let i = 0; i < string.length; i++) {
    let char = string[i];

    if (/[a-zA-Z]/.test(char)) {
      char = char.toLowerCase();
      let index = char.charCodeAt(0) - 'a'.charCodeAt(0);
      frequencies[index]++;
    }
  }
  return frequencies;
}

export function chi_squared(expected, observed){
 let epsilon = 0.001
 return sum(dotDivide(map(subtract(expected, observed), square) , 
                      add(expected,epsilon)))
}

export function sentence_score(string){
  /*
    Given string return score of its likliness to be a english sentence
  */
  let len = string.length 

  let freq = word_freq(string)
  let exp_freq = multiply(expected_prob , len)
  let chi_squared_value= chi_squared(exp_freq, freq)

  return parseInt(chi_squared_value )
}

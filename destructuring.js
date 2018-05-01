const array = [1, 2, 3];
const one = array[0];
const three = array[2];

console.log(one, three) // 1 3



const array = ['a', 'b', 'c'];
const [a, , c] = array;


console.log(a, c) // a c



const params = {
  awesome: true,
  yolo: true,
  maga: false,
}

const awesome = params[awesome];

if (awesome) console.log('🐸') // 🐸



const { maga } = params;

console.log( maga ? '😷' : '🌴') // 🌴

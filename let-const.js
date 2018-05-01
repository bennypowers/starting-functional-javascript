let theHair = 'shilky shmooth';
const theZohan = 'I Sculpt the Hair';

theHair = "It's pleasant"; // "It's pleasant"
theZohan = "I Don't Cut the Hair"; // TypeError: Assignment to constant variable.

/* Careful: Values !== References */

const fizzyBubblech = { flavor: 'grape' }

fizzyBubblech.flavor = 'apple'; // works because the reference is constant.

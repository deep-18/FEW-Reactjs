// const productsel = document.querySelectorAll('.product-sel');
// //Removing of Item //
// productsel.forEach((ps) => {
//     ps.children[4].addEventListener('click', () => {
//         ps.remove();
//     });
// });
//Addition of money
// var total = 0;
// productsel.forEach((ps) => {
//     console.log(ps.children[3].children)
//     total = (total + ps.children[3].textContent);
// });
export default function random(colorA,colorB,colorC){
    const hey = (Math.floor(Math.random() * 3));
    if(hey === 0){ return colorA }
    else if (hey === 1){ return colorB }
    else if (hey === 2){ return colorC }
}
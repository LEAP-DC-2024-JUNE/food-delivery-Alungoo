// huwisagchiih type zaana
let firstName = true;
let age:number = 22;


type ConsFuncParamType = string | number
const consFunc = (param:ConsFuncParamType) => {
  console.log (param)
}

// Objectnii type zaaj ogj bn
type consFunc2ObjectType = {
  id: number,
  title: string,
  category: string,
  price: number
}
const object = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  category: "beauty",
  price: 9.99,
};

const consFunc2 = (obj: consFunc2ObjectType) => {
console.log (obj.id)
console.log (obj.title)
console.log (obj.category)
console.log (obj.price)
}

consFunc2(object);

// Arraynii type zaaj ogj bn

type ConsFunc3ArrayType = {
  id: number,
  title: string,
  category: string,
  price?:number
}

const consFunc3 = (param: ConsFunc3ArrayType[]):string => {
return "success"
}

const array = [
{
  id: 1,
  title: "Essence Mascara Lash Princess",
  category: "beauty",
  price: 9.99,
}, 
{
  id: 2,
  title: "Mascara",
  category: "beauty",

},
];
consFunc3 (array)
import './styles.css'
const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const newItems = document.createElement('section');
let maxPages;
(async () => {
  const response = await fetch(API)
  const data = await response.json()
  maxPages = Math.floor(data.length/10) 

})()

newItems.classList.add('Items');
const getData = async (api, offset, limit) => {

  const response = await fetch(`${api}?offset=${offset}&limit=${limit}`)
  console.log(response)
  const data =  await response.json()
  console.log(data)
  let products = [ ...data];
  let output = products.map(product => {
    // template
    const card = document.createElement('article')
    const img = document.createElement('img')
    const title = document.createElement('h2')
    const small = document.createElement('small')
    card.classList.add('Card')
    img.src = product.images[0]
    title.textContent = product.title
    title.append(small)
    card.append(img, title)
    return card

  });

  newItems.append(...output)
  $app.appendChild(newItems);


}
const loadData = async () => {
  await getData(API, 5, pagination * 10)
  
}

const loadNewData =  () => {
  getData(API, pagination, 10);
  pagination = pagination +1
  setPagination(pagination)
  console.log(pagination)

}

const intersectionObserver = new IntersectionObserver(entries => {

  entries.forEach((entry) => {
    
    if(pagination  >= maxPages){
      $observe.innerHTML = "Todos los productos Obtenidos"
      intersectionObserver.unobserve($observe)
      
    }
    if(entry.isIntersecting){
      loadNewData()
    }
  })
  // logic...
}, {
  rootMargin: '0px 0px 100% 0px',
});

const setPagination = (pagination = 1) => {
  localStorage.setItem('pagination', JSON.stringify(pagination))

}
const getPagination = () => {
  const pagination = JSON.parse(localStorage.getItem('pagination')) ?? 1
  console.log(pagination)
  return pagination

}
let pagination = getPagination()
loadData()
intersectionObserver.observe($observe);
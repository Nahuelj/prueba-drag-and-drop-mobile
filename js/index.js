
let sortableList = document.querySelector("#mi-lista")

// MOBILE

let element = Array.from(document.querySelectorAll(".item"));
let touchStartX = null; // posición inicial del toque
let touchStartY = null;


element.forEach(item => {
item.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;


  offsetX = touchStartX - item.offsetLeft;
  offsetY = touchStartY - item.offsetTop;
  // agregar la clase "dragging" al objeto para identificar que está siendo arrastrado
  item.classList.add('dragging');
  
});

item.addEventListener("touchmove", (e) => {
  // desactivar el desplazamiento predeterminado del navegador
  e.preventDefault();
  // calcular la distancia recorrida por el toque
  let touchCurrentX = e.touches[0].clientX;
  let touchCurrentY = e.touches[0].clientY;
  let touchDistanceX = touchCurrentX - touchStartX;
  let touchDistanceY = touchCurrentY - touchStartY;
  // mover el objeto arrastrado
  item.style.transform = `translate(${touchDistanceX}px, ${touchDistanceY}px)`;
  // seleccionar el item que se está arrastrando
  let draggingItem = document.querySelector(".dragging");
  // seleccionar sus hermanos
  let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];
  // encontrar el siguiente hermano
  let nextSibling = siblings.find(sibling => {
    let siblingTop = sibling.getBoundingClientRect().top + window.pageYOffset;
    let siblingMiddle = siblingTop + sibling.offsetHeight / 2;
    let mousePosition = e.touches[e.touches.length - 1].clientY + window.pageYOffset;
    return mousePosition <= siblingMiddle;
  });
  sortableList.insertBefore(draggingItem, nextSibling);
});

item.addEventListener("touchend", () => {
  // restablecer la posición del elemento arrastrado con una transición suave
  item.style.transition = "transform 0.3s ease";
  item.style.transform = "";
  item.classList.remove("dragging");
  // esperar a que termine la transición antes de restablecer la propiedad de transición
  setTimeout(() => {
    item.style.transition = "";
  }, 300);
});

})










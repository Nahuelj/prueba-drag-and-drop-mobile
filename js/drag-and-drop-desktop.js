const sortableList = document.querySelector("#mi-lista");
const items = Array.from(document.querySelectorAll(".item"));


items.forEach(item => {
  // HACER ARRASTRABLE
  item.draggable = true;

  // CUANDO SE COMIENZA EL ARRASTRE 
  item.ondragstart = () =>{
    setTimeout(()=>{item.classList.add("dragging")}, 0);

  }

  // CUANDO SE TERMINA EL ARRASTRE
  item.ondragend = () =>{
    item.classList.remove("dragging");
  }

  
})


function initSortableList(e){
  // PREVENIMOS QUE EL COMPORTAMIENTO DEL NAVEGADOR INTERVENGA EN EL DRAGOVER
  e.preventDefault();
  // SELECCIONAMOS EL ITEM QUE ESTAMOS ARRASTRANDO
  const draggingItem = document.querySelector(".dragging")
  // SELECCIONAMOS A SUS HERMANOS
  const siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")]
  // ENCONTRAMOS EL SIGUIENTE HERMANO AUNQ LO ESTEMOS ARRASTRANDO (preguntar al tutor si lo puede explicar)
  let nextSibling = siblings.find(sibling => {
    let siblingTop = sibling.getBoundingClientRect().top + window.pageYOffset;
    let siblingMiddle = siblingTop + sibling.offsetHeight / 2;
    let mousePosition = e.clientY + window.pageYOffset;
    console.log(mousePosition);
    return mousePosition <= siblingMiddle;
  });
    
    console.log(nextSibling);
    sortableList.insertBefore(draggingItem, nextSibling);
}

sortableList.addEventListener("dragover", initSortableList)
sortableList.addEventListener("dragenter", e => {e.preventDefault()});

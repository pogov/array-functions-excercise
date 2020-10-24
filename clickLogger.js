// stwórz funkcję clickLogger, która zamontowaniu

// będzie logować do konsoli id oraz klasę elementu html,
// który został klikniety

// funkcja clickLogger ma nasłuchiwać na wszystkie klikalne elementy, t
// w obrębie całej strony

function clickLogger() {
  const elements = document.querySelectorAll("a, button");
  elements.forEach((element) => element.addEventListener("click", logger));

  function logger(element) {
    const { id, classList } = element.target;
    if (!id && classList.length === 0)
      console.log("Element has neither class nor id");
    if (id && classList.length === 0)
      console.log(`Element has an id: ${id} and has no class`);
    if (!id && classList.length > 0)
      console.log(`Element has no id. Element class is: ${classList}`);
    if (id && classList.length > 0)
      console.log(`Element has an id: ${id} and class: ${classList}`);
  }
}

window.onload = () => clickLogger();

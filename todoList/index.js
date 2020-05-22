const input = document.querySelector("#input");
const output = document.querySelector("#outputList");
const addButton = document.querySelector("#addItem");
// input.setAttribute('focus',()=>{this.value=''})

const filterInput = document.querySelector("#filterInput");
// const filterButton = document.querySelector("#filterButton");
let savedInput;

const getInput = (e) => {
  console.log(e.target.value);
  savedInput = e.target.value;
};

const filterItems = (e) => {
  const items = document.querySelectorAll("li");
  Array.from(items).forEach((item) => {
    if (!item.textContent.includes(e.target.value)) {
      console.log(item);
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  });
  console.log(items);
};

const clearText = (e) => {
  e.target.value = "";
};

input.addEventListener("keyup", getInput);
input.addEventListener("focus", clearText);

filterInput.addEventListener("keyup", filterItems);
filterInput.addEventListener("focus", clearText);

const addItem = (e) => {
  const node = document.createElement("li"); // Create a <li> node
  const textnode = document.createTextNode(savedInput);
  const buttonNode = document.createElement("button");
  buttonNode.className = "delete";
  const btnTextNode = document.createTextNode("Delete");
  buttonNode.appendChild(btnTextNode);
  buttonNode.addEventListener("click", deleteItem);
  node.appendChild(textnode);
  node.appendChild(buttonNode);
  output.appendChild(node);

  buttonNode.addEventListener("click", deleteItem);
};

addButton.addEventListener("click", addItem);

const deleteItem = (e) => {
  console.log(e.target);
  const currentLI = e.target.parentNode;
  output.removeChild(currentLI);
};

// filterButton.addEventListener("click", filterItems);

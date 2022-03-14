const form = document.querySelector("#formtodo");
const todolist = document.querySelector("#todolist");
const reset = document.querySelector("#reset");
const completedList = document.querySelector("#completedList");

let todoID = 1;
let completedID = 1;
let keys = Object.keys(localStorage);

const updateListenXs = () => {
  return (
    (xS = document
      .querySelectorAll(".x")
      .forEach((task) => task.addEventListener("click", deleteTask))),
    (checkS = document
      .querySelectorAll(".check")
      .forEach((check) => check.addEventListener("click", completeTask)))
  );
};

const loadTodos = () => {
  console.log(keys);
  for (i in keys) {
    if (keys[i].includes("t")) {
      let todoIndex = Number.parseInt(keys[i].slice(1));
      todolist.insertAdjacentHTML(
        "afterbegin",
        `<li class="taskSection" data-done="false" data-index=${todoIndex}> <p> ${localStorage.getItem(
          `t${todoIndex}`
        )} </p> <i class="x fa-solid fa-xmark"></i> <i class="check fa-solid fa-check"></i> </li>`
      );
      if (todoIndex > todoID) todoID = todoIndex + 1;
    } else if (keys[i].includes("c")) {
      let completedIndex = Number.parseInt(keys[i].slice(1));
      completedList.insertAdjacentHTML(
        "afterbegin",
        `<li class="taskSection" data-done="true" data-index=${completedIndex}> <p> ${localStorage.getItem(
          `c${completedIndex}`
        )} </p> <i class="x fa-solid fa-xmark"></i> </li>`
      );
      if (completedIndex > completedID) completedID = completedIndex + 1;
    }
  }
  updateListenXs();
};

const addTodo = (e) => {
  const forbiddenChars = `!"#€%&/()=><?¿≠}{[]}`;
  e.preventDefault();
  const input = document.querySelector("#addtodo").value;
  if (
    input.trim() !== "" &&
    input.split("").every((char) => !forbiddenChars.includes(char))
  ) {
    localStorage.setItem(`t${todoID}`, input);
    todolist.insertAdjacentHTML(
      "afterbegin",
      `<li class="taskSection" data-done="false" data-index=${todoID} > <p> ${input} </p> <i class="x fa-solid fa-xmark"></i> <i class="check fa-solid fa-check"></i> </li>`
    );
  } else {
    alert("Input cannot be empty or contain special characters");
  }
  updateListenXs();
  document.querySelector("#addtodo").value = "";
  todoID++;
};

const deleteTask = (e) => {
  if (e.currentTarget.parentNode.dataset.done === "false") {
    console.log(e.currentTarget.parentNode.dataset.index);
    localStorage.removeItem(`t${e.currentTarget.parentNode.dataset.index}`);
  } else {
    localStorage.removeItem(`c${e.currentTarget.parentNode.dataset.index}`);
  }
  e.currentTarget.parentNode.remove();
};

const completeTask = (e) => {
  localStorage.setItem(
    `c${completedID}`,
    e.currentTarget.parentNode.children[0].textContent
  );
  completedList.insertAdjacentHTML(
    "beforeend",
    `<li class="taskSection" data-done="true" data-index=${e.currentTarget.parentNode.dataset.index}>  <p> ${e.currentTarget.parentNode.children[0].textContent} </p> <i class="x fa-solid fa-xmark"></i> </li>`
  );
  updateListenXs();
  completedID++;
  e.currentTarget.parentNode.remove();
  localStorage.removeItem(`t${e.currentTarget.parentNode.dataset.index}`);
};

loadTodos();
form.addEventListener("submit", addTodo);
reset.addEventListener("click", () => {
  todolist.innerHTML = "";
  localStorage.clear();
});

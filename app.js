const form = document.querySelector("#formtodo");
const todolist = document.querySelector("#todolist");
const reset = document.querySelector("#reset");
const completedList = document.querySelector("#completedList");

const updateListenXs = () => {
  return (xS = document
    .querySelectorAll(".x")
    .forEach((task) => task.addEventListener("click", deleteTask)));
};

const addTodo = (e) => {
  e.preventDefault();
  const input = document.querySelector("#addtodo").value;
  if (input.trim() !== "") {
    todolist.insertAdjacentHTML(
      "afterbegin",
      `<li class="taskSection"> <p> ${input} </p> <i class="x fa-solid fa-xmark"></i> <i class="check fa-solid fa-check"></i> </li>`
    );
  }
  checkMarks = document.querySelectorAll(".check");
  updateListenXs();
  checkMarks.forEach((check) => check.addEventListener("click", completeTask));
  document.querySelector("#addtodo").value = "";
};

const deleteTask = (e) => {
  e.currentTarget.parentNode.remove();
};

const completeTask = (e) => {
  completedList.insertAdjacentHTML(
    "beforeend",
    `<li class="taskSection"> <p> ${e.currentTarget.parentNode.children[0].textContent} </p> <i class="x fa-solid fa-xmark"></i> </li>`
  );
  updateListenXs();
  e.currentTarget.parentNode.remove();
};

form.addEventListener("submit", addTodo);
reset.addEventListener("click", () => (todolist.innerHTML = ""));

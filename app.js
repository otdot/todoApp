const form = document.querySelector("#formtodo");
const todolist = document.querySelector("#todolist");
const reset = document.querySelector("#reset");

const addTodo = (e) => {
  e.preventDefault();
  const input = document.querySelector("#addtodo").value;
  if (input.trim() !== "") {
    todolist.insertAdjacentHTML(
      "afterbegin",
      `<li class="taskSection"> <p> ${input} </p> <i class="x fa-solid fa-xmark"></i> <i class="check fa-solid fa-check"></i> </li>`
    );
  }
  tasks = [...document.querySelectorAll("#todolist li")];
  document.querySelector("#addtodo").value = "";
  tasks.forEach((task) => task.addEventListener("click", deleteTask));
};

const deleteTask = (e) => {
  e.currentTarget.remove();
};

form.addEventListener("submit", addTodo);
reset.addEventListener("click", () => (todolist.innerHTML = ""));

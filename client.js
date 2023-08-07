document
  .getElementById("todoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const task = document.getElementById("todo").value;

    axios
      .post("http://localhost:3000/todos", { task })
      .then((response) => {
        console.log("Todo added:", response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  });

function getTodos() {
  axios
    .get("http://localhost:3000/todos")
    .then((res) => {
      const todos = res.data;
      const todosList = document.getElementById("todos");
      todosList.innerHTML = ""; // Clear the current list
      todos.forEach((todo) => {
        const li = document.createElement("h4");
        li.className = "left";
        li.textContent = todo.task;

        const icon = document.createElement("button");
        icon.className = "material-symbols-rounded right";
        icon.style = todo.done
          ? "background-color: green; color:white"
          : "background-color: #393e46; color:white";
        icon.textContent = "done"; // This sets the "done" icon from Material Icons
        icon.onclick = () => toggleDone(todo._id);
        li.appendChild(icon);

        const deleteButton = document.createElement("button");
        deleteButton.className = "material-symbols-rounded right";
        deleteButton.style = "color: #f96d00; background-color: #393e46";

        deleteButton.textContent = "delete";
        deleteButton.onclick = () => deleteTodo(todo._id);
        li.appendChild(deleteButton);

        todosList.appendChild(li);
      });
    })
    .catch((err) => {
      console.error("There was an error fetching the todos", err);
    });
}

function deleteTodo(id) {
  axios
    .delete(`http://localhost:3000/todos/${id}`)
    .then((res) => {
      console.log("Todo deleted:", res.data);
      getTodos();
    })
    .catch((error) => {
      console.error("There was an error deleting the todo!", error);
    });
}

function toggleDone(id) {
  axios
    .patch(`http://localhost:3000/todos/${id}/toggle`)
    .then((res) => {
      getTodos();
    })
    .catch((err) => {
      console.error("There was an error fetching the todos", err);
    });
}

getTodos();

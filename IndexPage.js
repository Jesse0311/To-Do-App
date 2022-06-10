function addTask(){
    let addTaskInput = document.getElementById('addTaskInput').value;
    ul = document.getElementById('taskList');

    // creates list items of user input
    li = document.createElement("li");
    txtNode = document.createTextNode(addTaskInput);
    
    li.appendChild(txtNode);
    ul.appendChild(li);

    // clears input field after button is clicked
    document.getElementById('addTaskInput').value = '';
}

  // allow "Enter" to trigger the button
  let input = document.getElementById("addTaskInput");
  input.addEventListener("keypress", function(event){
      if(event.key === "Enter"){

          document.getElementById("addTaskButton").click()
      }
  });
let data;
async function getdata(){
    data=await fetch("http://localhost:3000/tasks");
    data=await data.json();
    console.log(data);
}


let main=document.querySelector("#main");

const search=document.createElement("div");
search.classList.add("add_task");
const input=document.createElement("input");
input.type="text";
input.placeholder="Enter your task";
input.id="search";
search.appendChild(input);
const add_todo_button=document.createElement("button");
add_todo_button.addEventListener("click",add_task);
add_todo_button.classList.add("add");
add_todo_button.innerText="Add";
search.appendChild(add_todo_button);

main.appendChild(search);
let tasks=document.createElement("div");
tasks.classList.add("list");
main.appendChild(tasks);


function render(){
    const list=document.querySelector(".list");
    list.innerHTML="";

    for(const element of data){
        const task= document.createElement("div");
        task.classList.add("tasks");
        const text=document.createElement("div");
        text.classList.add("task");
        text.innerText=element.task;
        if(!element.done){
            text.style.color="red";
        }
        else{
            text.style.color="green";
        }
        task.appendChild(text);
        const buttons=document.createElement("div");
        buttons.classList.add("buttons");
        const delete_btn =document.createElement("button");
        delete_btn.addEventListener("click",delete_task);
        delete_btn.innerText="delete";
        const update_btn =document.createElement("button");
        update_btn.innerText="update";
        update_btn.addEventListener("click",done_task);

        buttons.appendChild(delete_btn);
        buttons.appendChild(update_btn);

        task.appendChild(buttons);

        task.id=element.id;

        list.appendChild(task);
    }
}

async function add_task(){
    const input_task=document.querySelector("input");
    if(input_task.value===""){
        alert("Please enter the task first");
        return;
    }
    try{
        const res=await fetch("http://localhost:3000/tasks",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({task:input_task.value})
        });

        await getdata();
        render();
    }
    catch(err){
        console.error({"Error in adding task:":err});
    }
}

async function delete_task(e){
    const element=e.target.parentElement.parentElement;
    const id=element.id;
    try{
        const res=await fetch(`http://localhost:3000/tasks/${id}`,
            {
                method:"DELETE"
            }
        )
        await getdata();
        render();
    }
    catch(err){
        console.error("Error deleting task:", err);
    }
}



async function done_task(e){
    const element=e.target.parentElement.parentElement;
    const id=element.id;
    try{
        const res=await fetch(`http://localhost:3000/tasks/${id}`,
            {
                method:"PUT"
            }
        )
        await getdata();
        render();
    }
    catch(err){
        console.error("Error deleting task:", err);
    }
}

async function main_program(){
    await getdata();
    render();
}

main_program();

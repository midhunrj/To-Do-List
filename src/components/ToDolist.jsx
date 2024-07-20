import React,{useState} from 'react'
import EditModal from './editmodal'
import './complete.css'
const ToDolist=()=>{
const [tasks,setTasks]=useState([])
const [newTask,setNewTask]=useState("")
const [isEditing, setIsEditing] = useState(false);
const [currentIndex, setCurrentIndex] = useState(null);
const [editTaskText, setEditTaskText] = useState("");
const handleInputChange=(event)=>{
setNewTask(event.target.value)
}
const addTask=()=>{
    if(newTask.trim()!=="")
    {
setTasks(t=>[...t,{text:newTask,complete:false}])
setNewTask("")
    }
}
const deleteTask=(index)=>{

    const updatedTasks=tasks.filter((element,i)=>i!==index)
    setTasks(updatedTasks)
}
const openEditModal = (index) => {
  if(tasks[index].complete)
  {
    return
  }
    setIsEditing(true);
    setCurrentIndex(index);
    setEditTaskText(tasks[index].text);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditTaskText("");
  };

  const updateTask = () => {
    if (editTaskText.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[currentIndex].text = editTaskText;
      setTasks(updatedTasks);
      setIsEditing(false);
      setEditTaskText('');
      setCurrentIndex(null);
    }
  };
// const updateTask=(index)=>{
//     if(newTask.trim()!=='')
//     {
//         let updatedTasks=[...tasks]
//         updatedTasks[currentIndex]=newTask
//         setTasks(updatedTasks)
//         setIsEditing(false)
//         setNewTask('')
//         setCurrentIndex(null)


//     }
// }
const moveTaskUp=(index)=>{
if(index>0)
{
    const updatedTasks=[...tasks]
    if(!updatedTasks[index].complete&&!updatedTasks[index-1].complete)
    {
    const temp=updatedTasks[index]
    updatedTasks[index]=updatedTasks[index-1]
    updatedTasks[index-1]=temp
    //[updatedTasks[index],updatedTasks[index-1]]=[updatedTasks[index-1],updatedTasks[index]]
    setTasks(updatedTasks)
    }
}
}

const moveTaskDown=(index)=>{
    if(index<tasks.length-1)
    {
        const updatedTasks=[...tasks]
        if(!updatedTasks[index].complete&&!updatedTasks[index+1].complete)
        {
        const temp=updatedTasks[index]
     updatedTasks[index]=updatedTasks[index+1]
     updatedTasks[index+1]=temp
        //[updatedTasks[index],updatedTasks[index+1]]=[updatedTasks[index+1],updatedTasks[index]]
        setTasks(updatedTasks)
        }
    }
}
const toggleComplete=(index)=>{
const updatedTasks=[...tasks]
updatedTasks[index].complete =!updatedTasks[index].complete
updatedTasks.sort((a,b)=>a.complete-b.complete)
setTasks(updatedTasks)
}
    return(
        <div className='to-do-list'>
            <h1>ToDo List</h1>
            <input type='text' placeholder="Enter task" value={newTask}
            onChange={handleInputChange}/>
            <button className='add-button' onClick={isEditing ? updateTask : addTask}>
                {isEditing ? "Update Task" : "Add Task"}</button> 
            <ol>{tasks.map((task,index)=><li key={index}><span className={`task ${task.complete?'completed':''}`} onClick={()=>toggleComplete(index)}>{task.text}</span>
            <button className='delete-button' onClick={()=>deleteTask(index)}>delete</button ><button className='edit-button' onClick={()=>openEditModal(index)}>Edit</button>
            <button className='move-button' onClick={()=>moveTaskUp(index)}>up</button>
            <button className='move-button' onClick={()=>moveTaskDown(index)}>down</button></li>)}</ol>
            <EditModal 
        isOpen={isEditing}
        onClose={closeEditModal}
        task={editTaskText}
        onChange={(e) => setEditTaskText(e.target.value)}
        onSave={updateTask} />
       
        </div>
    )
}
export default ToDolist
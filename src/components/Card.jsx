

import { Draggable } from "react-beautiful-dnd";
import axios from "axios";


export function Card({ task, index }) {
   
    const handleDelete = async () => {
        try {
            // Send delete request to backend API to delete the task
            await axios.delete(`${import.meta.env.VITE_API_URL}/users/delete/${task._id}`);
            console.log("Task deleted successfully:", task._id);
            // Optionally, update your state or perform any other actions after deletion
            window.location.reload();
        } catch (error) {
            console.error("Error deleting task:", error);
            // Handle error appropriately, such as displaying an error message to the user
        }
    };

    

    return (

        < Draggable draggableId={task._id} key={task._id} index={index} >
            {(provided, snapshot) => ( 
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="bg-white border border-gray-200 rounded p-2 shadow-md"
                >

                <div className="text-center mb-4">
    <h1 className="text-lg font-bold">{task.title}</h1>
    <div className="text-right mt-0">
        <span className="text-xs text-gray-500">Assignee: @{task.Id}</span>
    </div>
</div>


                    <div className="mb-4">
                        <p className="text-sm">{task.description}</p>
                    </div>

                    <div className="flex justify-between items-center">

                        <button 
                            onClick={handleDelete}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                            Delete
                        </button>
                        
                        <p className="text-xs text-gray-500 ">
        {task.deadline && new Date(task.deadline).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })}

    </p>
                        <span className="text-xs text-gray-500">  @{task.user_Id}</span>

                    </div>

                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    );
}

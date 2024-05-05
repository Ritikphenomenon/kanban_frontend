

import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import  Column  from './Columns'
import axios from "axios";



export default function Board() {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [inReview, setInReview] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/tasks`);
                const tasks = response.data.taskses;

                const status1 = tasks.filter(task => task.status === 1);
                const status2 = tasks.filter(task => task.status === 2);
                const status0 = tasks.filter(task => task.status === 0);

                setInReview(status2);
                setCompleted(status1);
                setIncomplete(status0);
            } catch (error) {
                console.error("Error fetching tasks:", error.message);
            }
        };

        fetchData();
    }, []);
 
    

    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
    
        if (!destination || source.droppableId === destination.droppableId) return;
    
        deletePreviousState(source.droppableId, draggableId);
    
        const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview]);
    
        
        const newStatus = parseInt(destination.droppableId) ;
    
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/users/tasks/${draggableId}`, {
                status: newStatus
            });
        } catch (error) {
            console.error("Error updating task status:", error.message);
            // Handle error
        }
    
        setNewState(destination.droppableId, task);
    };

    

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setIncomplete(prevState => removeItemById(taskId, prevState));
                break;
            case "2": 
                setCompleted(prevState => removeItemById(taskId, prevState));
                break;
            case "3":
                setInReview(prevState => removeItemById(taskId, prevState));
                break;
            default:
                break;
        }
    }
    
    function setNewState(destinationDroppableId, task) {
        const updatedTask = { ...task };
        switch (destinationDroppableId) {
            case "1":   // TO DO
                updatedTask.completed = false;
                setIncomplete(prevState => [updatedTask, ...prevState]);
                break;
            case "2":  // DONE
                updatedTask.completed = true;
                setCompleted(prevState => [updatedTask, ...prevState]);
                break;
            case "3":  // IN REVIEW
                updatedTask.completed = false;
                setInReview(prevState => [updatedTask, ...prevState]);
                break;
            default:
                break;
        }
    }
    

    function findItemById(id, array) {
        return array.find((item) => item._id === id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item._id !== id);
    }

    return (
        <>
            <section className="h-screen overflow-hidden">
                <h2 className="text-lg font-bold p-6 ">PROGRESS BOARD</h2>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-3 gap-2">
                        <Column title={"TO DO"} tasks={incomplete} id={"1"} className="bg-blue-50 text-black overflow-scroll h-screen" />
                        <Column title={"DONE"} tasks={completed} id={"2"} className="bg-green-50 text-black overflow-scroll h-screen" />
                        <Column title={"IN REVIEW"} tasks={inReview} id={"3"} className="bg-yellow-50 text-black overflow-scroll h-screen" />
                    </div>
                </DragDropContext>
            </section>
        </>
    );
}

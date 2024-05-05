

import { Droppable } from "react-beautiful-dnd";
import { Card } from "./Card";

export default function Column ({ title, tasks, id , className}) {
    return (

        <div className={className}>

            <div className="text-slate-800 font-semibold w-full grid place-items-center bg-white border border-gray-100 sticky top-0 p-3">
                {title}
            </div>
            
            <Droppable droppableId={id}>

                {(provided, snapshot) => (

                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`px-3 gap-2 ${snapshot.isDraggingOver ? "is-dragging-over" : ""}`}
                        style={{ display: "grid", gridGap: "8px" }} // Add grid gap here
                    >

                        {tasks.map((task, index) => (
                            <Card key={task._id} index={index} task={task} />
                        ))}
                        
                        {provided.placeholder}

                    </div>

                )}


            </Droppable>



        </div>
    );
}

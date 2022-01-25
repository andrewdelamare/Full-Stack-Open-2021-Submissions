import React from "react";

export const NumberEntry = (props) => {
    return(
        <form onSubmit={props.addNewPerson}>
            <div>
                Name: <input onChange={props.handleNewName} />
            </div>
            <div>
                Number: <input onChange={props.handleNewNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
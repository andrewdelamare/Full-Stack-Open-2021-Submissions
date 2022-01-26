import React from "react";

export const Filter = (props) => {
    return(
      <div>
        <form>
          <div>
            Search: <input onChange={props.handleNewFilter} />
          </div>
        </form>
      </div>
    )
  }
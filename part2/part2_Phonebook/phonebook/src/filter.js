import React from "react";

export const Filter = (props) => {
    return(
      <div>
        <form>
          <div>
            Filter with: <input onChange={props.handleNewFilter} />
          </div>
        </form>
      </div>
    )
  }
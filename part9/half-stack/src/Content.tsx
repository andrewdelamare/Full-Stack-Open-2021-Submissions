/* eslint-disable react/jsx-key */
import { CoursePart } from "./App"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Content = ({arr}: {arr: CoursePart[]}) => {
  const partArr = arr.map(a => {
    switch (a.type) {
      case "normal":
        return (
        <div>
          <h2>{a.name} {a.exerciseCount }</h2>
          <p>{a.description}</p>
        </div>)
      case "groupProject":
        return (
        <div>
          <h2>{a.name} {a.exerciseCount }</h2>
          <p>project exercises {a.groupProjectCount}</p>
        </div>)
      case "submission":
        return (
        <div>
          <h2>{a.name} {a.exerciseCount }</h2>
          <p>{a.description}</p>
          <p>{a.exerciseSubmissionLink}</p>
        </div>)
      default:
        assertNever(a)
        break;
    }})

return( 
<div>
  {partArr.map(p => p )}
</div>
)  
}
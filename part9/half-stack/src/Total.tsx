export const Total = ({courseParts}: {courseParts: {name: string, exerciseCount: number}[]}) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

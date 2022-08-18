import { Content } from "./Content";
import { Header } from "./Header";
import { Total } from "./Total";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header title={courseName} />
      {courseParts.map(c => <Content key={c.name.length} name={c.name} count={c.exerciseCount} />)}
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
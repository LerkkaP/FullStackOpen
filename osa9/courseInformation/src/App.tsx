const App = () => {

  interface HeaderProps {
    name: string
  }

  interface Course {
    name: string;
    exerciseCount: number;
  }

  interface ContentProps {
    courseParts: Course[];
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>
  }

  const Content = (props: ContentProps) => {
    return (
      <div>
        {props.courseParts.map((course, i) => (
          <p key={i}>{course.name} {course.exerciseCount}</p>
        ))}
      </div>
    )
  }

  const Total = (props: ContentProps) => {
    return <p>{props.courseParts.reduce((sum, course) => sum + course.exerciseCount, 0)}</p>
  }


  const courseName: string = "Half Stack application development";
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
      <Header name={courseName} />
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;
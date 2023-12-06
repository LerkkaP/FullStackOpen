const App = () => {
  interface HeaderProps {
    name: string;
  }

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic";
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }

  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background";
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartRequirements extends CoursePartDescription {
    requirements: string[];
    kind: "special";
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartRequirements;

  const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
            </p>
            <p>
              <i>{part.description}</i>
            </p>
          </div>
        );
      case "group":
        return (
          <div>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
            </p>
            <p>project exercises: {part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
            </p>
            <p>
              <i>{part.description}</i>
            </p>
            <p>submit to {part.backgroundMaterial}</p>
          </div>
        );
      case "special":
        return (
          <div>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
            </p>
            <p>
              <i>{part.description}</i>
            </p>
            <p>required skills: {part.requirements.join(", ")}</p>
          </div>
        );
    }
  };

  const Header = ({ name }: HeaderProps) => {
    return <h1>{name}</h1>;
  };

  const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
      <div>
        {courseParts.map((course, i) => (
          <p key={i}>
            <Part part={course} />
          </p>
        ))}
      </div>
    );
  };

  const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
      <p>
        {courseParts.reduce((sum, course) => sum + course.exerciseCount, 0)}
      </p>
    );
  };

  const courseName: string = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;

const Course = ({course}) => {
  return (
    <>
      <Header text={course}/>
      <Content course={course} />
      <Total course={course}/>
    </>
  )
}

const Header = ({text}) => {
    return (
      <>
        <h3>{text.name}</h3>
      </>
    )
  }
  
  const Content = ({course}) => {
    return (
      <>
        <Part part={course.parts}/>
      </>
    )
  }
  
  const Part = ({part}) => {
    return (
      <>
        {part.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      </>
    )
  }
  
  
  const Total = ({course}) => {
    return (
      <>
        <p><b>total of {course.parts.map(part => part.exercises).reduce((a, b) => a + b)} exercises</b></p>    
      </>
    )
  }

export default Course
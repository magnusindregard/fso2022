const Header2 = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => 
  {
    const sums = parts.map(part => part.exercises)
    
    const initialSum = 0
    const sum = sums.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialSum
    )
    return <p><strong>Number of exercises {sum}</strong></p>

  }

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part =>
      <Part key={part.id}
        part={part} 
      />
    )}
  </>

const Course = ({ course }) => 
  <>
    <Header2 course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>

export default Course
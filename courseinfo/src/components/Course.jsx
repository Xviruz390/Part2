const Header = (props) => {
    console.log(props)
    return (
  
        <h1>{props.course.name}</h1>
  
    );
  };
  
  const Content = (props) => {
    
    const parts = props.parts.map(element => { return <Part key={element.id} parts={element} /> } )
  
    return (
      <div>
        {parts}
      </div>
    )
  }
  
  const Part = (props) => {
    console.log(props)
    return (
   
        <p>
          {props.parts.name} {props.parts.exercises}
        </p>
  
    );
  };
  
  
  
  const Total = (props) => {
    const total = props.parts.reduce((sum,order) => sum + order.exercises, 0)
    console.log(total)
    return (
      <div>
        <p>
          total of {total} exercises
        </p>
      </div>
    )
  } 

  const Course = (props) => {
    console.log(props);
    return (
    <>
        <Header course={props.courses} />
        <Content parts={props.courses.parts} />
        <Total parts={props.courses.parts} />
    </>)
        
  }

  export default Course;
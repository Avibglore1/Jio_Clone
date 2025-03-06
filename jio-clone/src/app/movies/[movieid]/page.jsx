import Link from "next/link";
import React from 'react'

function Movie(props) {
    const id = props.params.movieid;
  return (
    <div className='flex flex-col'>
      <div>MovieId: {id}</div>
      <ul>
        <li>
          <Link href='/'>Back to home</Link>
        </li>
      </ul>
    </div>
    
  )
}

export default Movie
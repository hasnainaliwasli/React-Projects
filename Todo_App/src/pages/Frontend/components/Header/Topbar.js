import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export default function Topbar() {
  const [current, setCurrent] = useState()
  useEffect(() => {
    setInterval(() => {
      setCurrent(dayjs().format('dddd, MMMM D YYYY, hh:mm:ss A'))
    });
  }, [])

  return (

    <header className='bg-primary'>
      <div className="container">
        <div className="row">
          <div className="col">
            <p className='mb-0 text-center text-white '>{current}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

import React, { useEffect, useState } from 'react'
import './loading.css'

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        return prevDots.length >= 3 ? '' : prevDots + '.';
      });
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='loading-container'>
      <div className="loading">
        Loading{dots}
      </div>
    </div>
  )
}

export default Loading
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import {useState , useEffect} from 'react'
import './App.css';

function App() {

  // display the timer
  const [ display, setDisplay ] = useState('00:10')
  // store total time in milliseconds | note for the future: 2100 is 35 mins
  const [ totalTime ] = useState(10)
  // store the seconds passed from the initial start.
  const [secsFromInitialStart, setSecsFromInitialStart] = useState(0)
  // clock is the interval id
  const [ clock, setClock ] = useState()

  const startClockFn = () => {
    const start = new Date()
    setClock(setInterval(() => {
      let current
      // manipulate the timer each second
      // subtract the starting time from a new Date object
      // and we convert from milliseconds to a single-digit number.
      current = Number(((new Date() - start) / 1000).toFixed())
      // To keep track of the seconds passed from the start till now
      setSecsFromInitialStart(current)
      current = totalTime - current
      // convert 0 minutes in 00 or 01 same for seconds
      let mins = (current / 60).toString().split(".")[0].padStart(2, "0")
      let secs = (current % 60).toString().padStart(2, "0")
      setDisplay(`${mins}:${secs}`)
    }, 1000))
  }
  const pauseClockFn = () => {
    clearInterval(clock)
  }

  // stop the timer when reaches 00:00
  const stopClockFn = () => {
    clearInterval(clock)
  }

  useEffect(() => {
    if(Number(secsFromInitialStart) === Number(totalTime)) {
      stopClockFn()
    }
  }, [secsFromInitialStart])

  return (
    <div className='main'>
      <div className='btns-container'>
        <div className='timers-container'>
          <p>i am a timer</p>
          <h1>{display}</h1>
          <button onClick={startClockFn}>Start</button>
          <button onClick={pauseClockFn}>Pause</button>
        </div>
      </div>
    </div>
  );
}

export default App;

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
  // set the break timer
  const [ breakTime ] = useState(5)
  // to check if the timer is pause or not
  const [ isBreak, setIsBreak ] = useState(false)

  const startClockFn = () => {

    const start = new Date()

    if (isBreak) {
      setClock(
        setInterval(() => {
          const current = Number(((new Date() - start) / 1000).toFixed());
          setSecsFromInitialStart(prevSecs => prevSecs + 1);
          const remainingTime = breakTime - current;
          if (remainingTime <= 0) {
            clearInterval(clock);
            setIsBreak(false);
            setDisplay(`${Math.floor(totalTime / 60).toString().padStart(2, '0')}:${(totalTime % 60).toString().padStart(2, '0')}`);
            // Play sound alert and handle resuming the main timer
          } else {
            const mins = Math.floor(remainingTime / 60).toString().padStart(2, '0');
            const secs = (remainingTime % 60).toString().padStart(2, '0');
            setDisplay(`${mins}:${secs}`);
          }
        }, 1000)
      );
    } else {
      setClock(
        setInterval(() => {
          const current = Number(((new Date() - start) / 1000).toFixed());
          setSecsFromInitialStart(prevSecs => prevSecs + 1);
          const remainingTime = totalTime - current;
          if (remainingTime <= 0) {
            clearInterval(clock);
            setIsBreak(true);
            setDisplay(`${Math.floor(breakTime / 60).toString().padStart(2, '0')}:${(breakTime % 60).toString().padStart(2, '0')}`);
            // Play sound alert and handle resuming the break timer
          } else {
            const mins = Math.floor(remainingTime / 60).toString().padStart(2, '0');
            const secs = (remainingTime % 60).toString().padStart(2, '0');
            setDisplay(`${mins}:${secs}`);
          }
        }, 1000)
      );
    }
  };

  const pauseClockFn = () => {
    clearInterval(clock);
  };

  useEffect(() => {
    return () => {
      clearInterval(clock);
    };
  }, [clock]);

  // TODO: make a counter that counts pomodoros
  // TODO: after 3 pomos, there is a long break

  return (
    <div className='main'>
      <div className='center-layout'>
        <div className='timer-container'>
          <h1>{display}</h1>
          <p>#1</p>
          <p>something...</p>
          <button onClick={startClockFn}>Start</button>
          <button onClick={pauseClockFn}>Pause</button>
        </div>
      </div>
    </div>
  );
}

export default App;

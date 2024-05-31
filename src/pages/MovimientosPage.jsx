import React from 'react'
import Stopwatch from '../components/cronometros/Stopwatch'
import CountdownTimer from '../components/cronometros/CountdownTimer'
import PomodoroTimer from '../components/cronometros/PomodoroTimer'

function MovimientosPage() {
  return (
    <>
      <main className='w-full p-3 flex flex-col gap-y-5'>
        <Stopwatch/>
        <CountdownTimer/>
        <PomodoroTimer/>
      </main>
    </>
  )
}

export default MovimientosPage
import React from 'react'
import { CardComponent } from '../components/vistasCard/CardComponent'



function HomePage() {
  return (
    <>


   <div className='p-3 lg:pt-10 lg:p-10 w-full h-screen bg-zinc-100' >
 
      <main className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 2xl:p-10 place-items-center'>
        <CardComponent img="1.webp" title="Burpees" des="Saltos con flexiones de pecho." icono="fas fa-bicycle"/>
        <CardComponent img="2.webp" title="Deadlifts" des="Levantamiento de pesas desde el suelo." icono="fas fa-running"/>

        <CardComponent img="3.webp" title="Pull-ups" des="Dominadas en barra horizontal." icono="fas fa-dumbbell"/>
        
        <CardComponent img="4.webp" title="Box Jumps" des="Saltos sobre caja elevada." icono="fas fa-biking"/>
        <CardComponent img="5.webp" title="Deadlifts" des="Levantamiento de pesas desde el suelo." icono="fas fa-futbol"/>
        <CardComponent img="6.webp" title="Wall Balls" des="Lanzamiento de balón medicinal." icono="fas fa-swimmer"/>
      </main>
      
      <section className='flex justify-center items-center text-center px-20 p-8'>
        <p>Únete a la competencia de CrossFit más intensa del año, donde fuerza, resistencia y determinación se ponen a prueba. Participa en desafíos extremos con los mejores atletas, compitiendo en una serie de ejercicios rigurosos. ¡Demuestra tu capacidad y lucha por el título de campeón!</p>
      </section>
   </div>
    </>
  )
}

export default HomePage

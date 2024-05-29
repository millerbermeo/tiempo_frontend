import React from 'react'
import { CardComponent } from '../components/vistasCard/CardComponent'
import TableUsuariosEvento from '../components/usuariosEventos/TableUsuariosEvento'
import TableUsuarios from '../components/usuariosEventos/TableUsuarios'
import TableEvento from '../components/usuariosEventos/TableEvento'
import SuperTabla from '../components/usuariosEventos/SuperTabla'




function HomePage() {
  return (
    <>


   <div className='p-3 lg:pt-10 lg:p-10 w-full h-screen bg-zinc-100' >
 
      <main className=''>
       {/* <TableUsuariosEvento/>
       <TableUsuarios/>

       <TableEvento/> */}

       <SuperTabla/>
      </main>
      
      <section className='flex justify-center items-center text-center px-20 p-8'>
        <p>Únete a la competencia de CrossFit más intensa del año, donde fuerza, resistencia y determinación se ponen a prueba. Participa en desafíos extremos con los mejores atletas, compitiendo en una serie de ejercicios rigurosos. ¡Demuestra tu capacidad y lucha por el título de campeón!</p>
      </section>
   </div>
    </>
  )
}

export default HomePage

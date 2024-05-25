import React from 'react'
import { TableEventos } from '../components/eventos/TableEventos'
import { TablaParteEvento } from '../components/categorias/parteeventos/TablaParteEvento'


function EventosPage() {
  return (
    <>
      <main className='w-full p-8'>
        <TableEventos/>

        <TablaParteEvento/>
      </main>
    </>
  )
}

export default EventosPage
import React from 'react'
import { RegistrarUsuario } from '../components/usuarios/RegistrarUsuario'
import { TableMovimientoParte } from '../components/movimientos/TableMovimientoParte'

function UsuariosPage() {
  return (
    <>
      <main className='w-full p-8'>
        <RegistrarUsuario/>

        <TableMovimientoParte/>
      </main>
    </>
  )
}

export default UsuariosPage
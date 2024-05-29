import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input } from "@nextui-org/react";
import { SearchIcon } from '../iconos/SearchIcon';
import axiosClient from '../../configs/axiosClient';

const TableUsuariosEvento = () => {
  const [data, setData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('usuarioEvento/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSearchChange = (value) => {
    setFilterValue(value);
    setPage(1); // Reset page number when changing search filter
  };

  const onClear = () => {
    setFilterValue('');
    setPage(1); // Reset page number when clearing search filter
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const onRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1); // Reset page number when changing rows per page
  };

  const onPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const onNextPage = () => {
    const totalPages = Math.ceil(data.length / rowsPerPage);
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = data.filter(item => item.fk_user.username.toLowerCase().includes(filterValue.toLowerCase())).slice(start, end);

  return (
    <>
      <div className='flex justify-between items-center w-full'>
        <div className='w-full flex gap-3'>
          <Input
            color='white'
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by username..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>

      <Table className='z-0' aria-label="UsuariosEvento Table" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Username</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Cédula</TableColumn>
          <TableColumn>Edad</TableColumn>
          <TableColumn>Teléfono</TableColumn>
          <TableColumn>Rol</TableColumn>
          <TableColumn>Municipio</TableColumn>
          <TableColumn>Fecha Creación</TableColumn>
          <TableColumn>Fecha Modificación</TableColumn>
          <TableColumn>Conteo Reps</TableColumn>
          <TableColumn>Fecha Inicio</TableColumn>
          <TableColumn>Fecha Fin</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedData.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.fk_user.first_name + ' ' + item.fk_user.last_name}</TableCell>
              <TableCell>{item.fk_user.email}</TableCell>
              <TableCell>{item.fk_user.Cedula_persona}</TableCell>
              <TableCell>{item.fk_user.Edad_persona}</TableCell>
              <TableCell>{item.fk_user.Telefono_persona}</TableCell>
              <TableCell>{item.fk_user.Rol_persona.nombre}</TableCell>
              <TableCell>{item.fk_user.fk_municipio}</TableCell>
              <TableCell>{item.fk_user.date_created}</TableCell>
              <TableCell>{item.fk_user.date_modified}</TableCell>
              <TableCell>{item.conteo_reps}</TableCell>
              <TableCell>{item.date_start}</TableCell>
              <TableCell>{item.date_end}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="py-2 px-2 flex justify-between my-2 items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={Math.ceil(data.length / rowsPerPage)}
          onChange={onPageChange}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={page === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={page === Math.ceil(data.length / rowsPerPage)} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default TableUsuariosEvento;

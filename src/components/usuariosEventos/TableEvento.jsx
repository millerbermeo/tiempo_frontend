import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input } from "@nextui-org/react";
import { SearchIcon } from '../iconos/SearchIcon';
import axiosClient from '../../configs/axiosClient';

const TableEvento = () => {
  const [data, setData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('evento/');
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
  const paginatedData = data.filter(item => item.nombre.toLowerCase().includes(filterValue.toLowerCase())).slice(start, end);

  return (
    <>
      <div className='flex justify-between items-center w-full'>
        <div className='w-full flex gap-3'>
          <Input
            color='white'
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>

      <Table className='z-0' aria-label="Event Table" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Tipo de Evento</TableColumn>
          <TableColumn>Cantidad de Partes</TableColumn>
          <TableColumn>Fecha Inicio</TableColumn>
          <TableColumn>Fecha Fin</TableColumn>
          <TableColumn>Fecha Modificación</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedData.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.fk_categoria}</TableCell>
              <TableCell>{item.fk_tipoEvento}</TableCell>
              <TableCell>{item.cantidadPartes}</TableCell>
              <TableCell>{item.date_start}</TableCell>
              <TableCell>{item.date_end}</TableCell>
              <TableCell>{item.date_modified}</TableCell>
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

export default TableEvento;

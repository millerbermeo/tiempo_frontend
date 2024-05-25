import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input } from "@nextui-org/react";
import { PlusIcon } from '../iconos/PlusIcon';
import axiosClient from '../../configs/axiosClient';
import { RegistrarEvento } from './RegistrarEvento';
import { ActualizarEvento } from './ActualizarEvento';

export const TableEventos = () => {
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
        setPage(1);
    };

    const onClear = () => {
        setFilterValue('');
        setPage(1);
    };

    const onPageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const onRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
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


    const downloadCSV = (data) => {
        const headers = ["ID", "Nombre", "Categoría", "Competencia", "Tipo de Evento", "Participantes", "Fecha de Inicio"];
        const rows = data.map(item =>
            [item.id, item.nombre, item.fk_categoria.nombre, item.fk_categoria.fk_competencia.nombre, item.fk_tipoEvento.tipo, item.cantidadPartes, item.date_start].join(',')
        );
        const csvString = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'eventos.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const printTable = () => {
        const printContents = document.querySelector('.printableTable').outerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // Esto es opcional para restaurar completamente el estado de la página.
    };
    

    return (
        <>
            <div className='flex justify-between items-center w-full'>
                <div className='w-full flex gap-3'>
                    <Input
                        color='white'
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<PlusIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className='flex gap-1'>
                        <Button color="secondary" auto onClick={() => downloadCSV(data)}>
                            Descargar CSV
                        </Button>
                        <Button color="primary" auto onClick={printTable}>
                            Imprimir Tabla
                        </Button>
                    </div>
                </div>
                <RegistrarEvento fetchData={fetchData} />
            </div>

            <div className="flex justify-between items-center my-5">
                <span className="text-default-400 text-small">Total {data.length} eventos</span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        value={rowsPerPage}
                        onChange={onRowsPerPageChange}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>

            <Table aria-label="Eventos Table" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Categoría</TableColumn>
                    <TableColumn>Competencia</TableColumn>
                    <TableColumn>Tipo de Evento</TableColumn>
                    <TableColumn>Participantes</TableColumn>
                    <TableColumn>Fecha de Inicio</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.fk_categoria.nombre}</TableCell>
                            <TableCell>{item.fk_categoria.fk_competencia.nombre}</TableCell>
                            <TableCell>{item.fk_tipoEvento.tipo}</TableCell>
                            <TableCell>{item.cantidadPartes}</TableCell>
                            <TableCell>{item.date_start}</TableCell>
                            <TableCell className='flex justify-center gap-2'>
                                <ActualizarEvento evento={item} fetchData={fetchData} />
                            </TableCell>
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
};


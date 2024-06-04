import React, { useState, useEffect, useMemo } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input } from "@nextui-org/react";
import { PlusIcon } from '../iconos/PlusIcon';
import axiosClient from '../../configs/axiosClient';
import RegistrarMovimientoParte from './RegistrarMovimientoParte';


export const TableMovimientoParte = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [page, setPage] = useState(1);
    const [filterValue, setFilterValue] = useState('');

    const fetchData = async () => {
        try {
            const response = await axiosClient.get('movimientoParte/');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axiosClient.get('categoria/');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchEventTypes = async () => {
        try {
            const response = await axiosClient.get('tipoEvento/');
            setEventTypes(response.data);
        } catch (error) {
            console.error('Error fetching event types:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCategories();
        fetchEventTypes();
    }, []);

    const onSearchChange = (value) => {
        setFilterValue(value);
        setPage(1);
    };

    const onClear = () => {
        setFilterValue('');
        setPage(1);
    };

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return data.filter(item => item.fk_movimiento?.nombre?.toLowerCase().includes(filterValue.toLowerCase())).slice(start, end);
    }, [data, filterValue, page, rowsPerPage]);

    const downloadCSV = (data) => {
        const headers = ["ID", "Evento", "Categoría", "Tipo de Evento", "Movimiento", "Repeticiones", "Orden", "Fecha de Creación"];
        const rows = data.map(item => [
            item.id,
            item.fk_parte_evento.fk_evento.nombre,
            getCategoryName(item.fk_parte_evento.fk_evento.fk_categoria),
            getEventTypeName(item.fk_parte_evento.fk_evento.fk_tipoEvento),
            item.fk_movimiento.nombre,
            item.repeticiones,
            item.orden,
            item.date_created
        ].join(','));
        const csvString = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'movimientosParte.csv');
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

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.nombre : 'Unknown';
    };

    const getEventTypeName = (eventTypeId) => {
        const eventType = eventTypes.find(type => type.id === eventTypeId);
        return eventType ? eventType.tipo : 'Unknown';
    };

    return (
        <>
            <div className='flex justify-between items-center w-full'>
                <div className='w-full flex gap-3'>
                    <Input
                        color='white'
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by movement name..."
                        startContent={<PlusIcon />}
                        value={filterValue}
                        onClear={onClear}
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

                <RegistrarMovimientoParte fetchData={fetchData}/>
            
            </div>

            <div className="flex justify-between items-center my-5">
                <span className="text-default-400 text-small">Total {data.length} movimientos</span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>

            <Table aria-label="Movimientos Table" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Evento</TableColumn>
                    <TableColumn>Categoría</TableColumn>
                    <TableColumn>Tipo de Evento</TableColumn>
                    <TableColumn>Movimiento</TableColumn>
                    <TableColumn>Repeticiones</TableColumn>
                    <TableColumn>Orden</TableColumn>
                    <TableColumn>Fecha de Creación</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.fk_parte_evento.fk_evento.nombre}</TableCell>
                            <TableCell>{getCategoryName(item.fk_parte_evento.fk_evento.fk_categoria)}</TableCell>
                            <TableCell>{getEventTypeName(item.fk_parte_evento.fk_evento.fk_tipoEvento)}</TableCell>
                            <TableCell>{item.fk_movimiento.nombre}</TableCell>
                            <TableCell>{item.repeticiones}</TableCell>
                            <TableCell>{item.orden}</TableCell>
                            <TableCell>{item.date_created}</TableCell>
                            <TableCell className='flex justify-center gap-2'>
                                zxx
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
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={page === 1} size="sm" variant="flat" onPress={() => setPage(page - 1)}>
                        Previous
                    </Button>
                    <Button isDisabled={page === Math.ceil(data.length / rowsPerPage)} size="sm" variant="flat" onPress={() => setPage(page + 1)}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
};

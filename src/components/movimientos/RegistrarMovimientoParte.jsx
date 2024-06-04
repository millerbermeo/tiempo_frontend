import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Select, SelectItem, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from '../iconos/PlusIcon';
import { SweetAlert } from '../../configs/SweetAlert';
import axiosClient from '../../configs/axiosClient';

const RegistrarMovimientoParte = ({ fetchData }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isSuccess, setIsSuccess] = useState(null);
    const [message, setMessage] = useState(null);
    const [movimientos, setMovimientos] = useState([]);
    const [parteEventos, setParteEventos] = useState([]);

    const [formErrors, setFormErrors] = useState({
        fk_movimiento: false,
        fk_parte_evento: false
    });

    const [formData, setFormData] = useState({
        fk_movimiento: {},
        fk_parte_evento: {},
        repeticiones: "",
        orden: ""
    });

    const fetchMovimientos = async () => {
        try {
            const response = await axiosClient.get('movimiento/');
            setMovimientos(response.data);
        } catch (error) {
            console.error('Error fetching movimientos:', error);
        }
    };

    const fetchParteEventos = async () => {
        try {
            const response = await axiosClient.get('parteEvento/');
            setParteEventos(response.data);
        } catch (error) {
            console.error('Error fetching parteEventos:', error);
        }
    };

    useEffect(() => {
        fetchMovimientos();
        fetchParteEventos();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setFormErrors({
            ...formErrors,
            [name]: false
        });
    };

    const handleSelectMovimientoChange = (value) => {
        const selectedMovimiento = movimientos.find(mov => mov.id === parseInt(value));
        setFormData({
            ...formData,
            fk_movimiento: selectedMovimiento
        });
        setFormErrors({
            ...formErrors,
            fk_movimiento: false
        });
    };

    const handleSelectParteEventoChange = (value) => {
        const selectedParteEvento = parteEventos.find(pe => pe.id === parseInt(value));
        setFormData({
            ...formData,
            fk_parte_evento: selectedParteEvento
        });
        setFormErrors({
            ...formErrors,
            fk_parte_evento: false
        });
    };

    const handleSubmit = async () => {
        setIsSuccess(null);
        setMessage('');

        const newFormErrors = {};

        if (!formData.fk_movimiento.id) {
            newFormErrors.fk_movimiento = true;
        }
        if (!formData.fk_parte_evento.id) {
            newFormErrors.fk_parte_evento = true;
        }

        if (Object.keys(newFormErrors).length > 0) {
            setFormErrors(newFormErrors);
            return;
        }

        try {
            await axiosClient.post('movimientoParte/', {
                fk_movimiento: formData.fk_movimiento,
                fk_parte_evento: formData.fk_parte_evento,
                repeticiones: formData.repeticiones,
                orden: formData.orden
            }).then((response) => {
                setIsSuccess(true);
                fetchData();
                onOpenChange(false);
                setFormData({
                    fk_movimiento: {},
                    fk_parte_evento: {},
                    repeticiones: "",
                    orden: ""
                });
                setMessage('MovimientoParte Registrado Con Éxito');
            });
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setIsSuccess(false);
            setMessage('MovimientoParte No Registrado');
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>Registrar MovimientoParte</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">
                                Registrar MovimientoParte
                            </ModalHeader>
                            <ModalBody>
                                <Select
                                    label="Movimiento"
                                    placeholder="Selecciona un movimiento"
                                    onChange={(e) => handleSelectMovimientoChange(e.target.value)}
                                    value={formData.fk_movimiento.id || ""}
                                >
                                    {movimientos.map((movimiento) => (
                                        <SelectItem key={movimiento.id} value={movimiento.id}>
                                            {movimiento.nombre}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {formErrors.fk_movimiento && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Movimiento Requerido
                                    </div>
                                )}
                                <Select
                                    label="Parte del Evento"
                                    placeholder="Selecciona una parte del evento"
                                    onChange={(e) => handleSelectParteEventoChange(e.target.value)}
                                    value={formData.fk_parte_evento.id || ""}
                                >
                                    {parteEventos.map((parteEvento) => (
                                        <SelectItem key={parteEvento.id} value={parteEvento.id}>
                                            {parteEvento.fk_evento.nombre}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {formErrors.fk_parte_evento && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Parte del Evento Requerida
                                    </div>
                                )}
                                <Input
                                    label="Repeticiones"
                                    placeholder="Ingrese repeticiones"
                                    variant="bordered"
                                    name="repeticiones"
                                    value={formData.repeticiones}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Orden"
                                    placeholder="Ingrese orden"
                                    variant="bordered"
                                    name="orden"
                                    value={formData.orden}
                                    onChange={handleChange}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onClick={handleSubmit}>
                                    Registrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <SweetAlert type={isSuccess ? 'success' : 'error'} message={message}/>
        </div>
    );
}

export default RegistrarMovimientoParte;

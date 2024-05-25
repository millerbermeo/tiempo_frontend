import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { SweetAlert } from '../../../configs/SweetAlert';
import axiosClient from '../../../configs/axiosClient';
import { EditIcon } from '../../iconos/EditIcon';




export const ActualizarParteEvento = ({ fetchData, parteEvento }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSuccess, setIsSuccess] = useState(null);
    const [message, setMessage] = useState(null);
    const [eventos, setEventos] = useState([]);

    const [formErrors, setFormErrors] = useState({
        fk_evento: false,
        orden: false,
        timecap: false,
        descanso: false
    });

    const [formData, setFormData] = useState({
        fk_evento: parteEvento.fk_evento.id,
        orden: parteEvento.orden,
        timecap: parteEvento.timecap,
        descanso: parteEvento.descanso
    });

    const fetchEventos = async () => {
        try {
            const response = await axiosClient.get('evento/');
            setEventos(response.data);
        } catch (error) {
            console.error('Error fetching eventos:', error);
        }
    };

    useEffect(() => {
        fetchEventos();
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

    const handleSelectChange = (value) => {
        setFormData({
            ...formData,
            fk_evento: value
        });
        setFormErrors({
            ...formErrors,
            fk_evento: false
        });
    };

    const handleSubmit = async () => {
        setIsSuccess(null);
        setMessage('');

        const newFormErrors = {};

        if (!formData.fk_evento) {
            newFormErrors.fk_evento = true;
        }
        if (!formData.orden) {
            newFormErrors.orden = true;
        }
        if (!formData.timecap) {
            newFormErrors.timecap = true;
        }
        if (!formData.descanso) {
            newFormErrors.descanso = true;
        }

        if (Object.keys(newFormErrors).length > 0) {
            setFormErrors(newFormErrors);
            return;
        }

        const selectedEvento = eventos.find(evento => evento.id === parseInt(formData.fk_evento));

        if (!selectedEvento) {
            alert('Seleccione un evento válido');
            return;
        }

        try {
            await axiosClient.put(`parteEvento/${parteEvento.id}/`, {
                fk_evento: {
                    nombre: selectedEvento.nombre,
                    fk_categoria: selectedEvento.fk_categoria,
                    fk_tipoEvento: selectedEvento.fk_tipoEvento,
                    cantidadPartes: selectedEvento.cantidadPartes,
                    date_start: selectedEvento.date_start
                },
                orden: formData.orden,
                timecap: formData.timecap,
                descanso: formData.descanso
            }).then((response) => {
                setIsSuccess(true);
                fetchData();
                onOpenChange(false);
                setMessage('Parte de Evento Actualizada Con Éxito');
            });
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setIsSuccess(false);
            setMessage('Parte de Evento No Actualizada');
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="transparent" onPress={onOpen}>
                <EditIcon />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Actualizar Parte de Evento</ModalHeader>
                            <ModalBody>
                                <select
                                    label="Evento"
                                    placeholder="Selecciona un evento"
                                    onChange={(e) => handleSelectChange(e.target.value)}
                                    value={formData.fk_evento}
                                    className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    <option value="">Selecciona un evento</option>
                                    {eventos.map((evento) => (
                                        <option key={evento.id} value={evento.id}>
                                            {evento.nombre}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.fk_evento && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Evento Requerido
                                    </div>
                                )}

                                <Input
                                    type="number"
                                    label="Orden"
                                    placeholder="Enter orden"
                                    variant="bordered"
                                    name="orden"
                                    value={formData.orden}
                                    onChange={handleChange}
                                />
                                {formErrors.orden && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Orden Requerido
                                    </div>
                                )}

                                <Input
                                    type="text"
                                    label="Timecap"
                                    placeholder="Enter timecap"
                                    variant="bordered"
                                    name="timecap"
                                    value={formData.timecap}
                                    onChange={handleChange}
                                />
                                {formErrors.timecap && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Timecap Requerido
                                    </div>
                                )}

                                <Input
                                    type="number"
                                    label="Descanso"
                                    placeholder="Enter descanso"
                                    variant="bordered"
                                    name="descanso"
                                    value={formData.descanso}
                                    onChange={handleChange}
                                />
                                {formErrors.descanso && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Descanso Requerido
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>Cerrar</Button>
                                <Button color="primary" onClick={handleSubmit}>Actualizar</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <SweetAlert type={isSuccess ? 'success' : 'error'} message={message}/>
        </div>
    );
}

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { SweetAlert } from '../../configs/SweetAlert';
import axiosClient from '../../configs/axiosClient';
import { EditIcon } from '../iconos/EditIcon';

export const ActualizarCompeticion = ({ fetchData, competicion }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSuccess, setIsSuccess] = useState(null);
    const [message, setMessage] = useState(null);

    const [formErrors, setFormErrors] = useState({
        nombre: false,
        state: false,
    });

    const [formData, setFormData] = useState({
        nombre: competicion.nombre,
        state: competicion.state
    });

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

    const handleSubmit = async () => {
        setIsSuccess(null);
        setMessage('');

        const newFormErrors = {};

        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                newFormErrors[key] = true;
            }
        });

        if (Object.keys(newFormErrors).length > 0) {
            setFormErrors(newFormErrors);
            return;
        }

        try {
            await axiosClient.put(`competicion/${competicion.id}`, formData).then(() => {
                fetchData();
            });

            setIsSuccess(true);
            onOpenChange(false);
            setMessage('Competición Actualizada Con Éxito');
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setIsSuccess(false);
            setMessage('Competición No Actualizada');
        }
    };

    return (
        <div className="flex flex-col gap-2">
           <div>
           <Button color="transparent" onPress={onOpen}>
                <EditIcon />
            </Button>
           </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Actualizar Competición</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Nombre"
                                    placeholder="Enter nombre"
                                    variant="bordered"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                                {formErrors.nombre && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Nombre Requerido
                                    </div>
                                )}
                                <Input
                                    label="Estado"
                                    placeholder="Enter estado (true/false)"
                                    variant="bordered"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                                {formErrors.state && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Estado Requerido
                                    </div>
                                )}
                                {/* <Input
                                    type='date'
                                    label="Fecha de Creación"
                                    placeholder="Enter fecha de creación"
                                    variant="bordered"
                                    name="date_created"
                                    value={formData.date_created}
                                    onChange={handleChange}
                                />
                                {formErrors.date_created && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Fecha de Creación Requerida
                                    </div>
                                )}
                                <Input
                                    type='date'
                                    label="Fecha de Finalización"
                                    placeholder="Enter fecha de finalización"
                                    variant="bordered"
                                    name="date_finished"
                                    value={formData.date_finished}
                                    onChange={handleChange}
                                />
                                {formErrors.date_finished && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Fecha de Finalización Requerida
                                    </div>
                                )} */}
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

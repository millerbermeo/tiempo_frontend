import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { SweetAlert } from '../../configs/SweetAlert';
import axiosClient from '../../configs/axiosClient';
import { EditIcon } from '../iconos/EditIcon';

export const ActualizarCategoria = ({ fetchData, categoria }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSuccess, setIsSuccess] = useState(null);
    const [message, setMessage] = useState(null);
    const [competencias, setCompetencias] = useState([]);

    const [formErrors, setFormErrors] = useState({
        nombre: false,
        fk_competencia: false
    });

    const [formData, setFormData] = useState({
        nombre: categoria.nombre,
        fk_competencia: categoria.fk_competencia.nombre
    });

    const fetchCompetencias = async () => {
        try {
            const response = await axiosClient.get('competicion/');
            setCompetencias(response.data);
        } catch (error) {
            console.error('Error fetching competencias:', error);
        }
    };

    useEffect(() => {
        fetchCompetencias();
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
            fk_competencia: value
        });
        setFormErrors({
            ...formErrors,
            fk_competencia: false
        });
    };

    const handleSubmit = async () => {
        setIsSuccess(null);
        setMessage('');

        const newFormErrors = {};

        if (!formData.nombre) {
            newFormErrors.nombre = true;
        }
        if (!formData.fk_competencia) {
            newFormErrors.fk_competencia = true;
        }

        if (Object.keys(newFormErrors).length > 0) {
            setFormErrors(newFormErrors);
            return;
        }

        const selectedCompetencia = competencias.find(comp => comp.nombre === formData.fk_competencia);

        try {
            await axiosClient.put(`categoria/${categoria.id}/`, {
                nombre: formData.nombre,
                fk_competencia: {
                    nombre: selectedCompetencia.nombre,
                    state: selectedCompetencia.state
                }
            }).then((response) => {
                setIsSuccess(true);
                fetchData();
                onOpenChange(false);
                setMessage('Categoría Actualizada Con Éxito');
            });
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setIsSuccess(false);
            setMessage('Categoría No Actualizada');
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
                            <ModalHeader className="flex flex-col gap-1 text-center">Actualizar Categoría</ModalHeader>
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
                                <select
                                    label="Competencia"
                                    placeholder="Selecciona una competencia"
                                    onChange={(e) => handleSelectChange(e.target.value)}
                                    value={formData.fk_competencia}
                                    className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    <option value="">Selecciona una competencia</option>
                                    {competencias.map((comp) => (
                                        <option key={comp.id} value={comp.nombre}>
                                            {comp.nombre}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.fk_competencia && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Competencia Requerida
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

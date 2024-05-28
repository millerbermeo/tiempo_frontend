import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from '../iconos/PlusIcon';
import { SweetAlert } from '../../configs/SweetAlert';
import axiosClient from '../../configs/axiosClient';

export const RegistrarEvento = ({ fetchData }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isSuccess, setIsSuccess] = useState(null);
    const [message, setMessage] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [tiposEvento, setTiposEvento] = useState([]);

    const [formErrors, setFormErrors] = useState({
        nombre: false,
        fk_categoria: false,
        fk_tipoEvento: false,
        cantidadPartes: false,
        date_start: false
    });

    const [formData, setFormData] = useState({
        nombre: "",
        fk_categoria: "",
        fk_tipoEvento: "",
        cantidadPartes: "",
        date_start: ""
    });

    const fetchCategorias = async () => {
        try {
            const response = await axiosClient.get('categoria/');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error fetching categorias:', error);
        }
    };

    const fetchTiposEvento = async () => {
        try {
            const response = await axiosClient.get('tipoevento/');
            setTiposEvento(response.data);
        } catch (error) {
            console.error('Error fetching tipos de evento:', error);
        }
    };

    useEffect(() => {
        fetchCategorias();
        fetchTiposEvento();
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

    const handleSelectChange = (event) => {
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
            await axiosClient.post('evento/', {
                nombre: formData.nombre,
                fk_categoria: formData.fk_categoria,
                fk_tipoEvento: formData.fk_tipoEvento,
                cantidadPartes: formData.cantidadPartes,
                date_start: formData.date_start
            });
            setIsSuccess(true);
            fetchData();
            onOpenChange(false);
            setFormData({
                nombre: "",
                fk_categoria: "",
                fk_tipoEvento: "",
                cantidadPartes: "",
                date_start: ""
            });
            setMessage('Evento Registrado Con Éxito');
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setIsSuccess(false);
            if (error.response && error.response.data) {
                setMessage(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
                setMessage('Evento No Registrado');
            }
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>Registrar Evento</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">
                                Registrar Evento
                            </ModalHeader>
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
                                    name="fk_categoria"
                                    label="Categoría"
                                    placeholder="Selecciona una categoría"
                                    onChange={handleSelectChange}
                                    value={formData.fk_categoria}
                                    className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categorias.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nombre}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.fk_categoria && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Categoría Requerida
                                    </div>
                                )}

                                <select
                                    name="fk_tipoEvento"
                                    label="Tipo de Evento"
                                    placeholder="Selecciona un tipo de evento"
                                    onChange={handleSelectChange}
                                    value={formData.fk_tipoEvento}
                                    className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    <option value="">Selecciona un tipo de evento</option>
                                    {tiposEvento.map((tipo) => (
                                        <option key={tipo.id} value={tipo.id}>
                                            {tipo.tipo}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.fk_tipoEvento && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Tipo de Evento Requerido
                                    </div>
                                )}

                                <Input
                                    type="number"
                                    label="Cantidad de Participantes"
                                    placeholder="Enter cantidad de participantes"
                                    variant="bordered"
                                    name="cantidadPartes"
                                    value={formData.cantidadPartes}
                                    onChange={handleChange}
                                />
                                {formErrors.cantidadPartes && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Cantidad de Participantes Requerida
                                    </div>
                                )}

                                <Input
                                    type="date"
                                    label="Fecha de Inicio"
                                    placeholder="Enter fecha de inicio"
                                    variant="bordered"
                                    name="date_start"
                                    value={formData.date_start}
                                    onChange={handleChange}
                                />
                                {formErrors.date_start && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Fecha de Inicio Requerida
                                    </div>
                                )}
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
};

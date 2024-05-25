import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { SweetAlert } from '../../configs/SweetAlert';
import axiosClient from '../../configs/axiosClient';
import { EditIcon } from '../iconos/EditIcon';

export const ActualizarEvento = ({ fetchData, evento }) => {
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
        nombre: evento.nombre,
        fk_categoria: evento.fk_categoria.nombre,
        fk_tipoEvento: evento.fk_tipoEvento.tipo,
        cantidadPartes: evento.cantidadPartes,
        date_start: evento.date_start
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

    const handleSelectChange = (name, value) => {
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

        const selectedCategoria = categorias.find(cat => cat.nombre === formData.fk_categoria);
        const selectedTipoEvento = tiposEvento.find(tipo => tipo.tipo === formData.fk_tipoEvento);

        try {
            await axiosClient.put(`evento/${evento.id}/`, {
                nombre: formData.nombre,
                fk_categoria: {
                    nombre: selectedCategoria.nombre,
                    fk_competencia: selectedCategoria.fk_competencia
                },
                fk_tipoEvento: {
                    tipo: selectedTipoEvento.tipo
                },
                cantidadPartes: formData.cantidadPartes,
                date_start: formData.date_start
            }).then((response) => {
                setIsSuccess(true);
                fetchData();
                onOpenChange(false);
                setMessage('Evento Actualizado Con Éxito');
            });
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setIsSuccess(false);
            setMessage('Evento No Actualizado');
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
                            <ModalHeader className="flex flex-col gap-1 text-center">Actualizar Evento</ModalHeader>
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
                                    label="Categoría"
                                    placeholder="Selecciona una categoría"
                                    onChange={(e) => handleSelectChange('fk_categoria', e.target.value)}
                                    value={formData.fk_categoria}
                                    className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categorias.map((cat) => (
                                        <option key={cat.id} value={cat.nombre}>
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
                                    label="Tipo de Evento"
                                    placeholder="Selecciona un tipo de evento"
                                    onChange={(e) => handleSelectChange('fk_tipoEvento', e.target.value)}
                                    value={formData.fk_tipoEvento}
                                    className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    <option value="">Selecciona un tipo de evento</option>
                                    {tiposEvento.map((tipo) => (
                                        <option key={tipo.id} value={tipo.tipo}>
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

import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Select, SelectItem, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from '../iconos/PlusIcon';
import { SweetAlert } from '../../configs/SweetAlert';
import axiosClient from '../../configs/axiosClient';

const RegistrarUsuariosEvento = ({ fetchData }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isSuccess, setIsSuccess] = useState(null);
    const [message, setMessage] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [eventos, setEventos] = useState([]);

    const [formErrors, setFormErrors] = useState({
        fk_user: false,
        fk_evento: false
    });

    const [formData, setFormData] = useState({
        fk_user: "",
        fk_evento: "",
        conteo_reps: "",
        date_start: "",
        date_end: ""
    });

    const fetchUsuarios = async () => {
        try {
            const response = await axiosClient.get('usuarios/');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error fetching usuarios:', error);
        }
    };

    const fetchEventos = async () => {
        try {
            const response = await axiosClient.get('eventos/');
            setEventos(response.data);
        } catch (error) {
            console.error('Error fetching eventos:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
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

    const handleSelectUserChange = (value) => {
        setFormData({
            ...formData,
            fk_user: value
        });
        setFormErrors({
            ...formErrors,
            fk_user: false
        });
    };

    const handleSelectEventoChange = (value) => {
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

        if (!formData.fk_user) {
            newFormErrors.fk_user = true;
        }
        if (!formData.fk_evento) {
            newFormErrors.fk_evento = true;
        }

        if (Object.keys(newFormErrors).length > 0) {
            setFormErrors(newFormErrors);
            return;
        }

        try {
            await axiosClient.post('usuariosEvento/', {
                fk_user: formData.fk_user,
                fk_evento: formData.fk_evento,
                conteo_reps: formData.conteo_reps,
                date_start: formData.date_start,
                date_end: formData.date_end
            }).then((response) => {
                setIsSuccess(true);
                fetchData();
                onOpenChange(false);
                setFormData({
                    fk_user: "",
                    fk_evento: "",
                    conteo_reps: "",
                    date_start: "",
                    date_end: ""
                });
                setMessage('UsuariosEvento Registrado Con Éxito');
            });
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setIsSuccess(false);
            setMessage('UsuariosEvento No Registrado');
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>Registrar UsuariosEvento</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">
                                Registrar UsuariosEvento
                            </ModalHeader>
                            <ModalBody>
                                <Select
                                    label="Usuario"
                                    placeholder="Selecciona un usuario"
                                    onChange={(e) => handleSelectUserChange(e.target.value)}
                                    value={formData.fk_user}
                                >
                                    {usuarios.map((user) => (
                                        <SelectItem key={user.id} value={user.id}>
                                            {user.username}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {formErrors.fk_user && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Usuario Requerido
                                    </div>
                                )}
                                <Select
                                    label="Evento"
                                    placeholder="Selecciona un evento"
                                    onChange={(e) => handleSelectEventoChange(e.target.value)}
                                    value={formData.fk_evento}
                                >
                                    {eventos.map((evento) => (
                                        <SelectItem key={evento.id} value={evento.id}>
                                            {evento.nombre}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {formErrors.fk_evento && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Evento Requerido
                                    </div>
                                )}
                                <Input
                                    label="Conteo Reps"
                                    placeholder="Ingrese conteo reps"
                                    variant="bordered"
                                    name="conteo_reps"
                                    value={formData.conteo_reps}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Fecha Inicio"
                                    placeholder="Ingrese fecha de inicio"
                                    variant="bordered"
                                    name="date_start"
                                    value={formData.date_start}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Fecha Fin"
                                    placeholder="Ingrese fecha de fin"
                                    variant="bordered"
                                    name="date_end"
                                    value={formData.date_end}
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

export default RegistrarUsuariosEvento;

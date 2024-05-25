import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from '../iconos/PlusIcon';
import { SweetAlert } from '../../configs/SweetAlert';
import axiosClient from '../../configs/axiosClient';

export const RegistrarUsuario = ({ fetchData }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isSuccess, setIsSuccess] = useState(null);
    const [message, setMessage] = useState(null);

    const [formErrors, setFormErrors] = useState({
        username: false,
        password: false,
        Edad_persona: false,
        Telefono_persona: false
    });

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        Edad_persona: "",
        Telefono_persona: ""
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
            await axiosClient.post('auth/register/', formData).then((response) => {
                setIsSuccess(true);
                // fetchData();
                onOpenChange(false);
                setFormData({
                    username: "",
                    password: "",
                    Edad_persona: "",
                    Telefono_persona: ""
                });
                setMessage('Usuario Registrado Con Éxito');
            });
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setIsSuccess(false);
            setMessage('Usuario No Registrado');
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>Registrar Usuario</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">
                                Registrar Usuario
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Username"
                                    placeholder="Enter username"
                                    variant="bordered"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                {formErrors.username && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Username Requerido
                                    </div>
                                )}

                                <Input
                                    type="password"
                                    label="Password"
                                    placeholder="Enter password"
                                    variant="bordered"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {formErrors.password && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Password Requerido
                                    </div>
                                )}

                                <Input
                                    type="number"
                                    label="Edad"
                                    placeholder="Enter edad"
                                    variant="bordered"
                                    name="Edad_persona"
                                    value={formData.Edad_persona}
                                    onChange={handleChange}
                                />
                                {formErrors.Edad_persona && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Edad Requerida
                                    </div>
                                )}

                                <Input
                                    type="tel"
                                    label="Teléfono"
                                    placeholder="Enter teléfono"
                                    variant="bordered"
                                    name="Telefono_persona"
                                    value={formData.Telefono_persona}
                                    onChange={handleChange}
                                />
                                {formErrors.Telefono_persona && (
                                    <div className='text-lg font-normal w-full bg-red-600 text-white px-2 py-0.5 my- rounded'>
                                        Teléfono Requerido
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
}

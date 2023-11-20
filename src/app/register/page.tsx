"use client"

import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import FormField from '@/components/FormField';
import { Solicitudes } from '../../../common.types';
import CustomMenu from '@/components/CustomMenu';
import { modelHyundaiFilters, SINO } from '../../constants';
import Button from '@/components/Button';
import { createSolicitudRegister } from '@/lib/actions';
type Props = {
    type: string,
    sol?: Solicitudes
}

const RegisterMember = ({ type, sol }: Props) => {
    const router = useRouter()

    const [form, setForm] = useState<Solicitudes>({
        dni: sol?.dni || "",
        nombre: sol?.nombre || "",
        apellidos: sol?.apellidos || "",
        correoElectronico: sol?.correoElectronico || "",
        celular: sol?.celular || "",
        fechaNacimiento: sol?.fechaNacimiento,
        facebookUrl: sol?.facebookUrl || "",
        Provincia: sol?.Provincia || "",
        Distrito: sol?.Distrito || "",
        ModeloHyundai: sol?.ModeloHyundai || "",
        AnoFab: sol?.AnoFab || "",
        Placa: sol?.Placa || "",
        VehiculoPropio: sol?.VehiculoPropio || false,
        NombrePropietarios: sol?.NombrePropietarios || "",
        ParentescoPropetario: sol?.ParentescoPropetario || "",
        MantenimientoConcesionarios: sol?.MantenimientoConcesionarios || false
    })

    const handleStateChangeBoolean = (fieldName: keyof Solicitudes, value: Boolean) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };
    const handleStateChange = (fieldName: keyof Solicitudes, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true)
        try {
            var response = await createSolicitudRegister(form)
            console.log(response);
            router.push("/thanks-register")
        } catch (error) {
            console.log(error);
            alert(`Ocurrio un error al registrar!`);
        } finally {
            setSubmitting(false)
        }
    }

    return <>
        <div className='flexCenter  p-2 m-2 text-5xl'>
            <br />
            <h1>¡Se un nuevo miembro!</h1>
        </div>

        <form
            onSubmit={handleFormSubmit}
            className=" form pb-20">

            <FormField
                title="DNI"
                state={form.dni}
                type={"number"}
                placeholder="Ingresa tu numero de DNI"
                setState={(value) => handleStateChange('dni', value)}
            />
            <FormField
                title="Nombres"
                state={form.nombre}
                placeholder="Ingresa tus nombres"
                setState={(value) => handleStateChange('nombre', value)}
            />
            <FormField
                title="Apellidos"
                state={form.apellidos}
                placeholder="Ingresa tus apellidos"
                setState={(value) => handleStateChange('apellidos', value)}
            />
            <FormField
                title="Correo Electronico"
                type={"email"}
                state={form.correoElectronico}
                placeholder="Ingresa tú email"
                setState={(value) => handleStateChange('correoElectronico', value)}
            />
            <FormField
                title="Número de Celular"
                type={"number"}
                state={form.celular}
                placeholder="Ingresa tú número de celular"
                setState={(value) => handleStateChange('celular', value)}
            />

            <FormField
                title="Fecha de Nacimiento"
                type={"date"}
                state={form.fechaNacimiento}
                setState={(value) => handleStateChange('fechaNacimiento', value)}
            />
            <FormField
                title="Facebook URL"
                type={"text"}
                state={form.facebookUrl}
                placeholder="Ingresa link de perfil de facebook"
                setState={(value) => handleStateChange('facebookUrl', value)}
            />

            <FormField
                title="Provincia"
                type={"text"}
                state={form.Provincia}
                placeholder="Ingresa la provincia donde resides"
                setState={(value) => handleStateChange('Provincia', value)}
            />

            <FormField
                title="Distrito"
                type={"text"}
                state={form.Distrito}
                placeholder="Ingresa el distrito donde resides"
                setState={(value) => handleStateChange('Distrito', value)}
            /> <br />
            <CustomMenu
                title="Marca/Modelo"
                state={form.ModeloHyundai}
                filters={modelHyundaiFilters}
                setState={(value) => handleStateChangeBoolean('ModeloHyundai', value.toLowerCase() === 'true')}
            />

            <FormField
                title="Año de Fabricación"
                type={"number"}
                state={form.AnoFab}
                placeholder="Ingresa el Año de Fabricación"
                setState={(value) => handleStateChange('AnoFab', value)}
            />

            <FormField
                title="Placa"
                type={"text"}
                state={form.Placa}
                placeholder="ABC-222"
                setState={(value) => handleStateChange('Placa', value)}
            /> <br />

 
            <CustomMenu
                title="Vehiculo Propio"
                state={form.VehiculoPropio}
                filters={SINO}
                setState={(value) => handleStateChangeBoolean('VehiculoPropio',  value.toLowerCase() === 'true')}
            />  

            <FormField
                title="Nombre de Propietario"
                type={"text"}
                state={form.NombrePropietarios}
                placeholder="Nombre de propietario"
                setState={(value) => handleStateChange('NombrePropietarios', value)}
            />


            <FormField
                title="Parentesco Propietario"
                type={"text"}
                state={form.ParentescoPropetario}
                placeholder="Parentesco del propietario"
                setState={(value) => handleStateChange('ParentescoPropetario', value)}
            /> <br />

             <CustomMenu
                title="Mantenimiento Concesionario"
                state={form.MantenimientoConcesionarios.toString()}
                filters={SINO}
                setState={(value) => handleStateChangeBoolean('MantenimientoConcesionarios',  value.toLowerCase() === 'true')}
            /> 

            <br />
            <div className="flexCenter w-full">
                <Button
                    title={"Crear Solicitud"}
                    type="submit"
                    leftIcon={submitting ? "" : ""}
                    submitting={submitting}
                />
            </div>
        </form>

    </>;
};

export default RegisterMember;
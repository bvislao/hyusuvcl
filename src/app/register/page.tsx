"use client";

import Image from "next/image";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import { Solicitudes } from "../../../common.types";
import CustomMenu from "@/components/CustomMenu";
import { modelHyundaiFilters, SINO } from "../../constants";
import Button from "@/components/Button";
import {createSolicitudRegister, validarSolicitudRegister} from "@/lib/actions";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { toast } from "react-toastify";


const RegisterMember = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const captchaRef = useRef(null);

  const [form, setForm] = useState<Solicitudes>({
    id: "0000",
    dni: "",
    nombre: "",
    apellidos: "",
    correoElectronico: "",
    celular: "",
    fechaNacimiento: "",
    facebookUrl: "",
    Provincia: "",
    Distrito: "",
    ModeloHyundai: "",
    AnoFab: "",
    Placa: "",
    VehiculoPropio: "NO",
    NombrePropietarios: "",
    ParentescoPropetario: "",
    MantenimientoConcesionarios: "NO",
    estadoAtendido: false,
    fechaRegistro: new Date(Date.now()),
  });

  const handleStateChange = (fieldName: keyof Solicitudes, value: string) => {

    if (fieldName == "VehiculoPropio") {
      if (value == "SI") {
        setForm((prevForm) => ({
          ...prevForm,
          ["NombrePropietarios"]: form?.nombre + " " + form?.apellidos,
        }));
        setForm((prevForm) => ({
          ...prevForm,
          ["ParentescoPropetario"]: "Titular",
        }));
      } else {
        setForm((prevForm) => ({ ...prevForm, ["NombrePropietarios"]: "" }));
        setForm((prevForm) => ({ ...prevForm, ["ParentescoPropetario"]: "" }));
      }
    }
    if (fieldName == "nombre" || fieldName == "apellidos") {
      setForm((prevForm) => ({ ...prevForm, ["VehiculoPropio"]: "NO" }));
      setForm((prevForm) => ({ ...prevForm, ["NombrePropietarios"]: "" }));
      setForm((prevForm) => ({ ...prevForm, ["ParentescoPropetario"]: "" }));
    }
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onExpire = () => {
    console.log("hCaptcha Token Expired");
  };

  const onError = (err: any) => {
    //console.log(`hCaptcha Error: ${err}`);
    console.log(`hCaptcha Error`);
  };

  useEffect(() => {
    if (token != "") {
      // Token is set, can submit here
      //console.log(`hCaptcha Token: ${token}`);
      console.log(`hCaptcha Token: already set`);
    }
  }, [token, form]);

  const onVerifyCaptcha = (token: string) => {
    setToken(token);
  };

  const submitCaptcha = () => {};

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      //validate Token Captcha

      if (token == "" || token == null || token == undefined) {
        toast('Captcha invalido', { hideProgressBar: true, autoClose: 2000, type: 'error' })
        setSubmitting(false);
        return;
      }
      //validate also dni email and placa no exists
      var validar = await validarSolicitudRegister(form);
      if(validar > 0){
        toast('Se encontro coincidencias con otra solicitud, valide la información ingresada.', { hideProgressBar: true, autoClose: 2000, type: 'warning' })
        setSubmitting(false);
        return;
      }

      var response = await createSolicitudRegister(form);
      console.log(response);
      if(response == null){
        toast('Ocurrio un error al registrar la solicitud.', { hideProgressBar: true, autoClose: 2000, type: 'error' })
        setSubmitting(false);
        return;
      }else{
        toast('Se registro la solicitud correctamente.', { hideProgressBar: true, autoClose: 2000, type: 'success' })
        setSubmitting(false);
        //router.push("/thanks-register");
      }
    } catch (error) {
      toast('Ocurrio un error al registrar la solicitud.', { hideProgressBar: true, autoClose: 2000, type: 'error' })
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flexCenter  p-2 m-2 text-5xl">
        <br />
        <h1>&#128073;¡Sé un nuevo miembro! &#128526;</h1>
        <br />
      </div>
      <div className="flexCenter  p-2 m-2 text-sm">
        <span className="text-cyan-700">
          Llena todos los datos requeridos para validar tu información y ser
          parte de está gran familia.
        </span>
      </div>
      <form onSubmit={handleFormSubmit} className="form p-2 mb-4">
        <FormField
          title="Documento de Identidad"
          state={form.dni}
          type={"text"}
          maxLength={12}
          placeholder="Ingresa tu numero de documento"
          setState={(value) => handleStateChange("dni", value)}
        />
        <FormField
          title="Nombres"
          state={form.nombre}
          placeholder="Ingresa tus nombres"
          setState={(value) => handleStateChange("nombre", value)}
        />
        <FormField
          title="Apellidos"
          state={form.apellidos}
          placeholder="Ingresa tus apellidos"
          setState={(value) => handleStateChange("apellidos", value)}
        />
        <FormField
          title="Correo Electronico"
          type={"email"}
          state={form.correoElectronico}
          placeholder="Ingresa tú email"
          setState={(value) => handleStateChange("correoElectronico", value)}
        />
        <FormField
          title="Número de Celular"
          type={"number"}
          state={form.celular}
          placeholder="Ingresa tú número de celular"
          setState={(value) => handleStateChange("celular", value)}
        />
        <FormField
          title="Fecha de Nacimiento"
          type={"date"}
          state={form.fechaNacimiento.toString()}
          setState={(value) => handleStateChange("fechaNacimiento", value)}
          placeholder={""}
        />
        <FormField
          title="Facebook Perfil"
          type={"text"}
          state={form.facebookUrl}
          placeholder="Ingresa Nombre de perfil de facebook"
          setState={(value) => handleStateChange("facebookUrl", value)}
        />
        <FormField
          title="Provincia"
          type={"text"}
          state={form.Provincia}
          placeholder="Ingresa la provincia donde resides"
          setState={(value) => handleStateChange("Provincia", value)}
        />
        <FormField
          title="Distrito"
          type={"text"}
          state={form.Distrito}
          placeholder="Ingresa el distrito donde resides"
          setState={(value) => handleStateChange("Distrito", value)}
        />
        <br />
        <CustomMenu
          title="Marca/Modelo"
          state={form.ModeloHyundai}
          filters={modelHyundaiFilters}
          setState={(value) => handleStateChange("ModeloHyundai", value)}
        />
        <br />
        <FormField
          title="Año de Fabricación"
          type={"text"}
          maxLength={4}
          state={form.AnoFab}
          placeholder="Ingresa el Año de Fabricación"
          setState={(value) => handleStateChange("AnoFab", value)}
        />
        <FormField
          title="Placa"
          type={"text"}
          setMask={true}
          mask={"___-___"}
          state={form.Placa}
          placeholder="___-___"
          setState={(value) => handleStateChange("Placa", value)}
        />
        <br />
        <CustomMenu
          title="Vehiculo Propio"
          state={form.VehiculoPropio.toString()}
          filters={SINO}
          setState={(value) => handleStateChange("VehiculoPropio", value)}
        />
        <br />
        <FormField
          title="Nombre de Propietario"
          type={"text"}
          state={form.NombrePropietarios}
          placeholder="Nombre de propietario"
          setState={(value) => handleStateChange("NombrePropietarios", value)}
        />
        <FormField
          title="Parentesco Propietario"
          type={"text"}
          state={form.ParentescoPropetario}
          placeholder="Parentesco del propietario"
          setState={(value) => handleStateChange("ParentescoPropetario", value)}
        />{" "}
        <br />
        <CustomMenu
          title="Mantenimiento Concesionario"
          state={form.MantenimientoConcesionarios.toString()}
          filters={SINO}
          setState={(value) =>
            handleStateChange("MantenimientoConcesionarios", value)
          }
        />
        <br />
        <div className="flexCenter w-full">
          <HCaptcha
            // This is testing sitekey, will autopass
            // Make sure to replace
            sitekey="7d4d941c-bd98-413f-ad45-ab7880964ff5"
            onVerify={onVerifyCaptcha}
            onError={onError}
            onExpire={onExpire}
            ref={captchaRef}
          />
        </div>
        <br />
        <div className="flexCenter w-full">
          <Button
            title={"Enviar Solicitud"}
            type="submit"
            leftIcon={submitting ? "/loading.svg" : "/plus.svg"}
            submitting={submitting}
          />
        </div>
      </form>
    </>
  );
};

export default RegisterMember;

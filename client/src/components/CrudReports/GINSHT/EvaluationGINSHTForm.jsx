
import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import InputNumberField from '../../FormFields/InputNumberField';
import SelectField from '../../FormFields/SelectField';
import RadioInputField from '../../FormFields/RadioInputField';
import { FormikCheckbox } from '../../FormFields/FormikCheckbox';
import InputField from '../../FormFields/InputField';

export default function EvaluationGINSHTForm(props) {
    const { values, setFieldValue } = useFormikContext();
    const {valueAltura, setValueAltura} = useState(2);
    const {valueSeparacion, setValueSeparacion} = useState(0);
    const [valueImage, setValueImage] = useState('/GINSHT/2.png');

    const {
        formField: {
            pesoRealManejado,
            duracionTarea,
            posturaLevantamiento,
            alturaLevantamiento,
            separacionLevantamiento,
            desplazamientoVertical,
            giroDelTronco,
            tipoDeAgarre,
            duracionManipulacion,
            frecuenciaDeManipulacion,
            numeroDeDesplazamientos,
            distanciaDeDesplazamientos,
            indicaciones
        }
    } = props;

    const handleChangeFrecuencia = (event) => {
        const selectedRadioValue = event.target.value;
        setFieldValue('frecuenciaDeManipulacionRadio', selectedRadioValue);

        let valores = [
            [1, 0.95, 0.85],
            [0.94, 0.88, 0.75],
            [0.84, 0.72, 0.45],
            [0.52, 0.30, 0.0],
            [0.37, 0.0, 0.0],
            [0.0, 0.0, 0.0]
        ];

        const selectedValueIndex = parseInt(selectedRadioValue, 10);
        const duracionDeManipulacionIndex = parseInt(values.duracionManipulacion, 10);

        if (duracionDeManipulacionIndex >= 0 && duracionDeManipulacionIndex < valores[0].length) {
            const valorSeleccionado = valores[selectedValueIndex][duracionDeManipulacionIndex];
            setFieldValue('valorFinalFrecuencia', valorSeleccionado);
        }
    };

    const handleChangeSeparacion = (event) => {
        let valores = [
            [13, 19, 25, 20, 14], //TODO: tener en cuenta sexo
            [7, 11, 13, 12, 8]
        ];
        const selectedRadioValue = event.target.value;
        const alturaSelected = parseInt(values.alturaLevantamiento, 10);
        setFieldValue('pesoTeoricoRecomendado', valores[alturaSelected][selectedRadioValue]);
    };

    useEffect(() => {
        let valores = [['/GINSHT/0.png', '/GINSHT/5.png'],
                    ['/GINSHT/1.png', '/GINSHT/6.png'],
                    ['/GINSHT/2.png', '/GINSHT/7.png'],
                    ['/GINSHT/3.png', '/GINSHT/8.png'],
                    ['/GINSHT/4.png', '/GINSHT/9.png']
                ];
        setValueImage(valores[values.alturaLevantamiento][values.separacionLevantamiento]);
    }, [values.alturaLevantamiento, values.separacionLevantamiento]);




    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Datos de la evaluación
            </Typography>
            <Grid container spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={6} spacing={2}>
                    <InputNumberField name={pesoRealManejado.name} label={pesoRealManejado.label} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} spacing={2}>
                    <SelectField
                        name={duracionTarea.name}
                        label={duracionTarea.label}
                        data={[
                            { value: 1, label: '1' },
                            { value: 2, label: '2' },
                            { value: 3, label: '3' },
                            { value: 4, label: '4' },
                            { value: 5, label: '5' },
                            { value: 6, label: '6' },
                            { value: 7, label: '7' },
                            { value: 8, label: '8' }
                        ]}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} spacing={2}>
                    <InputNumberField name={numeroDeDesplazamientos.name} label={numeroDeDesplazamientos.label} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} spacing={2}>
                    <RadioInputField
                        name={posturaLevantamiento.name}
                        label={posturaLevantamiento.label}
                        row
                        data={[
                            { value: '0', label: 'De pie' },
                            { value: '1', label: 'Sentado' }
                        ]}
                    />
                </Grid>
                <Grid item xs={12} sm={6} spacing={2}>
                    <RadioInputField
                        name={distanciaDeDesplazamientos.name}
                        label={distanciaDeDesplazamientos.label}
                        row
                        data={[
                            { value: '0', label: 'Hasta 10 metros' },
                            { value: '1', label: 'Más de 10 metros' }
                        ]}
                    />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Posición de levantamiento
            </Typography>
            <Grid container direction="row" flexWrap={"nowrap"} justifyContent="space-evenly" alignItems="center" spacing={3} paddingBottom={'10px'}>
                <Grid item xs={12} sm={8}>
                    <Box
                        component="img"
                        src={valueImage}
                        alt="Guía de Elevación de Carga"
                        sx={{ maxWidth: '100%', height: 'auto', width: '20vw' }}
                    />
                </Grid>
                <Stack justifyContent="space-evenly" alignItems="center" spacing={3}>
                    <RadioInputField
                        name={alturaLevantamiento.name}
                        label={alturaLevantamiento.label}

                        data={[
                            { value: '0', label: 'Altura de la vista' },
                            { value: '1', label: 'Encima del codo' },
                            { value: '2', label: 'Debajo del codo' },
                            { value: '3', label: 'Altura del muslo' },
                            { value: '4', label: 'Altura de la pantorrilla' }
                        ]}
                    />
                    <RadioInputField
                        name={separacionLevantamiento.name}
                        label={separacionLevantamiento.label}
                        onChange={handleChangeSeparacion}
                        data={[
                            { value: '0', label: 'Carga cerca del cuerpo' },
                            { value: '1', label: 'Carga lejos del cuerpo' }
                        ]}
                    />
                </Stack>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Factores de correción
            </Typography>
            <Stack spacing={2} paddingBottom={'10px'}>

                <RadioInputField
                    name={desplazamientoVertical.name}
                    label={desplazamientoVertical.label}
                    row
                    data={[
                        { value: '1', label: 'Hasta 25 cm' },
                        { value: '0.91', label: 'Hasta 50 cm' },
                        { value: '0.87', label: 'Hasta 100 cm' },
                        { value: '0.84', label: 'Hasta 175 cm' },
                        { value: '0', label: 'Más de 175 cm' }
                    ]}
                />

                <RadioInputField
                    name={giroDelTronco.name}
                    label={giroDelTronco.label}
                    row
                    data={[
                        { value: '1', label: 'Sin giro' },
                        { value: '0.9', label: 'Poco girado (hasta 30º)' },
                        { value: '0.8', label: 'Girado (hasta 60º)' },
                        { value: '0.7', label: 'Muy girado (90º)' }
                    ]}
                />

                <RadioInputField
                    name={tipoDeAgarre.name}
                    label={tipoDeAgarre.label}
                    row
                    data={[
                        { value: '1', label: 'Agarre bueno' },
                        { value: '0.95', label: 'Agarre regular' },
                        { value: '0.9', label: 'Agarre malo' }
                    ]}
                />

                <RadioInputField
                    name={duracionManipulacion.name}
                    label={duracionManipulacion.label}
                    row
                    data={[
                        { value: '0', label: 'Menos de 1 hora al día' },
                        { value: '1', label: 'Entre 1 y 2 horas al día' },
                        { value: '2', label: 'Entre 2 y 8 horas al día' }
                    ]}
                />

                <RadioInputField
                    name={frecuenciaDeManipulacion.name}
                    label={frecuenciaDeManipulacion.label}
                    row
                    onChange={handleChangeFrecuencia}
                    data={[
                        { value: '0', label: '1 vez cada 5 minutos' },
                        { value: '1', label: '1 vez/minuto' },
                        { value: '2', label: '4 veces/minuto' },
                        { value: '3', label: '9 veces/minuto' },
                        { value: '4', label: '12 veces/minuto' },
                        { value: '5', label: 'Más de 15 veces/minuto' },
                    ]}
                />
            </Stack>
            <Typography variant="h5" gutterBottom>
                Factores ergonómicos del puesto
            </Typography>
            <Stack spacing={1} paddingBottom={'10px'}>
                <FormikCheckbox name="listaDeFactoresPuesto" label="Se inclina el tronco al manipular la carga" />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Se ejercen fuerzas de empuje o tracción elevadas." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="El tamaño de la carga es mayor de 60 x 50 x 60 cm ." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Puede ser peligrosa la superficie de la carga." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Se puede desplazar el centro de gravedad." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Se pueden mover las cargas de forma brusca o inesperada." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Son insuficientes las pausas." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Carece el trabajador de autonomía para regular su ritmo de trabajo" />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Se realiza la tarea con el cuerpo en posición inestable." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Son los suelos irregulares o resbaladizos para el calzado del trabajador." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Es insuficiente el espacio de trabajo para una manipulación correcta." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Hay que salvar desniveles del suelo durante la manipulación." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Se realiza la manipulación en condiciones termohigrométricas." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Existen corrientes de aire o ráfagas de viento que puedan desequilibrar la carga." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Es deficiente la iluminación para la manipulación." />
                <FormikCheckbox name="listaDeFactoresPuesto" label="Está expuesto el trabajador a vibraciones." />
            </Stack>
            <Typography variant="h5" gutterBottom>
                Factores ergonómicos del trabajador
            </Typography>
            <Stack spacing={1} paddingBottom={'10px'}>
                <FormikCheckbox name="listaDeFactoresTrabajador" label="La vestimenta o el equipo de protección individual dificultan la manipulación." />
                <FormikCheckbox name="listaDeFactoresTrabajador" label="Es inadecuado el calzado para la manipulación." />
                <FormikCheckbox name="listaDeFactoresTrabajador" label="Carece el trabajador de información sobre el peso de la carga." />
                <FormikCheckbox name="listaDeFactoresTrabajador" label="Carece el trabajador de información sobre el lado más pesado de la carga o sobre su centro de
gravedad (en caso de estar descentrado)." />
                <FormikCheckbox name="listaDeFactoresTrabajador" label="Es el trabajador especialmente sensible al riesgo: mujeres embarazadas, trabajadores con patologías
dorsolumbares, etc." />
                <FormikCheckbox name="listaDeFactoresTrabajador" label="Carece el trabajador de información sobre los riesgos para su salud derivados de la manipulación
manual de cargas." />
                <FormikCheckbox name="listaDeFactoresTrabajador" label="Carece el trabajador de entrenamiento para realizar la manipulación con seguridad." />
            </Stack>
            <Typography variant="h5" gutterBottom>
                Indicaciones
            </Typography>
                    <InputField name={indicaciones.name} multiline rows={7} label={indicaciones.label} fullWidth />
        </React.Fragment>
    );
}

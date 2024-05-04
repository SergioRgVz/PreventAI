import React from 'react';
import { Typography, Stack } from '@mui/material';
import { FormikCheckbox } from '../../FormFields/FormikCheckbox';
export default function EvaluationPVDForm(props) {


    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Datos de la evaluación
            </Typography>
            <Typography variant="h5" gutterBottom>
                Aspectos de la pantalla
            </Typography>

            <Stack spacing={1} paddingBottom={'10px'}>
                <FormikCheckbox name="aspectosPantalla" label="¿La imagen es estable? (Es decir, no parpadea, ni se perciben movimientos o vibraciones indeseables.)" />
                <FormikCheckbox name="aspectosPantalla" label="¿Puede regular fácilmente la inclinación (hacia arriba y hacia abajo) y el giro (hacia los laterales) de la pantalla sobre la peana?" />
                <FormikCheckbox name="aspectosPantalla" label="¿Puede regular la altura de la pantalla? (Por medio de dispositivos de regulación de altura como brazos articulados u otro tipo de soportes.)" />
                <FormikCheckbox name="aspectosPantalla" label="¿Puede ajustar la distancia de la pantalla moviéndola en profundidad sobre la superficie de trabajo?" />
            </Stack>
            <Typography variant="h5" gutterBottom>
                Aspectos del teclado
            </Typography>
            <Stack spacing={1} paddingBottom={'10px'}>
                <FormikCheckbox name="aspectosTeclado" label="¿Puede regular la inclinación de su teclado?" />
            </Stack>
            <Typography variant="h5" gutterBottom>
                Aspectos de la mesa o superficie de trabajo
            </Typography>
            <Stack spacing={1} paddingBottom={'10px'}>
                <FormikCheckbox name="aspectosMesa" label="¿Las dimensiones de la superficie de trabajo o mesa son suficientes para situar todos los elementos?" />
                <FormikCheckbox name="aspectosMesa" label="¿Dispone de espacio suficiente para apoyar las manos y/o antebrazos cuando utiliza el teclado?" />
                <FormikCheckbox name="aspectosMesa" label="¿La superficie de trabajo es mate?" />
                <FormikCheckbox name="aspectosMesa" label="¿El espacio disponible debajo de la mesa es suficiente para permitirle una postura cómoda?" />
                <Typography variant="h6" gutterBottom>
                    ¿Considera necesario un atril o portadocumentos en su puesto de trabajo? En caso de disponer en su puesto de trabajo de este elemento
                    conteste a los siguientes apartados:
                </Typography>
                <FormikCheckbox name="aspectosMesa" label="a) ¿Es regulable y estable?" />
                <FormikCheckbox name="aspectosMesa" label="b) ¿Se puede situar junto a la pantalla?" />
            </Stack>
            <Typography variant="h5" gutterBottom>
                Aspectos de la silla
            </Typography>
            <Stack spacing={1} paddingBottom={'10px'}>
                <FormikCheckbox name="aspectosSilla" label="¿Su silla de trabajo le permite una posición estable (exenta de desplazamientos involuntarios, balanceos, riesgo de caídas, etc.)?" />
                <FormikCheckbox name="aspectosSilla" label="¿La silla dispone de cinco puntos de apoyo?" />
                <FormikCheckbox name="aspectosSilla" label="¿El diseño de la silla le parece adecuado para permitirle una libertad de movimientos y una postura confortable?" />
                <FormikCheckbox name="aspectosSilla" label="¿Los bordes de la silla están adecuadamente redondeados?" />
                <FormikCheckbox name="aspectosSilla" label="¿La silla está recubierta de un material transpirable?" />
                <FormikCheckbox name="aspectosSilla" label="¿Es regulable la altura del asiento?" />
                <FormikCheckbox name="aspectosSilla" label="¿Es regulable la inclinación del asiento?" />
                <FormikCheckbox name="aspectosSilla" label="¿Es regulable la altura del respaldo?" />
                <FormikCheckbox name="aspectosSilla" label="¿Es regulable la inclinación del respaldo?" />
                <FormikCheckbox name="aspectosSilla" label="¿La silla se encuentra en buen estado de uso?" />
                <FormikCheckbox name="aspectosSilla" label="¿Dispone de reposapiés? (Si no precisa de él no conteste.) En caso afirmativo conteste a la siguiente pregunta:" />
                <FormikCheckbox name="aspectosSilla" label="¿Las dimensiones del reposapiés le parecen suficientes para colocar los pies con comodidad?" />
            </Stack>
            <Typography variant="h5" gutterBottom>
                Aspectos de la iluminación del espacio de trabajo
            </Typography>
            <Stack spacing={1} paddingBottom={'10px'}>
                <FormikCheckbox name="aspectosIluminacion" label="¿La luz en su puesto de trabajo le resulta suficiente para leer sin dificultad los documentos?" />
                <FormikCheckbox name="aspectosIluminacion" label="¿La luminosidad es homogénea en su puesto de trabajo (es decir, no existen contrastes bruscos de iluminación)?" />
                <FormikCheckbox name="aspectosIluminacion" label="¿Alguna fuente de luz (ventanas, fluorescentes, lámparas, etc.) le produce reflejos sobre la pantalla?" />
                <FormikCheckbox name="aspectosIluminacion" label="¿Alguna fuente de luz produce reflejos sobre otro elemento?" />
                <FormikCheckbox name="aspectosIluminacion" label="¿Le molesta en la vista alguna fuente de luz (ventana, luminaria, etc.) situada frente a usted?" />
                <FormikCheckbox name="aspectosIluminacion" label="¿Dispone de persianas, cortinas, etc., mediante los que puede atenuar eficazmente la luz del día que llega al puesto?" />
                <FormikCheckbox name="aspectosIluminacion" label="¿Está orientado su puesto correctamente respecto a las ventanas? (ni de frente ni de espaldas a ellas)." />
            </Stack>
            <Typography variant="h5" gutterBottom>
                Aspectos del ruido
            </Typography>
            <Stack spacing={1} paddingBottom={'10px'}>
                <FormikCheckbox name="aspectosRuido" label="¿El nivel de ruido ambiental existente le dificulta la comunicación o la atención en su puesto de trabajo? Identifique cuál (teléfono, impresoras, conversaciones de otras personas, etc.)." />
            </Stack>
            <Typography variant="h5" gutterBottom>
                Aspectos de las condiciones térmicas
            </Typography>
            <Stack spacing={1} paddingBottom={'10px'}>
                <FormikCheckbox name="aspectosTemperatura" label="¿Le resulta agradable la temperatura existente durante la mayor parte del año en su puesto de trabajo?" />
                <FormikCheckbox name="aspectosTemperatura" label="¿Nota usted habitualmente sequedad en el ambiente?" />
            </Stack>
            <Typography variant="h5" gutterBottom>
                Aspectos sobre los programas de ordenador
            </Typography>
            <Stack spacing={1} paddingBottom={'10px'}>
                <FormikCheckbox name="aspectosProgramas" label="¿Considera que cada programa que utiliza se adapta a la tarea que debe realizar?" />
                <FormikCheckbox name="aspectosProgramas" label="¿Considera que los programas que emplea son fáciles de utilizar?" />
                <FormikCheckbox name="aspectosProgramas" label="¿Estos programas se adaptan a sus conocimientos y experiencia?" />
                <FormikCheckbox name="aspectosProgramas" label="¿Los programas empleados le proporcionan ayuda para su utilización?" />
                <FormikCheckbox name="aspectosProgramas" label="¿El programa le facilita la corrección de errores?" />
                <FormikCheckbox name="aspectosProgramas" label="¿Los programas presentan la información a un ritmo adecuado?" />
                <FormikCheckbox name="aspectosProgramas" label="¿La información en pantalla es mostrada en un formato adecuado?" />
            </Stack>
            <Typography variant="h5" gutterBottom>
                Aspectos sobre la organización y gestión
            </Typography>
            <Stack spacing={1} paddingBottom={'10px'}>
                <FormikCheckbox name="aspectosOrganizacion" label="¿Se encuentra sometido habitualmente a una presión excesiva de tiempos en la realización de su tarea?" />
                <FormikCheckbox name="aspectosOrganizacion" label="¿La repetitividad de la tarea le provoca aburrimiento o insatisfacción?" />
                <FormikCheckbox name="aspectosOrganizacion" label="¿El trabajo que realiza habitualmente le produce situaciones de sobrecarga y fatiga mental?" />
                <FormikCheckbox name="aspectosOrganizacion" label="¿El trabajo que realiza habitualmente le produce situaciones de sobrecarga y fatiga visual?" />
                <FormikCheckbox name="aspectosOrganizacion" label="¿El trabajo que realiza habitualmente le produce situaciones de sobrecarga y fatiga postural?" />
                <FormikCheckbox name="aspectosOrganizacion" label="¿Realiza el trabajo de forma aislada o con pocas posibilidades de contacto con otras personas?" />
                <FormikCheckbox name="aspectosOrganizacion" label="¿El tipo de actividad que realiza le permite seguir su propio ritmo de trabajo y hacer pequeñas pausas voluntarias?" />
                <FormikCheckbox name="aspectosOrganizacion" label="¿Le ha facilitado la empresa una formación específica para la tarea que realiza en la actualidad?" />
                <FormikCheckbox name="aspectosOrganizacion" label="La vigilancia de la salud proporcionada por la empresa, ¿incluye reconocimientos médicos periódicos y específicos (por ser trabajador usuario de pantallas de visualización)?" />
            </Stack>
        </React.Fragment>
    );
}

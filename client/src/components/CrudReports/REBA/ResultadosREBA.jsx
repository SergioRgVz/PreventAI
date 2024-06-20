import React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const ResultadosREBA = ({ formData }) => {
  const [puntuacionA, setPuntuacionA] = useState(0);
  const [puntuacionB, setPuntuacionB] = useState(0);
  const [puntuacionC, setPuntuacionC] = useState(0);
  const [colorPuntuacionC, setColorPuntuacionC] = useState("#C0DF85");
  const [content, setContent] = useState("");

  useEffect(() => {
    // console.log("VALUES; ", values);
    const TABLE_A = [
      //Cada posicion de la tabla es una matriz que va regida por posicion de tronco(i) y piernas(j), para elegir una matriz u otra es la puntuacion del cuello
      [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [2, 4, 5, 6],
        [3, 5, 6, 7],
        [4, 6, 7, 8],
      ],
      [
        [1, 2, 3, 4],
        [3, 4, 5, 6],
        [4, 5, 6, 7],
        [5, 6, 7, 8],
        [6, 7, 8, 9],
      ],
      [
        [3, 3, 5, 6],
        [4, 5, 6, 7],
        [5, 6, 7, 8],
        [6, 7, 8, 9],
        [7, 8, 9, 9],
      ],
    ];

    const TABLE_B = [
      //Cada posioción de la tabla es una matriz que va regida por la puntuacion de Brazos(i) y Munecas(j), para elegir una matriz u otra es la puntuacion del antebrazo
      [
        [1, 2, 2],
        [1, 2, 3],
        [3, 4, 5],
        [4, 5, 5],
        [6, 7, 8],
        [7, 8, 8],
      ],
      [
        [1, 2, 3],
        [2, 3, 4],
        [4, 5, 5],
        [5, 6, 7],
        [7, 8, 8],
        [8, 9, 9],
      ],
    ];

    const TABLE_C = [
      //i = puntuacion A y j = puntuacion B
      [1, 1, 1, 2, 3, 3, 4, 5, 6, 7, 7, 7],
      [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 7, 8],
      [2, 3, 3, 3, 4, 5, 6, 7, 7, 8, 8, 8],
      [3, 4, 4, 4, 5, 6, 7, 8, 8, 9, 9, 9],
      [4, 4, 4, 5, 6, 7, 8, 8, 9, 9, 9, 9],
      [6, 6, 6, 7, 8, 8, 9, 9, 10, 10, 10, 10],
      [7, 7, 7, 8, 9, 9, 9, 10, 10, 11, 11, 11],
      [8, 8, 8, 9, 10, 10, 10, 10, 10, 11, 11, 11],
      [9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12, 12],
      [10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12],
      [11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12],
      [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    ];

    let pCuello = parseInt(formData.PCuello) + parseInt(formData.CCuello);
    let pTronco = parseInt(formData.PTronco) + parseInt(formData.CTronco);
    let pPiernas =
      parseInt(formData.PPiernas) +
      parseInt(formData.CPiernas1) +
      parseInt(formData.CPiernas2);
    let puntosTotalA =
      TABLE_A[pCuello - 1][pTronco - 1][pPiernas - 1] +
      parseInt(formData.PCarga) +
      parseInt(formData.CCarga);
    setPuntuacionA(puntosTotalA);

    let pBrazos =
      parseInt(formData.PBrazos) +
      parseInt(formData.CAbducidos) +
      parseInt(formData.CHombrosLevantados) -
      parseInt(formData.CBrazosApoyados);
    let pAntebrazos = parseInt(formData.PAntebrazos);
    let pMunecas = parseInt(formData.PMunnecas) + parseInt(formData.CMunnecas);

    let puntosTotalB =
      TABLE_B[pAntebrazos - 1][pBrazos - 1][pMunecas - 1] +
      parseInt(formData.Agarre);

    setPuntuacionB(puntosTotalB);

    let puntosTotalC = TABLE_C[puntuacionA][puntuacionB];
    setPuntuacionC(puntosTotalC);
    setColorPuntuacionC(getColor(puntuacionC));
    setContent(getContentIndex(colorPuntuacionC));
  }, [formData, puntuacionA, puntuacionB, puntuacionC]);

  function getColor(valorIndice) {
    if (valorIndice > 10) {
      return "#db162fbf"; // Rojo para índices altos
    } else if (valorIndice > 7) {
      return "#f49636"; //Naranja para índices medios
    } else if (valorIndice > 3) {
      return "#F8F272"; //Amarillo para índices bajos
    } else if (valorIndice > 1) {
      return "#C0DF85"; // Verde para índices muy bajos
    } else {
      return "#C7C8CC"; // Gris para índices insignificantes
    }
  }

  function getContentIndex(value) {
    if (value === "#C7C8CC") {
      return 0;
    } else if (value === "#C0DF85") {
      return 1;
    } else if (value === "#F8F272") {
      return 2;
    } else if (value === "#f49636") {
      return 3;
    }
    return 4;
  }

  const consideraciones = [
    ["Insignificante", "Ninguna"],
    ["Bajo", "Puede ser necesaria"],
    ["Medio", "Necesaria"],
    ["Alto", "Necesaria pronto"],
    ["Muy alto", "Necesaria inmediatamente"],
  ];

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Resultados
      </Typography>

      <Typography variant="h5" gutterBottom>
        Indice de riesgo
      </Typography>
      <Grid
        container
        justifyContent={"center"}
        spacing={3}
        paddingBottom={"10px"}
      >
        <Grid item xs={12} sm={12}>
          <Card style={{ backgroundColor: colorPuntuacionC }}>
            <CardContent>
              <Typography
                variant="h6"
                style={{ display: "flex", justifyContent: "center" }}
                gutterBottom
              >
                Índice de riesgo de elevación
              </Typography>
              <Typography
                variant="body1"
                style={{ display: "flex", justifyContent: "center" }}
                gutterBottom
              >
                <strong>{parseFloat(puntuacionC).toFixed(2)}</strong>
              </Typography>
              <Typography
                variant="body2"
                style={{ display: "flex", justifyContent: "center" }}
                gutterBottom
              >
                {content !== "" && consideraciones[content]
                  ? `Gravedad: ${consideraciones[content][0]}: Actuación Necesaria: ${consideraciones[content][1]}`
                  : ""}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ResultadosREBA;
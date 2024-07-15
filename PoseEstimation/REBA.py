import cv2
import mediapipe as mp
import numpy as np
import time

# Inicializa MediaPipe Pose.
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

# Función para calcular el ángulo del cuello.
def calcular_angulo_cuello(pose_landmarks):
    # Obtener las coordenadas de los puntos de referencia necesarios
    punto_ojo_izquierdo = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_EYE]
    punto_ojo_derecho = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_EYE]
    punto_hombro_izquierdo = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
    punto_hombro_derecho = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    punto_cadera_izquierda = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
    punto_cadera_derecha = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]

    # Calcular el punto medio de los ojos y los hombros
    punto_medio_ojos = np.array([(punto_ojo_izquierdo.x + punto_ojo_derecho.x) / 2,
                                 (punto_ojo_izquierdo.y + punto_ojo_derecho.y) / 2])
    punto_medio_hombros = np.array([(punto_hombro_izquierdo.x + punto_hombro_derecho.x) / 2,
                                    (punto_hombro_izquierdo.y + punto_hombro_derecho.y) / 2])
    punto_medio_caderas = np.array([(punto_cadera_izquierda.x + punto_cadera_derecha.x) / 2,
                                    (punto_cadera_izquierda.y + punto_cadera_derecha.y) / 2])

    # Vector que va desde el punto medio de los hombros al punto medio de los ojos
    vector_cuello = punto_medio_ojos - punto_medio_hombros

    # Vector vertical (eje Y)
    vector_vertical = np.array([0, -1])

    vector_tronco = punto_medio_hombros - punto_medio_caderas

    # Calcular el ángulo entre el vector del cuello y el vector vertical
    angulo = np.degrees(np.arctan2(
        vector_cuello[1], vector_cuello[0]) - np.arctan2(vector_tronco[1], vector_tronco[0]))

    return angulo

# Función para determinar la posición del cuello.
def determinar_posicion_cuello(angulo_cuello):
    if angulo_cuello < 20:
        return 'Cuello en posición neutral (0º a 20º)'
    elif angulo_cuello >= 20 and angulo_cuello <= 90:
        return 'Cuello flexionado hacia adelante (> 20º) o Cuello extendido hacia atrás'
    else:
        return 'Cuello extendido hacia atrás'

def calcular_angulo_tronco(pose_landmarks):
    # Obtener las coordenadas de los puntos de referencia necesarios
    punto_hombro_izquierdo = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
    punto_hombro_derecho = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    punto_cadera_izquierda = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
    punto_cadera_derecha = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]

    # Calcular el punto medio de los hombros y las caderas
    punto_medio_hombros = np.array([(punto_hombro_izquierdo.x + punto_hombro_derecho.x) / 2,
                                    (punto_hombro_izquierdo.y + punto_hombro_derecho.y) / 2])
    punto_medio_caderas = np.array([(punto_cadera_izquierda.x + punto_cadera_derecha.x) / 2,
                                    (punto_cadera_izquierda.y + punto_cadera_derecha.y) / 2])

    # Vector que va desde el punto medio de las caderas al punto medio de los hombros
    vector_tronco = punto_medio_hombros - punto_medio_caderas

    # Vector vertical (eje Y)
    vector_vertical = np.array([0, -1])

    # Calcular el ángulo entre el vector del tronco y el vector vertical
    angulo = np.degrees(np.arctan2(
        vector_tronco[1], vector_tronco[0]) - np.arctan2(vector_vertical[1], vector_vertical[0]))

    # Asegurarse de que el ángulo esté en el rango de 0 a 180 grados
    angulo = np.abs(angulo)
    if angulo > 180:
        angulo = 360 - angulo

    return angulo

def determinar_posicion_tronco(angulo_tronco):
    if angulo_tronco <= 20:
        return 'Tronco erguido (0º a 20º)'
    elif angulo_tronco > 20 and angulo_tronco <= 60:
        return 'Tronco flexionado (20º a 60º) o en extensión (20º a 60º)'
    elif angulo_tronco > 60:
        return 'Tronco flexionado más de 60º'
    else:
        return 'Tronco en extensión más de 60º'

def calcular_angulo_rodilla(pose_landmarks, lado):
    if lado == 'izquierda':
        punto_cadera = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
        punto_rodilla = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE]
        punto_tobillo = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE]
    else:
        punto_cadera = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]
        punto_rodilla = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE]
        punto_tobillo = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ANKLE]

    # Vectores del muslo y la pantorrilla
    vector_muslo = np.array(
        [punto_rodilla.x - punto_cadera.x, punto_rodilla.y - punto_cadera.y])
    vector_pantorrilla = np.array(
        [punto_tobillo.x - punto_rodilla.x, punto_tobillo.y - punto_rodilla.y])

    # Calcular el ángulo entre el vector del muslo y el vector de la pantorrilla
    angulo = np.degrees(np.arccos(np.dot(vector_muslo, vector_pantorrilla) /
                        (np.linalg.norm(vector_muslo) * np.linalg.norm(vector_pantorrilla))))

    return angulo

def determinar_posicion_piernas(angulo_rodilla_izquierda, angulo_rodilla_derecha):
    if (30 <= angulo_rodilla_izquierda <= 60) or (30 <= angulo_rodilla_derecha <= 60):
        return 'Flexión de una o ambas rodillas entre 30º y 60º'
    elif (angulo_rodilla_izquierda > 60) or (angulo_rodilla_derecha > 60):
        return 'Flexión de una o ambas rodillas de más de 60º'
    else:
        return 'Piernas en posición neutral'

def calculate_angle_with_vertical(shoulder, elbow):
    vertical_vector = np.array([0, 1])  # Vector vertical
    arm_vector = np.array(
        [elbow[0] - shoulder[0], elbow[1] - shoulder[1]])  # Vector del brazo

    unit_vertical = vertical_vector / np.linalg.norm(vertical_vector)
    unit_arm = arm_vector / np.linalg.norm(arm_vector)

    dot_product = np.dot(unit_vertical, unit_arm)
    angle = np.arccos(dot_product) * 180.0 / np.pi

    return angle

def calcular_angulo_brazo(pose_landmarks):
    landmarks = pose_landmarks.landmark

    # Obtener coordenadas de los hombros y codos
    left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                     landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
    left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
    right_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,
                      landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
    right_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,
                   landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]

    # Calcular ángulo de los brazos respecto a la vertical
    left_angle = calculate_angle_with_vertical(left_shoulder, left_elbow)
    right_angle = calculate_angle_with_vertical(right_shoulder, right_elbow)

    return (left_angle + right_angle) / 2

def determinar_posicion_brazo(angulo_brazo):
    if 0 <= angulo_brazo <= 20:
        return 'El brazo está entre 0º y 20º de flexión o extensión.'
    elif 21 <= angulo_brazo <= 45:
        return 'El brazo está entre 21º y 45º de flexión.'
    elif 46 <= angulo_brazo <= 90:
        return 'El brazo está entre 46º y 90º de flexión.'
    elif angulo_brazo > 90:
        return 'El brazo está flexionado más de 90º.'
    else:
        return 'Posición del brazo desconocida'

def calcular_angulo_antebrazo(pose_landmarks):
    landmarks = pose_landmarks.landmark
    left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
    left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
    right_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,
                   landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
    right_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,
                   landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]

    # Calcular ángulo del antebrazo respecto a la vertical
    left_forearm_angle = calculate_angle_with_vertical(left_elbow, left_wrist)
    right_forearm_angle = calculate_angle_with_vertical(
        right_elbow, right_wrist)

    return (left_forearm_angle + right_forearm_angle) / 2

def determinar_posicion_antebrazo(angulo):
    if angulo > 60 and angulo < 100:
        return 'El antebrazo está flexionado entre 60º y 90º.'
    elif angulo >= 100:
        return 'El antebrazo está flexionado más de 100º.'
    else:
        return 'El antebrazo en posición neutral'

def calcular_angulo_munneca(pose_landmarks):
    def calculate_angle(a, b, c):
        a = np.array(a)  # Primer punto
        b = np.array(b)  # Segundo punto (punto de vértice)
        c = np.array(c)  # Tercer punto

        radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - \
            np.arctan2(a[1] - b[1], a[0] - b[0])
        angle = np.abs(radians * 180.0 / np.pi)

        if angle > 180.0:
            angle = 360.0 - angle

        return angle

    landmarks = pose_landmarks.landmark
    # Obtener coordenadas de los codos, muñecas y dedo índice (como referencia de la mano)
    left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
    left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
    left_hand = [landmarks[mp_pose.PoseLandmark.LEFT_INDEX.value].x,
                 landmarks[mp_pose.PoseLandmark.LEFT_INDEX.value].y]

    right_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,
                   landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
    right_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,
                   landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]
    right_hand = [landmarks[mp_pose.PoseLandmark.RIGHT_INDEX.value].x,
                  landmarks[mp_pose.PoseLandmark.RIGHT_INDEX.value].y]

    # Calcular ángulo de la muñeca respecto al antebrazo
    left_wrist_angle = calculate_angle(left_elbow, left_wrist, left_hand)
    right_wrist_angle = calculate_angle(right_elbow, right_wrist, right_hand)

    # Ajustar el ángulo restando 180 grados con un umbral de error de ±5 grados
    left_wrist_angle_adjusted = 180 - \
        left_wrist_angle if np.abs(
            180 - left_wrist_angle) <= 5 else left_wrist_angle
    right_wrist_angle_adjusted = 180 - \
        right_wrist_angle if np.abs(
            180 - right_wrist_angle) <= 5 else right_wrist_angle

    return (left_wrist_angle_adjusted + right_wrist_angle_adjusted) / 2

def determinar_posicion_munneca(angulo):
    if angulo < 15 and angulo >= 0:
        return 'Muñeca entre 0 y 15 grados de flexion'
    else:
        return 'Muñeca flexionada o extendida más de 15 grados'

# Funciones de GINSHT
def clasificar_postura(resultados):
    # Definir los puntos clave de interés
    nariz = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.NOSE].y
    codo_izquierdo = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW].y
    codo_derecho = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ELBOW].y
    muneca_izquierda = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST].y
    muneca_derecha = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST].y
    cadera_izquierda = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP].y
    cadera_derecha = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP].y
    rodilla_izquierda = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE].y
    rodilla_derecha = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE].y
    tobillo_izquierdo = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE].y
    tobillo_derecho = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ANKLE].y

    # Calcular alturas promedio para mayor precisión
    altura_codo = (codo_izquierdo + codo_derecho) / 2
    altura_muneca = (muneca_izquierda + muneca_derecha) / 2
    altura_cadera = (cadera_izquierda + cadera_derecha) / 2
    altura_rodilla = (rodilla_izquierda + rodilla_derecha) / 2
    altura_tobillo = (tobillo_izquierdo + tobillo_derecho) / 2

    # Clasificar la postura según la altura de la muñeca
    if altura_muneca <= nariz:
        if altura_muneca > altura_codo:
            return "Altura de la vista"
        elif altura_muneca > altura_cadera:
            return "Encima del codo"
        elif altura_muneca > altura_rodilla:
            return "Debajo del codo"
        elif altura_muneca > altura_tobillo:
            return "Altura del muslo"
        else:
            return "Altura de la pantorrilla"
    else:
        return "Altura desconocida"

def procesar_imagen(image_path, tipo):
    # Carga la imagen.
    image = cv2.imread(image_path)

    # Convierte la imagen a RGB.
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Procesa la imagen y realiza la detección de poses.
    results = pose.process(image_rgb)

    # Dibuja las anotaciones de la pose en la imagen.
    annotated_image = image.copy()
    posiciones = []
    if results.pose_landmarks is None:
        return posiciones

    if tipo == "REBA":
        mp_drawing.draw_landmarks(
            annotated_image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

        angulo_cuello = calcular_angulo_cuello(results.pose_landmarks)
        posicion_cuello = determinar_posicion_cuello(angulo_cuello)
        posiciones.append(posicion_cuello)

        angulo_tronco = calcular_angulo_tronco(results.pose_landmarks)
        posicion_tronco = determinar_posicion_tronco(angulo_tronco)
        posiciones.append(posicion_tronco)

        angulo_rodilla_izquierda = calcular_angulo_rodilla(
            results.pose_landmarks, 'izquierda')
        angulo_rodilla_derecha = calcular_angulo_rodilla(
            results.pose_landmarks, 'derecha')
        posicion_piernas = determinar_posicion_piernas(
            angulo_rodilla_izquierda, angulo_rodilla_derecha)
        posiciones.append(posicion_piernas)

        angulo_brazos = calcular_angulo_brazo(results.pose_landmarks)
        posicion_brazos = determinar_posicion_brazo(angulo_brazos)
        posiciones.append(posicion_brazos)

        angulo_antebrazo = calcular_angulo_antebrazo(results.pose_landmarks)
        posicion_antebrazo = determinar_posicion_antebrazo(angulo_antebrazo)
        posiciones.append(posicion_antebrazo)

        angulo_munneca = calcular_angulo_munneca(results.pose_landmarks)
        posicion_munneca = determinar_posicion_munneca(angulo_munneca)
        posiciones.append(posicion_munneca)

    elif tipo == "GINSHT":
        mp_drawing.draw_landmarks(
            annotated_image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

        # Clasificar la postura según el método GINSHT
        clasificacion = clasificar_postura(results)
        posiciones.append(clasificacion)

    # Guarda o muestra la imagen anotada.
    cv2.imwrite('./img/imagen_anotada.jpg', annotated_image)
    # cv2.imshow('Pose Detection', annotated_image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    return posiciones
# Ejemplo de uso
image_path = './img/REBA/cuello/cuellorecto.jpg'
posiciones = procesar_imagen(image_path, "REBA")
print("Resultados REBA:", posiciones)

posiciones = procesar_imagen(image_path, "GINSHT")
print("Resultados GINSHT:", posiciones)

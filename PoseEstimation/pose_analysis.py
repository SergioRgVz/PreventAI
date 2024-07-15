import cv2
import mediapipe as mp
import numpy as np

# Inicializa MediaPipe Pose.
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

BG_COLOR = (192, 192, 192)  # gris

# Función para calcular el ángulo del cuello.


def calcular_angulo_cuello(pose_landmarks):
    punto_ojo_izquierdo = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_EYE]
    punto_ojo_derecho = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_EYE]
    punto_hombro_izquierdo = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
    punto_hombro_derecho = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    punto_cadera_izquierda = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
    punto_cadera_derecha = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]

    punto_medio_ojos = np.array([(punto_ojo_izquierdo.x + punto_ojo_derecho.x) / 2,
                                 (punto_ojo_izquierdo.y + punto_ojo_derecho.y) / 2])
    punto_medio_hombros = np.array([(punto_hombro_izquierdo.x + punto_hombro_derecho.x) / 2,
                                    (punto_hombro_izquierdo.y + punto_hombro_derecho.y) / 2])
    punto_medio_caderas = np.array([(punto_cadera_izquierda.x + punto_cadera_derecha.x) / 2,
                                    (punto_cadera_izquierda.y + punto_cadera_derecha.y) / 2])

    vector_cuello = punto_medio_ojos - punto_medio_hombros
    vector_tronco = punto_medio_hombros - punto_medio_caderas

    angulo = np.degrees(np.arctan2(
        vector_cuello[1], vector_cuello[0]) - np.arctan2(vector_tronco[1], vector_tronco[0]))

    return angulo


def determinar_posicion_cuello(angulo_cuello):
    # 'Cuello en posición neutral (0º a 20º)'
    if angulo_cuello < 20:
        return 1
    # 'Cuello flexionado hacia adelante (> 20º) o Cuello extendido hacia atrás'
    else:
        return 2
    

def calcular_angulo_tronco(pose_landmarks):
    punto_hombro_izquierdo = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
    punto_hombro_derecho = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    punto_cadera_izquierda = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
    punto_cadera_derecha = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]

    punto_medio_hombros = np.array([(punto_hombro_izquierdo.x + punto_hombro_derecho.x) / 2,
                                    (punto_hombro_izquierdo.y + punto_hombro_derecho.y) / 2])
    punto_medio_caderas = np.array([(punto_cadera_izquierda.x + punto_cadera_derecha.x) / 2,
                                    (punto_cadera_izquierda.y + punto_cadera_derecha.y) / 2])

    vector_tronco = punto_medio_hombros - punto_medio_caderas
    vector_vertical = np.array([0, -1])
    angulo = np.degrees(np.arctan2(
        vector_tronco[1], vector_tronco[0]) - np.arctan2(vector_vertical[1], vector_vertical[0]))

    angulo = np.abs(angulo)
    if angulo > 180:
        angulo = 360 - angulo

    return angulo


def determinar_posicion_tronco(angulo_tronco):
    # 'Tronco erguido (0º a 20º)'
    if angulo_tronco <= 5:
        return 1
    #'Tronco flexionado (20º a 60º) o en extensión (20º a 60º)'
    elif angulo_tronco < 21:
        return 2
    # 'Tronco flexionado más de 60º'
    elif angulo_tronco < 60:
        return 3
    # 'Tronco en extensión más de 60º'
    else:
        return 4

def calcular_angulo_rodilla(pose_landmarks, lado):
    if lado == 'izquierda':
        punto_cadera = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
        punto_rodilla = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE]
        punto_tobillo = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE]
    else:
        punto_cadera = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]
        punto_rodilla = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE]
        punto_tobillo = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ANKLE]

    vector_muslo = np.array(
        [punto_rodilla.x - punto_cadera.x, punto_rodilla.y - punto_cadera.y])
    vector_pantorrilla = np.array(
        [punto_tobillo.x - punto_rodilla.x, punto_tobillo.y - punto_rodilla.y])

    angulo = np.degrees(np.arccos(np.dot(vector_muslo, vector_pantorrilla) /
                        (np.linalg.norm(vector_muslo) * np.linalg.norm(vector_pantorrilla))))

    return angulo


def determinar_posicion_piernas(angulo_rodilla_izquierda, angulo_rodilla_derecha):
    # 'Flexión de una o ambas rodillas de más de 60º'
    if (angulo_rodilla_izquierda > 60) or (angulo_rodilla_derecha > 60):
        return 2
    # 'Flexión de una o ambas rodillas entre 30º y 60º'
    if (30 <= angulo_rodilla_izquierda <= 60) or (30 <= angulo_rodilla_derecha <= 60):
        return 1


def calculate_angle_with_vertical(shoulder, elbow):
    vertical_vector = np.array([0, 1])
    arm_vector = np.array(
        [elbow[0] - shoulder[0], elbow[1] - shoulder[1]])

    unit_vertical = vertical_vector / np.linalg.norm(vertical_vector)
    unit_arm = arm_vector / np.linalg.norm(arm_vector)

    dot_product = np.dot(unit_vertical, unit_arm)
    angle = np.arccos(dot_product) * 180.0 / np.pi

    return angle


def calcular_angulo_brazo(pose_landmarks):
    landmarks = pose_landmarks.landmark

    left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                     landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
    left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
    right_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,
                      landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
    right_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,
                   landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]

    left_angle = calculate_angle_with_vertical(left_shoulder, left_elbow)
    right_angle = calculate_angle_with_vertical(right_shoulder, right_elbow)

    return (left_angle + right_angle) / 2


def determinar_posicion_brazo(angulo_brazo):
    if 0 <= angulo_brazo <= 20:
        return 1
        # return 'El brazo está entre 0º y 20º de flexión o extensión.'
    elif 21 <= angulo_brazo <= 45:
        return 2
        # return 'El brazo está entre 21º y 45º de flexión.'
    elif 46 <= angulo_brazo <= 90:
        return 3
        # return 'El brazo está entre 46º y 90º de flexión.'
    elif angulo_brazo > 90:
        return 4
        # return 'El brazo está flexionado más de 90º.'
    else:
        return None
        # return 'Posición del brazo desconocida'


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

    left_forearm_angle = calculate_angle_with_vertical(left_elbow, left_wrist)
    right_forearm_angle = calculate_angle_with_vertical(
        right_elbow, right_wrist)

    return (left_forearm_angle + right_forearm_angle) / 2


def determinar_posicion_antebrazo(angulo):
    if angulo >= 100:
        # return 'El antebrazo está flexionado más de 100º.'
        return 2
    if angulo > 60 and angulo < 100:
        return 1
        # return 'El antebrazo está flexionado entre 60º y 90º.'
    else:
        #'El antebrazo en posición neutral'
        return None

def calcular_angulo_munneca(pose_landmarks):
    def calculate_angle(a, b, c):
        a = np.array(a)
        b = np.array(b)
        c = np.array(c)

        radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - \
            np.arctan2(a[1] - b[1], a[0] - b[0])
        angle = np.abs(radians * 180.0 / np.pi)

        if angle > 180.0:
            angle = 360.0 - angle

        return angle

    landmarks = pose_landmarks.landmark
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

    left_wrist_angle = calculate_angle(left_elbow, left_wrist, left_hand)
    right_wrist_angle = calculate_angle(right_elbow, right_wrist, right_hand)

    left_wrist_angle_adjusted = 180 - \
        left_wrist_angle if np.abs(
            180 - left_wrist_angle) <= 5 else left_wrist_angle
    right_wrist_angle_adjusted = 180 - \
        right_wrist_angle if np.abs(
            180 - right_wrist_angle) <= 5 else right_wrist_angle

    return (left_wrist_angle_adjusted + right_wrist_angle_adjusted) / 2


def determinar_posicion_munneca(angulo):
    if angulo < 15 and angulo >= 0:
        return 1
        # return 'Muñeca entre 0 y 15 grados de flexion'
    else:
        return 2
        # return 'Muñeca flexionada o extendida más de 15 grados'


def determinar_altura_promedio_manos(resultados): 

    # Coordenadas de referencia
    y_ojos = (resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_EYE].y +
              resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_EYE].y) / 2
    y_codo_izquierdo = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW].y
    y_codo_derecho = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ELBOW].y
    y_codo = (y_codo_izquierdo + y_codo_derecho) / 2
    y_cadera = (resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP].y +
                resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP].y) / 2
    y_rodilla_izquierda = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE].y
    y_rodilla_derecha = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE].y
    y_rodilla = (y_rodilla_izquierda + y_rodilla_derecha) / 2

    # Coordenadas de las manos
    y_mano_izquierda = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST].y
    y_mano_derecha = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST].y
    y_mano_promedio = (y_mano_izquierda + y_mano_derecha) / 2

    # Determinar la altura promedio
    
    # 'Altura de la vista'
    if y_mano_promedio < y_ojos:
        return 0
    # 'Por encima del codo'
    elif y_ojos <= y_mano_promedio < y_codo:
        return 1
    #'Por debajo del codo'
    elif y_codo <= y_mano_promedio < y_cadera:
        return 2
    # 'Altura del muslo'
    elif y_cadera <= y_mano_promedio < y_rodilla:
      return 3 
     # 'Altura de la pantorrilla'
    else:
        return 4

# Función para determinar si las manos están lejos o cerca del cuerpo.


def determinar_proximidad_manos(resultados, umbral_horizontal=0.3):
    # Coordenadas de los hombros y caderas
    x_hombro_izquierdo = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER].x
    x_hombro_derecho = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER].x
    x_cadera_izquierda = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP].x
    x_cadera_derecha = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP].x

    # Coordenadas de las manos
    x_mano_izquierda = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST].x
    x_mano_derecha = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST].x

    # Calcular distancia horizontal promedio de las manos a los hombros y caderas
    distancia_hombro_izquierda = abs(x_mano_izquierda - x_hombro_izquierdo)
    distancia_hombro_derecha = abs(x_mano_derecha - x_hombro_derecho)
    distancia_cadera_izquierda = abs(x_mano_izquierda - x_cadera_izquierda)
    distancia_cadera_derecha = abs(x_mano_derecha - x_cadera_derecha)

    distancia_horizontal_promedio = (distancia_hombro_izquierda + distancia_hombro_derecha +
                                     distancia_cadera_izquierda + distancia_cadera_derecha) / 4

    # Determinar proximidad
    # 'Lejos del cuerpo'
    if distancia_horizontal_promedio > umbral_horizontal:
        return 1
    # 'Cerca del cuerpo'
    else:
        return 0 


def procesar_imagen(image, tipo):
    results = pose.process(image)
    annotated_image = image.copy()
    posiciones = {}

    if results.pose_landmarks is None:
        return posiciones, annotated_image

    if tipo == "REBA":
        mp_drawing.draw_landmarks(
            annotated_image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

        angulo_cuello = calcular_angulo_cuello(results.pose_landmarks)
        posicion_cuello = determinar_posicion_cuello(angulo_cuello)
        posiciones['cuello'] = posicion_cuello

        angulo_tronco = calcular_angulo_tronco(results.pose_landmarks)
        posicion_tronco = determinar_posicion_tronco(angulo_tronco)
        posiciones['tronco'] = posicion_tronco

        angulo_rodilla_izquierda = calcular_angulo_rodilla(
            results.pose_landmarks, 'izquierda')
        angulo_rodilla_derecha = calcular_angulo_rodilla(
            results.pose_landmarks, 'derecha')
        posicion_piernas = determinar_posicion_piernas(
            angulo_rodilla_izquierda, angulo_rodilla_derecha)
        posiciones['piernas'] = posicion_piernas

        angulo_brazos = calcular_angulo_brazo(results.pose_landmarks)
        posicion_brazos = determinar_posicion_brazo(angulo_brazos)
        posiciones['brazos'] = posicion_brazos

        angulo_antebrazo = calcular_angulo_antebrazo(results.pose_landmarks)
        posicion_antebrazo = determinar_posicion_antebrazo(angulo_antebrazo)
        posiciones['antebrazos'] = posicion_antebrazo

        angulo_munneca = calcular_angulo_munneca(results.pose_landmarks)
        posicion_munneca = determinar_posicion_munneca(angulo_munneca)
        posiciones['munnecas'] = posicion_munneca

    elif tipo == "GINSHT":
        mp_drawing.draw_landmarks(
            annotated_image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

        clasificacion_altura = determinar_altura_promedio_manos(results)
        clasificacion_proximidad = determinar_proximidad_manos(results)
        posiciones['altura'] = clasificacion_altura
        posiciones['separacion'] = clasificacion_proximidad

    # Mostrar la imagen anotada antes de guardarla
    cv2.imshow('Imagen Anotada', annotated_image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    
    cv2.imwrite('./img/imagen_anotada.jpg', annotated_image)

    return posiciones, annotated_image

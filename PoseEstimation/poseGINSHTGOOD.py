import cv2
import mediapipe as mp
import numpy as np

# Inicializa MediaPipe Pose.
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

# Función para determinar la altura promedio de las manos con respecto al cuerpo.
def determinar_altura_promedio_manos(pose_landmarks):
    # Coordenadas de referencia
    y_ojos = (pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_EYE].y + 
              pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_EYE].y) / 2
    y_codo_izquierdo = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW].y
    y_codo_derecho = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ELBOW].y
    y_codo = (y_codo_izquierdo + y_codo_derecho) / 2
    y_cadera = (pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP].y + 
                pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP].y) / 2
    y_rodilla_izquierda = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE].y
    y_rodilla_derecha = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE].y
    y_rodilla = (y_rodilla_izquierda + y_rodilla_derecha) / 2

    # Coordenadas de las manos
    y_mano_izquierda = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST].y
    y_mano_derecha = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST].y
    y_mano_promedio = (y_mano_izquierda + y_mano_derecha) / 2
    
    # Determinar la altura promedio
    if y_mano_promedio < y_ojos:
        return 'Altura de la vista'
    elif y_ojos <= y_mano_promedio < y_codo:
        return 'Por encima del codo'
    elif y_codo <= y_mano_promedio < y_cadera:
        return 'Por debajo del codo'
    elif y_cadera <= y_mano_promedio < y_rodilla:
        return 'Altura del muslo'
    else:
        return 'Altura de la pantorrilla'

# Función para determinar si las manos están lejos o cerca del cuerpo.
def determinar_proximidad_manos(pose_landmarks, umbral_horizontal=0.3):
    # Coordenadas de los hombros y caderas
    x_hombro_izquierdo = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER].x
    x_hombro_derecho = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER].x
    x_cadera_izquierda = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP].x
    x_cadera_derecha = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP].x

    # Coordenadas de las manos
    x_mano_izquierda = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST].x
    x_mano_derecha = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST].x

    # Calcular distancia horizontal promedio de las manos a los hombros y caderas
    distancia_hombro_izquierda = abs(x_mano_izquierda - x_hombro_izquierdo)
    distancia_hombro_derecha = abs(x_mano_derecha - x_hombro_derecho)
    distancia_cadera_izquierda = abs(x_mano_izquierda - x_cadera_izquierda)
    distancia_cadera_derecha = abs(x_mano_derecha - x_cadera_derecha)
    
    distancia_horizontal_promedio = (distancia_hombro_izquierda + distancia_hombro_derecha + distancia_cadera_izquierda + distancia_cadera_derecha) / 4

    # Determinar proximidad
    if distancia_horizontal_promedio > umbral_horizontal:
        return 'Lejos del cuerpo'
    else:
        return 'Cerca del cuerpo'

# Carga una imagen.
image = cv2.imread('./img/6.jpg')

# Convierte la imagen a RGB.
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Procesa la imagen y realiza la detección de poses.
results = pose.process(image_rgb)

# Dibuja las anotaciones de la pose en la imagen.
annotated_image = image.copy()
if results.pose_landmarks:
    mp_drawing.draw_landmarks(annotated_image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
    altura_promedio_manos = determinar_altura_promedio_manos(results.pose_landmarks)
    proximidad_manos = determinar_proximidad_manos(results.pose_landmarks)
    print("Altura promedio de las manos:", altura_promedio_manos)
    print("Proximidad de las manos:", proximidad_manos)

# Guarda o muestra la imagen anotada.
cv2.imwrite('/mnt/data/imagen_anotada.jpg', annotated_image)
cv2.imshow('Pose Detection', annotated_image)
cv2.waitKey(0)
cv2.destroyAllWindows()

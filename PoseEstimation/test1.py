import cv2
import mediapipe as mp
import time

# Inicializar MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5)

def detectar_postura(image_path):
    image = cv2.imread(image_path)
    if image is None:
        print("No se pudo abrir la imagen.")
        return

    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    # Obtener tiempo de procesamiento
    start_time = time.time()
    results = pose.process(image_rgb)
    end_time = time.time()
    processing_time = end_time - start_time
    print(f'Tiempo de procesamiento: {processing_time:.2f} segundos')

    if results.pose_landmarks:
        mp_drawing = mp.solutions.drawing_utils
        mp_drawing.draw_landmarks(
            image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

        # Clasificar la postura
        clasificacion = clasificar_postura(results)
        print(f'Clasificación de la postura: {clasificacion}')
        
    else:
        print("No se detectaron puntos de referencia de la pose.")

    # Convertir la imagen de nuevo a BGR para mostrarla correctamente
    # image_bgr = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    cv2.imshow('Detección de Postura', image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# def clasificar_postura(resultados):
#     # Definir los puntos clave de interés
#     nariz = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.NOSE].y
#     codo_izquierdo = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW].y
#     codo_derecho = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ELBOW].y
#     muneca_izquierda = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST].y
#     muneca_derecha = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST].y
#     cadera_izquierda = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP].y
#     cadera_derecha = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP].y
#     rodilla_izquierda = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE].y
#     rodilla_derecha = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE].y
#     tobillo_izquierdo = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE].y
#     tobillo_derecho = resultados.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ANKLE].y

#     # Calcular alturas promedio para mayor precisión
#     altura_codo = (codo_izquierdo + codo_derecho) / 2
#     altura_muneca = (muneca_izquierda + muneca_derecha) / 2
#     altura_cadera = (cadera_izquierda + cadera_derecha) / 2
#     altura_rodilla = (rodilla_izquierda + rodilla_derecha) / 2
#     altura_tobillo = (tobillo_izquierdo + tobillo_derecho) / 2

#     # Clasificar la postura según la altura de la muñeca
#     if altura_muneca <= nariz:
#         return "Altura de la vista"
#     elif altura_muneca <= altura_codo:
#         return "Encima del codo"
#     elif altura_muneca <= altura_cadera:
#         return "Debajo del codo"
#     elif altura_muneca <= altura_rodilla:
#         return "Altura del muslo"
#     else:
#         return "Altura de la pantorrilla"

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
        clasificacion = "Altura de la vista"
    elif altura_muneca <= altura_codo:
        clasificacion = "Encima del codo"
    elif altura_muneca <= altura_cadera:
        clasificacion = "Debajo del codo"
    elif altura_muneca <= altura_rodilla:
        clasificacion = "Altura del muslo"
    else:
        clasificacion = "Altura de la pantorrilla"

    # Calcular la distancia de las manos con respecto al cuerpo (caderas)
    distancia_muneca_izquierda = abs(muneca_izquierda - cadera_izquierda)
    distancia_muneca_derecha = abs(muneca_derecha - cadera_derecha)
    
    # Determinar si las manos están pegadas o separadas del cuerpo
    umbral_distancia = 0.1  # Ajustar según sea necesario
    if distancia_muneca_izquierda < umbral_distancia or distancia_muneca_derecha < umbral_distancia:
        distancia_manos = "Pegadas al cuerpo"
    else:
        distancia_manos = "Separadas del cuerpo"

    return clasificacion, distancia_manos

# detectar_postura('imagenginsht.png')
detectar_postura('agachadopegado.png')

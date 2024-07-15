import cv2
import mediapipe as mp
import time

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5)

def clasificar_postura(resultados):
    # Definir los puntos clave de interés

    print(resultados.pose_landmarks.landmark)
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

    # Convertir la imagen de nuevo a RGB para mostrarla correctamente
    image_bgr = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    cv2.imshow('Detección de Postura', image_bgr)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
# detectar_postura('imagenginsht.png')
detectar_postura('./img/1.jpg')

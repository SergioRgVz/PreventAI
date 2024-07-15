import cv2
import mediapipe as mp
import math

import numpy as np

# Inicializar Mediapipe Pose
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

# Función para calcular el ángulo entre tres puntos
def calculate_angle_with_vertical(shoulder, elbow):
    vertical_vector = np.array([0, 1])  # Vector vertical
    arm_vector = np.array([elbow[0] - shoulder[0], elbow[1] - shoulder[1]])  # Vector del brazo
    
    unit_vertical = vertical_vector / np.linalg.norm(vertical_vector)
    unit_arm = arm_vector / np.linalg.norm(arm_vector)
    
    dot_product = np.dot(unit_vertical, unit_arm)
    angle = np.arccos(dot_product) * 180.0 / np.pi
    
    return angle
# Captura de video
image_path = './img/REBA/brazos/0.jpg'  # Reemplaza con la ruta de tu imagen
image = cv2.imread(image_path)


with mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5) as pose:
    # Convertir la imagen a RGB
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Realizar detección
    results = pose.process(image_rgb)
    
    # Extraer puntos de referencia
    try:
        landmarks = results.pose_landmarks.landmark
        
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
        
        # Visualizar ángulos en la imagen
        cv2.putText(image, f'{left_angle:.2f}', 
                    tuple(np.multiply(left_elbow, [image.shape[1], image.shape[0]]).astype(int)), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA
                    )
        cv2.putText(image, f'{right_angle:.2f}', 
                    tuple(np.multiply(right_elbow, [image.shape[1], image.shape[0]]).astype(int)), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA
                    )
        
        # Dibujar puntos de referencia en la imagen
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        
        # Mostrar imagen con ángulos
        cv2.imshow('Mediapipe Image', image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        
    except Exception as e:
        print(f"No se pudieron detectar los puntos de referencia: {e}")

# Guardar la imagen con los puntos de referencia y los ángulos dibujados
cv2.imwrite('output_image.jpg', image)

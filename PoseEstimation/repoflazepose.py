import cv2
import mediapipe as mp
import numpy as np

# Inicializar los módulos de dibujo y pose de MediaPipe
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose

# Color de fondo para la segmentación
BG_COLOR = (192, 192, 192)  # gris

def procesar_imagen(image_path):
    with mp_pose.Pose(
        static_image_mode=True,
        model_complexity=2,
        enable_segmentation=True,
        min_detection_confidence=0.5) as pose:
        
        # Leer la imagen
        image = cv2.imread(image_path)
        image_height, image_width, _ = image.shape
        
        # Convertir la imagen BGR a RGB antes de procesarla
        results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

        if not results.pose_landmarks:
            return None, "No se detectaron puntos de referencia en la pose."

        # Coordenadas de la nariz
        nariz_x = results.pose_landmarks.landmark[mp_pose.PoseLandmark.NOSE].x * image_width
        nariz_y = results.pose_landmarks.landmark[mp_pose.PoseLandmark.NOSE].y * image_height
        print(f'Coordenadas de la nariz: ({nariz_x}, {nariz_y})')

        # Crear una copia de la imagen para anotaciones
        annotated_image = image.copy()

        # Dibujar la segmentación en la imagen
        condition = np.stack((results.segmentation_mask,) * 3, axis=-1) > 0.1
        bg_image = np.zeros(image.shape, dtype=np.uint8)
        bg_image[:] = BG_COLOR
        annotated_image = np.where(condition, annotated_image, bg_image)

        # Dibujar los puntos de referencia de la pose en la imagen
        mp_drawing.draw_landmarks(
            annotated_image,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())

        # Guardar la imagen anotada
        output_path = 'annotated_image.png'
        cv2.imwrite(output_path, annotated_image)
        print(f'Imagen anotada guardada en {output_path}')

        return annotated_image, output_path

# Ejemplo de uso:
image_path = './img/GINSHT/4.jpg'
annotated_image, message = procesar_imagen(image_path)
if annotated_image is not None:
    cv2.imshow('Imagen Anotada', annotated_image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
else:
    print(message)

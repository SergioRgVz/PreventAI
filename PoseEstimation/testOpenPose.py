import cv2
import mediapipe as mp
import time
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5)

def detect_pose(image_path):
    image = cv2.imread(image_path)
    if image is None:
        print("No se pudo abrir la imagen.")
        return

    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    # Get time to process image
    start_time = time.time()
    results = pose.process(image_rgb)
    end_time = time.time()
    processing_time = end_time - start_time
    print(f'Tiempo de procesamiento: {processing_time:.2f} segundos')

    if results.pose_landmarks:
        mp_drawing = mp.solutions.drawing_utils
        mp_drawing.draw_landmarks(
            image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

    cv2.imshow('Pose Detection', image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# detect_pose('imagenpostura.jpg')
# detect_pose('imagenginsht.png')
detect_pose('agachadopegado.png')
# detect_pose('weirdpose.jpg')a
# detect_pose('weirdpose2.jpeg')
# detect_pose('pose1.jpg')


# Lanzar en WSL con python3 en este directorio
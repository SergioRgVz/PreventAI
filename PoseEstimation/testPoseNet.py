import tensorflow as tf
from tf_posenet import PoseNet
import cv2

# Función para cargar la imagen y prepararla para PoseNet
def load_and_preprocess_image(image_path):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = tf.image.resize(image, (257, 257))
    image = tf.expand_dims(image, axis=0)
    return image

# Inicializa PoseNet
model = PoseNet()

# Cargar y preparar la imagen
image_path = 'imagenpostura.jpg'
input_image = load_and_preprocess_image(image_path)

# Realizar la detección de pose
results = model.predict_single_pose(input_image)

# Procesar y mostrar los resultados
if results:
    print("Pose landmarks:")
    for landmark in results:
        print(landmark)


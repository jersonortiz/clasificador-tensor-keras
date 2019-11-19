import sys
sys.path.insert(0,"/opt/lib/python3.6/site-packages")
import os
os.environ['MKL_NUM_THREADS'] = '2'
os.environ['GOTO_NUM_THREADS'] = '2'
os.environ['OMP_NUM_THREADS'] = '2'
os.environ['openmp'] = 'True'
import numpy as np
from keras.preprocessing.image import load_img, img_to_array
from keras.models import load_model

longitud, altura = 150, 150
modelo = './modelo/modelo.h5'
pesos_modelo = './modelo/pesos.h5'
cnn = load_model(modelo)
cnn.load_weights(pesos_modelo)

def predict(file):
  x = load_img(file, target_size=(longitud, altura))
  x = img_to_array(x)
  x = np.expand_dims(x, axis=0)
  array = cnn.predict(x)
  result = array[0]
  answer = np.argmax(result)
  if answer == 0:
    print("pred: Perro")
  elif answer == 1:
    print("pred: Gato")
  elif answer == 2:
    print("pred: Gorila")

  #f = open ('salida.txt','w')
  #f.write(str(answer))
  #f.close()
  return answer

def getfilepath():
  if len(sys.argv)>=2:
    filePath=str(sys.argv[1])
  return filePath


predict(getfilepath())

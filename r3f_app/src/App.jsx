import { Text, Float, Environment, PresentationControls, ContactShadows, useGLTF,Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef,useState, useEffect } from 'react'
import './App.css'

function App() {
  
  const react = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/react-logo/model.gltf')
  const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mediaQuery.matches)

    const handler = (event) => setIsMobile(event.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const reactRef = useRef()
  useFrame((state, delta) => {
    reactRef.current.rotation.y += delta * 2
  })

  return (
    <>
      <color args={ [ '#241a1a' ] } attach="background" />

      <Environment preset="city" />

      <PresentationControls
        global
        rotation={ [ 0.1, 0, 0 ] }
        polar ={isMobile ? [ -0.2, 0.2 ] : [ -0.4, 0.2 ]}
        azimuth={isMobile ? [ -0.2, 0.2 ]:[ -1, 1 ] }
        damping={ 0.06 }
        snap>

          <primitive 
            ref={ reactRef } 
            object={ react.scene } 
            position={ [ 4.5, -3.5, 0 ] } 
            scale={ 0.8 } 
          />

          <Float speed={ isMobile ? 1 : 0.5 } rotationIntensity={ isMobile ? 1 : 0.5 } floatIntensity={ isMobile ? 1 :0.5 }>
                <rectAreaLight
                    width={ 2.5 }
                    height={ 1.65 }
                    intensity={ 85 }
                    color={ '#9BF2EA' }
                    rotation={ [ - 0.1, Math.PI, 0 ] }
                    position={ [ 0, 0.55, - 1.15 ] }
                />

                <primitive
                    object={ computer.scene }
                    position-x={ - 1 }
                    position-y={ - 1.2 }
                    // rotation-x={ 0.13 }
                >
                    <Html
                      transform
                      wrapperClass="htmlScreen"
                      distanceFactor={isMobile ? 1 : 1.17}
                      position={isMobile ? [-0.02, 1.4, -1.35] : [-0.01, 1.56, -1.4]}
                      scale={isMobile ? [1.15, 1.15, 1.15] : [1, 1, 1]}
                      rotation-x={-0.256}
                    >
                      <iframe src="./cv.html" />
                    </Html>

                </primitive>
              
              <Text
                  font="./subset_TaipeiSansTCBeta_Bold.woff"
                  fontSize={ 0.8 }
                  position={ [ 1.5, 0.75, 0.75 ] }
                  rotation-y={ -Math.PI / 5 }
                  maxWidth={ 2 }
                  textAlign="center"
                  color= "ivory"
              >
                  Hej 你好！🙌🏻
              </Text>
              <Html
                  transform
                  position={[2, -1, 0]}
                  distanceFactor={3}
                >
                  <img src={`${import.meta.env.BASE_URL}Steve.gif`} alt="Steve GIF" style={{ width: '100px' }} />
              </Html>
          </Float>
      </PresentationControls>
      
      <ContactShadows
        position-y={ - 1.4 }
        opacity={ 0.4 }
        scale={ 5 }
        blur={ 2.4 }
      />

    </>
  )
} 

export default App
import { Text, Float, Environment, PresentationControls, ContactShadows, useGLTF,Html } from '@react-three/drei'
import { useFrame,useThree } from '@react-three/fiber'
import { useRef,useState, useEffect } from 'react'
import * as THREE from 'three'
import './App.css'

function App() {
  
  const react = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/react-logo/model.gltf')
  const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
  const [isMobile, setIsMobile] = useState(false)
  const [focusIframe, setFocusIframe] = useState(false)
  const { camera } = useThree()

  const defaultPosition = new THREE.Vector3(-5, 2 , 5)      
  const focusPosition = new THREE.Vector3(-0.5, 2, 2.5)      

  const defaultLookAt = new THREE.Vector3(0, 0, 0)
  const focusLookAt = new THREE.Vector3(0, 0.5, -1)

  useEffect(() => {
    react.scene.traverse((child) => {
      if (child.isMesh && child.material && child.material.isMeshStandardMaterial) {
        const mat = child.material
        mat.color.set('orange')       // 或自訂亮一點的色系
        mat.metalness = 0
        mat.roughness = 1
        mat.emissive.set('black')
        mat.needsUpdate = true
      }
    })
  }, [react])
  
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
 
    const targetPosition = focusIframe ? focusPosition : defaultPosition
    const targetLookAt = focusIframe ? focusLookAt : defaultLookAt

    state.camera.position.lerp(targetPosition, 0.03)

    const currentDir = state.camera.getWorldDirection(new THREE.Vector3())
    const targetDir = targetLookAt.clone().sub(state.camera.position)
    const lerpedDir = currentDir.lerp(targetDir, 0.01)
    const lookAtTarget = state.camera.position.clone().add(lerpedDir)
    state.camera.lookAt(lookAtTarget)
  })

  return (
    <>
      <color args={ [ '#241a1a' ] } attach="background" />

      {/* <Environment preset="city"/> */}

      <ambientLight intensity={ 1 } />
      <PresentationControls
        global
        rotation={ [ 0.1, 0, 0 ] }
        polar ={isMobile ? [ -0.2, 0.2 ] : [ -0.4, 0.2 ]}
        azimuth={isMobile ? [ -0.2, 0.2 ]:[ -0.8, 0.8 ] }
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
                      position={isMobile ? [-0.04, 1.4, -1.35] : [-0.01, 1.56, -1.4]}
                      scale={isMobile ? [1.15, 1.15, 1.15] : [1, 1, 1]}
                      rotation-x={-0.256}
                    >
                      <div
                        onMouseEnter={!isMobile ? () => setFocusIframe(true) : undefined}
                        onMouseLeave={!isMobile ? () => setFocusIframe(false) : undefined}         
                        style={{
                          width: '1024px',
                          height: '670px',
                          position: 'absolute',
                          zIndex: 999,
                          display: 'contents',     // ✅ 讓這層不影響尺寸與樣式
                          pointerEvents: 'auto',
                        }}
                      >
                        <iframe
                          className="htmlScreen"
                          src="./cv.html"
                        />
                      </div>
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
                  position={[ 1.75, 0.8, -2]}
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
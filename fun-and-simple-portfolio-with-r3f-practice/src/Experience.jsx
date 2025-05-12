import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'


export default function Experience()
{
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
    const star = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/star/model.gltf')
    const textRef = useRef()
    const starRef = useRef()
    const [textRightEdge, setTextRightEdge] = useState(null)

    useFrame((state, delta) => {
        if (starRef.current) {
            starRef.current.rotation.y += delta * 5 // 控制旋轉速度
        }
    })

    return <>

        <color args={ [ '#241a1a' ] } attach="background" />

        <Environment preset="city" />
        
        <PresentationControls
            global
            rotation={ [ 0.13, 0.1, 0 ] }
            polar={ [ - 0.4, 0.2 ] }
            azimuth={ [ - 1, 0.75 ] }
            damping={ 0.3 }
            snap
        >
            <Float rotationIntensity={ 0.4 } >  
                <rectAreaLight
                    width={ 2.5 }
                    height={ 1.65 }
                    intensity={ 65 }
                    color={ '#36BFB1' }
                    rotation={ [ - 0.1, Math.PI, 0 ] }
                    position={ [ 0, 0.55, - 1.15 ] }
                />

                <primitive
                    object={ computer.scene }
                    position-y={ - 1.2 }
                    // rotation-x={ 0.13 }
                >
                    <Html
                        transform
                        wrapperClass="htmlScreen"
                        distanceFactor={ 1.17 }
                        position={ [ 0, 1.56, - 1.4 ] }
                        rotation-x={ - 0.256 }
                    >
                        <iframe src="./cv.html" />
                    </Html>
                </primitive>

                {textRightEdge && (
                    <primitive
                        ref={starRef}
                        object={star.scene}
                        position={textRightEdge}
                        scale={0.3}
                    />
                )}

                <Text
                    ref={textRef}
                    font="./TaipeiSansTCBeta_Bold.woff"
                    fontSize={ 0.5 }
                    position={ [ 2, 0.75, 0.75 ] }
                    rotation-y={ - 1.25 }
                    maxWidth={ 2 }
                    onSync={(text) => {
                        const size = text.geometry.boundingBox
                        if (size) {
                            const rightX = text.position.x + size.max.x
                            const y = text.position.y
                            const z = text.position.z
                            setTextRightEdge([rightX-1.2, y-0.4, z-0.1]) // 微調位置
                        }
                    }}
                >
                    Welcome🙌🏻 你好!
                </Text>
            </Float>
        </PresentationControls>

        <ContactShadows
            position-y={ - 1.4 }
            opacity={ 0.4 }
            scale={ 5 }
            blur={ 2.4 }
        />

    </>
}
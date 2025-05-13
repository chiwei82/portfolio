import './index.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Loader } from '@react-three/drei'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))
const isMobile = window.matchMedia('(max-width: 768px)').matches

root.render(
  <>
    <Canvas
      className="r3f"
      camera={{
        fov: isMobile ? 120 : 60,
        near: 0.1,
        far: 2000,
        position: [-3, 1.5, 4],
        zoom: 1.5
      }}
    >
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </Canvas>

    <Loader />
  </>
)

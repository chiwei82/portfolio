import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div style={{
        fontSize: '1.5rem',
        font: "./TaipeiSansTCBeta_Bold.woff",
        color: 'white',
        background: 'rgba(0,0,0,0.6)',
        padding: '1rem 2rem',
        borderRadius: '12px',
        whiteSpace: 'nowrap'
      }}>
        加載中... {Math.floor(progress)}%
      </div>
    </Html>
  )
}

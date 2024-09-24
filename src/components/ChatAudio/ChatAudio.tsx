import { Button } from '@mui/material'
import { useRef, useState } from 'react'


export type ChatAudioInputProps = {
  onSend: (blob: Blob) => void
  onDelete: () => void
}

export function ChatAudio (props: ChatAudioInputProps) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [blob, setBlob] = useState<Blob | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)
    recorder.start()
    recorder.ondataavailable = (event) => {
      const blob = new Blob([event.data], { type: 'audio/webm' })
      audioRef.current!.src = URL.createObjectURL(blob)
      setBlob(blob)
    }
    setMediaStream(stream)
    setMediaRecorder(recorder)
  }

  const handleStop = () => {
    mediaStream?.getTracks()[0].stop()
    mediaRecorder?.stop()
    setMediaStream(null)
    setMediaRecorder(null)
  }

  const isRecording = Boolean(mediaStream && mediaRecorder)

  return (
    <div className="flex">
      <Button onClick={props.onDelete} disabled={isRecording}>
        X
      </Button>
      <audio controls ref={audioRef} />
      {!isRecording && (
        <Button onClick={handleStart}>
          Start
        </Button>
      )}
      {isRecording && (
        <Button onClick={handleStop}>
          Stop
        </Button>
      )}
      {blob && (
        <Button
          onClick={() => {
            props.onSend(blob)
          }}
        >
          Send
        </Button>
      )}
    </div>
  )
}
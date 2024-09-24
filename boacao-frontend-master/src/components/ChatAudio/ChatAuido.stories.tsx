import { ChatAudio } from './ChatAudio'

export default {
  title: 'Components/ChatAudio'
}

export const Example = () => {
  return (
    <ChatAudio
      onDelete={() => {}}
      onSend={() => {}}
    />
  )
}
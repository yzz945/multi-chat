import { useState } from 'react'
import { cx } from '~/utils'
import { AiFillFileMarkdown } from 'react-icons/ai'
import { ChatMessageModel } from '~types'
import Button from '../Button'
import Dialog from '../Dialog'
import MarkdownView from './MarkdownView'

interface Props {
  open: boolean
  onClose: () => void
  messages: ChatMessageModel[]
}

const ShareDialog = (props: Props) => {
  const [mode, setMode] = useState<'markdown' | 'sharegpt' | undefined>()
  return (
    <Dialog
      title="分享对话"
      open={props.open}
      onClose={props.onClose}
      className={cx('rounded-xl', mode ? 'w-[800px] h-[400px]' : 'w-[600px] h-[250px]')}
    >
      {(() => {
        if (mode === 'markdown') {
          return <MarkdownView messages={props.messages} />
        }

        return (
          <div className="flex flex-col gap-5 justify-center items-center p-5 h-full">
            <Button
              text="Markdown"
              color="primary"
              icon={<AiFillFileMarkdown className="mr-1" />}
              onClick={() => setMode('markdown')}
            />

          </div>
        )
      })()}
    </Dialog>
  )
}

export default ShareDialog

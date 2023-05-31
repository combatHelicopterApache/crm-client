import { message as notify, MessageArgsProps } from 'antd'
import { NoticeType, MessageType } from 'antd/es/message/interface'

export const notification = (
  type: NoticeType,
  message: MessageType,
  ...rest: any[]
): MessageArgsProps => {
  return notify[type](message, ...rest)
}

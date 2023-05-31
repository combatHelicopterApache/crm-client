import { message as notify, MessageArgsProps } from 'antd'
import { NoticeType } from 'antd/es/message/interface'

export const notification = (
  type: NoticeType,
  message: string,
  ...rest: any[]
): MessageArgsProps => {
  return notify[type](message, ...rest)
}

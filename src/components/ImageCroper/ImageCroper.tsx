import { message, Popconfirm, Upload, UploadProps } from 'antd'
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from 'antd/lib/upload/interface'
import { useEffect, useState } from 'react'
import ImgCrop from 'antd-img-crop'
import { CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar } from 'components/Avatar/Avatar'
import styled from 'styled-components'

export const ImageCropper = ({
  image,
  onUploadFinish,
  onDeleteImage,
}: {
  image: string | null
  onUploadFinish: (res: File) => void
  onDeleteImage: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  useEffect(() => {
    if (image) setImageUrl(image)
  }, [image])

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const handleUploadFile = async options => {
    const { file, onSuccess, onError } = options
    try {
      onSuccess('ok')
      onUploadFinish(file)
    } catch (error) {
      onError({ error })
      console.error(error)
    }
  }

  return (
    <ImgCrop rotationSlider showGrid cropShape='rect' minZoom={0.5} maxZoom={2}>
      <Upload
        customRequest={handleUploadFile}
        listType='picture-card'
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <ImageWrapper>
            <Popconfirm
              title='Delete this image?'
              onConfirm={e => {
                e?.stopPropagation()
                setImageUrl('')
                onDeleteImage()
              }}
              onCancel={e => e?.stopPropagation()}
            >
              <CloseOutlined
                onClick={e => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  right: 0,
                  padding: 4,
                  color: 'red',
                }}
              />
            </Popconfirm>
            <Avatar
              className='company_image'
              pictureURL={imageUrl}
              size={100}
            />
          </ImageWrapper>
        ) : (
          uploadButton
        )}
      </Upload>
    </ImgCrop>
  )
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const ImageWrapper = styled.div`
  position: relative;
  .company_image {
    border-radius: 0;
  }
`

import React, { useState, useEffect } from 'react'
import { Spin, Empty, Tooltip } from 'antd'
import { authSelector } from 'features/Login/authSlice'
import { useAppSelector } from 'store/store'
import { getCompanyById } from 'api/Companies'
import styled from 'styled-components'
import { ImageCropper } from 'components/ImageCroper/ImageCroper'
import { Row } from 'components/UI/Row'
import { EditableBlock } from 'components/UI/EditableBlock'
import { CustomInput } from 'components/Input/CustomInput'
import { Company } from './types'
import ReactInputMask from 'react-input-mask'
import moment from 'moment-timezone'
import { TextArea } from 'components/TextArea/TextArea'
import { P } from 'molecules/P/P'

const mask = '+38(999) 99-99-999'

export const CompanyInfo = () => {
  const { auth_user } = useAppSelector(authSelector)
  const [company, setCompany] = useState<Company>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true)
      try {
        const res = await getCompanyById({ id: auth_user?.company_id })
        setCompany(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (auth_user?.company_id) fetchCompany()
  }, [auth_user?.company_id])

  return (
    <Spin spinning={loading}>
      <Wrapper>
        <Row title='Company Logo'>
          <ImageCropper image={company?.logo} />
        </Row>
        <Row title='Status'>
          <EditableBlock
            disabled
            value={company?.status === 1 ? 'Active' : 'Inactive'}
          >
            <CustomInput value={company?.status} />
          </EditableBlock>
        </Row>
        <Row title='Title'>
          <EditableBlock value={company.title}>
            <CustomInput value={company.title} />
          </EditableBlock>
        </Row>

        <Row title='Company Name'>
          <EditableBlock value={company?.company_name}>
            <CustomInput value={company?.company_name} />
          </EditableBlock>
        </Row>

        <Row title='Company Email'>
          <EditableBlock value={company?.company_email}>
            <CustomInput value={company?.company_email} />
          </EditableBlock>
        </Row>
        <Row title='Company Phone'>
          <EditableBlock value={company?.admin_phone}>
            <ReactInputMask mask={mask} value={company?.admin_phone}>
              {() => (
                <CustomInput
                  placeholder='Company Phone'
                  // status={
                  //   errors?.company_phone?.message ? 'error' : undefined
                  // }
                  // error={errors?.company_phone?.message}
                />
              )}
            </ReactInputMask>
          </EditableBlock>
        </Row>
        <Row title='Company Address'>
          <EditableBlock value={company?.address}>
            <CustomInput value={company?.address} />
          </EditableBlock>
        </Row>
        <Row title='Owner Name'>
          <EditableBlock disabled value={company?.company_name}>
            <CustomInput value={company?.company_name} />
          </EditableBlock>
        </Row>
        <Row title='Company identifier'>
          <EditableBlock disabled value={company?.company_identifier}>
            <CustomInput value={company?.company_identifier} />
          </EditableBlock>
        </Row>
        <Row title='Created at'>
          <EditableBlock
            disabled
            value={moment(company.created_at).format('DD/MM/YYYY')}
          >
            <CustomInput value={company?.company_identifier} />
          </EditableBlock>
        </Row>
        <Row title='Notes'>
          <EditableBlock value={company?.notes}>
            <TextArea value={company?.notes} />
          </EditableBlock>
        </Row>
        <Row title='Brands'>
          {company?.brands?.map((brand, idx) => (
            <BrandWrapper key={idx}>
              {brand?.logo ? (
                <img src={brand?.logo} alt={brand?.title} />
              ) : (
                <Tooltip title='Image is empty'>
                  {Empty.PRESENTED_IMAGE_SIMPLE}
                </Tooltip>
              )}

              <P>{brand?.title}</P>
            </BrandWrapper>
          ))}
        </Row>
      </Wrapper>
    </Spin>
  )
}

const Wrapper = styled.div``

const BrandWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: ${({ theme }) => `1px dashed ${theme.colors.text}`};
  height: 150px;
  width: 150px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & img {
    width: 100px;
    display: block;
    height: auto;
    border-radius: 4px;
    border: 1px dashed ${({ theme }) => theme.colors.text};
  }
`
const IconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  & svg {
    color: ${({ theme }) => theme.colors.text};
  }
`

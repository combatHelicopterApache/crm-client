import React, { useState, useEffect, ChangeEvent } from 'react'
import styled from 'styled-components'
import { Drawer } from 'components/Drawer/Drawer'
import { getBrandById, patchBrand } from 'api/Brands'
import { H2 } from 'molecules/H2/H2'
import { P } from 'molecules/P/P'
import { notification } from 'components/Notification/Notification'

import { Select } from 'components/Select/Select'
import moment from 'moment-timezone'
import { CustomButton } from 'components/Button/CustomButton'
import { Popconfirm, Tooltip, Empty } from 'antd'
import { Span } from 'molecules/Span/Span'

interface IProps {
  visible: boolean
  onClose: () => void
  brandId: string
}

export const BrandInfo = ({ visible, onClose, brandId }: IProps) => {
  const [brand, setBrand] = useState(null)
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({})
  const [edit, setEdit] = useState(false)
  const [editedField, setEditedField] = useState({})

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEdit(true)
    setState(prev => ({ ...prev, [name]: value }))
    setEditedField(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const { data } = await patchBrand(brand.id, editedField)
      setEdit(false)
      notification('success', data.message)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchBrand = async () => {
      setLoading(true)
      try {
        const { data } = await getBrandById(brandId)
        setBrand(data)
        setState(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (brandId) fetchBrand()
  }, [brandId])
  return (
    <Drawer width={600} onClose={onClose} open={visible} destroyOnClose>
      <Wrapper>
        <H2
          style={{
            margin: '0 0 10px 0',
            borderBottom: '1px solid white',
            paddingBottom: '10px',
          }}
        >
          {brand?.title || '-'}
        </H2>
        <Row>
          <P>Status</P>
          <P>
            <Select
              style={{ width: '100%' }}
              options={[
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' },
              ]}
              value={state?.active}
              onChange={value =>
                onChange({
                  target: {
                    name: 'active',
                    value: value,
                  },
                })
              }
              placeholder='Status'
            />
          </P>
        </Row>
        <Row>
          <P>Description</P>
          <P>{brand?.description || '-'}</P>
        </Row>
        <Row>
          <P>Total Platforms</P>
          <P>{brand?.platform?.length || 0}</P>
        </Row>
        <Row>
          <P>Total Sites</P>
          <P>{brand?.site?.length || 0}</P>
        </Row>
        <Row>
          <P>Total Company Using</P>
          <P>{brand?.site?.length || 0}</P>
        </Row>
        <Row>
          <P>Date Created</P>
          <P>
            {brand?.created_at
              ? moment(brand?.created_at).format('DD/MM/YYYY')
              : '-'}
          </P>
        </Row>
        <Row style={{ borderBottom: '1px solid white', padding: '10px 0' }}>
          <P>Platforms</P>
          <P>
            {brand?.platform?.length ? (
              brand?.platform?.map((p, i) => (
                <BrandWrapper key={i}>
                  <P>{p.name}</P>
                </BrandWrapper>
              ))
            ) : (
              <Empty description={<P>No platforms yet.</P>} />
            )}
          </P>
        </Row>
        <Row style={{ borderBottom: '1px solid white', padding: '10px 0' }}>
          <P>Sites</P>
          <P>
            {brand?.site?.length ? (
              brand?.site?.map((s, i) => (
                <BrandWrapper key={i}>
                  <P>{s?.site_name || '-'}</P>
                  <Tooltip
                    title={s?.site_domains?.map(d => (
                      <P>{d}</P>
                    ))}
                  >
                    <P>{s?.site_domains?.[0]?.slice(0, 5) + '...' || '-'}</P>
                  </Tooltip>
                </BrandWrapper>
              ))
            ) : (
              <Empty description={<P>No sites yet.</P>} />
            )}
          </P>
        </Row>
        <Controls>
          <CustomButton disabled buttonType='remove'>
            <Span>Delete</Span>
          </CustomButton>
          {edit && (
            <Popconfirm
              title='Are you sure?'
              onCancel={() => {
                setState(prev => ({ ...prev, active: brand.active }))
                setEditedField({})
                setEdit(false)
              }}
              onConfirm={handleSave}
            >
              <CustomButton buttonType='add'>
                <Span>Save</Span>
              </CustomButton>
            </Popconfirm>
          )}
        </Controls>
      </Wrapper>
    </Drawer>
  )
}

const Wrapper = styled.div``

const Row = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  margin-bottom: 20px;
  align-items: center;
`
const Controls = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`

const BrandWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px dashed ${({ theme }) => theme.colors.text};
`

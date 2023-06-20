import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Spin, Popconfirm } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { getCompanyById, patchCompany } from 'api/companies'
import { H2 } from 'molecules/H2/H2'
import { P } from 'molecules/P/P'
import { CompanyStatus } from './CompanyForm'
import { Select } from 'components/Select/Select'
import moment from 'moment-timezone'
import { CustomButton } from 'components/Button/CustomButton'
import { Span } from 'molecules/Span/Span'
import { notification } from 'components/Notification/Notification'
import { loginToCompany } from 'features/Login/authSlice'
import { useDispatch } from 'react-redux'

export const CompanyInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [company, setCompany] = useState({})
  const { id: companyId } = useParams()
  const [state, setState] = useState()
  const [edit, setEdit] = useState(false)
  const [editedValue, setEditedValue] = useState({})

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true)
      try {
        const { data } = await getCompanyById({ id: companyId })
        setState(data)
        setCompany(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (companyId) fetchCompany()
  }, [companyId])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEdit(true)
    setState(prev => ({ ...prev, [name]: value }))
    setEditedValue(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const { data } = await patchCompany(editedValue, company.id)

      setEdit(false)
      notification('success', data.message)
    } catch (error) {
      console.error(error)
    }
  }

  const onLoginToCompany = async () => {
    try {
      await dispatch(loginToCompany({ company_id: companyId }))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Wrapper>
      <Spin spinning={loading}>
        <H2
          style={{
            borderBottom: '1px solid white',
            paddingBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {company?.company_name || ''}
          <CustomButton onClick={onLoginToCompany} buttonType='filter'>
            <Span>Login to company</Span>
          </CustomButton>
        </H2>

        <Row>
          <P>Company Status</P>
          <P>
            {' '}
            <Select
              style={{ width: '100%' }}
              options={[
                { value: CompanyStatus.Active, label: 'Active' },
                { value: CompanyStatus.Inactive, label: 'Inactive' },
                { value: CompanyStatus.Pending, label: 'Pending' },
              ]}
              value={state?.status}
              onChange={value =>
                onChange({
                  target: {
                    name: 'status',
                    value: value,
                  },
                })
              }
              placeholder='Status'
            />
          </P>
        </Row>
        <Row>
          <P>Company Phone</P>
          <P>{company?.company_phone || '-'}</P>
        </Row>
        <Row>
          <P>Company Email</P>
          <P>{company?.company_email || '-'}</P>
        </Row>
        <Row>
          <P>Company Address</P>
          <P>{company?.address || '-'}</P>
        </Row>
        <Row>
          <P>Date Created</P>
          <P>
            {company?.created_at
              ? moment(company?.created_at).format('DD/MM/YYYY')
              : '-'}
          </P>
        </Row>
        <Row>
          <P>Company Identifier</P>
          <P>{company?.company_identifier || '-'}</P>
        </Row>
        <Row>
          <P>Total Active Users</P>
          <P>1 </P>
        </Row>
        <Row>
          <P>Total Leads</P>
          <P>1 </P>
        </Row>
        <Row>
          <P>Total Officess</P>
          <P>1 </P>
        </Row>
        <Row style={{ borderBottom: '1px solid white', paddingBottom: '10px' }}>
          <P>Total Brands</P>
          <P>1 </P>
        </Row>

        <Row>
          <P>Admin Name</P>
          <P>{company?.admin_name || '-'}</P>
        </Row>

        <Row>
          <P>Admin Phone</P>
          <P>{company?.admin_phone || '-'}</P>
        </Row>
        <Row style={{ borderBottom: '1px solid white', paddingBottom: '10px' }}>
          <P>Admin Email</P>
          <P>{company?.admin_email || '-'}</P>
        </Row>
        <Row>
          <P>Brands</P>
          <P style={{ display: 'flex', gap: '10px' }}>
            {[company?.brands]?.map(brand => (
              <BrandWrapper key={brand?.title}>
                <P>{brand?.title}</P>
              </BrandWrapper>
            ))}
          </P>
        </Row>
        <Controls>
          <CustomButton buttonType='remove'>
            <Span>Delete</Span>
          </CustomButton>
          {edit && (
            <Popconfirm
              title='Are you sure?'
              onCancel={() => {
                setState(prev => ({ ...prev, status: company.status }))
                setEditedValue({})
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
      </Spin>
    </Wrapper>
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

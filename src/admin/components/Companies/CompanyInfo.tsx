import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import { getCompanyById, updateCompany } from 'api/companies'

export const CompanyInfo = () => {
  const [loading, setLoading] = useState(false)
  const [company, setCompany] = useState({})
  const { id: companyId } = useParams()

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true)
      try {
        const res = await getCompanyById({ id: companyId })
        setCompany(res)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (companyId) fetchCompany()
  }, [companyId])

  return (
    <Wrapper>
      <Spin spinning={loading}></Spin>
    </Wrapper>
  )
}

const Wrapper = styled.div``

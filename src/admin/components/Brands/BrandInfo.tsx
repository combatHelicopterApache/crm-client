import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Drawer } from 'components/Drawer/Drawer'
import { getBrandById } from 'api/Brands'

interface IProps {
  visible: boolean
  onClose: () => void
  brandId: string
}

export const BrandInfo = ({ visible, onClose, brandId }: IProps) => {
  const [brand, setBrand] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBrand = async () => {
      setLoading(true)
      try {
        const res = await getBrandById(brandId)
        setBrand(res)
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
      <Wrapper>BrandInfo</Wrapper>
    </Drawer>
  )
}

const Wrapper = styled.div``

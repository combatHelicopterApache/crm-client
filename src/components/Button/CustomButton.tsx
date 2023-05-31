import React, { FC } from 'react'
import { Button, ButtonProps } from 'antd'
import styled from 'styled-components'

interface IProps extends ButtonProps {
  buttonType?: 'add' | 'remove' | 'filter' | 'upload'
  children: React.ReactNode
}

export const CustomButton: FC<IProps> = ({
  buttonType = 'add',
  children,
  ...rest
}) => {
  return (
    <Wrapper>
      <Button className={buttonType} {...rest}>
        {children}
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & .add {
    font-size: 0.8rem;
    line-height: 0.8rem;
    padding: 5px 1rem;
    height: auto;
    background-color: transparent;
    border: 1px solid #01b41f;
    color: #ffffff;
    outline: none;
    margin-right: 1rem;
  }

  & .add span:nth-child(2) {
    margin-left: 0.6rem;
  }

  & .add:hover {
    background-color: #01b41f;
    color: #ffffff;
    border: 1px solid #01b41f;
  }

  & .remove {
    font-size: 0.8rem;
    line-height: 0.8rem;
    padding: 5px 1rem;
    height: auto;
    background-color: transparent;
    border: 1px solid #b40101;
    color: #ffffff;
    outline: none;
    margin-right: 1rem;
  }

  & .remove span:nth-child(2) {
    margin-left: 0.6rem;
  }

  & .remove:hover {
    background-color: #b40101;
    color: #ffffff;
    border: 1px solid #b40101;
  }

  & .filter {
    font-size: 0.8rem;
    line-height: 0.8rem;
    padding: 5px 1rem;
    height: auto;
    background-color: transparent;
    border: 1px solid #01b47e;
    color: #ffffff;
    outline: none;
    margin-right: 1rem;
  }

  & .filter span:nth-child(2) {
    margin-left: 0.6rem;
  }

  & .filter:hover {
    background-color: #01b47e;
    color: #ffffff;
    border: 1px solid #01b47e;
  }

  & .upload {
    font-size: 0.8rem;
    line-height: 0.8rem;
    padding: 5px 1rem;
    height: auto;
    background-color: transparent;
    border: 1px solid #0264e1;
    color: #ffffff;
    outline: none;
    margin-right: 1rem;
  }

  & .upload span:nth-child(2) {
    margin-left: 0.6rem;
  }

  & .upload:hover {
    background-color: #0264e1;
    color: #ffffff;
    border: 1px solid #0264e1;
  }

  & .filters {
    font-size: 0.8rem;
    line-height: 0.8rem;
    padding: 5px 1rem;
    height: auto;
    background-color: transparent;
    border: 1px solid #e19a02;
    color: #ffffff;
    outline: none;
    margin-right: 1rem;
  }

  & .filters span:nth-child(2) {
    margin-left: 0.6rem;
  }

  & .filters:hover {
    background-color: #e19a02;
    color: #ffffff;
    border: 1px solid #e19a02;
  }
`

import { hideVisually, rgba } from 'polished'
import styled from 'styled-components'
import ReactPaginate from 'react-paginate'
import { Black, Botticelli, Gray, SemiGray, White } from '@/theme/palette'
import ArrowIcon from './assets/arrow.svg?react'
import DotsIcon from './assets/dots.svg?react'

export const Container = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin: 2rem 0 0;

  & a {
    user-select: none;
    width: 36px;
    height: 36px;
    background: ${White};
    box-shadow: 7px 9px 30px ${rgba(Botticelli, 0.15)};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    color: ${Black};
    margin: 0 5px;
  }

  & > .selected > a {
    background: ${SemiGray};
    color: ${White};
    cursor: default;
  }

  & > .disabled > a {
    cursor: default;
    color: ${SemiGray};
  }

  & > :not(.selected):not(.disabled) {
    &:hover > a {
      color: ${SemiGray};
    }

    &:active > a {
      color: ${Gray};
    }
  }

  &.no-arrows > .previous,
  &.no-arrows > .next {
    ${hideVisually()};
  }
`

export const PreviousIcon = styled(ArrowIcon)``

export const NextIcon = styled(ArrowIcon)`
  transform: rotate(180deg);
`

export const BreakIcon = styled(DotsIcon)`
  transform: rotate(90deg);
`

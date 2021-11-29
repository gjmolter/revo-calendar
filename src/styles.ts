/* istanbul ignore file */
//Ignoring jest coverage on this file

import styled, { css, keyframes } from "styled-components";
import { CloseDetailProps, DayButtonProps, DayProps, DetailsProps, MonthButtonProps, SidebarProps } from "./typings";

//Animations
const slide = (w: string, inOut: boolean) => keyframes`
    from {
      width: ${inOut ? "0px" : w};
      min-width: ${inOut ? "0px" : w};
    }
    to {
      width: ${inOut ? w : "0px"};
      min-width: ${inOut ? w : "0px"};
    }
`;
const slideToggler = (v: string, lr: string, inOut: boolean) => keyframes`
    from {
        ${
          lr === "left"
            ? `
        left: ${inOut ? "0px" : v};
        `
            : `
        right: ${inOut ? "0px" : v};
        `
        }
    }
    to {
        ${
          lr === "left"
            ? `
        left: ${inOut ? v : "0px"};
        `
            : `
        right: ${inOut ? v : "0px"};
        `
        }
    }
  `;

//Components

export const Calendar = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  height: 520px;

  & * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
`;

export const Sidebar = styled.div<SidebarProps>`
  ${(props) =>
    props.sidebarOpen
      ? css`
          width: ${(props) => props.theme.sidebarWidth};
          min-width: ${(props) => props.theme.sidebarWidth};
          box-shadow: 0 0 10px #0004;
        `
      : css`
          width: 0px;
          min-width: 0px;
        `}
  background: ${(props) => props.theme.primaryColor};
  position: relative;
  left: 0;
  overflow: hidden;
  z-index: 12;
  & > div:first-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    color: ${(props) => props.theme.secondaryColor};
    span {
      font-size: 1.4rem;
      padding: 10px;
      color: ${(props) => props.theme.secondaryColor};
    }
    button {
      background: none;
      border: none;
      width: 20px;
      display: flex;
    }
  }
  ul {
    list-style: none;
    padding-bottom: 1rem;
    padding-left: 0;
  }
  ${(props) =>
    props.animatingIn
      ? css`
          animation: ${slide(props.theme.sidebarWidth, true)} ${(props) => props.theme.animationSpeed};
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        `
      : ""}
  ${(props) =>
    props.animatingOut
      ? css`
          animation: ${slide(props.theme.sidebarWidth, false)} ${(props) => props.theme.animationSpeed};
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        `
      : ""}
`;

export const MonthButton = styled.button<MonthButtonProps>`
  border: none;
  background: ${(props) => (props.current ? props.theme.secondaryColor : "none")};
  font-size: 1rem;
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: left;
  padding: 0.4rem 0.5rem;
  color: ${(props) => (props.current ? props.theme.primaryColor : props.theme.secondaryColor)};
  border-radius: 0;
  &:hover {
    background: ${(props) => props.theme.secondaryColor};
    color: ${(props) => props.theme.primaryColor};
  }
`;

export const CloseSidebar = styled.button<SidebarProps>`
  position: absolute;
  top: 0;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  border: none;
  z-index: 10;
  background: ${(props) => props.theme.primaryColor};
  left: ${(props) => (props.sidebarOpen ? props.theme.sidebarWidth : 0)};
  z-index: ${(props) => (props.sidebarOpen ? 12 : "auto")};

  ${(props) =>
    props.animatingIn
      ? css`
          animation: ${slideToggler(props.theme.sidebarWidth, "left", true)} ${(props) => props.theme.animationSpeed};
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        `
      : ""}
  ${(props) =>
    props.animatingOut
      ? css`
          animation: ${slideToggler(props.theme.sidebarWidth, "left", false)} ${(props) => props.theme.animationSpeed};
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        `
      : ""}
`;

export const Day = styled.div<DayProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 100%;
  margin: 5px 0;
  grid-column-start: ${(props) => (props.firstDay ? props.firstOfMonth : "auto")};
`;

export const DayButton = styled.button<DayButtonProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 50%;
  max-width: 55px;
  max-height: 55px;
  width: max(1rem, 5vw);
  height: max(1rem, 5vw);
  min-width: 32px;
  min-height: 32px;
  background: ${(props) => (props.current ? `${props.theme.primaryColor} !important` : "none")};
  border: ${(props) => (props.today ? `2px solid ${props.theme.todayColor} !important` : "none")};
  font-size: min(1rem, 5vw);
  color: ${(props) => (props.current ? `${props.theme.secondaryColor} !important` : props.theme.textColor)};
  position: relative;
  &:hover {
    background: ${(props) => props.theme.primaryColor50} !important;
  }
  ${(props) =>
    props.hasEvent
      ? css`
          span {
            position: relative;
            &::after {
              content: "";
              background: ${(props) => props.theme.indicatorColor};
              width: 100%;
              height: 2px;
              position: absolute;
              bottom: -2px;
              left: 0;
            }
          }
        `
      : ""}
`;

export const Inner = styled.div`
  padding: 1rem;
  flex-grow: 1;
  max-width: 100%;
  background: ${(props) => props.theme.secondaryColor};
  -ms-overflow-style: none;
  scrollbar-width: none;
  & > div {
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    & > div:first-of-type {
      text-align: center;
      display: grid;
      grid-template-columns: repeat(7, minmax(30px, 1fr));
      margin-bottom: 1rem;
      color: ${(props) => props.theme.textColor};
      font-size: min(0.85rem, 3.5vw);
    }
    & > div:last-of-type {
      display: grid;
      grid-template-columns: repeat(7, minmax(30px, 1fr));
    }
  }
  & > h1 {
    text-align: center;
    margin-bottom: 1rem;
    padding-bottom: 10px;
    color: ${(props) => props.theme.secondaryColor};
  }
`;

export const Event = styled.div`
  width: 90%;
  padding: 10px 15px;
  border-radius: 20px;
  background: ${(props) => props.theme.secondaryColor};
  transition: box-shadow ${(props) => props.theme.animationSpeed} ease;

  & > p {
    font-size: 1.1rem;
    text-align: left;
    color: ${(props) => props.theme.primaryColor};
    margin-bottom: 0.7rem;
    word-break: break-word;
  }
  & > div {
    display: flex;
    gap: 1rem;
    margin-bottom: 5px;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
      span {
        font-size: 1rem;
        font-weight: lighter;
      }
    }
  }
  &:hover {
    box-shadow: 0 0 10px #0004;
  }
`;

export const Details = styled.div<DetailsProps>`
  background: ${(props) => props.theme.primaryColor};
  position: relative;
  right: 0;
  overflow: hidden;
  z-index: 15;

  ${(props) =>
    props.detailsOpen
      ? css`
          width: ${(props) => props.theme.detailWidth};
          min-width: ${(props) => props.theme.detailWidth};
          box-shadow: 0 0 10px #0004;
        `
      : css`
          width: 0px;
          min-width: 0px;
        `}

  & > div:first-of-type {
    color: ${(props) => props.theme.secondaryColor};
    text-align: center;
    font-size: 1.6rem;
    padding: 0 1rem;
    height: 25%;
    z-index: 10;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > button {
      border: none;
      background: none;
      color: ${(props) => props.theme.secondaryColor};
      font-size: 0.5em;
      padding: 5px;
    }
  }
  & > div:last-of-type {
    display: flex;
    gap: 0.6rem;
    flex-direction: column;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 75%;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::before {
      content: "";
    }
    &::after {
      content: " ";
      white-space: pre;
      line-height: 0;
    }
    &::-webkit-scrollbar {
      display: none;
    }

    button {
      border: none;
      width: 100%;
      height: 30px;
      margin-top: 0.5rem;
      border-radius: 30px;
      background: ${(props) => props.theme.primaryColor};
      color: ${(props) => props.theme.secondaryColor};
      font-size: 0.8rem;
    }

    & > p {
      padding: 0.8rem;
      color: ${(props) => props.theme.secondaryColor};
      font-size: 1.1rem;
    }
  }

  ${(props) =>
    props.animatingIn
      ? css`
          animation: ${slide(props.theme.detailWidth, true)} ${(props) => props.theme.animationSpeed};
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        `
      : ""}
  ${(props) =>
    props.animatingOut
      ? css`
          animation: ${slide(props.theme.detailWidth, false)} ${(props) => props.theme.animationSpeed};
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        `
      : ""}

  ${(props) =>
    props.floatingPanels
      ? css`
          height: 100%;
          position: absolute;
        `
      : ""}
`;

export const CloseDetail = styled.button<CloseDetailProps>`
  position: absolute;
  top: 0;
  height: 40px;
  width: 40px;
  border-radius: 0;
  border: none;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.primaryColor};
  &.defaultOpen {
    right: ${(props) => props.theme.detailWidth};
    z-index: 15;
  }
  &.defaultClosed {
    right: 0;
  }

  right: ${(props) => (props.detailsOpen ? props.theme.detailWidth : 0)};
  z-index: ${(props) => (props.detailsOpen ? 15 : "auto")};

  ${(props) =>
    props.animatingIn
      ? css`
          animation: ${slideToggler(props.theme.detailWidth, "right", true)} ${(props) => props.theme.animationSpeed};
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        `
      : ""}
  ${(props) =>
    props.animatingOut
      ? css`
          animation: ${slideToggler(props.theme.detailWidth, "right", false)} ${(props) => props.theme.animationSpeed};
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        `
      : ""}
`;

import React from 'react';
import styled from 'styled-components';
import { Events } from '../typings';

interface DayButtonProps {
  current: boolean;
  today: boolean;
  enableHighlight?: boolean;
  theme?: any;
}

interface DayButtonComponentProps extends DayButtonProps {
  day: number;
  events: Events[];
  onClick: () => void;
  eventGridRows?: number;
  eventGridCols?: number;
}

interface EventGridProps {
  rows?: number;
  cols?: number;
}

// Grid container for events with proper type definition
const EventGrid = styled.div<EventGridProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 3}, 1fr);
  grid-template-rows: repeat(${props => props.rows || 2}, 1fr);
  gap: 2px;
  width: 100%;
  height: calc(100% - 20px);
  padding: 2px;
`;

const EventCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 0;
  
  svg {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
  }
`;

const StyledDayButton = styled.button<DayButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  max-width: 55px;
  max-height: 55px;
  min-width: 32px;
  min-height: 32px;
  background: ${props => props.current ? `${props.theme.primaryColor} !important` : 'none'};
  border: ${props => props.today && props.enableHighlight ? `2px solid ${props.theme.todayColor} !important` : 'none'};
  color: ${props => props.current ? `${props.theme.secondaryColor} !important` : props.theme.textColor};
  position: relative;

  &:hover {
    background: ${props => props.theme.primaryColor50} !important;
  }

  .day-number {
    font-size: min(1rem, 5vw);
    margin-bottom: 2px;
    height: 20px;
    display: flex;
    align-items: center;
  }
`;

const DayButtonComponent: React.FC<DayButtonComponentProps> = ({
  day,
  current,
  today,
  enableHighlight,
  events = [],
  onClick,
  eventGridRows = 2,
  eventGridCols = 3
}) => {
  return (
    <StyledDayButton
      current={current}
      today={today}
      enableHighlight={enableHighlight}
      onClick={onClick}
    >
      <span className="day-number">{day}</span>
      {events.length > 0 && (
        <EventGrid
          rows={eventGridRows}
          cols={eventGridCols}
        >
          {events.slice(0, eventGridRows * eventGridCols).map((event, idx) => (
            <EventCell key={idx}>
              {event.extra?.icon && (
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    color: event.extra?.color || 'currentColor',
                    fill: 'currentColor'
                  }}
                >
                  <path d={event.extra.icon} />
                </svg>
              )}
            </EventCell>
          ))}
        </EventGrid>
      )}
    </StyledDayButton>
  );
};

export default DayButtonComponent;

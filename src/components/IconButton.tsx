import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps  {
    active?: boolean;
    disabled?: boolean;
    icon?: IconDefinition;
    tooltip?: string;
    color?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement | undefined>;
}

function IconButton(props: ButtonProps) {
    return (
        <StyledIconButton className={ props.active ? 'active' : '' } disabled={props.disabled} title={props.tooltip} onClick={props.onClick} >
            { props.icon != null && <FontAwesomeIcon icon={props.icon} /> }
        </StyledIconButton>
    );
}

const StyledIconButton = styled.button`
    margin: 0;
    padding: 2px;
    border: none;
    background: none;
    color: ${ p => p.theme.textColorFaded };

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.2rem;

    svg {
        flex: 1;
    }

    :active:enabled {
        color: black!important;
        transform: scale(0.85);
    }

    :hover:enabled {
        cursor: pointer;
        color: ${ p => p.theme.textColorFaded };
    }
`;

export default IconButton;

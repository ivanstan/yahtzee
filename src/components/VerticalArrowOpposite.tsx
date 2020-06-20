import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

class VerticalArrowOpposite extends React.Component<any, any> {
    render() {
        return (
            <Flex>
                <FontAwesomeIcon icon={faChevronUp}/>
                <FontAwesomeIcon icon={faChevronDown}/>
            </Flex>
        );
    }
}

export default VerticalArrowOpposite;

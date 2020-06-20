import React from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import VerticalArrowToward from "./VerticalArrowToward";
import VerticalArrowOpposite from "./VerticalArrowOpposite";

const Table = styled.table`
    border: 1px solid black;
    border-collapse: collapse;
    width: 100%;
`;

const Row = styled.tr`
    border: 1px solid black;
`;

const SumRow = styled(Row)`
    background: red;
`;

const Cell = styled.td`
    border: 1px solid black;
    width: 8.33%;
    min-height: 32px;
`;

const HeaderCell = styled(Cell)`
    background: green;
`;

const Input = styled.input`
    display: block;
    cursor: pointer;
    text-align: center;
    margin: 0;
    padding: 0;
    // border: 0;
     vertical-align: top;
     max-width: 40px;
     margin: auto;
`;

class Board extends React.Component<any, any> {
    render() {
        return (
            <Table>
                <thead>
                <Row>
                    <HeaderCell>
                        <FontAwesomeIcon icon={faDice} />
                    </HeaderCell>
                    <HeaderCell>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </HeaderCell>
                    <HeaderCell>
                        <FontAwesomeIcon icon={faChevronUp} />
                        <FontAwesomeIcon icon={faChevronDown} />
                    </HeaderCell>
                    <HeaderCell>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </HeaderCell>
                    <HeaderCell>N</HeaderCell>
                    <HeaderCell>R</HeaderCell>
                    <HeaderCell>D</HeaderCell>
                    <HeaderCell>
                        <VerticalArrowOpposite/>
                    </HeaderCell>
                    <HeaderCell>
                        <VerticalArrowToward/>
                    </HeaderCell>
                    <HeaderCell>O</HeaderCell>
                    <HeaderCell>M</HeaderCell>
                    <HeaderCell/>
                </Row>
                </thead>
                <tbody>
                <Row>
                    <HeaderCell>1</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>2</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>3</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>4</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>5</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>6</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <SumRow>
                    <HeaderCell>Σ</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                </SumRow>
                <Row>
                    <HeaderCell>MIN</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>MAX</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <SumRow>
                    <HeaderCell>Σ</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                </SumRow>
                <Row>
                    <HeaderCell>KENTA</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>TRILING</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>FULL</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>KARE</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>JAMB</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell/>
                </Row>
                <SumRow>
                    <HeaderCell>Σ</HeaderCell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                    <Cell><Input type="number"/></Cell>
                </SumRow>
                <SumRow>
                    <Cell colSpan={11}/>
                    <Cell><Input type="number"/></Cell>
                </SumRow>
                </tbody>
            </Table>
        );
    }
}

export default Board;
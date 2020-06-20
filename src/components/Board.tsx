import React from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faDice } from '@fortawesome/free-solid-svg-icons'
import VerticalArrowToward from "./VerticalArrowToward";
import VerticalArrowOpposite from "./VerticalArrowOpposite";

const Table = styled.table`
    border: 2px solid #5c6274;
    border-collapse: collapse;
    width: 100%;
    color: #5c6274;
`;

const Row = styled.tr`
    border: 2px solid #5c6274;
`;

const SumRow = styled(Row)`
    background: #D1DAE7;
`;

const Cell = styled.td`
    border: 2px solid #5c6274;
    width: 8.33%;
    height: 32px;
`;

const HeaderCell = styled(Cell)`
    background: #A4B5CC;
`;

const Input = styled.input`
    display: block;
    cursor: pointer;
    text-align: center;
    margin: 0;
    padding: 0;
    vertical-align: top;
    max-width: 40px;
    margin: auto;
    font-family: 'Patrick Hand', cursive;
    font-size: 17px;
    color: #5c6274;
    font-style: italic;
    background: transparent;
    border: 0;
    
    :focus {
        outline: none !important;
        border: 0;
        background: #FFAAAA;
    }
`;

const SumInput = styled(Input)`
    cursor: auto;
`;

class Board extends React.Component<any, any> {

    public static COL_UP = 0;
    public static COL_UP_DOWN = 1;
    public static COL_DOWN = 2;
    public static COL_N = 3;
    public static COL_R = 4;
    public static COL_D = 5;
    public static COL_OPPOSITE = 6;
    public static COL_TOWARD = 7;
    public static COL_O = 8;
    public static COL_M = 9;
    public static COL_SUM = 10;

    public static sumCols = [
        Board.COL_UP,
        Board.COL_UP_DOWN,
        Board.COL_DOWN,
        Board.COL_N,
        Board.COL_R,
        Board.COL_D,
        Board.COL_OPPOSITE,
        Board.COL_TOWARD,
        Board.COL_O,
        Board.COL_M,
    ];

    public readonly state: any = {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        SUM1: {},
        MIN: {},
        MAX: {},
        SUM2: {},
        KENTA: {},
        TRILING: {},
        FULL: {},
        KARE: {},
        YAMB: {},
        SUM3: {},
        TOTAL: '',
    };

    public setValue = (dirtyValue: string, row: string, col: number): void => {
        const value: number = parseInt(dirtyValue);

        if (dirtyValue !== '' && (isNaN(value) || value < 0)) {
            return;
        }

        const state: any = this.state;

        state['SUM1'] = {};
        state['SUM2'] = {};
        state['SUM3'] = {};
        state['TOTAL'] = '';
        state[row][col] = value;

        this.setState(state);

        this.calculateRowSum();
        this.calculateColSum();
        this.calculateTotal();
    };

    public calculateTotal = (): void => {
        const sumRows = ['SUM1', 'SUM2', 'SUM3'];

        let total = 0;

        for (let i in sumRows) {
            const value = this.state[sumRows[i]][Board.COL_SUM];

            if (!isNaN(value)) {
                total += value;
            }
        }

        this.setState({
            TOTAL: total > 0 ? total : '',
        })
    }

    public calculateColSum = (): void => {
        const sumRows = ['SUM1', 'SUM2', 'SUM3'];

        const state = this.state;

        for (let i in sumRows) {
            let sum = 0;

            for (let j in state[sumRows[i]]) {
                let value = parseInt(state[sumRows[i]][j]);
                if (!isNaN(value)) {
                    sum += value;
                }
            }

            state[sumRows[i]][Board.COL_SUM] = sum;
        }

        this.setState(state);
    }

    public calculateRowSum = (): void => {
        const sumRows = ['SUM1', 'SUM2', 'SUM3'];
        const state = this.state;

        for (let i in sumRows) {
            for (let j in Board.sumCols) {
                state[sumRows[i]][Board.sumCols[j]] = this.calculateCellSum(sumRows[i], Board.sumCols[j]);
            }
        }

        this.setState(state);
    };

    public calculateCellSum = (row: string, col: number): number | string => {
        let sum = 0;
        const sumCols = this.getSumCols(row);

        for (let i in sumCols) {
            if (!sumCols.hasOwnProperty(i)) {
                continue;
            }

            const sumCol = sumCols[i];

            if (this.state.hasOwnProperty(sumCol)) {
                let value = this.state[sumCol][col] || 0;
                sum += value;
            }
        }

        return sum > 0 ? sum : '';
    };

    public getSumCols = (sumRow: string): any => {
        if (sumRow === 'SUM1') {
            return [1, 2, 3, 4, 5, 6];
        }

        if (sumRow === 'SUM2') {
            return ['MIN', 'MAX'];
        }

        if (sumRow === 'SUM3') {
            return ['KENTA', 'TRILING', 'FULL', 'KARE', 'YAMB'];
        }

        return [];
    };

    public getValue = (row: string, col: number): number | string => {
        return this.state[row][col] || '';
    };

    public isSumRow = (row: string): boolean => row === 'SUM1' || row === 'SUM2' || row === 'SUM3';

    public isEnabled = (row: string, col: number): boolean => {
        if (this.isSumRow(row)) {
            return false;
        }

        return true;
    };

    render() {
        return (
            <Table>
                <thead>
                <Row>
                    <HeaderCell>
                        <FontAwesomeIcon icon={faDice}/>
                    </HeaderCell>
                    <HeaderCell>
                        <FontAwesomeIcon icon={faChevronDown}/>
                    </HeaderCell>
                    <HeaderCell>
                        <FontAwesomeIcon icon={faChevronUp}/>
                        <FontAwesomeIcon icon={faChevronDown}/>
                    </HeaderCell>
                    <HeaderCell>
                        <FontAwesomeIcon icon={faChevronUp}/>
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
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "1", Board.COL_UP)}
                               value={this.getValue("1", Board.COL_UP)}
                               disabled={!this.isEnabled("1", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "1", Board.COL_UP_DOWN)}
                               value={this.getValue("1", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("1", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "1", Board.COL_DOWN)}
                               value={this.getValue("1", Board.COL_DOWN)}
                               disabled={!this.isEnabled("1", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "1", Board.COL_N)}
                               value={this.getValue("1", Board.COL_N)}
                               disabled={!this.isEnabled("1", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "1", Board.COL_R)}
                               value={this.getValue("1", Board.COL_R)}
                               disabled={!this.isEnabled("1", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "1", Board.COL_D)}
                               value={this.getValue("1", Board.COL_D)}
                               disabled={!this.isEnabled("1", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "1", Board.COL_OPPOSITE)}
                               value={this.getValue("1", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("1", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "1", Board.COL_TOWARD)}
                               value={this.getValue("1", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("1", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "1", Board.COL_O)}
                               value={this.getValue("1", Board.COL_O)}
                               disabled={!this.isEnabled("1", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "1", Board.COL_M)}
                               value={this.getValue("1", Board.COL_M)}
                               disabled={!this.isEnabled("1", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>2</HeaderCell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "2", Board.COL_UP)}
                               value={this.getValue("2", Board.COL_UP)}
                               disabled={!this.isEnabled("2", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "2", Board.COL_UP_DOWN)}
                               value={this.getValue("2", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("2", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "2", Board.COL_DOWN)}
                               value={this.getValue("2", Board.COL_DOWN)}
                               disabled={!this.isEnabled("2", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "2", Board.COL_N)}
                               value={this.getValue("2", Board.COL_N)}
                               disabled={!this.isEnabled("2", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "2", Board.COL_R)}
                               value={this.getValue("2", Board.COL_R)}
                               disabled={!this.isEnabled("2", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "2", Board.COL_D)}
                               value={this.getValue("2", Board.COL_D)}
                               disabled={!this.isEnabled("2", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "2", Board.COL_OPPOSITE)}
                               value={this.getValue("2", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("2", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "2", Board.COL_TOWARD)}
                               value={this.getValue("2", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("2", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "2", Board.COL_O)}
                               value={this.getValue("2", Board.COL_O)}
                               disabled={!this.isEnabled("2", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "2", Board.COL_M)}
                               value={this.getValue("2", Board.COL_M)}
                               disabled={!this.isEnabled("2", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>3</HeaderCell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "3", Board.COL_UP)}
                               value={this.getValue("3", Board.COL_UP)}
                               disabled={!this.isEnabled("3", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "3", Board.COL_UP_DOWN)}
                               value={this.getValue("3", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("3", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "3", Board.COL_DOWN)}
                               value={this.getValue("3", Board.COL_DOWN)}
                               disabled={!this.isEnabled("3", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "3", Board.COL_N)}
                               value={this.getValue("3", Board.COL_N)}
                               disabled={!this.isEnabled("3", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "3", Board.COL_R)}
                               value={this.getValue("3", Board.COL_R)}
                               disabled={!this.isEnabled("3", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "3", Board.COL_D)}
                               value={this.getValue("3", Board.COL_D)}
                               disabled={!this.isEnabled("3", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "3", Board.COL_OPPOSITE)}
                               value={this.getValue("3", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("3", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "3", Board.COL_TOWARD)}
                               value={this.getValue("3", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("3", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "3", Board.COL_O)}
                               value={this.getValue("3", Board.COL_O)}
                               disabled={!this.isEnabled("3", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "3", Board.COL_M)}
                               value={this.getValue("3", Board.COL_M)}
                               disabled={!this.isEnabled("3", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>4</HeaderCell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "4", Board.COL_UP)}
                               value={this.getValue("4", Board.COL_UP)}
                               disabled={!this.isEnabled("4", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "4", Board.COL_UP_DOWN)}
                               value={this.getValue("4", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("4", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "4", Board.COL_DOWN)}
                               value={this.getValue("4", Board.COL_DOWN)}
                               disabled={!this.isEnabled("4", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "4", Board.COL_N)}
                               value={this.getValue("4", Board.COL_N)}
                               disabled={!this.isEnabled("4", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "4", Board.COL_R)}
                               value={this.getValue("4", Board.COL_R)}
                               disabled={!this.isEnabled("4", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "4", Board.COL_D)}
                               value={this.getValue("4", Board.COL_D)}
                               disabled={!this.isEnabled("4", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "4", Board.COL_OPPOSITE)}
                               value={this.getValue("4", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("4", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "4", Board.COL_TOWARD)}
                               value={this.getValue("4", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("4", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "4", Board.COL_O)}
                               value={this.getValue("4", Board.COL_O)}
                               disabled={!this.isEnabled("4", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "4", Board.COL_M)}
                               value={this.getValue("4", Board.COL_M)}
                               disabled={!this.isEnabled("4", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>5</HeaderCell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "5", Board.COL_UP)}
                               value={this.getValue("5", Board.COL_UP)}
                               disabled={!this.isEnabled("5", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "5", Board.COL_UP_DOWN)}
                               value={this.getValue("5", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("5", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "5", Board.COL_DOWN)}
                               value={this.getValue("5", Board.COL_DOWN)}
                               disabled={!this.isEnabled("5", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "5", Board.COL_N)}
                               value={this.getValue("5", Board.COL_N)}
                               disabled={!this.isEnabled("5", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "5", Board.COL_R)}
                               value={this.getValue("5", Board.COL_R)}
                               disabled={!this.isEnabled("5", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "5", Board.COL_D)}
                               value={this.getValue("5", Board.COL_D)}
                               disabled={!this.isEnabled("5", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "5", Board.COL_OPPOSITE)}
                               value={this.getValue("5", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("5", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "5", Board.COL_TOWARD)}
                               value={this.getValue("5", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("5", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "5", Board.COL_O)}
                               value={this.getValue("5", Board.COL_O)}
                               disabled={!this.isEnabled("5", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "5", Board.COL_M)}
                               value={this.getValue("5", Board.COL_M)}
                               disabled={!this.isEnabled("5", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>6</HeaderCell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "6", Board.COL_UP)}
                               value={this.getValue("6", Board.COL_UP)}
                               disabled={!this.isEnabled("6", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "6", Board.COL_UP_DOWN)}
                               value={this.getValue("6", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("6", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "6", Board.COL_DOWN)}
                               value={this.getValue("6", Board.COL_DOWN)}
                               disabled={!this.isEnabled("6", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "6", Board.COL_N)}
                               value={this.getValue("6", Board.COL_N)}
                               disabled={!this.isEnabled("6", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "6", Board.COL_R)}
                               value={this.getValue("6", Board.COL_R)}
                               disabled={!this.isEnabled("6", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "6", Board.COL_D)}
                               value={this.getValue("6", Board.COL_D)}
                               disabled={!this.isEnabled("6", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "6", Board.COL_OPPOSITE)}
                               value={this.getValue("6", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("6", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "6", Board.COL_TOWARD)}
                               value={this.getValue("6", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("6", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "6", Board.COL_O)}
                               value={this.getValue("6", Board.COL_O)}
                               disabled={!this.isEnabled("6", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "6", Board.COL_M)}
                               value={this.getValue("6", Board.COL_M)}
                               disabled={!this.isEnabled("6", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <SumRow>
                    <HeaderCell>Σ</HeaderCell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM1", Board.COL_UP)}
                                  value={this.getValue("SUM1", Board.COL_UP)}
                                  disabled={!this.isEnabled("SUM1", Board.COL_UP)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM1", Board.COL_UP_DOWN)}
                                  value={this.getValue("SUM1", Board.COL_UP_DOWN)}
                                  disabled={!this.isEnabled("SUM1", Board.COL_UP_DOWN)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM1", Board.COL_DOWN)}
                                  value={this.getValue("SUM1", Board.COL_DOWN)}
                                  disabled={!this.isEnabled("SUM1", Board.COL_DOWN)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM1", Board.COL_N)}
                                  value={this.getValue("SUM1", Board.COL_N)}
                                  disabled={!this.isEnabled("SUM1", Board.COL_N)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM1", Board.COL_R)}
                                  value={this.getValue("SUM1", Board.COL_R)}
                                  disabled={!this.isEnabled("SUM1", Board.COL_R)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM1", Board.COL_D)}
                                  value={this.getValue("SUM1", Board.COL_D)}
                                  disabled={!this.isEnabled("SUM1", Board.COL_D)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM1", Board.COL_OPPOSITE)}
                                  value={this.getValue("SUM1", Board.COL_OPPOSITE)}
                                  disabled={!this.isEnabled("SUM1", Board.COL_OPPOSITE)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM1", Board.COL_TOWARD)}
                                  value={this.getValue("SUM1", Board.COL_TOWARD)}
                                  disabled={!this.isEnabled("SUM1", Board.COL_TOWARD)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM1", Board.COL_O)}
                                  value={this.getValue("SUM1", Board.COL_O)}
                                  disabled={!this.isEnabled("SUM1", Board.COL_O)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM1", Board.COL_M)}
                                  value={this.getValue("SUM1", Board.COL_M)}
                                  disabled={!this.isEnabled("SUM1", Board.COL_M)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM1", Board.COL_SUM)}
                                  value={this.getValue("SUM1", Board.COL_SUM)}
                                  disabled={!this.isEnabled("SUM1", Board.COL_SUM)}
                                  type="text"/>
                    </Cell>
                </SumRow>
                <Row>
                    <HeaderCell>MIN</HeaderCell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MIN", Board.COL_UP)}
                               value={this.getValue("MIN", Board.COL_UP)}
                               disabled={!this.isEnabled("MIN", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MIN", Board.COL_UP_DOWN)}
                               value={this.getValue("MIN", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("MIN", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MIN", Board.COL_DOWN)}
                               value={this.getValue("MIN", Board.COL_DOWN)}
                               disabled={!this.isEnabled("MIN", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MIN", Board.COL_N)}
                               value={this.getValue("MIN", Board.COL_N)}
                               disabled={!this.isEnabled("MIN", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MIN", Board.COL_R)}
                               value={this.getValue("MIN", Board.COL_R)}
                               disabled={!this.isEnabled("MIN", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MIN", Board.COL_D)}
                               value={this.getValue("MIN", Board.COL_D)}
                               disabled={!this.isEnabled("MIN", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MIN", Board.COL_OPPOSITE)}
                               value={this.getValue("MIN", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("MIN", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MIN", Board.COL_TOWARD)}
                               value={this.getValue("MIN", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("MIN", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MIN", Board.COL_O)}
                               value={this.getValue("MIN", Board.COL_O)}
                               disabled={!this.isEnabled("MIN", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MIN", Board.COL_M)}
                               value={this.getValue("MIN", Board.COL_M)}
                               disabled={!this.isEnabled("MIN", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>MAX</HeaderCell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MAX", Board.COL_UP)}
                               value={this.getValue("MAX", Board.COL_UP)}
                               disabled={!this.isEnabled("MAX", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MAX", Board.COL_UP_DOWN)}
                               value={this.getValue("MAX", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("MAX", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MAX", Board.COL_DOWN)}
                               value={this.getValue("MAX", Board.COL_DOWN)}
                               disabled={!this.isEnabled("MAX", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MAX", Board.COL_N)}
                               value={this.getValue("MAX", Board.COL_N)}
                               disabled={!this.isEnabled("MAX", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MAX", Board.COL_R)}
                               value={this.getValue("MAX", Board.COL_R)}
                               disabled={!this.isEnabled("MAX", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MAX", Board.COL_D)}
                               value={this.getValue("MAX", Board.COL_D)}
                               disabled={!this.isEnabled("MAX", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MAX", Board.COL_OPPOSITE)}
                               value={this.getValue("MAX", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("MAX", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MAX", Board.COL_TOWARD)}
                               value={this.getValue("MAX", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("MAX", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MAX", Board.COL_O)}
                               value={this.getValue("MAX", Board.COL_O)}
                               disabled={!this.isEnabled("MAX", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "MAX", Board.COL_M)}
                               value={this.getValue("MAX", Board.COL_M)}
                               disabled={!this.isEnabled("MAX", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <SumRow>
                    <HeaderCell>Σ</HeaderCell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM2", Board.COL_UP)}
                                  value={this.getValue("SUM2", Board.COL_UP)}
                                  disabled={!this.isEnabled("SUM2", Board.COL_UP)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM2", Board.COL_UP_DOWN)}
                                  value={this.getValue("SUM2", Board.COL_UP_DOWN)}
                                  disabled={!this.isEnabled("SUM2", Board.COL_UP_DOWN)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM2", Board.COL_DOWN)}
                                  value={this.getValue("SUM2", Board.COL_DOWN)}
                                  disabled={!this.isEnabled("SUM2", Board.COL_DOWN)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM2", Board.COL_N)}
                                  value={this.getValue("SUM2", Board.COL_N)}
                                  disabled={!this.isEnabled("SUM2", Board.COL_N)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM2", Board.COL_R)}
                                  value={this.getValue("SUM2", Board.COL_R)}
                                  disabled={!this.isEnabled("SUM2", Board.COL_R)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM2", Board.COL_D)}
                                  value={this.getValue("SUM2", Board.COL_D)}
                                  disabled={!this.isEnabled("SUM2", Board.COL_D)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM2", Board.COL_OPPOSITE)}
                                  value={this.getValue("SUM2", Board.COL_OPPOSITE)}
                                  disabled={!this.isEnabled("SUM2", Board.COL_OPPOSITE)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM2", Board.COL_TOWARD)}
                                  value={this.getValue("SUM2", Board.COL_TOWARD)}
                                  disabled={!this.isEnabled("SUM2", Board.COL_TOWARD)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM2", Board.COL_O)}
                                  value={this.getValue("SUM2", Board.COL_O)}
                                  disabled={!this.isEnabled("SUM2", Board.COL_O)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM2", Board.COL_M)}
                                  value={this.getValue("SUM2", Board.COL_M)}
                                  disabled={!this.isEnabled("SUM2", Board.COL_M)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM2", Board.COL_SUM)}
                                  value={this.getValue("SUM2", Board.COL_SUM)}
                                  disabled={!this.isEnabled("SUM2", Board.COL_SUM)}
                                  type="text"/>
                    </Cell>
                </SumRow>
                <Row>
                    <HeaderCell>KENTA</HeaderCell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KENTA", Board.COL_UP)}
                               value={this.getValue("KENTA", Board.COL_UP)}
                               disabled={!this.isEnabled("KENTA", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KENTA", Board.COL_UP_DOWN)}
                               value={this.getValue("KENTA", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("KENTA", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KENTA", Board.COL_DOWN)}
                               value={this.getValue("KENTA", Board.COL_DOWN)}
                               disabled={!this.isEnabled("KENTA", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KENTA", Board.COL_N)}
                               value={this.getValue("KENTA", Board.COL_N)}
                               disabled={!this.isEnabled("KENTA", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KENTA", Board.COL_R)}
                               value={this.getValue("KENTA", Board.COL_R)}
                               disabled={!this.isEnabled("KENTA", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KENTA", Board.COL_D)}
                               value={this.getValue("KENTA", Board.COL_D)}
                               disabled={!this.isEnabled("KENTA", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KENTA", Board.COL_OPPOSITE)}
                               value={this.getValue("KENTA", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("KENTA", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KENTA", Board.COL_TOWARD)}
                               value={this.getValue("KENTA", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("KENTA", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KENTA", Board.COL_O)}
                               value={this.getValue("KENTA", Board.COL_O)}
                               disabled={!this.isEnabled("KENTA", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KENTA", Board.COL_M)}
                               value={this.getValue("KENTA", Board.COL_M)}
                               disabled={!this.isEnabled("KENTA", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>TRILING</HeaderCell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "TRILING", Board.COL_UP)}
                               value={this.getValue("TRILING", Board.COL_UP)}
                               disabled={!this.isEnabled("TRILING", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "TRILING", Board.COL_UP_DOWN)}
                               value={this.getValue("TRILING", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("TRILING", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "TRILING", Board.COL_DOWN)}
                               value={this.getValue("TRILING", Board.COL_DOWN)}
                               disabled={!this.isEnabled("TRILING", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "TRILING", Board.COL_N)}
                               value={this.getValue("TRILING", Board.COL_N)}
                               disabled={!this.isEnabled("TRILING", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "TRILING", Board.COL_R)}
                               value={this.getValue("TRILING", Board.COL_R)}
                               disabled={!this.isEnabled("TRILING", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "TRILING", Board.COL_D)}
                               value={this.getValue("TRILING", Board.COL_D)}
                               disabled={!this.isEnabled("TRILING", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "TRILING", Board.COL_OPPOSITE)}
                               value={this.getValue("TRILING", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("TRILING", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "TRILING", Board.COL_TOWARD)}
                               value={this.getValue("TRILING", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("TRILING", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "TRILING", Board.COL_O)}
                               value={this.getValue("TRILING", Board.COL_O)}
                               disabled={!this.isEnabled("TRILING", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "TRILING", Board.COL_M)}
                               value={this.getValue("TRILING", Board.COL_M)}
                               disabled={!this.isEnabled("TRILING", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>FULL</HeaderCell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "FULL", Board.COL_UP)}
                               value={this.getValue("FULL", Board.COL_UP)}
                               disabled={!this.isEnabled("FULL", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "FULL", Board.COL_UP_DOWN)}
                               value={this.getValue("FULL", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("FULL", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "FULL", Board.COL_DOWN)}
                               value={this.getValue("FULL", Board.COL_DOWN)}
                               disabled={!this.isEnabled("FULL", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "FULL", Board.COL_N)}
                               value={this.getValue("FULL", Board.COL_N)}
                               disabled={!this.isEnabled("FULL", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "FULL", Board.COL_R)}
                               value={this.getValue("FULL", Board.COL_R)}
                               disabled={!this.isEnabled("FULL", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "FULL", Board.COL_D)}
                               value={this.getValue("FULL", Board.COL_D)}
                               disabled={!this.isEnabled("FULL", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "FULL", Board.COL_OPPOSITE)}
                               value={this.getValue("FULL", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("FULL", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "FULL", Board.COL_TOWARD)}
                               value={this.getValue("FULL", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("FULL", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "FULL", Board.COL_O)}
                               value={this.getValue("FULL", Board.COL_O)}
                               disabled={!this.isEnabled("FULL", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "FULL", Board.COL_M)}
                               value={this.getValue("FULL", Board.COL_M)}
                               disabled={!this.isEnabled("FULL", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>KARE</HeaderCell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KARE", Board.COL_UP)}
                               value={this.getValue("KARE", Board.COL_UP)}
                               disabled={!this.isEnabled("KARE", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KARE", Board.COL_UP_DOWN)}
                               value={this.getValue("KARE", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("KARE", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KARE", Board.COL_DOWN)}
                               value={this.getValue("KARE", Board.COL_DOWN)}
                               disabled={!this.isEnabled("KARE", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KARE", Board.COL_N)}
                               value={this.getValue("KARE", Board.COL_N)}
                               disabled={!this.isEnabled("KARE", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KARE", Board.COL_R)}
                               value={this.getValue("KARE", Board.COL_R)}
                               disabled={!this.isEnabled("KARE", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KARE", Board.COL_D)}
                               value={this.getValue("KARE", Board.COL_D)}
                               disabled={!this.isEnabled("KARE", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KARE", Board.COL_OPPOSITE)}
                               value={this.getValue("KARE", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("KARE", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KARE", Board.COL_TOWARD)}
                               value={this.getValue("KARE", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("KARE", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KARE", Board.COL_O)}
                               value={this.getValue("KARE", Board.COL_O)}
                               disabled={!this.isEnabled("KARE", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "KARE", Board.COL_M)}
                               value={this.getValue("KARE", Board.COL_M)}
                               disabled={!this.isEnabled("KARE", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>YAMB</HeaderCell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "YAMB", Board.COL_UP)}
                               value={this.getValue("YAMB", Board.COL_UP)}
                               disabled={!this.isEnabled("YAMB", Board.COL_UP)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "YAMB", Board.COL_UP_DOWN)}
                               value={this.getValue("YAMB", Board.COL_UP_DOWN)}
                               disabled={!this.isEnabled("YAMB", Board.COL_UP_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "YAMB", Board.COL_DOWN)}
                               value={this.getValue("YAMB", Board.COL_DOWN)}
                               disabled={!this.isEnabled("YAMB", Board.COL_DOWN)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "YAMB", Board.COL_N)}
                               value={this.getValue("YAMB", Board.COL_N)}
                               disabled={!this.isEnabled("YAMB", Board.COL_N)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "YAMB", Board.COL_R)}
                               value={this.getValue("YAMB", Board.COL_R)}
                               disabled={!this.isEnabled("YAMB", Board.COL_R)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "YAMB", Board.COL_D)}
                               value={this.getValue("YAMB", Board.COL_D)}
                               disabled={!this.isEnabled("YAMB", Board.COL_D)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "YAMB", Board.COL_OPPOSITE)}
                               value={this.getValue("YAMB", Board.COL_OPPOSITE)}
                               disabled={!this.isEnabled("YAMB", Board.COL_OPPOSITE)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "YAMB", Board.COL_TOWARD)}
                               value={this.getValue("YAMB", Board.COL_TOWARD)}
                               disabled={!this.isEnabled("YAMB", Board.COL_TOWARD)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "YAMB", Board.COL_O)}
                               value={this.getValue("YAMB", Board.COL_O)}
                               disabled={!this.isEnabled("YAMB", Board.COL_O)}
                               type="text"/>
                    </Cell>
                    <Cell>
                        <Input onChange={(e: any) => this.setValue(e.target.value, "YAMB", Board.COL_M)}
                               value={this.getValue("YAMB", Board.COL_M)}
                               disabled={!this.isEnabled("YAMB", Board.COL_M)}
                               type="text"/>
                    </Cell>
                    <Cell/>
                </Row>
                <SumRow>
                    <HeaderCell>Σ</HeaderCell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM3", Board.COL_UP)}
                                  value={this.getValue("SUM3", Board.COL_UP)}
                                  disabled={!this.isEnabled("SUM3", Board.COL_UP)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM3", Board.COL_UP_DOWN)}
                                  value={this.getValue("SUM3", Board.COL_UP_DOWN)}
                                  disabled={!this.isEnabled("SUM3", Board.COL_UP_DOWN)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM3", Board.COL_DOWN)}
                                  value={this.getValue("SUM3", Board.COL_DOWN)}
                                  disabled={!this.isEnabled("SUM3", Board.COL_DOWN)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM3", Board.COL_N)}
                                  value={this.getValue("SUM3", Board.COL_N)}
                                  disabled={!this.isEnabled("SUM3", Board.COL_N)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM3", Board.COL_R)}
                                  value={this.getValue("SUM3", Board.COL_R)}
                                  disabled={!this.isEnabled("SUM3", Board.COL_R)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM3", Board.COL_D)}
                                  value={this.getValue("SUM3", Board.COL_D)}
                                  disabled={!this.isEnabled("SUM3", Board.COL_D)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM3", Board.COL_OPPOSITE)}
                                  value={this.getValue("SUM3", Board.COL_OPPOSITE)}
                                  disabled={!this.isEnabled("SUM3", Board.COL_OPPOSITE)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM3", Board.COL_TOWARD)}
                                  value={this.getValue("SUM3", Board.COL_TOWARD)}
                                  disabled={!this.isEnabled("SUM3", Board.COL_TOWARD)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM3", Board.COL_O)}
                                  value={this.getValue("SUM3", Board.COL_O)}
                                  disabled={!this.isEnabled("SUM3", Board.COL_O)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM3", Board.COL_M)}
                                  value={this.getValue("SUM3", Board.COL_M)}
                                  disabled={!this.isEnabled("SUM3", Board.COL_M)}
                                  type="text"/>
                    </Cell>
                    <Cell>
                        <SumInput onChange={(e: any) => this.setValue(e.target.value, "SUM3", Board.COL_SUM)}
                                  value={this.getValue("SUM3", Board.COL_SUM)}
                                  disabled={!this.isEnabled("SUM3", Board.COL_SUM)}
                                  type="text"/>
                    </Cell>
                </SumRow>
                <SumRow>
                    <Cell colSpan={11}/>
                    <Cell><SumInput disabled type="text" value={this.state.TOTAL}/></Cell>
                </SumRow>
                </tbody>
            </Table>
        );
    }
}

export default Board;
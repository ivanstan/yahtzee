import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faDice } from '@fortawesome/free-solid-svg-icons'
import VerticalArrowToward from './VerticalArrowToward';
import VerticalArrowOpposite from './VerticalArrowOpposite';
import Each from 'react-each';
import { If } from 'react-if';

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
    position: relative;
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

const DICE_COUNT = 6;
const MAX_SINGLE_DICE_RESULT = 6;
const MAX_SINGLE_THROW_RESULT = (DICE_COUNT - 1) * MAX_SINGLE_DICE_RESULT;

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

    public static editableCols = [
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

    public static editableRows = [
        '1', '2', '3', '4', '5', '6', 'MAX', 'MIN', 'KENTA', 'TRILING', 'FULL', 'KARE', 'YAMB'
    ];

    public static sumRows = [
        'SUM1', 'SUM2', 'SUM3'
    ]

    public readonly state: any = {
        '1': {},
        '2': {},
        '3': {},
        '4': {},
        '5': {},
        '6': {},
        'SUM1': {},
        'MIN': {},
        'MAX': {},
        'SUM2': {},
        'KENTA': {},
        'TRILING': {},
        'FULL': {},
        'KARE': {},
        'YAMB': {},
        'SUM3': {},
        'TOTAL': '',
    };

    public cells: any = {};
    public currentCell: any = { row: null, col: null };

    public constructor(props: any) {
        super(props);

        for (let i in Board.editableRows) {
            for (let j in Board.editableCols) {
                if (!this.cells.hasOwnProperty(Board.editableRows[i])) {
                    this.cells[Board.editableRows[i]] = {};
                }

                this.cells[Board.editableRows[i]][Board.editableCols[j]] = React.createRef();
            }
        }
    }

    public setValue = (dirtyValue: string, row: string, col: number): void => {
        const value: number = parseInt(dirtyValue);

        if (dirtyValue !== '' && (isNaN(value) || value < 0)) {
            return;
        }

        if (value > MAX_SINGLE_THROW_RESULT) {
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
        let total = 0;

        for (let i in Board.sumRows) {
            const value = this.state[Board.sumRows[i]][Board.COL_SUM];

            if (!isNaN(value)) {
                total += value;
            }
        }

        this.setState({
            TOTAL: total > 0 ? total : '',
        })
    }

    public calculateColSum = (): void => {
        const state = this.state;

        for (let i in Board.sumRows) {
            let sum = 0;

            for (let j in state[Board.sumRows[i]]) {
                if (!state[Board.sumRows[i]].hasOwnProperty(j)) {
                    continue;
                }

                let value = parseInt(state[Board.sumRows[i]][j]);
                if (!isNaN(value)) {
                    sum += value;
                }
            }

            state[Board.sumRows[i]][Board.COL_SUM] = sum;
        }

        this.setState(state);
    }

    public calculateRowSum = (): void => {
        const state = this.state;

        for (let i in Board.sumRows) {
            for (let j in Board.editableCols) {
                state[Board.sumRows[i]][Board.editableCols[j]] = this.calculateCellSum(Board.sumRows[i], Board.editableCols[j]);
            }
        }

        this.setState(state);
    };

    public calculateCellSum = (row: string, col: number): number | string => {

        if (row === 'SUM2') {
            const multiplier = this.state[1][col];
            const min = this.state['MIN'][col];
            const max = this.state['MAX'][col];

            if (multiplier && min && max) {
                return (max - min) * multiplier;
            }

            return 0;
        }

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

        if (row === 'SUM1' && sum >= 60) {
            sum += 30;
        }

        return sum > 0 ? sum : '';
    };

    public getSumCols = (sumRow: string): any => {
        if (sumRow === 'SUM1') {
            return ['1', '2', '3', '4', '5', '6'];
        }

        if (sumRow === 'SUM3') {
            return ['KENTA', 'TRILING', 'FULL', 'KARE', 'YAMB'];
        }

        return [];
    };

    public getValue = (row: string, col: number): number | string => {
        const value = this.state[row][col];

        if (value === 0 && !this.isSumRow(row)) {
            return 'x';
        }

        if (row === 'SUM2' && value === 0) {
            const multiplier = this.state[1][col];
            const min = this.state['MIN'][col];
            const max = this.state['MAX'][col];

            if (multiplier && min && max) {
                return 0;
            }

            return '';
        }

        return value || '';
    }
    public isSumRow = (row: string): boolean => row === 'SUM1' || row === 'SUM2' || row === 'SUM3';

    public isEnabled = (row: string, col: number): boolean => {
        if (this.isSumRow(row)) {
            return false;
        }

        return true;
    };

    onKeyPress(e: any, row: string, col: number) {
        if (e.keyCode === 13) {
            e.target.blur();
        }

        if ((e.keyCode === 46 || e.keyCode === 8) && col !== Board.COL_SUM && !this.isSumRow(row)) {
            let state = this.state;
            state[row][col] = '';
            this.setState(state);
        }

        const arrowKeys = [38, 40, 39, 37];
        if (arrowKeys.includes(e.keyCode)) {
            const nextCell: any = this.navigateCell(e.keyCode);
            if (nextCell) {
                nextCell.current.focus();
            }
        }
    }

    public navigateCell(keyCode: number) {

        if (keyCode === 37 || keyCode === 39) { // LEFT/RIGHT
            let add = 1;

            if (keyCode === 37) {
                add = -1;
            }

            const currentIndex: number = Board.editableCols.indexOf(this.currentCell.col);
            let nextIndex: any = currentIndex + add;

            const nextCol = Board.editableCols[nextIndex];

            if (typeof nextCol !== 'undefined') {
                return this.cells[this.currentCell.row][nextCol];
            }
        }

        if (keyCode === 38 || keyCode === 40) { // UP/DOWN
            let add = 1;

            if (keyCode === 38) {
                add = -1;
            }

            const currentIndex: number = Board.editableRows.indexOf(this.currentCell.row);
            let nextIndex: any = currentIndex + add;

            const nextRow = Board.editableRows[nextIndex];

            if (typeof nextRow !== 'undefined') {
                return this.cells[nextRow][this.currentCell.col];
            }
        }

        return null;
    };

    onFocus(e: any, row: string, col: number) {
        this.currentCell.row = row;
        this.currentCell.col = col;
    }

    onBlur(e: any, row: string, col: number) {
        const simple = ['1', '2', '3', '4', '5', '6'];
        const rowNum = parseInt(row);
        const value = parseInt(e.currentTarget.value);

        if (!isNaN(value) && simple.includes(row)) {
            const validValues = [];
            const values = [0, 1, 2, 3, 4, 5];

            for (let i in values) {
                validValues.push(values[i] * rowNum);
            }

            if (!validValues.includes(value)) {
                e.currentTarget.focus();
            }
        }
    }

    getClasses(row: string, col: number) {
        return '';
    }

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

                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <If condition={col === Board.COL_TOWARD}>
                                <FontAwesomeIcon icon={faChevronDown}
                                                 style={{ position: 'absolute', fontSize: 11, 'left': 3, top: 0 }}/>
                            </If>
                            <Input onChange={(e: any) => this.setValue(e.target.value, '1', col)}
                                   value={this.getValue('1', col)}
                                   disabled={!this.isEnabled('1', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, '1', col)}
                                   onBlur={(e: any) => this.onBlur(e, '1', col)}
                                   className={this.getClasses('1', col)}
                                   type='text'
                                   ref={this.cells['1'][col]}
                                   onFocus={(e: any) => this.onFocus(e, '1', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>2</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <Input onChange={(e: any) => this.setValue(e.target.value, '2', col)}
                                   value={this.getValue('2', col)}
                                   disabled={!this.isEnabled('2', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, '2', col)}
                                   onBlur={(e: any) => this.onBlur(e, '2', col)}
                                   className={this.getClasses('2', col)}
                                   type='text'
                                   ref={this.cells['2'][col]}
                                   onFocus={(e: any) => this.onFocus(e, '2', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>3</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <Input onChange={(e: any) => this.setValue(e.target.value, '3', col)}
                                   value={this.getValue('3', col)}
                                   disabled={!this.isEnabled('3', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, '3', col)}
                                   onBlur={(e: any) => this.onBlur(e, '3', col)}
                                   className={this.getClasses('3', col)}
                                   type='text'
                                   ref={this.cells['3'][col]}
                                   onFocus={(e: any) => this.onFocus(e, '3', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>4</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <Input onChange={(e: any) => this.setValue(e.target.value, '4', col)}
                                   value={this.getValue('4', col)}
                                   disabled={!this.isEnabled('4', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, '4', col)}
                                   onBlur={(e: any) => this.onBlur(e, '4', col)}
                                   className={this.getClasses('4', col)}
                                   type='text'
                                   ref={this.cells['4'][col]}
                                   onFocus={(e: any) => this.onFocus(e, '4', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>5</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <Input onChange={(e: any) => this.setValue(e.target.value, '5', col)}
                                   value={this.getValue('5', col)}
                                   disabled={!this.isEnabled('5', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, '5', col)}
                                   onBlur={(e: any) => this.onBlur(e, '5', col)}
                                   className={this.getClasses('5', col)}
                                   type='text'
                                   ref={this.cells['5'][col]}
                                   onFocus={(e: any) => this.onFocus(e, '5', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>6</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <Input onChange={(e: any) => this.setValue(e.target.value, '6', col)}
                                   value={this.getValue('6', col)}
                                   disabled={!this.isEnabled('6', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, '6', col)}
                                   onBlur={(e: any) => this.onBlur(e, '6', col)}
                                   className={this.getClasses('6', col)}
                                   type='text'
                                   ref={this.cells['6'][col]}
                                   onFocus={(e: any) => this.onFocus(e, '6', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <SumRow>
                    <HeaderCell>Σ</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <SumInput
                                value={this.getValue('SUM1', col)}
                                disabled
                                type='text'
                            />
                        </Cell>
                    )}/>
                    <Cell>
                        <SumInput
                            value={this.getValue('SUM1', Board.COL_SUM)}
                            disabled
                            type='text'
                        />
                    </Cell>
                </SumRow>
                <Row>
                    <HeaderCell>MAX</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <If condition={col === Board.COL_OPPOSITE}>
                                <FontAwesomeIcon icon={faChevronUp}
                                                 style={{ position: 'absolute', fontSize: 11, 'left': 3, top: 0 }}/>
                            </If>
                            <Input onChange={(e: any) => this.setValue(e.target.value, 'MAX', col)}
                                   value={this.getValue('MAX', col)}
                                   disabled={!this.isEnabled('MAX', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, 'MAX', col)}
                                   onBlur={(e: any) => this.onBlur(e, 'MAX', col)}
                                   className={this.getClasses('MAX', col)}
                                   type='text'
                                   ref={this.cells['MAX'][col]}
                                   onFocus={(e: any) => this.onFocus(e, 'MAX', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>MIN</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <If condition={col === Board.COL_OPPOSITE}>
                                <FontAwesomeIcon icon={faChevronDown}
                                                 style={{ position: 'absolute', fontSize: 11, 'right': 3, bottom: 0 }}/>
                            </If>
                            <Input onChange={(e: any) => this.setValue(e.target.value, 'MIN', col)}
                                   value={this.getValue('MIN', col)}
                                   disabled={!this.isEnabled('MIN', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, 'MIN', col)}
                                   onBlur={(e: any) => this.onBlur(e, 'MIN', col)}
                                   className={this.getClasses('MIN', col)}
                                   type='text'
                                   ref={this.cells['MIN'][col]}
                                   onFocus={(e: any) => this.onFocus(e, 'MIN', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <SumRow>
                    <HeaderCell>Σ</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <SumInput
                                value={this.getValue('SUM2', col)}
                                disabled
                                type='text'
                            />
                        </Cell>
                    )}/>
                    <Cell>
                        <SumInput
                            value={this.getValue('SUM2', Board.COL_SUM)}
                            disabled
                            type='text'
                        />
                    </Cell>
                </SumRow>
                <Row>
                    <HeaderCell>KENTA</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <Input onChange={(e: any) => this.setValue(e.target.value, 'KENTA', col)}
                                   value={this.getValue('KENTA', col)}
                                   disabled={!this.isEnabled('KENTA', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, 'KENTA', col)}
                                   onBlur={(e: any) => this.onBlur(e, 'KENTA', col)}
                                   className={this.getClasses('KENTA', col)}
                                   type='text'
                                   ref={this.cells['KENTA'][col]}
                                   onFocus={(e: any) => this.onFocus(e, 'KENTA', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>TRILING</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <Input onChange={(e: any) => this.setValue(e.target.value, 'TRILING', col)}
                                   value={this.getValue('TRILING', col)}
                                   disabled={!this.isEnabled('TRILING', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, 'TRILING', col)}
                                   onBlur={(e: any) => this.onBlur(e, 'TRILING', col)}
                                   className={this.getClasses('TRILING', col)}
                                   type='text'
                                   ref={this.cells['TRILING'][col]}
                                   onFocus={(e: any) => this.onFocus(e, 'TRILING', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>FULL</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <Input onChange={(e: any) => this.setValue(e.target.value, 'FULL', col)}
                                   value={this.getValue('FULL', col)}
                                   disabled={!this.isEnabled('FULL', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, 'FULL', col)}
                                   onBlur={(e: any) => this.onBlur(e, 'FULL', col)}
                                   className={this.getClasses('FULL', col)}
                                   type='text'
                                   ref={this.cells['FULL'][col]}
                                   onFocus={(e: any) => this.onFocus(e, 'FULL', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>POKER</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <Input onChange={(e: any) => this.setValue(e.target.value, 'KARE', col)}
                                   value={this.getValue('KARE', col)}
                                   disabled={!this.isEnabled('KARE', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, 'KARE', col)}
                                   onBlur={(e: any) => this.onBlur(e, 'KARE', col)}
                                   className={this.getClasses('KARE', col)}
                                   type='text'
                                   ref={this.cells['KARE'][col]}
                                   onFocus={(e: any) => this.onFocus(e, 'KARE', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <Row>
                    <HeaderCell>YAMB</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <If condition={col === Board.COL_TOWARD}>
                                <FontAwesomeIcon icon={faChevronUp}
                                                 style={{ position: 'absolute', fontSize: 11, 'right': 3, bottom: 0 }}/>
                            </If>
                            <Input onChange={(e: any) => this.setValue(e.target.value, 'YAMB', col)}
                                   value={this.getValue('YAMB', col)}
                                   disabled={!this.isEnabled('YAMB', col)}
                                   onKeyDown={(e: any) => this.onKeyPress(e, 'YAMB', col)}
                                   onBlur={(e: any) => this.onBlur(e, 'YAMB', col)}
                                   className={this.getClasses('YAMB', col)}
                                   type='text'
                                   ref={this.cells['YAMB'][col]}
                                   onFocus={(e: any) => this.onFocus(e, 'YAMB', col)}
                            />
                        </Cell>
                    )}/>
                    <Cell/>
                </Row>
                <SumRow>
                    <HeaderCell>Σ</HeaderCell>
                    <Each items={Board.editableCols} renderItem={(col: number, index: number) => (
                        <Cell key={index}>
                            <SumInput
                                value={this.getValue('SUM3', col)}
                                disabled
                                type='text'
                            />
                        </Cell>
                    )}/>
                    <Cell>
                        <SumInput
                            value={this.getValue('SUM3', Board.COL_SUM)}
                            disabled
                            type='text'
                        />
                    </Cell>
                </SumRow>
                <SumRow>
                    <Cell colSpan={11}/>
                    <Cell><SumInput disabled
                                    type='text'
                                    value={this.state.TOTAL}/></Cell>
                </SumRow>
                </tbody>
            </Table>
        );
    }
}

export default Board;
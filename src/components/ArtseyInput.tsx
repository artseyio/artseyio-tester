import randomWords from "random-words";
import styled from "styled-components";
import React, { FC, useEffect, useRef, useState } from 'react';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';
import useKeyMapper from '../effects/KeyMapperEffect';
import { KeyMapDefinition } from '../model/KeyMapDefinition';

interface ArtseyInputComponentProps {
    keymap: KeyMapDefinition;
}

export const ArtseyInput: FC<ArtseyInputComponentProps> = (props: ArtseyInputComponentProps) => {
    const wordDivRef = useRef<HTMLDivElement>(null);

    const [isFocused, setFocused] = useState(false);
    const [keyQueue, setKeyQueue] = useState<Array<React.KeyboardEvent<HTMLInputElement>>>([]);

    const [caretPos, setCaretPos] = useState(0);
    const [wordList, setWordList] = useState<Array<string>>(randomWords(25));
    const [enteredKeys, setEnteredKeys] = useState<Array<string>>([]);
    
    const getArtseyValue = useKeyMapper(props.keymap);

    useEffect(() => reset(), []);        
    useEffect(() => {
        const interval = setInterval(() => {
            if(keyQueue.length !== 0) {
                let joinedWordList = wordList.join(" ");
                let artsyKey = getArtseyValue(keyQueue);

                if(artsyKey === "Backspace" && enteredKeys.length > 0) {
                    setEnteredKeys(prev => [...prev.slice(0, prev.length - 1)]);
                    setCaretPos(caretPos - 1);
                }
                else if(
                    artsyKey !== undefined && artsyKey !== "Backspace"
                    && ((joinedWordList.split("")[caretPos] === " " && artsyKey === "Space") || joinedWordList.split("")[caretPos] !== " ")
                ) {
                        setEnteredKeys(prev => [...prev, artsyKey as string]);
                        setCaretPos(caretPos + 1);
                }                
                setKeyQueue([]);
            }
        }, 25);
        return () => clearInterval(interval);
    }, [keyQueue, enteredKeys, caretPos, getArtseyValue, wordList]);

    const reset = () => {
        setEnteredKeys([]);
        setKeyQueue([]);
        setCaretPos(0);
        setWordList(randomWords(25));
        wordDivRef.current?.focus()
    }

    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setKeyQueue(oldArray => [...oldArray, e]);
        e.preventDefault();
    }

    const generateWordListElements = (): Array<JSX.Element> => {
        let pos = 0;
        let caretDiv = <div id="caret" key="caret"></div>;
        let words = wordList.map((w, idxw) => {
            let wordDiv = <div className="word" key={ idxw }>
                { w.split("").map((c, idxc) => {
                    let caret = pos === caretPos ? caretDiv : undefined;
                    let ele = enteredKeys.length - 1 >= pos
                        ? <div className={ enteredKeys[pos] === c ? "letter correct" : "letter wrong" } key={ idxc }>{c}</div>
                        : <div className="letter" key={ idxc }>{c}</div>;
                    pos++;
                    return caret !== undefined ? [caret, ele] : [ele];
                })}
                { pos === caretPos && caretDiv }
                <div className="space"></div>
            </div>
            pos++;
            return wordDiv;
        });
        return words;
    }

    return (
        <StyledArtseyInput>
            <div id="word-list" tabIndex={0} onFocus={ () => setFocused(true) } onBlur={ () => setFocused(false) } onKeyUp={ onKeyUp } ref={ wordDivRef }>
                { !isFocused && <div id="focus-message"><p>Focus Please</p></div> }
                { generateWordListElements() }
            </div>
            <small id="keycode-monitor">Last Registered: { enteredKeys.length !== 0 ? enteredKeys[enteredKeys.length - 1] : "NONE" }</small>
            <IconButton icon={faSync} onClick={ reset } ></IconButton>            
        </StyledArtseyInput>
    );
}

const StyledArtseyInput = styled.div`{}
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    align-content: stretch;
    align-items: stretch;
    margin: 100px 0;

    #logo {
        width: 150px;
    }

    #word-list {
        position: relative;
        font-size: 1.5rem;
        display: flex;
        flex-wrap: wrap;
        outline: 0;
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
    }

    #keycode-monitor {
        text-align: left;
        font-weight: bold;
        margin: 10px 0;
        color: ${ p => p.theme.textColorFaded };
    }

    #caret {
        display: block;
        width: 0px;
        border: 1px solid ${ p => p.theme.cursorColor };
        animation: blinker 2s linear infinite;
        margin-top: 5px;
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }

    #focus-message {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        background: rgba(255, 255, 255, 0.75);
        display: flex;
        justify-content: center;
        align-items: center;

        p { font-weight: bold; }
    }

    .word {
        display: flex;
        margin-right: 10px;
        color: ${ p => p.theme.textColorFaded };
    }

    .correct { color: ${ p => p.theme.textColor }; }
    .wrong { color: ${ p => p.theme.colorRed }; }
`;

export default ArtseyInput;
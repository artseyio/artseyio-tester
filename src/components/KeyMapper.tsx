import React, { FC, useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { KeyInfo } from '../effects/KeyMapperEffect';

interface KeyMapperComponentProps {
    onMappingChanged: (mapping: { [id: string] : KeyInfo }) => void;
}

export const KeyMapper: FC<KeyMapperComponentProps> = (props: KeyMapperComponentProps) => {
    const [aMapping, setAMapping] = useState("u");
    const [rMapping, setRMapping] = useState("y");
    const [tMapping, setTMapping] = useState("t");
    const [sMapping, setSMapping] = useState("r");
    const [eMapping, setEMapping] = useState("j");
    const [yMapping, setYMapping] = useState("h");
    const [iMapping, setIMapping] = useState("g");
    const [oMapping, setOMapping] = useState("f");

    useEffect(() => {
        let asCode = (key: string) => "Key" + key.toUpperCase();

        let keymap: { [id: string] : KeyInfo } = {};
        keymap[asCode(aMapping)] = { code: "KeyA", key: "a" };
        keymap[asCode(rMapping)] = { code: "KeyR", key: "r" };
        keymap[asCode(tMapping)] = { code: "KeyT", key: "t" };
        keymap[asCode(sMapping)] = { code: "KeyS", key: "s" };
        keymap[asCode(eMapping)] = { code: "KeyE", key: "e" };
        keymap[asCode(yMapping)] = { code: "KeyY", key: "y" };
        keymap[asCode(iMapping)] = { code: "KeyI", key: "i" };
        keymap[asCode(oMapping)] = { code: "KeyO", key: "o" };
console.dir(keymap);
        props.onMappingChanged(keymap);
    }, [aMapping, rMapping, tMapping, sMapping, eMapping, yMapping, iMapping, oMapping]);

    return (
        <StyledKeyMapper>
            <p>
                This is the key mapper. It maps the keys of your keyboard to the indicated keys of artsey. The default mapping is for a left handed usage.
                If you are already using combos on your keyboard, make sure, that you are not using the regarding keys in the mapping. This can cause problems.
            </p>
            <div id="key-map">
                <div id="artsey-map-a" className="key">A <input value={ aMapping } onChange={ (e) => setAMapping(e.target.value) }></input></div>
                <div id="artsey-map-r" className="key">R <input value={ rMapping } onChange={ (e) => setRMapping(e.target.value) }></input></div>
                <div id="artsey-map-t" className="key">T <input value={ tMapping } onChange={ (e) => setTMapping(e.target.value) }></input></div>
                <div id="artsey-map-s" className="key">S <input value={ sMapping } onChange={ (e) => setSMapping(e.target.value) }></input></div>
                <div id="artsey-map-e" className="key">E <input value={ eMapping } onChange={ (e) => setEMapping(e.target.value) }></input></div>
                <div id="artsey-map-y" className="key">Y <input value={ yMapping } onChange={ (e) => setYMapping(e.target.value) }></input></div>
                <div id="artsey-map-i" className="key">I <input value={ iMapping } onChange={ (e) => setIMapping(e.target.value) }></input></div>
                <div id="artsey-map-o" className="key">O <input value={ oMapping } onChange={ (e) => setOMapping(e.target.value) }></input></div>
            </div>
        </StyledKeyMapper>
    );
}

const StyledKeyMapper = styled.div`{}
    margin: 100px 0 0 0;
    max-width: 700px;
    text-align: center;

    #key-map {
        display: inline-grid;
        gap: 10px;
    }

    .key {
        border: 1px solid ${ p => p.theme.borderColor };
        border-radius: 5px;
        width: 50px;
        height: 50px;
        padding: 10px 5px;
        font-weight: bold;

        input {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid ${ p => p.theme.borderColor };
            text-align: center;
        }
    }

    #artsey-map-a {
        grid-row: 1;
        grid-column: 1;
    }

    #artsey-map-r {
        grid-row: 1;
        grid-column: 2;
    }

    #artsey-map-t {
        grid-row: 1;
        grid-column: 3;
    }

    #artsey-map-s {
        grid-row: 1;
        grid-column: 4;
    }

    #artsey-map-e {
        grid-row: 2;
        grid-column: 1;
    }

    #artsey-map-y {
        grid-row: 2;
        grid-column: 2;
    }

    #artsey-map-i {
        grid-row: 2;
        grid-column: 3;
    }

    #artsey-map-o {
        grid-row: 2;
        grid-column: 4;
    }
`;

export default KeyMapper;
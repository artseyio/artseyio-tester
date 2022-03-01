import styled from "styled-components";
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { ArtsyCode, ArtsyKey, DefaultKeyMaps, KeyMapDefinition } from '../model/KeyMapDefinition';

interface KeyMapperComponentProps {
    onMappingChanged: (mapping: KeyMapDefinition) => void;
    onKeyTimeoutChanged: (timeout: number) => void;
}

export const KeyMapper: FC<KeyMapperComponentProps> = (props: KeyMapperComponentProps) => {
    const [keymaps, setKeyMaps] = useState(DefaultKeyMaps);
    const [keyTimeout, setKeyTimeout] = useState(25);
    const [mapping, setMapping] = useState<KeyMapDefinition>(DefaultKeyMaps[0]);
    const propOnChange = props.onMappingChanged;
    const timeoutOnChange = props.onKeyTimeoutChanged;

    useEffect(() => {        
        let keymap = localStorage.getItem("keymap");
        let customMap = keymap ? JSON.parse(keymap) as KeyMapDefinition : undefined;        
        if(customMap) {
            setKeyMaps(prev => [...prev, customMap as KeyMapDefinition]);
        }

        let selectedMap = localStorage.getItem("selectedMap");
        if(selectedMap && selectedMap !== "Custom") {
            let mapping = DefaultKeyMaps.find(map => map.name === selectedMap);
            if(mapping) setMapping(mapping);
        }
        else if(selectedMap && selectedMap === "Custom" && customMap) {            
            setMapping(customMap);
        }

        let savedTimeout = localStorage.getItem("keyTimeout");
        if(savedTimeout) setKeyTimeout(parseInt(savedTimeout));
    }, []);    
    useEffect(() => { propOnChange(mapping); }, [mapping, propOnChange]);
    useEffect(() => { timeoutOnChange(keyTimeout); }, [keyTimeout, timeoutOnChange]);

    const onSelectionChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        let mapping = keymaps.find(map => map.name === e.target.value);
        if(mapping) {
            setMapping(mapping);
            localStorage.setItem("selectedMap", e.target.value);
        }
    };

    const onTimeoutChanged  = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyTimeout(parseInt(e.target.value));
        localStorage.setItem("keyTimeout", e.target.value);
    };

    const onKeyChanged = (targetCode: ArtsyCode, targetKey: ArtsyKey, value: string) => {
        let newMapping: KeyMapDefinition = { name: "Custom", keys: { ...mapping.keys } };
        newMapping.keys[targetCode] = { fromKey: value, toCode: targetCode, toKey: targetKey };

        let newKeyMaps = keymaps.filter(k => k.name !== "Custom");
        newKeyMaps.push(newMapping);

        setKeyMaps(newKeyMaps);
        setMapping(newMapping);
        localStorage.setItem("selectedMap", "Custom");
        localStorage.setItem("keymap", JSON.stringify(newMapping));
    };

    return (
        <StyledKeyMapper>
            <p>
                This is the key mapper. It maps the keys of your keyboard to the indicated keys of artsey. The default mapping is for a left handed usage.
                If you are already using combos or mod taps on your keyboard, make sure, that you are not using the regarding keys in the mapping. This can cause problems.
            </p>
            <p>Please select a predefined mapping or define one yourself. The mapping will be saved between sessions.</p>
            <select value={ mapping?.name } onChange={ onSelectionChanged }>
                { keymaps.map(def => <option value={ def.name } key={ def.name }>{ def.name }</option>) }
            </select>
            <div id="key-map">
                <div id="artsey-map-a" className="key">A <input value={ mapping?.keys[ArtsyCode.A].fromKey } onChange={ (e) => onKeyChanged(ArtsyCode.A, ArtsyKey.A, e.target.value) }></input></div>
                <div id="artsey-map-r" className="key">R <input value={ mapping?.keys[ArtsyCode.R].fromKey } onChange={ (e) => onKeyChanged(ArtsyCode.R, ArtsyKey.R, e.target.value) }></input></div>
                <div id="artsey-map-t" className="key">T <input value={ mapping?.keys[ArtsyCode.T].fromKey } onChange={ (e) => onKeyChanged(ArtsyCode.T, ArtsyKey.T, e.target.value) }></input></div>
                <div id="artsey-map-s" className="key">S <input value={ mapping?.keys[ArtsyCode.S].fromKey } onChange={ (e) => onKeyChanged(ArtsyCode.S, ArtsyKey.S, e.target.value) }></input></div>
                <div id="artsey-map-e" className="key">E <input value={ mapping?.keys[ArtsyCode.E].fromKey } onChange={ (e) => onKeyChanged(ArtsyCode.E, ArtsyKey.E, e.target.value) }></input></div>
                <div id="artsey-map-y" className="key">Y <input value={ mapping?.keys[ArtsyCode.Y].fromKey } onChange={ (e) => onKeyChanged(ArtsyCode.Y, ArtsyKey.Y, e.target.value) }></input></div>
                <div id="artsey-map-i" className="key">I <input value={ mapping?.keys[ArtsyCode.I].fromKey } onChange={ (e) => onKeyChanged(ArtsyCode.I, ArtsyKey.I, e.target.value) }></input></div>
                <div id="artsey-map-o" className="key">O <input value={ mapping?.keys[ArtsyCode.O].fromKey } onChange={ (e) => onKeyChanged(ArtsyCode.O, ArtsyKey.O, e.target.value) }></input></div>
            </div>            
            <p>
                The combo registration works with a predefined timer. All buttons pressed during the defined timeout will be registered as one combo. If you are struggeling to get
                four button combos to work, it might help to increase the timeout.
            </p>
            <div id="artsey-timeout"><span>Combo Timeout</span><input value={ keyTimeout } onChange={ onTimeoutChanged }></input><span>ms</span></div>
        </StyledKeyMapper>
    );
}

const StyledKeyMapper = styled.div`{}
    display: flex;
    flex-direction: column;
    align-items: center;

    select {
        display: block;
        margin-bottom: 20px;
        border: 1px solid ${ p => p.theme.borderColor };
        border-radius: 5px;
        padding: 10px;
        background: white;
        color: ${ p => p.theme.textColor };
        font-size: 1rem;
    }

    #artsey-timeout {
        margin-top: 15px;        
        margin-bottom: 15px;
        display: flex;
        align-items: center;

        input {
            max-width: 75px;
            margin-left: 15px;
            margin-right: 5px;
            border: 1px solid ${ p => p.theme.borderColor };
            border-radius: 5px;
            padding: 10px;
            background: white;
            color: ${ p => p.theme.textColor };
            font-size: 1rem;
        }
    }

    #key-map {
        display: inline-grid;
        gap: 10px;        
        margin-bottom: 25px;
    }

    .key {
        border: 1px solid ${ p => p.theme.borderColor };
        border-radius: 5px;
        width: 50px;
        height: 50px;
        padding: 10px 5px;
        font-weight: bold;
        text-align: center;

        input {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid ${ p => p.theme.borderColor };
            text-align: center;
            font-size: 0.8rem;
            padding: 5px;
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
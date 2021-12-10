import { Combos } from "../model/ComboDefinition";
import { ArtsyCode, KeyMapDefinition } from "../model/KeyMapDefinition";

export default function useKeyMapper(mapping: KeyMapDefinition) {
    return (queue: Array<React.KeyboardEvent<HTMLInputElement>>): string | undefined => 
    {
        let mappedKeys = [];
        for(let i = 0; i < queue.length; i++) {
            let foundKey = Object.keys(mapping.keys).find(v => mapping.keys[v as ArtsyCode].fromKey === queue[i].key);
            if(foundKey !== undefined) mappedKeys.push(mapping.keys[foundKey as ArtsyCode]);
        }
        
        let comboKeyCode = mappedKeys
            .map(m => m.toCode)
            .sort()
            .reduce((pre, cur) => { return pre + (pre !== "" ? "_" : "") + cur }, "");

        if(mappedKeys.length === 1) return mappedKeys[0].toKey;
        else if(Combos.hasOwnProperty(comboKeyCode)) return Combos[comboKeyCode];
        else return undefined;
    };
}
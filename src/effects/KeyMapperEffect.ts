export type KeyInfo = { code: string, key: string }
const combos: { [id: string]: KeyInfo } = { 
    "KeyE_KeyO": { code: "KeyB", key: "b" },
    "KeyE_KeyY": { code: "KeyC", key: "c" },
    "KeyA_KeyR_KeyT": { code: "KeyB", key: "d" },
    "KeyA_KeyR": { code: "KeyF", key: "f" },
    "KeyR_KeyT": { code: "KeyG", key: "g" },
    "KeyE_KeyI": { code: "KeyH", key: "h" },
    "KeyS_KeyT": { code: "KeyJ", key: "j" },
    "KeyO_KeyY": { code: "KeyK", key: "k" },
    "KeyE_KeyI_KeyY": { code: "KeyL", key: "l" },
    "KeyI_KeyO_KeyY": { code: "KeyM", key: "m" },
    "KeyI_KeyO": { code: "KeyN", key: "n" },
    "KeyE_KeyI_KeyO": { code: "KeyP", key: "p" },
    "KeyA_KeyS_KeyT": { code: "KeyQ", key: "q" },
    "KeyI_KeyY": { code: "KeyU", key: "u" },
    "KeyR_KeyS": { code: "KeyV", key: "v" },
    "KeyA_KeyS": { code: "KeyW", key: "w" },
    "KeyR_KeyS_KeyT": { code: "KeyX", key: "x" },
    "KeyA_KeyR_KeyS_KeyT": { code: "KeyZ", key: "z" },
    "KeyE_KeyI_KeyO_KeyY": { code: "Space", key: "Space" },
    "KeyE_KeyR": { code: "Backspace", key: "Backspace" }
};

export default function useKeyMapper(getMap: () => { [id: string] : KeyInfo }) {
    return (queue: Array<React.KeyboardEvent<HTMLInputElement>>): string | undefined => 
    {
        let map = getMap();
        let mappedKeys = [];
        for(let i = 0; i < queue.length; i++) {
            let mappedKey = map[queue[i].code];
            if(mappedKey !== undefined) mappedKeys.push(mappedKey);
        }
        
        let comboKeyCode = mappedKeys
            .map(k => k.code)
            .sort()
            .reduce((pre, cur, idx, vals) => { return pre + (pre !== "" ? "_" : "") + cur }, "");

        if(mappedKeys.length === 1) return mappedKeys[0].key;
        else if(combos.hasOwnProperty(comboKeyCode)) return combos[comboKeyCode].key;
        else return undefined;
    };
}
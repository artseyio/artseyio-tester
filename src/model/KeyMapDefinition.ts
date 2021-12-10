export type ArtsyKeyMapping = { fromKey: string, toCode: string, toKey: string }
export enum ArtsyCode {
    A = "KeyA", R = "KeyR", T = "KeyT", S = "KeyS",
    E = "KeyE", Y = "KeyY", I = "KeyI", O = "KeyO"
}

export enum ArtsyKey {
    A = "a", R = "r", T = "t", S = "s",
    E = "e", Y = "y", I = "i", O = "o"
}

export interface KeyMapDefinition {
    name: string;
    keys: Record<ArtsyCode, ArtsyKeyMapping>;
}

export const DefaultKeyMaps: Array<KeyMapDefinition> = [
    { name: "Left Hand", keys: { 
            [ArtsyCode.A]: { fromKey: "t", toCode: ArtsyCode.A, toKey: ArtsyKey.A }, 
            [ArtsyCode.R]: { fromKey: "r", toCode: ArtsyCode.R, toKey: ArtsyKey.R }, 
            [ArtsyCode.T]: { fromKey: "e", toCode: ArtsyCode.T, toKey: ArtsyKey.T }, 
            [ArtsyCode.S]: { fromKey: "w", toCode: ArtsyCode.S, toKey: ArtsyKey.S }, 
            [ArtsyCode.E]: { fromKey: "g", toCode: ArtsyCode.E, toKey: ArtsyKey.E }, 
            [ArtsyCode.Y]: { fromKey: "f", toCode: ArtsyCode.Y, toKey: ArtsyKey.Y }, 
            [ArtsyCode.I]: { fromKey: "d", toCode: ArtsyCode.I, toKey: ArtsyKey.I }, 
            [ArtsyCode.O]: { fromKey: "s", toCode: ArtsyCode.O, toKey: ArtsyKey.O }
        }
    },
    { name: "Right Hand", keys: {
            [ArtsyCode.A]: { fromKey: "y", toCode: ArtsyCode.A, toKey: ArtsyKey.A }, 
            [ArtsyCode.R]: { fromKey: "u", toCode: ArtsyCode.R, toKey: ArtsyKey.R }, 
            [ArtsyCode.T]: { fromKey: "i", toCode: ArtsyCode.T, toKey: ArtsyKey.T }, 
            [ArtsyCode.S]: { fromKey: "o", toCode: ArtsyCode.S, toKey: ArtsyKey.S }, 
            [ArtsyCode.E]: { fromKey: "h", toCode: ArtsyCode.E, toKey: ArtsyKey.E }, 
            [ArtsyCode.Y]: { fromKey: "j", toCode: ArtsyCode.Y, toKey: ArtsyKey.Y }, 
            [ArtsyCode.I]: { fromKey: "k", toCode: ArtsyCode.I, toKey: ArtsyKey.I }, 
            [ArtsyCode.O]: { fromKey: "l", toCode: ArtsyCode.O, toKey: ArtsyKey.O }
        }
    }
];
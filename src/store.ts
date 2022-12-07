import create from "zustand";
import { type Triplet } from '@react-three/cannon'

import { shipFlySpeed } from './constant'

interface IShipStore {
    shipPosition: Triplet,
    moveShip: () => void
}

export const useStore = create<IShipStore>((set, get) => ({
    shipPosition: [0, 3, -20],
    moveShip: () =>  {
        const [x, y, z] = get().shipPosition

        set({ shipPosition: [x, y, z - shipFlySpeed] })
    }
}))

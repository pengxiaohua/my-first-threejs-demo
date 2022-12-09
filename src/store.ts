import create from "zustand";
import { type Triplet } from '@react-three/cannon'

import { shipFlySpeed } from './constant'

interface IShipStore {
    shipPosition: Triplet,
    moveShip: (moveDistance?: Triplet) => void
}

export const useStore = create<IShipStore>((set, get) => ({
    shipPosition: [0, 3, -20],
    // 解构 moveDistance 偏移量得出：moveX, moveY, moveZ
    moveShip: ([moveX, moveY, moveZ] = [0, 0, 0]) =>  {
        const [preX, preY, preZ] = get().shipPosition

        set({ shipPosition: [preX + moveX, preY + moveY, preZ - shipFlySpeed - moveZ] })
    }
}))

import React, { useState, createContext, ReactNode, useContext } from "react";

type Card = {
    rank?: string;
    suit?: string;
    color?: string;
    index: string;
};

interface IHandContext {
    hand: Card[];
    setHand: React.Dispatch<React.SetStateAction<Card[]>>;
    isMyCrib: boolean;
    setIsMyCrib: React.Dispatch<React.SetStateAction<boolean>>;
    players: number;
    setPlayers: React.Dispatch<React.SetStateAction<number>>;
}

const HandContext = createContext<IHandContext | null>(null);

export const useHandContext = () => {
    const currentHandContext = useContext(HandContext);
    if (!currentHandContext) {
        throw new Error("useHand has to be used within <HandContext.Provider>");
    }
    return currentHandContext;
};

export function HandProvider({ children }: { children: ReactNode }) {
    const [hand, setHand] = useState<Card[]>(Array.from({ length: 6 }));
    const [isMyCrib, setIsMyCrib] = useState(true);
    const [players, setPlayers] = useState(2);
    return (
        <HandContext.Provider
            value={{
                hand,
                setHand,
                isMyCrib,
                setIsMyCrib,
                players,
                setPlayers,
            }}
        >
            {children}
        </HandContext.Provider>
    );
}

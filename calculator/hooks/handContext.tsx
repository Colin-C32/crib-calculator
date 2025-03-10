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
    return (
        <HandContext.Provider value={{ hand, setHand }}>
            {children}
        </HandContext.Provider>
    );
}

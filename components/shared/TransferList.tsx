'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import eventEmitter from '@/lib/eventEmitter'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, SquareCheckIcon, SquareIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export type Item = {
    key: string
    label: string
    selected?: boolean
}

export interface TransferListProps {
    leftItems: Item[],
    rightItems?: Item[],
    leftTitle?: string;
    rightTitle?: string;
    onListChange: (data: TransferListDataState) => void;
}

export interface TransferListDataState {
    leftList: Item[]
    rightList: Item[]
    leftSearch: string
    rightSearch: string
}

export default function TransferList({ onListChange, leftItems, rightItems = [], leftTitle = '', rightTitle = '' }: TransferListProps) {
    const [state, setState] = useState<TransferListDataState>({
        leftList: leftItems,
        rightList: rightItems,
        leftSearch: '',
        rightSearch: '',
    })

    useEffect(() => {
        setState(prev => ({
            ...prev,
            leftList: leftItems,
            rightList: rightItems,
        }));
    }, [leftItems, rightItems]); 

    const updateListState = (newLeftList: Item[], newRightList: Item[]) => {
        setState((prev) => {
            const updatedState = {
                leftList: newLeftList,
                rightList: newRightList,
                leftSearch: prev.leftSearch,
                rightSearch: prev.rightSearch,
            };

            setTimeout(() => onListChange(updatedState), 0);
            return updatedState;
        });
    }

    const moveToRight = () => {
        const selectedItems = state.leftList.filter((item) => item.selected);
        const newLeftList = state.leftList.filter((item) => !item.selected);
        const newRightList = [...state.rightList, ...selectedItems];

        updateListState(newLeftList, newRightList);
        
    }

    const moveToLeft = () => {
        const selectedItems = state.rightList.filter((item) => item.selected);
        const newRightList = state.rightList.filter((item) => !item.selected);
        const newLeftList = [...state.leftList, ...selectedItems];

        updateListState(newLeftList, newRightList);
    }

    const moveAllToRight = () => {
        updateListState([], [...state.leftList, ...state.rightList]);
    }

    const moveAllToLeft = () => {
        updateListState([...state.leftList, ...state.rightList], []);
    }

    const toggleSelection = (key: string) => {
        setState((prev) => {
            const updatedLeftList = prev.leftList.map((item) =>
                item.key === key ? { ...item, selected: !item.selected } : item
            );
            const updatedRightList = prev.rightList.map((item) =>
                item.key === key ? { ...item, selected: !item.selected } : item
            );

            return {
                ...prev,
                leftList: updatedLeftList,
                rightList: updatedRightList,
            };
        });
    }

    const filterItems = (items: Item[], search: string) => {
        return items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));
    };

    return (
        <div className='flex flex-col sm:flex-row gap-4'>
            {/* Left List Column */}
            <div className='sm:w-1/2 shadow-sm bg-background rounded-sm text-center'>
                {leftTitle && <h3 className="mb-2">{leftTitle}</h3>}
                <div className='flex items-center justify-between'>
                    <Input
                        placeholder='Procurar...'
                        className='rounded-br-none rounded-tr-none rounded-bl-none focus-visible:ring-0 focus-visible:border-blue-500'
                        value={state.leftSearch}
                        onChange={(e) => setState((prev) => ({ ...prev, leftSearch: e.target.value }))} // Mantenha o estado de busca
                    />
                    <Button
                        type="button"
                        className='rounded-none border-l-0'
                        onClick={moveToRight}
                        size='icon'
                        variant='outline'>
                        <ChevronRightIcon className='size-4' />
                    </Button>
                    <Button
                        type="button"
                        className='rounded-tl-none rounded-bl-none rounded-br-none border-l-0'
                        onClick={moveAllToRight}
                        size='icon'
                        variant='outline'>
                        <ChevronsRightIcon className='size-4' />
                    </Button>
                </div>
                <ul className='h-[200px] border-l border-r border-b rounded-br-sm rounded-bl-sm p-1.5 overflow-y-scroll'>
                    {filterItems(state.leftList, state.leftSearch).map((item) => (
                        <li className='flex items-center gap-1.5 text-sm hover:bg-muted rounded-sm' key={item.key}>
                            <button
                                type='button'
                                className='flex items-center gap-1.5 w-full p-1.5'
                                onClick={() => toggleSelection(item.key)}>
                                {item.selected ? (
                                    <SquareCheckIcon className='h-5 w-5 text-muted-foreground/50' />
                                ) : (
                                    <SquareIcon className='h-5 w-5 text-muted-foreground/50' />
                                )}
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right List Column */}
            <div className='sm:w-1/2 shadow-sm bg-background rounded-sm text-center'>
                {rightTitle && <h3 className="mb-2">{rightTitle}</h3>}
                <div className='flex items-center justify-between'>
                    <Button
                        type="button"
                        className='rounded-tr-none rounded-br-none rounded-bl-none border-r-0'
                        onClick={moveAllToLeft}
                        size='icon'
                        variant='outline'>
                        <ChevronsLeftIcon className='size-4' />
                    </Button>
                    <Button
                        type="button"
                        className='rounded-none border-r-0'
                        onClick={moveToLeft}
                        size='icon'
                        variant='outline'>
                        <ChevronLeftIcon className='size-4' />
                    </Button>
                    <Input
                        placeholder='Procurar...'
                        className='rounded-none focus-visible:ring-0 focus-visible:border-blue-500'
                        value={state.rightSearch}
                        onChange={(e) => setState((prev) => ({ ...prev, rightSearch: e.target.value }))} // Mantenha o estado de busca
                    />
                </div>
                <ul className='h-[200px] border-l border-r border-b rounded-br-sm rounded-bl-sm p-1.5 overflow-y-scroll'>
                    {filterItems(state.rightList, state.rightSearch).map((item) => (
                        <li className='flex items-center gap-1.5 text-sm hover:bg-muted rounded-sm' key={item.key}>
                            <button
                                type='button'
                                className='flex items-center gap-1.5 w-full p-1.5'
                                onClick={() => toggleSelection(item.key)}>
                                {item.selected ? (
                                    <SquareCheckIcon className='size-4 text-muted-foreground/50' />
                                ) : (
                                    <SquareIcon className='size-4 text-muted-foreground/50' />
                                )}
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

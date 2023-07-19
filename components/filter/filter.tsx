'use client'

import styles from "./filter.module.scss"
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/services/reduxHook";
import { setCategory, setSort } from '@/redux/store/pizzaSlice';


const Filter = () => {

    const filter = useAppSelector(state => state.pizza.category);

    const [filters,setFilters] = useState<Array<string>>(["Всі","М'ясні","Вегетаріанські","Гриль","Гострі","Закриті"]);
    const [activeFilter,setActiveFilters] = useState<string>(filter);
    const [sort,setSorts] = useState<Array<string>>(["популярності","за ціною","за абеткою"]);
    const [showSortList,setShowSortList] = useState<boolean>(false);
    const [activeSort,setActiveSort] = useState<string>(sort[0]);
    const [showFilter,setShowFilter] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const setFilter = (filter:string) => {
        setActiveFilters(filter);
        dispatch(setCategory(filter));
    }

    const setSortToRedux = (sort:string) => {
        setActiveSort(sort);
        dispatch(setSort(sort));
    }

    const setShow = () => {
        setShowSortList(false);
        setShowFilter(false);
    }


    return (
        <>
            <div className={styles.background} onClick={setShow}></div>
            <div className={styles.header}>
                <div className={styles.header__filter}>
                    <div className={styles.header__filter__wrap}>
                        <button style={{backgroundColor: '#F9F9F9',color:'black'}} className={styles.header__filter__wrapBtns__item} onClick={() => setShowFilter(!showFilter)}>Фільтр</button>
                    </div>
                    <div className={styles.header__filter__wrapBtns} style={{display: typeof window !== 'undefined' ? window.innerWidth > 1025 ? 'flex' : showFilter ? 'block' : 'none' : 'flex'}}>
                    
                        {filters.map(item => (
                            <button 
                                className={`${styles.header__filter__wrapBtns__item} ${activeFilter === item ? styles.activeFilter : ''}`} 
                                key={item} 
                                onClick={() => setFilter(item)}>{item}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={styles.header__sort} onClick={() => setShowSortList(showSortList => !showSortList)}>
                    <Image src="/sort.svg" alt="sort" width="10" height="6" style={{marginTop:'5px'}}/>
                    <p>Сортування за:</p>
                    <span>{activeSort}</span>
                </div>
                <div className={styles.header__sortList} style={{display: showSortList ? 'flex' : 'none'}}>
                    {sort.map(item => (
                        <p key={item} onClick={() => setSortToRedux(item)}>{item}</p>
                    ))}
                </div>
            </div>
        </>
        
    )
}

export default Filter;
import React, {useEffect, useState} from 'react';


const GroupControl = (props) => {

    const {values, selected, newGroupName, reducer} = props;
    const [dropDown, setDropDown] = useState(false);

    useEffect(() => {
        window.addEventListener('click', clickOutsideHandler);
        return () => window.removeEventListener('click', clickOutsideHandler);
    });

    const dropDownGroups = (e) => {
        e.stopPropagation();
        setDropDown(!dropDown);
    };

    const dispatch = (action, payload) => {
        reducer(action, payload);
    };

    const addGroup = () => dispatch('addGroup');

    const updateGroupField = e => {
        if (selected) {
            dispatch('clearSelector');
        } else {
            dispatch('updateNewGroupVal', e.target.value);
        }
    };

    const deleteGroup = () => dispatch('deleteGroup', selected);

    const clickOutsideHandler = () => {
        if (dropDown) {
            if (!selected && newGroupName) addGroup();
            setDropDown(false);
        }
    };

    return (
        <div className="font-sans relative">
            <div className="m-3 text-black text-base font-semibold">Группа:</div>
            <div
                className={`w-full h-9 flex items-center flex-wrap justify-between relative bg-white border-gray-300 text-gray-400 border-2 rounded border-solid box-border cursor-pointer transition duration-300 hover:border-black hover:text-black hover:shadow-md hover:transition hover:duration-300 ${(dropDown) ? 'groupSelector-active' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setDropDown(true);
                }}
            >
                <input
                    className="border-0 w-4/5 m-0 outline-none py-1 pl-1 pr-3 placeholder-gray-300 focus:text-black"
                    type="text"
                    placeholder="Укажите название"
                    value={(selected)? selected : newGroupName}
                    onChange={updateGroupField}
                />
                <div className="flex items-center">
                    {selected
                        ? <div className="groupSelector-svg-btn hover:text-red-600 active:text-black"
                               onClick={deleteGroup}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
                                 className="groupSelector-svg-btn-img">
                                <path
                                    d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                        </div>
                        : null}
                    {values.length ?
                        <div className="flex items-center">
                            {(newGroupName || selected) ?
                                <span className="self-stretch bg-gray-300 my-2 w-px box-border"/> : null}
                            <div
                                className={`flex text-gray-300 p-1.5 transition-colors box-border ${(dropDown && values) ? 'rotateArrow' : ''}`}
                                onClick={dropDownGroups}>
                                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"
                                     className="groupSelector-svg-btn-img">
                                    <path
                                        d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"/>
                                </svg>
                            </div>
                        </div> : null}
                </div>
            </div>
            {(values.length && dropDown)
                ? <div
                    className="mt-1 absolute z-50 max-h-80 w-full overflow-auto font-normal text-sx leading-6 shadow-Muixl groupSelector">
                    {values.map((item, i) =>
                        <div className="p-1.5 hover:bg-black hover:text-white"
                             key={`${item}_${i}`}
                             onClick={() => dispatch('selectGroup', item)}
                        >
                            {item}
                        </div>)}
                </div>
                : null}
        </div>
    );
};

export default GroupControl;
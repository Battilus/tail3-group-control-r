import React, {useState} from "react";
import GroupControl from "./GroupControl/GroupControl";


const GroupsWrapper = ({values, ...props}) => {
    const initialGroups = values ||
        [
            "Test 1",
            "Test 2",
            "Test 3",
            "Test 4",
            "Test 5",
            "Test 6",
            "Test 7",
            "Test 8",
            "Test 9"
        ];

    const [store, setStore] = useState({
        selected: initialGroups[0],
        groups: initialGroups,
        newGroupVal: "",
    });

    const groupReducer = (action, payload) => {
        switch (action) {

            case "updateNewGroupVal":
                if (store.newGroupVal.length < 32) setStore({...store, newGroupVal: payload});
                break;

            case "addGroup":
                if (!store.groups.find((item) => item === store.newGroupVal)) {
                    const updatedGroup = store.groups;
                    const newGroup = store.newGroupVal;
                    updatedGroup.push(newGroup);
                    setStore({
                        ...store,
                        selected: newGroup,
                        groups: updatedGroup,
                        newGroupVal: ""
                    });
                }
                break;

            case "deleteGroup":
                const clearedGroups = store.groups.filter((item) => item !== payload);
                setStore({
                    ...store,
                    selected: "",
                    groups: clearedGroups,
                });
                break;

            case "selectGroup":
                setStore({
                    ...store,
                    selected: payload,
                });
                break;

            case "clearSelector":
                setStore({
                    ...store,
                    selected: "",
                });
                break;

            default:
                setStore(store);
        }
    };

    return (
        <div className="container">
            <GroupControl
                values={store.groups}
                selected={store.selected}
                newGroupName={store.newGroupVal}
                reducer={groupReducer}
            />
        </div>
    );
};

export default GroupsWrapper;

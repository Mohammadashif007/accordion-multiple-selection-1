import { useState } from "react";
import data from "./data";
import "./style.css";

const Accordion = () => {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    const handleSelectedItem = (currentId) => {
        setSelected(currentId === selected ? null : currentId);
    };

    const handleMultiSelection = (currentId) => {
        let cpyMultiple = [...multiple];
        const findIndexOfCurrentId = cpyMultiple.indexOf(currentId);
        if(findIndexOfCurrentId === -1) cpyMultiple.push(currentId);
        else cpyMultiple.splice(findIndexOfCurrentId, 1)
        setMultiple(cpyMultiple);
    };

    console.log(enableMultiSelection, multiple);

    return (
        <div className="wrapper">
            {enableMultiSelection ? (
                <button
                    onClick={() =>
                        setEnableMultiSelection(!enableMultiSelection)
                    }
                >
                    Disable Multi Selection
                </button>
            ) : (
                <button
                    onClick={() =>
                        setEnableMultiSelection(!enableMultiSelection)
                    }
                >
                    Enable Multi Selection
                </button>
            )}

            <div className="accordion">
                {data && data.length > 0 ? (
                    data.map((dataItem) => (
                        <div
                            onClick={
                                enableMultiSelection
                                    ? () => handleMultiSelection(dataItem.id)
                                    : () => handleSelectedItem(dataItem.id)
                            }
                            key={dataItem.id}
                            className="item"
                        >
                            <div className="title">
                                <h3>{dataItem.question}</h3>
                                {selected ? <span>-</span> : <span>+</span>}
                            </div>
                            {selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? (
                                <div className="content">{dataItem.answer}</div>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <div>data not found</div>
                )}
            </div>
        </div>
    );
};

export default Accordion;

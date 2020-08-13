import React, {useState} from 'react';
import './ImportClassesModal.css';
import {InputClass} from "@bb-scheduler/common";
import {Modal} from "./Modal";
import {Button, ButtonColor} from "../Util/Button";
import {importFromeSchoolData} from "../../helpers/importFromeSchoolData";

interface ImportClassesModalProps {
    onImportClasses: (inputClass: InputClass[]) => void,
    onClose: () => void
}

export const ImportClassesModal: React.FunctionComponent<ImportClassesModalProps> = ({onImportClasses, onClose}) => {
    const [importValue, setImportValue] = useState("");
    const [importError, setImportError] = useState<string | undefined>();

    function errorMaker(val: string | undefined){
        if(!val){
            return null;
        }
        return <span className={"error"}>{val}</span>
    }

    function importClasses(importDataString: string){
        try {
            onImportClasses(importFromeSchoolData(importDataString));
            onClose();
            setImportError(undefined);
        } catch (e){
            setImportError(typeof e === "string" ? e : "Unknown error occured. Please try copying and pasting again.");
        }
    }

    return (
        <Modal onClose={onClose}>
            <div className={"import-modal"}>
                <h2 className={"import-title"}>Import Classes</h2>
                <textarea value={importValue} onPaste={e => importClasses(e.clipboardData.getData("Text"))} onChange={e => setImportValue(e.target.value)} placeholder={"Paste eSchoolData"} className={"import-input"}/>
                {errorMaker(importError)}
                <div className={"import-button-wrapper"}>
                    <Button fullWidth={true} style={{marginRight: "10px"}} onClick={onClose}
                            buttonColor={ButtonColor.BAD} type={"button"}>Cancel</Button>
                    <Button fullWidth={true} onClick={() => importClasses(importValue)}>Import</Button>
                </div>
            </div>
        </Modal>
    );
}
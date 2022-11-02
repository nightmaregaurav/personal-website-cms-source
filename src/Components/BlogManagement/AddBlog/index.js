import React from 'react';
import "./index.scss";
import SunEditor, {buttonList} from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';


const AddBlog = () => {
    return (
        <>
            <div className={"container"}>

                <SunEditor
                    defaultValue="<p>The editor's default value</p>"
                    setOptions={{
                        buttonList: buttonList.complex,
                    }}
                    height={"80vh"}
                />
            </div>
        </>
    );
};

export default AddBlog;

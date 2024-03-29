import StringUI from "./StringUI";
import NumberUI from "./NumberUI";
import UrlUI from "./UrlUI";
import ImageUrlUI from "./ImageUrlUI";
import ObjectUI from "./ObjectUI";
import ArrayUI from "./ArrayUI";

const ConfigUI = ({onChange, isGhPage, info, name, parent_disabledStatus=false, imageUploader}) => {
    const type = info.type;
    switch (type) {
        case 'STRING':
            return <StringUI onChange={onChange} info={info} name={name} parent_disabledStatus={parent_disabledStatus} />;
        case 'NUMBER':
            return <NumberUI onChange={onChange} info={info} name={name} parent_disabledStatus={parent_disabledStatus} />;
        case 'URL':
            return <UrlUI onChange={onChange} info={info} name={name} parent_disabledStatus={parent_disabledStatus} />;
        case 'IMAGE URL':
            return <ImageUrlUI onChange={onChange} isGhPage={isGhPage} info={info} name={name} parent_disabledStatus={parent_disabledStatus} imageUploader={imageUploader} />;
        case 'OBJECT':
            return <ObjectUI onChange={onChange} isGhPage={isGhPage} info={info} name={name} parent_disabledStatus={parent_disabledStatus} imageUploader={imageUploader} />;
        default:
            if(type.startsWith('ARRAY OF ')) {
                const sub_type = type.substring(9);
                return <ArrayUI elementType={sub_type} onChange={onChange} isGhPage={isGhPage} info={info} name={name} parent_disabledStatus={parent_disabledStatus} imageUploader={imageUploader} />;
            } else {
                return <div>Unsupported Type</div>;
            }
    }
};

export default ConfigUI;

import StringUI from "./StringUI";
import NumberUI from "./NumberUI";
import UrlUI from "./UrlUI";
import ImageUrlUI from "./ImageUrlUI";
import ObjectUI from "./ObjectUI";
import ArrayUI from "./ArrayUI";

const ConfigUI = ({onChange, isGhPage, info, name, parent_disabledStatus=false, removable=false}) => {
    const type = info.type;
    switch (type) {
        case 'STRING':
            return <StringUI onChange={onChange} info={info} name={name} parent_disabledStatus={parent_disabledStatus} removable={removable} />;
        case 'NUMBER':
            return <NumberUI onChange={onChange} info={info} name={name} parent_disabledStatus={parent_disabledStatus} removable={removable} />;
        case 'URL':
            return <UrlUI onChange={onChange} info={info} name={name} parent_disabledStatus={parent_disabledStatus} removable={removable} />;
        case 'IMAGE URL':
            return <ImageUrlUI onChange={onChange} isGhPage={isGhPage} info={info} name={name} parent_disabledStatus={parent_disabledStatus} removable={removable} />;
        case 'OBJECT':
            return <ObjectUI onChange={onChange} isGhPage={isGhPage} info={info} name={name} parent_disabledStatus={parent_disabledStatus} removable={removable} />;
        default:
            if(type.startsWith('ARRAY OF ')) {
                const sub_type = type.substring(9);
                return <ArrayUI elementType={sub_type} onChange={onChange} isGhPage={isGhPage} info={info} name={name} parent_disabledStatus={parent_disabledStatus} removable={removable} />;
            } else {
                return <div>Unsupported Type</div>;
            }
    }
};

export default ConfigUI;

import StringUI from "./StringUI";
import NumberUI from "./NumberUI";
import UrlUI from "./UrlUI";
import ImageUrlUI from "./ImageUrlUI";
import ObjectUI from "./ObjectUI";
import ArrayUI from "./ArrayUI";

const ConfigUI = ({type, isGhPage, props}) => {
    switch (type) {
        case 'STRING':
            return <StringUI {...props}/>;
        case 'NUMBER':
            return <NumberUI {...props}/>;
        case 'URL':
            return <UrlUI {...props}/>;
        case 'IMAGE URL':
            return <ImageUrlUI isGhPage={isGhPage} {...props}/>;
        case 'OBJECT':
            return <ObjectUI isGhPage={isGhPage}/>;
        default:
            if(type.startsWith('ARRAY OF ')) {
                const sub_type = type.substring(9);
                return <ArrayUI elementType={sub_type} isGhPage={isGhPage} {...props}/>;
            } else {
                return <div>Unsupported Type</div>;
            }
    }
};

export default ConfigUI;

import StringUI from "./StringUI";
import NumberUI from "./NumberUI";
import UrlUI from "./UrlUI";
import ImageUrlUI from "./ImageUrlUI";
import ObjectUI from "./ObjectUI";
import ArrayUI from "./ArrayUI";

const ConfigUI = ({type, onChange, isGhPage, props}) => {
    switch (type) {
        case 'STRING':
            return <StringUI onChange={onChange} {...props}/>;
        case 'NUMBER':
            return <NumberUI onChange={onChange} {...props}/>;
        case 'URL':
            return <UrlUI onChange={onChange} {...props}/>;
        case 'IMAGE URL':
            return <ImageUrlUI onChange={onChange} isGhPage={isGhPage} {...props}/>;
        case 'OBJECT':
            return <ObjectUI onChange={onChange} isGhPage={isGhPage}/>;
        default:
            if(type.startsWith('ARRAY OF ')) {
                const sub_type = type.substring(9);
                return <ArrayUI onChange={onChange} elementType={sub_type} isGhPage={isGhPage} cardinality={props.cardinality} />;
            } else {
                return <div>Unsupported Type</div>;
            }
    }
};

export default ConfigUI;

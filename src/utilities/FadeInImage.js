import React, { useState } from 'react'

const FadeInImage = (props) => {
	const [loaded, setLoaded] = useState(false);

	function handleShow() {
		setLoaded(true);
	}

	return <img ref={props?.ref} style={props?.style && Object.keys(props?.style).length > 0 ? props?.style : undefined} onClick={props?.onClick ? props?.onClick : void(0)} onLoad={handleShow} className={loaded ? `fadeImage ${props?.className ? props?.className : ''}`: `notFadeImage ${props?.className ? props?.className : ''}`} loaded={loaded} src={props?.src} alt={props?.alt} />;
}

export default FadeInImage
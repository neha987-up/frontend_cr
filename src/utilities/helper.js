import moment from "moment";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";

const FileTypes = [
    { type: "pdf", value: "application/pdf" },
    { type: "xls", value: "application/vnd.oasis.opendocument.spreadsheet" },
    { type: "xlsx", value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
    { type: "docx", value: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    { type: "doc", value: "application/msword" },
    { type: "png", value: "image/png" },
    { type: "jpg", value: "image/jpg" },
    { type: "jpeg", value: "image/jpg" },
];

export const getFileContentType = (extention) => FileTypes.filter((ft) => ft.type === extention)[0].value;

export const ScrollTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
};

export const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify({ ...obj }));
};

export const isEmptyObject = (obj) => {
    return JSON.stringify(obj) === "{}";
};

export const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
};

export const formatTime = (time) => {
    const parsedTime = moment(time, ["H:mm", "HH:mm"], true);
    if (parsedTime.format("H:mm") === time) {
        return parsedTime.format("HH:mm");
    } else {
        return time;
    }
};

export const convert24to12 = (time) => {
    // Extract hours and minutes from the time string
    const hours = parseInt(time.slice(0, 2));
    const minutes = time.slice(3, 5);

    // Determine AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    // const twelveHourTime = `${(hours % 12) || 12}:${minutes} ${amOrPm}`;

    return {
        time: `${hours % 12 || 12}:${minutes}`,
        ampm: amOrPm,
    };
};


export const getAgefromDate = (date) => {
    const dob = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    return age;
}

export const getFileTypeFromBase64 = (base64Data) => {
    // Remove data URI scheme if it's included
    const dataWithoutURI = base64Data.replace(/^data:[^;]+;base64,/, "");
    const binaryString = atob(dataWithoutURI);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    const byteArray = new Uint8Array(bytes);

    let fileType = null;

    // Check the magic numbers (file signatures) to determine the file type
    const firstTwoBytes = (byteArray[0] << 8) | byteArray[1];
    switch (firstTwoBytes) {
        case 0xffd8: // JPEG
            fileType = "image/jpeg";
            break;
        case 0x8950: // PNG
            fileType = "image/png";
            break;
        case 0x4749: // GIF
            fileType = "image/gif";
            break;
        case 0x424d: // BMP
            fileType = "image/bmp";
            break;
        case 0x2550: // PDF
            fileType = "application/pdf";
            break;
        case 0xd0cf: // XLS (old format)
            fileType = "application/vnd.ms-excel";
            break;
        case 0x504b: // XLSX or DOCX
            if (byteArray[2] === 0x03 && byteArray[3] === 0x04) {
                fileType =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // XLSX
            } else if (byteArray[2] === 0x06 && byteArray[3] === 0x00) {
                fileType =
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"; // DOCX
            }
            break;
        case 0x504d: // DOC (old format)
            fileType = "application/msword";
            break;
        // Add more cases for other file types as needed
    }

    return fileType;
};

export const base64toBlob = (base64Data, contentType) => {
    const sliceSize = 1024;
    const byteCharacters = window.atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
    let fileContentType = "";
    if (contentType) {
        fileContentType = getFileContentType(contentType ?? "pdf");
    } else {
        const fileType = getFileTypeFromBase64(base64Data);
        fileContentType = fileType ?? "application/pdf";
    }

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);

        const bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: fileContentType });
};


export const getAPIUrl = (endpoint) => process.env.REACT_APP_API_BASE_URL + endpoint;

export const getUserToken = () => {
    const userAuthToken = secureLocalStorage.getItem("authToken");
    return userAuthToken;
};

export const setUserToken = (token) => {
    const userAuthToken = secureLocalStorage.setItem("authToken", token);
};

export const getuserid = () => {
    const user = {}; //Pull from redux store
    return user?.userid;
};

export const getUserName = () => {
    const user = {}; //Pull from redux store
    return user?.name;
};

export const capitalzationLabel = (label) => {
    if (label) {
        const output = `${label.charAt(0).toUpperCase()}${label
            .substr(1)
            .toLowerCase()}`;
        return output;
    } else {
        return;
    }
};

export const upperCaseFieldValue = (stringValue) => {
    if (!stringValue) {
        return "";
    } else {
        return stringValue.toUpperCase().trim();
    }
};

export const swalWithBootstrapButtons = () => Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger me-3',
        title: 'custom-title'
    },
    buttonsStyling: false,
});

export const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

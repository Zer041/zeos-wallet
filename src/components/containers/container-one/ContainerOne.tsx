import React from "react";
import Stack from '@mui/material/Stack';
import { ContainerOneProps } from "./models/ContainerOnePropTypes";
import QRCode from 'react-qr-code';

const renderQrCode = (qrCodeStr: string | undefined) => {
    if(!qrCodeStr) return null;
    return (<QRCode
        value={qrCodeStr}
        bgColor={'black'}
        fgColor={'white'}
        size={200}
    />)
}
const ContainerOne = (props: ContainerOneProps) => {

    return (
        <div style={{
            textAlign: props.globalStyle ? props.globalStyle.textAlign : 'right',
            padding: '1rem',
        }}>
            <Stack
                direction="column"
                justifyContent="center"
                spacing={0}>
                <span style={ props.top.style ? props.top.style : {
                    fontSize: props.top.fontSize,
                    color: props.top.fontColor,
                    margin: 0,
                }}>
                    {props.top.plainText ? props.top.plainText : renderQrCode(props.top.qrCode)}
                </span>
                <span style={props.middle.style ? props.middle.style : {
                    fontSize: props.middle.fontSize,
                    color: props.middle.fontColor,
                    margin: 0,
                }}>
                    {props.middle.plainText ? props.middle.plainText : renderQrCode(props.middle.qrCode)}
                </span>
                <span style={props.bottom.style ? props.bottom.style : {
                    fontSize: props.bottom.fontSize,
                    color: props.bottom.fontColor,
                    margin: 0,
                }}>
                    {props.bottom.plainText ? props.bottom.plainText : renderQrCode(props.bottom.qrCode)}
                </span>
            </Stack>
        </div>
    );
}

export default ContainerOne
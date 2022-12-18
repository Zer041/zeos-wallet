import React from "react";
import Stack from '@mui/material/Stack';
import { ContainerTwoProps } from "./models/ContainerTwoProps";
import { Box } from "@mui/material";

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    p: 2,
    bgcolor: 'black',
    minWidth: '100%',
    margin: 'auto',
    marginTop: '1%',
    borderRadius: 1,
    color: 'white',
};
const ContainerTwo = (props: ContainerTwoProps) => {
    return (
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={12}
                sx={containerStyle}>

                <span style={{
                    fontSize: props.address.fontSize,
                    color: props.address.fontColor,
                    margin: 0,
                }}>{props.address.plainText}</span>

                <Stack direction="column"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    spacing={2}>
                    <span style={{
                        fontSize: props.zeosBalance.fontSize,
                        color: props.zeosBalance.fontColor,
                        margin: 0,
                    }}>{props.zeosBalance.plainText ? props.zeosBalance.plainText : `${props.zeosBalance!.amount} ${props.zeosBalance!.symbol}`}</span>

                    <span style={{
                        fontSize: props.usdBalance.fontSize,
                        color: props.usdBalance.fontColor,
                        margin: 0,
                    }}>{props.usdBalance.plainText ? props.usdBalance.plainText : `${props.usdBalance!.amount} ${props.usdBalance!.symbol}`}</span>
                </Stack>
            </Stack>
    );
}

export default ContainerTwo
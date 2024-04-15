import React from 'react';
import { Grid, Button } from '@mui/material';

class SendGINSHTForm extends React.Component {
    constructor(props) {
        super(props);
        // Add your state initialization here
    }


    render() {
        return (
            <Grid containter display={"flex"} justifyContent={"center"} spacing={4} paddingBottom={"30px"}>
                <Grid item xs={12} sm={4}>
                    <Button variant='contained' color='buttons' type="submit">Guardar PDF</Button>
                </Grid>
            </Grid>
        );
    }
}

export default SendGINSHTForm;
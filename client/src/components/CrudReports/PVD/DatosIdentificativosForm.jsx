import React from 'react';
import { useState, useEffect } from 'react';
import { companyService } from '../../../hooks/useCompanies';
import { Grid, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { CompanySelector } from '../../CrudEmpresas/CompanySelectorFormik';
import InputField from '../../FormFields/InputField';
import { EmployeeSelector } from '../../CrudEmpleados/EmployeeSelectorFormik';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

export default function DatosIdentificativosForm(props) {
    const [companiesList, setCompaniesList] = useState([]);
    const [employeesList, setEmployeesList] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const { values, setFieldValue } = useFormikContext();

    const {
        formField: {
            empleado,
            empresa,
            centroDeTrabajo,
            puestoDeTrabajo,
            fecha,
            referencia
        }
    } = props;

    // cargar compañias
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await companyService.getCompanies();
                setCompaniesList(response);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);

    useEffect(() => {
        setFieldValue(fecha.name, dayjs().format());
      }, [fecha.name, setFieldValue]);

    useEffect(() => {
        if (!values.CIF) {
            return;
        }

        const fetchEmployees = async () => {
            try {
                setFieldValue(empleado.name, '');
                values.DNI = '';
                const response = await companyService.getEmployees(values.CIF);
                setEmployeesList(response);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, [values.CIF, setFieldValue]);

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Datos identificativos
            </Typography>
            <Grid container spacing={3} paddingBottom={'20px'}>
                <Grid item xs={12} sm={6}>
                    <CompanySelector
                        id="company"
                        name={empresa.name}
                        label={empresa.label}
                        options={companiesList}
                        value={selectedCompany}
                        onChange={(event) => setSelectedCompany(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <EmployeeSelector
                        id="employee"
                        name={empleado.name}
                        label={empleado.label}
                        options={employeesList}
                        value={selectedEmployee}
                        onChange={(event) => {
                            const newValue = event.target.value;
                            setSelectedEmployee(newValue);
                            setFieldValue(empleado.name, newValue);
                        }}

                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField name={centroDeTrabajo.name} label={centroDeTrabajo.label} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <InputField name={puestoDeTrabajo.name} label={puestoDeTrabajo.label} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider required dateAdapter={AdapterDayjs}>
                        <DatePicker required label={fecha.label} value={selectedDate}
                            onChange={(newValue) => {
                                setSelectedDate(newValue);
                                const formattedDate = newValue ? newValue.format() : '';
                                setFieldValue(fecha.name, formattedDate);
                            }} style={{ width: '100%' }} />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField name={referencia.name} label={referencia.label} fullWidth />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

// https://codesandbox.io/p/sandbox/building-multi-step-form-with-formik-yup-forked-9n7gi4?file=%2Fsrc%2Fcomponents%2FFormFields%2FDatePickerField.jsx%3A1%2C1-55%2C1
// Link del componente de ejemplo
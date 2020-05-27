import './index.css'

import { Button, Divider, Form } from 'semantic-ui-react'
import {PatientInfoForm, GESTATIONAL_AGE_UNITS } from './patientInfoForm'
import React, { Component } from 'react'
import {UrineTestForm ,initialUrineTests } from './urineTestForm'
import { addNewPatient, afterNewPatientAdded } from '../../shared/reducers/patients'
import { createReadingDefault, newReadingPost } from '../../shared/reducers/newReadingStatus'

import {BpForm} from './bpForm'
import SweetAlert from 'sweetalert2-react'
import {SymptomForm} from './symptomForm'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../shared/reducers/user/currentUser'

var symptom:any = []

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0
        var v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

const initState = {
    patient: {
        patientId: '',
        patientName: '',
        patientAge: '',
        patientSex: 'FEMALE',
        isPregnant: true,
        gestationalAgeValue: '',
        gestationalAgeUnit: GESTATIONAL_AGE_UNITS.WEEKS,
        zone: '',
        dob: null,
        villageNumber: '',
        drugHistory: '',
        medicalHistory: ''
    } ,
    reading: {
        userId: '',
        readingId: '',
        dateTimeTaken: null,
        bpSystolic: '',
        bpDiastolic: '',
        heartRateBPM: '',
        dateRecheckVitalsNeeded: null,
        isFlaggedForFollowup: false,
        symptoms: '',
        urineTests: initialUrineTests
    },
    checkedItems: {
        none: true,
        headache: false,
        bleeding: false,
        blurredVision: false,
        feverish: false,
        abdominalPain: false,
        unwell: false,
        other: false,
        otherSymptoms: ''
    },
    showSuccessReading: false,
    hasUrineTest: false
}
interface IProps{
    getCurrentUser:any;
    createReadingDefault:any;
    afterNewPatientAdded:any;
    user:any;
   newReadingPost:any;
}
interface IPatient{
    patientId: string;
    patientName: string;
    patientAge: string;
    patientSex: string;
    isPregnant: boolean;
    gestationalAgeValue: string;
    gestationalAgeUnit: string;
    zone: string;
    dob: any;
    villageNumber: string;
    drugHistory: string;
    medicalHistory: string;
}
interface IState{
    patient:IPatient;
    reading:any;
    hasUrineTest:any;
}
class NewReadingPageComponent extends Component<IProps,IState>  {
    state = initState

    componentDidMount = () => {
        if (!this.props.user.isLoggedIn) {
            this.props.getCurrentUser()
        }
    }

    static getDerivedStateFromProps = (props:any, state:any) => {
        if (props.newPatientAdded) {
            props.createReadingDefault()
            props.afterNewPatientAdded()
            return {
                ...state,
                showSuccessReading: true,
            }
        }
        
        if (props.readingCreated) {
            const newPatient = props.newReadingData.patient
            newPatient.readings.push(props.newReadingData.reading)
            props.addNewPatient(newPatient)
            return state
        }
    }

    handleChange = (event:any) => {
        this.setState({
            patient: {
                ...this.state.patient,
                [event.target.name]: event.target.value
            }
        })
    }

    handleSelectChange = (e:any, value:any) => {
        if (value.name === 'patientSex' && value.value === 'MALE') {
            this.setState({
                patient: {
                    ...this.state.patient,
                    patientSex: 'MALE',
                    gestationalAgeValue: '',
                    isPregnant: false
                }
            })
        } else {
            this.setState({
                patient: { ...this.state.patient, [value.name]: value.value }
            })
        }
    }

    handleReadingChange = (e:any, value:any) => {
        this.setState({
            reading: { ...this.state.reading, [value.name]: value.value }
        })
    }

    handleUrineTestChange = (e:any, value:any) => {
        this.setState({
            reading: {
                ...this.state.reading,
                urineTests: {
                    ...this.state.reading.urineTests,
                    [value.name]: value.value
                }
            }
        })
    }

    handleUrineTestSwitchChange = (e:any) => {
        this.setState({
            hasUrineTest: e.target.checked
        } as any)
        if (!e.target.checked) {
            this.setState({
                reading: {
                    ...this.state.reading,
                    urineTests: initialUrineTests
                }
            })
        }
    }

    handleCheckedChange = (e:any, value:any) => {
        // console.log(value.name)
        // true => false, pop
        if (value.value) {
            if (symptom.indexOf(value.name) >= 0) {
                symptom.pop()
            }
        } else {
            // false => true, push
            if (symptom.indexOf(value.name) < 0) {
                symptom.push(value.name)
            }
        }
        // console.log(symptom)
        if (value.name !== 'none') {
            if (symptom.indexOf('none') >= 0) {
                symptom.pop()
            }
            this.setState({
                checkedItems: {
                    ...this.state.checkedItems,
                    [value.name]: !value.value,
                    none: false
                }
            } as any)
        } else {
            while (symptom.length > 0) {
                symptom.pop()
            }
            this.setState({
                checkedItems: {
                    none: true,
                    headache: false,
                    bleeding: false,
                    blurredVision: false,
                    feverish: false,
                    abdominalPain: false,
                    unwell: false,
                    other: false,
                    otherSymptoms: ''
                }
            } as any)
        }
    }

    handleOtherSymptom = (event:any) => {
        //console.log(event.target)
        this.setState({
            checkedItems: {
                ...this.state.checkedItems,
                [event.target.name]: event.target.value
            }
        }as any)
    }

    handleSubmit = (event:any) => {
        event.preventDefault()
        console.log('Create new submit')
        if (symptom.indexOf('other') >= 0) {
            symptom.pop()
            if (this.state.checkedItems.otherSymptoms !== '') {
                symptom.push(this.state.checkedItems.otherSymptoms)
            }
        }
        if (this.state.patient.patientAge == '') {
            this.state.patient.patientAge = ""
        }

        if (this.state.patient.dob != null) {
            this.state.patient.dob = (Date.parse(this.state.patient.dob as any) / 1000) as any;
        }
        var readingID = guid()

        var dateTimeTaken = Math.floor(Date.now() / 1000);
        const that =this;

        this.setState(
            {
                reading: {
                    ...this.state.reading,
                    userId: this.props.user.userId,
                    readingId: readingID,
                    dateTimeTaken: dateTimeTaken,
                    symptoms: symptom.toString()
                }
            },
            function() {
                let patientData = JSON.parse(JSON.stringify(that.state.patient))
                let readingData = JSON.parse(JSON.stringify(that.state.reading))
                if (!that.state.hasUrineTest) {
                    delete readingData.urineTests
                }

                let newData = {
                    patient: patientData,
                    reading: readingData
                }
                console.log(newData)
                that.props.newReadingPost(newData)
            }
        )
    }

    render() {
        // don't render page if user is not logged in
        if (!this.props.user.isLoggedIn) {
            return <div />
        }

        return (
            <div
                style={{
                    maxWidth: 1200,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                <h1>
                    <b>Create a new patient and reading:</b>
                </h1>
                <Divider />
                <Form onSubmit={this.handleSubmit}>
                    <PatientInfoForm
                        patient={this.state.patient}
                        onChange={this.handleSelectChange}
                    />
                    <div className="leftContainer">
                        <BpForm
                            reading={this.state.reading}
                            onChange={this.handleReadingChange}
                        />
                        <SymptomForm
                            checkedItems={this.state.checkedItems}
                            patient={this.state.patient}
                            onChange={this.handleCheckedChange}
                            onOtherChange={this.handleOtherSymptom}
                        />
                    </div>
                    <div className="rightContainer">
                        <UrineTestForm
                            reading={this.state.reading}
                            onChange={this.handleUrineTestChange}
                            onSwitchChange={this.handleUrineTestSwitchChange}
                            hasUrineTest={this.state.hasUrineTest}
                        />
                    </div>

                    <div style={{ clear: 'both' }}></div>
                    <div className="contentRight">
                        <Button
                            style={{ backgroundColor: '#84ced4' }}
                            type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>

                <SweetAlert
                    type="success"
                    show={this.state.showSuccessReading}
                    title="Patient Reading Created!"
                    text="Success! You can view the new reading by going to the Patients tab"
                    onConfirm={() => this.setState(initState)}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ user, newReading, patients }:any) => ({
    user: user.currentUser,
    createReadingStatusError: newReading.error,
    readingCreated: newReading.readingCreated,
    newReadingData: newReading.message,
    newPatientAdded: patients.newPatientAdded,
})

const mapDispatchToProps = (dispatch:any) => ({
    addNewPatient: (newPatient:any) => {
      dispatch(addNewPatient(newPatient));
    },
    afterNewPatientAdded: () => {
      dispatch(afterNewPatientAdded());
    },
    newReadingPost: (data:any) => {
        dispatch(newReadingPost(data))
    },
    createReadingDefault: () => {
        dispatch(createReadingDefault())
    },
    getCurrentUser: () => {
        dispatch(getCurrentUser())
    }
})

export const NewReadingPage= connect(
    mapStateToProps,
    mapDispatchToProps
)(NewReadingPageComponent)

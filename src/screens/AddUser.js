import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ToastAndroid, ScrollView } from 'react-native'
import { colors, images } from '../theme'
import { withNavigation } from 'react-navigation'
import validator from 'validator'
import { AddItem } from '../redux/actions'
import { connect } from 'react-redux'

class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            gender: '',
            inputData: [],
            email: '',
            touch: false,
            allDataValidate: false,
            userDataList: [],
            userList: [],
            GenderData: [{ name: 'FEMALE', selected: false }, { name: 'MALE', selected: false }, { name: 'Other', selected: false }]
        }
    }
    //Logical Function
    updateValue = (label, value) => {
        this.setState({ [label]: value })
    }

    changleRadio = (dataIndex) => {
        this.state.GenderData.map((i, index) => {
            if (index == dataIndex) {
                i['selected'] = true
                this.setState({ gender: i.name })
            }
            else {
                i['selected'] = false

            }
        })
        this.setState({ GenderData: this.state.GenderData })
    }

    validatename = () => {
        const specialCharacterFormat = /[$&+,:;=\\\\?@#|/'<>.^*()%!-]/;
        var format = /^d*[a-zA-Z ][a-zA-Zds ]*$/;
        if (this.state.name == undefined || this.state.name == "") {
            ToastAndroid.show('Enter name', ToastAndroid.SHORT)
            return false;
        }
        else if (
            !this.state.name ||
            validator.isEmpty(this.state.name, { ignore_whitespace: true })
        ) {
            ToastAndroid.show('Enter name', ToastAndroid.SHORT)
            return false;
        } else if (specialCharacterFormat.test(this.state.name)) {
            ToastAndroid.show('Special Character not allowed !', ToastAndroid.SHORT)

            return false;
        } else if (this.state.name.match(format) == null) {
            ToastAndroid.show('Only Character Allowed !', ToastAndroid.SHORT)
            return false;
        } else {
            this.setState({ nameError: null });
            return true;
        }

    }

    validateEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+$/;
        if (
            !this.state.email ||
            validator.isEmpty(this.state.email, { ignore_whitespace: true })
        ) {
            ToastAndroid.show('Enter email', ToastAndroid.SHORT)
            return false;
        } else if (!validator.isEmail(this.state.email)) {
            ToastAndroid.show('Enter valid email', ToastAndroid.SHORT)
            return false;
        } else if (this.state.email.match(reg) === null) {
            ToastAndroid.show('Enter valid email', ToastAndroid.SHORT)
            return false;
        } else {
            this.setState({ emailError: null });
            return true;
        }
    };

    validategender = () => {
        let genderFlag = false
        this.state.GenderData.map((i, index) => {
            if (i['selected'] == true) {

                genderFlag = true
            }
        })
        if (!genderFlag) {
            ToastAndroid.show('Please Select Gender', ToastAndroid.SHORT)
            return false
        } else {
            return true
        }
    }

    addInRedux = () => {
        let data = {
            'gender': this.state.gender,
            'userList': this.state.userDataList
        }
        if (this.state.userDataList.length != 0) {
            let dataArray = this.props.userList
            dataArray.push(data)
            this.props.AddItem(dataArray)
            this.props.navigation.pop()
        } else {
            ToastAndroid.show('Enter At-List name and email', ToastAndroid.SHORT)
        }
    }

    validateData = () => {
        if (this.validategender()) {
            this.addInRedux()
        }
    }


    addMore = () => {
        let temp = this.state.userList, dataList = this.state.userDataList
        temp.push({ index: temp.length })
        dataList.push({ name: this.state.name, email: this.state.email })
        this.setState({ userList: temp, userDataList: dataList, name: '', email: '' }, () => {
            //  console.log("inputData", this.state.inputData);
        })
    }

    addMoreValidate = () => {
        if (this.validatename() && this.validateEmail()) {
            this.addMore()
        }
    }


    remove = (index) => {
        let temp = this.state.userDataList, temp2 = this.state.inputData
        this.state.inputData.splice(index, 1)
        temp.splice(index, 1)
        this.setState({ userDataList: temp, inputData: this.state.inputData })


    }

    //renderView Function
    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.changleRadio(index)
                }}
                style={styles.radio}>
                <Image
                    source={item.selected ? images.selected : images.deselected}
                    style={{ width: 30, height: 30 }}
                />
                <Text style={styles.namestyle}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    renderAddUSer = () => {
        return (
            <View style={styles.mainview}>
                {/* gender */}
                <View style={styles.radio}>
                    <Text style={styles.namestyle}>Gender </Text>
                    <FlatList
                        data={this.state.GenderData}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                    />
                </View>
                {this.state.userDataList.map((i, index) => {
                    return (
                        <View style={styles.innerView}>
                            <TouchableOpacity onPress={() => {
                                this.remove(index)
                            }}>
                                <Image source={images.delete} style={{ alignSelf: 'flex-end' }} />
                            </TouchableOpacity>
                            <Text >{i.name}</Text>
                            <Text >{i.email}</Text>
                        </View>
                    )
                }
                )}
                <View style={styles.innerView}>

                    {/* name */}
                    <View style={styles.input}>
                        <TextInput
                            value={this.state.name}
                            placeholder={'Enter Name'}
                            onChangeText={(value) => {
                                // this.addValues(value, index)
                                this.updateValue('name', value)
                            }}
                            style={{ fontSize: 20 }}

                        />
                    </View>

                    {/* email */}

                    <View style={styles.input}>
                        <TextInput
                            value={this.state.email}
                            placeholder={'Enter Email'}
                            onChangeText={(value) => {
                                // this.addEmail(value, index)
                                this.updateValue('email', value)
                            }}
                            style={{ fontSize: 20 }}
                        />
                    </View>
                </View>


                <TouchableOpacity
                    onPress={() => this.addMoreValidate()}
                    style={[styles.addbutton, { alignSelf: 'flex-end' }]}>
                    <Text style={styles.adduser}>+Add More</Text>
                </TouchableOpacity>

            </View>
        )
    }



    submitData = () => {
        return (
            <TouchableOpacity
                onPress={() => this.validateData()}
                style={styles.addbutton}>
                <Text style={styles.adduser}>Add User</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ScrollView>
                {this.renderAddUSer()}
                {this.submitData()}
            </ScrollView>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log("dispatch", dispatch);

    return {
        AddItem: (item) => {
            dispatch(AddItem(item))
        },
    }
}


const mapStateToProps = (state) => {
    console.log("state", state);

    return {
        userList: state.Items.addtoitem,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AddUser));

const styles = StyleSheet.create({
    mainview: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        borderColor: 'grey'
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.black,
        margin: 10,
    },
    radio: {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10
    },
    namestyle: {
        marginLeft: 10,
        fontSize: 20
    },
    adduser: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    addbutton: {
        borderRadius: 10,
        paddingVertical: 10,
        margin: 30,
        justifyContent: 'center',
        borderColor: colors.pink,
        paddingHorizontal: 20,
        backgroundColor: colors.pink
    },
    innerView: {
        borderWidth: 1, borderColor: 'grey', margin: 10, borderRadius: 5, padding: 5
    }


})